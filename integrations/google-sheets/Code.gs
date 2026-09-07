// Set BOOKING_SECRET in Project Settings > Script properties before deployment.
// Deploy as a web app, executing as the owner, accessible to Anyone.
// The public endpoint accepts only authenticated writes and never returns sheet data.
// Replace with the selected Google spreadsheet ID before saving in Apps Script.
const SPREADSHEET_ID = 'CONFIGURE_TARGET_SPREADSHEET_ID';
const HEADERS = ['ID richiesta', 'Data ricezione', 'Nome', 'Email', 'Telefono', 'Settore', 'Giorno preferito', 'Fascia oraria', 'Sito attuale', 'Note', 'Stato'];

function jsonReply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function textCell(value, maxLength) {
  const text = String(value || '').trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function doPost(event) {
  let lock;
  try {
    const raw = event && event.postData && event.postData.contents;
    if (!raw || raw.length > 16000) return jsonReply({ok: false});
    const data = JSON.parse(raw);
    const secret = PropertiesService.getScriptProperties().getProperty('BOOKING_SECRET');
    if (!secret || secret.length < 32 || data.secret !== secret) return jsonReply({ok: false});
    if (data.requestType && !['booking', 'consultation'].includes(data.requestType)) return jsonReply({ok: false});
    const isBooking = data.requestType ? data.requestType === 'booking' : Boolean(data.preferredDate);
    if (!/^[a-f0-9]{64}$/.test(data.submissionId || '') || !data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '') || (isBooking && (!/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate || '') || !data.preferredTime)) || (!isBooking && !data.notes)) {
      return jsonReply({ok: false});
    }
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetById(0);
    if (!sheet) throw new Error('Missing sheet');
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#e8eef7');
      sheet.setFrozenRows(1);
    } else {
      const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
      if (current.join('\t') !== HEADERS.join('\t')) throw new Error('Unexpected headers');
    }
    const lastRow = sheet.getLastRow();
    if (lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(data.submissionId).matchEntireCell(true).findNext()) {
      return jsonReply({ok: true, duplicate: true});
    }
    const receivedAt = Utilities.formatDate(new Date(), 'Europe/Rome', 'yyyy-MM-dd HH:mm:ss');
    const row = [data.submissionId, receivedAt, textCell(data.name, 120), textCell(data.email, 180), textCell(data.phone, 80), textCell(data.service, 160), textCell(data.preferredDate, 10), textCell(data.preferredTime, 120), textCell(data.website, 240), textCell(data.notes, 2000), isBooking ? 'Da confermare' : 'Da contattare'];
    sheet.getRange(lastRow + 1, 1, 1, HEADERS.length).setNumberFormat('@').setValues([row]);
    SpreadsheetApp.flush();
    return jsonReply({ok: true, duplicate: false});
  } catch (error) {
    return jsonReply({ok: false});
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
