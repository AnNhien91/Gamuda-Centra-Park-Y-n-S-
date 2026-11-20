/**
 * Google Apps Script — nhận lead từ website và ghi vào Google Sheet.
 *
 * CÁCH CÀI (5 phút):
 * 1. Tạo Google Sheet mới, đặt tên "Leads Gamuda Central Park".
 * 2. Menu Tiện ích mở rộng → Apps Script → xóa code mẫu, dán toàn bộ file này.
 * 3. Sửa SECRET bên dưới thành một chuỗi bất kỳ (giống GOOGLE_SHEET_SECRET trong .env).
 * 4. Bấm Triển khai → Tùy chọn triển khai mới → Loại: Ứng dụng web
 *      - Thực thi dưới dạng: Tôi
 *      - Người có quyền truy cập: Bất kỳ ai
 * 5. Cấp quyền, copy "URL ứng dụng web" (…/exec) → dán vào GOOGLE_SHEET_WEBHOOK.
 */
const SECRET = 'doi-chuoi-bi-mat-nay';
const SHEET_NAME = 'Leads';
const HEADERS = ['Thời gian', 'Họ tên', 'Điện thoại', 'Email', 'Nhu cầu', 'Mục đích', 'Lời nhắn', 'Nguồn', 'Trang', 'IP', 'Trạng thái'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (SECRET && data.secret !== SECRET) return json({ ok: false, error: 'unauthorized' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0E2A22').setFontColor('#E6D3A3');
      sh.setFrozenRows(1);
    }
    // Chặn công thức độc hại (CSV/formula injection)
    const safe = (v) => { const s = String(v || ''); return /^[=+\-@]/.test(s) ? "'" + s : s; };
    sh.appendRow([
      data.createdAtVN || new Date(), safe(data.name), "'" + (data.phone || ''), safe(data.email), safe(data.need),
      safe(data.purpose), safe(data.message), safe(data.source), safe(data.page), safe(data.ip), 'Mới',
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, message: 'Webhook đang hoạt động' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
