// Kiểm tra nhanh cấu hình trước khi deploy:  npm run check
require('dotenv').config();
const { agent, tracking, site } = require('../config/site');
const { channelStatus } = require('../src/leads');

const warn = [];
if (/0900000000|Nguyễn Văn A|tuvan@example\.com/.test(agent.phone + agent.name + agent.email)) warn.push('Thông tin chuyên viên vẫn là dữ liệu mẫu (AGENT_*).');
if (site.url.includes('localhost')) warn.push('SITE_URL chưa đặt thành tên miền thật.');
const ch = channelStatus();
if (!Object.values(ch).some(Boolean)) warn.push('Chưa cấu hình kênh nhận lead nào (Email / Google Sheet / Telegram).');

console.log('Website :', site.url);
console.log('Chuyên viên:', agent.name, agent.phoneDisplay, agent.email);
console.log('Kênh lead :', ch);
console.log('Tracking  :', tracking);
if (warn.length) { console.log('\n⚠️  Cần xử lý:'); warn.forEach((w) => console.log(' -', w)); process.exitCode = 1; }
else console.log('\n✅ Cấu hình sẵn sàng để deploy.');
