import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

const booking = { requestType: 'booking', requestId: 'stable-client-id', name: 'Test', email: 'test@example.com', phone: '+390000000000', service: 'Cliniche dentali', preferredDate: '2026-09-10', preferredTime: 'Mattina 09:00 - 12:00', website: '', notes: '=1+1', message: 'Richiesta di test' };
const ok = (data = {ok: true}) => ({ok: true, json: async () => data});
async function run(t, {body = booking, method = 'POST', configured = true, steps = []} = {}) {
  t.mock.method(globalThis, 'fetch', async (...args) => {
    calls.push(args);
    const step = steps.shift();
    assert.ok(step, 'Unexpected outbound request');
    if (step instanceof Error) throw step;
    return step;
  });
  t.mock.method(console, 'error', () => {});
  const prior = {...process.env};
  process.env.RESEND_API_KEY = 'test-resend-key';
  if (configured) {
    process.env.BOOKING_SHEETS_URL = 'https://script.google.com/macros/s/example/exec';
    process.env.BOOKING_SHEETS_SECRET = 's'.repeat(40);
  } else {
    delete process.env.BOOKING_SHEETS_URL;
    delete process.env.BOOKING_SHEETS_SECRET;
  }
  t.after(() => {
    for (const key of ['RESEND_API_KEY', 'BOOKING_SHEETS_URL', 'BOOKING_SHEETS_SECRET']) {
      if (prior[key] === undefined) delete process.env[key]; else process.env[key] = prior[key];
    }
  });
  const calls = [];
  const res = { setHeader() {}, status(code) {this.code = code; return this;}, json(data) {this.data = data; return this;} };
  await handler({method, body}, res);
  return {res, calls};
}

test('booking is stored before email with normalized fields and a stable ID', async t => {
  const {res, calls} = await run(t, {steps: [ok(), ok()]});
  assert.equal(res.code, 200);
  assert.equal(calls.length, 2);
  assert.match(calls[0][0], /script.google.com/);
  const payload = JSON.parse(calls[0][1].body);
  assert.equal(payload.notes, '=1+1');
  assert.equal(payload.phone, '+390000000000');
  assert.match(payload.submissionId, /^[a-f0-9]{64}$/);
  assert.equal(calls[1][1].headers['Idempotency-Key'], 'booking-' + payload.submissionId);
  assert.equal('secret' in JSON.parse(calls[1][1].body), false);
});
test('failed Sheets write returns error without sending email', async t => {
  const {res, calls} = await run(t, {steps: [ok({ok: false})]});
  assert.equal(res.code, 502);
  assert.equal(calls.length, 1);
});
test('network timeout does not report a saved booking', async t => {
  const {res} = await run(t, {steps: [new Error('timeout')]});
  assert.equal(res.code, 502);
});
test('a retry of a saved booking does not resend the email', async t => {
  const {res, calls} = await run(t, {steps: [ok({ok: true, duplicate: true})]});
  assert.equal(res.code, 200);
  assert.equal(calls.length, 1);
});
test('email outage does not turn an already saved booking into an error', async t => {
  const {res} = await run(t, {steps: [ok(), new Error('mail timeout')]});
  assert.equal(res.code, 200);
  assert.deepEqual(res.data, {ok: true});
});
test('email rejection still confirms the persisted booking', async t => {
  const {res} = await run(t, {steps: [ok(), {ok: false}]});
  assert.equal(res.code, 200);
});
test('invalid booking date is rejected before any outbound request', async t => {
  const {res, calls} = await run(t, {body: {...booking, preferredDate: ''}});
  assert.equal(res.code, 400);
  assert.equal(calls.length, 0);
});
test('consultation requests keep the existing email route', async t => {
  const {res, calls} = await run(t, {body: {...booking, requestType: 'consultation'}, steps: [ok()]});
  assert.equal(res.code, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], 'https://api.resend.com/emails');
});
test('unconfigured integration preserves existing email behavior', async t => {
  const {res, calls} = await run(t, {configured: false, steps: [ok()]});
  assert.equal(res.code, 200);
  assert.equal(calls.length, 1);
});
