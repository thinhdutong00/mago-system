import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function harness(initialRows = []) {
  const rows = initialRows;
  let opened = 0;
  let held = false;
  let flushFails = false;
  const sheet = {
    getLastRow: () => rows.length,
    setFrozenRows() {},
    getRange(row, column, count, width) {
      const range = {
        setValues(values) { for (let i = 0; i < values.length; i++) rows[row - 1 + i] = [...values[i]]; return range; },
        getValues: () => rows.slice(row - 1, row - 1 + count).map(r => r.slice(column - 1, column - 1 + width)),
        setFontWeight: () => range,
        setBackground: () => range,
        setNumberFormat: () => range,
        createTextFinder(text) {return {matchEntireCell() {return this;}, findNext: () => rows.slice(row - 1).some(r => r[column - 1] === text)};},
      };
      return range;
    },
  };
  const ctx = vm.createContext({
    ContentService: {MimeType: {JSON: 'json'}, createTextOutput: text => ({setMimeType: () => JSON.parse(text)})},
    PropertiesService: {getScriptProperties: () => ({getProperty: () => 's'.repeat(40)})},
    LockService: {getScriptLock: () => ({waitLock: () => {held = true;}, hasLock: () => held, releaseLock: () => {held = false;}})},
    SpreadsheetApp: {openById() {opened++; return {getSheetById: () => sheet};}, flush() {if (flushFails) throw new Error('flush');}},
    Utilities: {formatDate: () => '2026-09-07 17:30:00'},
  });
  vm.runInContext(readFileSync(new URL('../integrations/google-sheets/Code.gs', import.meta.url), 'utf8'), ctx);
  const call = data => ctx.doPost({postData: {contents: JSON.stringify(data)}});
  return {call, rows, get opened() {return opened;}, get held() {return held;}, set flushFails(value) {flushFails = value;}};
}
const payload = {secret: 's'.repeat(40), submissionId: 'a'.repeat(64), name: 'Test', email: 'test@example.com', phone: '+390000000000', preferredDate: '2026-09-10', preferredTime: 'Mattina', notes: '=IMPORTXML("https://example.com","x")'};
test('rejects unauthenticated writes without opening the spreadsheet', () => {
  const h = harness();
  assert.equal(h.call({...payload, secret: 'wrong'}).ok, false);
  assert.equal(h.opened, 0);
});
test('writes all fields as text and escapes formulas and phone prefixes', () => {
  const h = harness();
  assert.equal(h.call(payload).ok, true);
  assert.equal(h.rows.length, 2);
  assert.equal(h.rows[1][4], "'+390000000000");
  assert.ok(h.rows[1][9].startsWith("'=IMPORTXML"));
  assert.equal(h.rows[1][10], 'Da confermare');
  assert.equal(h.held, false);
});
test('duplicate submission writes exactly one row', () => {
  const h = harness();
  h.call(payload);
  assert.equal(h.call(payload).duplicate, true);
  assert.equal(h.rows.length, 2);
  assert.equal(h.held, false);
});
test('unexpected existing headers are preserved and rejected', () => {
  const h = harness([['Existing data']]);
  assert.equal(h.call(payload).ok, false);
  assert.equal(h.rows.length, 1);
  assert.equal(h.rows[0][0], 'Existing data');
  assert.equal(h.held, false);
});
test('storage failure never reports success and releases the lock', () => {
  const h = harness();
  h.flushFails = true;
  assert.equal(h.call(payload).ok, false);
  assert.equal(h.held, false);
});
