/**
 * Xử lý lead: kiểm tra dữ liệu, chống spam, gửi song song về
 * Email (SMTP) · Google Sheet (Apps Script) · Telegram, và lưu bản sao JSONL.
 */
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const env = process.env;

const NEEDS = ['Studio', '1 phòng ngủ', '2 phòng ngủ', '3 phòng ngủ', '4 phòng ngủ / Duplex', 'Chưa xác định'];
const PURPOSES = ['Để ở', 'Đầu tư', 'Cả hai'];

const clean = (v, max = 200) =>
  String(v ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

function normalizePhone(raw) {
  let p = String(raw || '').replace(/[^\d+]/g, '');
  if (p.startsWith('+84')) p = '0' + p.slice(3);
  else if (p.startsWith('84') && p.length === 11) p = '0' + p.slice(2);
  return p;
}

function validateLead(body) {
  // Honeypot + thời gian điền form tối thiểu
  if (clean(body.website)) return { spam: true };
  const startedAt = Number(body.t || 0);
  if (startedAt && Date.now() - startedAt < 2500) return { spam: true };

  const errors = {};
  const name = clean(body.name, 80);
  const phone = normalizePhone(body.phone);
  const email = clean(body.email, 120).toLowerCase();
  const need = clean(body.need, 40);
  const purpose = clean(body.purpose, 20);
  const message = clean(body.message, 1000);
  const source = clean(body.source, 60) || 'website';
  const consent = body.consent === true || body.consent === 'on' || body.consent === 'true';

  if (name.length < 2) errors.name = 'Vui lòng nhập họ tên.';
  if (!/^0(3|5|7|8|9)\d{8}$/.test(phone)) errors.phone = 'Số điện thoại chưa đúng (10 số, ví dụ 0912 345 678).';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Email chưa đúng định dạng.';
  if (!consent) errors.consent = 'Vui lòng đồng ý để chúng tôi liên hệ tư vấn.';

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      need: NEEDS.includes(need) ? need : need ? 'Khác' : '',
      purpose: PURPOSES.includes(purpose) ? purpose : '',
      message,
      source,
    },
  };
}

// ---------------- Kênh gửi ----------------
let transporter;
function getTransport() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return null;
  if (!transporter) {
    const port = Number(env.SMTP_PORT) || 465;
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  return transporter;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function formatVN(iso) {
  return new Date(iso).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
}

async function sendEmail(lead) {
  const t = getTransport();
  if (!t) return 'skipped';
  const rows = [
    ['Họ tên', lead.name],
    ['Điện thoại', lead.phone],
    ['Email', lead.email || '—'],
    ['Nhu cầu', lead.need || '—'],
    ['Mục đích', lead.purpose || '—'],
    ['Lời nhắn', lead.message || '—'],
    ['Nguồn', lead.source],
    ['Thời gian', formatVN(lead.createdAt)],
  ];
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px">
    <h2 style="color:#0E2A22;margin:0 0 12px">Khách hàng mới — Gamuda Central Park</h2>
    <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="border-bottom:1px solid #eee;color:#666;width:120px">${k}</td><td style="border-bottom:1px solid #eee"><b>${esc(v)}</b></td></tr>`
        )
        .join('')}
    </table>
    <p style="margin-top:16px"><a href="tel:${lead.phone}" style="background:#0E2A22;color:#E6D3A3;padding:10px 18px;border-radius:6px;text-decoration:none">Gọi ngay ${lead.phone}</a></p>
  </div>`;
  await t.sendMail({
    from: env.MAIL_FROM || `"Gamuda Central Park" <${env.SMTP_USER}>`,
    to: env.MAIL_TO || env.SMTP_USER,
    replyTo: lead.email || undefined,
    subject: `[Lead] ${lead.name} – ${lead.phone} – ${lead.need || 'Nhận báo giá'}`,
    html,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
  return 'sent';
}

async function sendSheet(lead) {
  if (!env.GOOGLE_SHEET_WEBHOOK) return 'skipped';
  const res = await fetch(env.GOOGLE_SHEET_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...lead, createdAtVN: formatVN(lead.createdAt), secret: env.GOOGLE_SHEET_SECRET || '' }),
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
  });
  const text = await res.text();
  if (!res.ok || /"ok"\s*:\s*false/.test(text)) throw new Error(`Sheet HTTP ${res.status}: ${text.slice(0, 120)}`);
  return 'sent';
}

async function sendTelegram(lead) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return 'skipped';
  const lines = [
    '🏡 <b>Lead mới – Gamuda Central Park</b>',
    `👤 ${esc(lead.name)}`,
    `📞 <a href="tel:${lead.phone}">${lead.phone}</a>`,
    lead.email ? `✉️ ${esc(lead.email)}` : '',
    lead.need ? `🏢 Nhu cầu: ${esc(lead.need)}` : '',
    lead.purpose ? `🎯 Mục đích: ${esc(lead.purpose)}` : '',
    lead.message ? `💬 ${esc(lead.message)}` : '',
    `📍 Nguồn: ${esc(lead.source)}`,
    `🕒 ${formatVN(lead.createdAt)}`,
  ].filter(Boolean);
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Telegram HTTP ${res.status}: ${(await res.text()).slice(0, 120)}`);
  return 'sent';
}

function saveLocal(lead) {
  try {
    const dir = path.join(__dirname, '..', 'data');
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(path.join(dir, 'leads.jsonl'), JSON.stringify(lead) + '\n');
    return 'saved';
  } catch (e) {
    console.error('[lead] local save failed', e.message);
    return 'failed';
  }
}

function channelStatus() {
  return {
    email: Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS),
    googleSheet: Boolean(env.GOOGLE_SHEET_WEBHOOK),
    telegram: Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID),
  };
}

async function deliverLead(lead) {
  const local = saveLocal(lead);
  const names = ['email', 'googleSheet', 'telegram'];
  const results = await Promise.allSettled([sendEmail(lead), sendSheet(lead), sendTelegram(lead)]);
  const summary = {};
  results.forEach((r, i) => {
    summary[names[i]] = r.status === 'fulfilled' ? r.value : 'failed';
    if (r.status === 'rejected') console.error(`[lead] ${names[i]} failed:`, r.reason?.message || r.reason);
  });
  const anySent = Object.values(summary).includes('sent');
  const anyConfigured = Object.values(channelStatus()).some(Boolean);
  console.log('[lead]', lead.phone, summary, 'local:', local);
  // Thành công nếu ít nhất 1 kênh gửi được; nếu chưa cấu hình kênh nào (chạy thử) thì chấp nhận khi đã lưu file.
  return { ok: anySent || (!anyConfigured && local === 'saved'), summary };
}

module.exports = { validateLead, deliverLead, channelStatus, NEEDS, PURPOSES };
