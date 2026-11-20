# Hướng dẫn đưa website lên GitHub và Hostinger (cho người mới)

Tổng thời gian: khoảng 45–60 phút. Làm lần lượt từ Bước 1 đến Bước 7.

---

## Bước 1 — Điền thông tin của bạn

Mở file `.env.example` để xem danh sách biến. Bạn **không cần sửa code**: mọi thông tin cá nhân (tên, số điện thoại, Zalo, email) và các khóa bí mật sẽ được nhập vào Hostinger ở Bước 5.

Nếu muốn sửa nội dung dự án (diện tích, chính sách, FAQ…), mở `config/site.js`.

Muốn có ảnh chân dung: lưu ảnh vuông (khoảng 400×400px) thành `public/images/agent.webp`, sau đó đặt `AGENT_PHOTO=/images/agent.webp`.

---

## Bước 2 — Tạo tài khoản GitHub và kho chứa code

1. Vào **github.com** → **Sign up** → tạo tài khoản (email, mật khẩu, tên người dùng).
2. Sau khi đăng nhập, bấm dấu **+** góc phải → **New repository**.
3. Đặt tên: `gamuda-central-park` · chọn **Private** · **không** tích "Add a README" → **Create repository**.
4. Giữ trang đó mở, bạn sẽ cần đường link dạng `https://github.com/<ten-cua-ban>/gamuda-central-park.git`.

## Bước 3 — Đẩy code lên GitHub

Máy bạn đã có Git. Mở **Terminal** (hoặc Git Bash) trong thư mục `website` rồi chạy lần lượt:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Website Gamuda Central Park"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/<ten-cua-ban>/gamuda-central-park.git
```

```bash
git push -u origin main
```

Lần đầu chạy, Windows sẽ mở cửa sổ đăng nhập GitHub, bạn bấm **Sign in with your browser** là xong.

> File `.env` (chứa mật khẩu) và thư mục `node_modules`, `data` đã được loại trừ bằng `.gitignore`, nên sẽ không bị đẩy lên GitHub.

---

## Bước 4 — Mua hosting và tên miền trên Hostinger

1. Vào **hostinger.vn** → chọn gói **Business Web Hosting** hoặc **Cloud** (các gói này mới chạy được ứng dụng **Node.js**; gói Single/Premium không chạy được).
2. Khi thanh toán, chọn **tên miền miễn phí** đi kèm, ví dụ `gamudacentralpark-yenso.com`.
   - Không nên dùng tên/logo chính thức của Gamuda Land làm tên miền để tránh tranh chấp thương hiệu. Có thể thêm tên bạn hoặc chữ "tuvan", ví dụ `tuvan-gamudacentralpark.com`.

## Bước 5 — Tạo ứng dụng Node.js từ GitHub

Trong **hPanel** (bảng điều khiển Hostinger):

1. **Websites** → **Add website** → chọn **Node.js Apps** (tên nút có thể hơi khác tùy phiên bản giao diện).
2. Chọn **Import Git repository** → **Connect GitHub** → cho phép Hostinger truy cập repo `gamuda-central-park`.
3. Cấu hình build:
   | Mục | Giá trị |
   |---|---|
   | Framework | Express (hoặc "Other") |
   | Node.js version | 20 hoặc 22 |
   | Branch | `main` |
   | Root directory | **để trống** hoặc `./` (gốc repo, nơi có `package.json`). **Không** điền `website`, `/public_html` hay thư mục con nào khác |
   | Entry file | `server.js` |
   | Install command | `npm install` |
   | Build command | `npm run build` (hoặc để trống) |
   | Start command | `npm start` |

   > Nếu deploy báo **"package.json file not found"**: gần như chắc chắn ô *Root directory* đang trỏ sai. Vào app → **Settings / Build configuration**, sửa *Root directory* về gốc repo rồi bấm **Redeploy**.
4. **Environment variables**: thêm từng dòng trong `.env.example` với giá trị thật của bạn. Bắt buộc có:
   - `NODE_ENV` = `production`
   - `SITE_URL` = `https://ten-mien-cua-ban.com`
   - `AGENT_NAME`, `AGENT_PHONE`, `AGENT_PHONE_DISPLAY`, `AGENT_ZALO`, `AGENT_EMAIL`
   - Các biến của kênh nhận lead (Bước 6)
5. Chọn tên miền → **Deploy**. Đợi 1–3 phút rồi mở tên miền để kiểm tra.
6. Vào **SSL** → bật SSL miễn phí (thường tự bật) để web chạy `https://`.

Từ giờ, mỗi lần bạn `git push`, Hostinger sẽ tự deploy lại. Nếu không tự chạy, vào app → **Redeploy**.

> Không cần đặt `PORT`, Hostinger tự cấp cổng và website đã đọc `process.env.PORT`.

---

## Bước 6 — Cấu hình 3 kênh nhận khách hàng

Chỉ cần **ít nhất 1 kênh** là form chạy được. Nên bật cả 3 để không sót khách.

### 6.1 Email
**Cách A (email tên miền Hostinger, khuyên dùng):** hPanel → **Emails** → tạo hộp thư `lienhe@ten-mien-cua-ban.com`.
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=lienhe@ten-mien-cua-ban.com
SMTP_PASS=<mật khẩu hộp thư>
MAIL_TO=<email bạn muốn nhận khách>
```
**Cách B (Gmail):** bật xác minh 2 bước → myaccount.google.com/apppasswords → tạo "Mật khẩu ứng dụng" 16 ký tự.
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ban@gmail.com
SMTP_PASS=<mật khẩu ứng dụng 16 ký tự>
```

### 6.2 Google Sheet
1. Tạo Google Sheet mới → **Tiện ích mở rộng → Apps Script**.
2. Dán nội dung file `google-apps-script/Code.gs`, sửa dòng `SECRET` thành chuỗi bí mật của bạn.
3. **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**; *Thực thi dưới dạng: Tôi*; *Ai có quyền truy cập: Bất kỳ ai* → **Triển khai** → cấp quyền.
4. Copy URL kết thúc bằng `/exec`:
```
GOOGLE_SHEET_WEBHOOK=https://script.google.com/macros/s/.../exec
GOOGLE_SHEET_SECRET=<chuỗi bí mật giống trong Code.gs>
```

### 6.3 Telegram
1. Trên Telegram, chat với **@BotFather** → gõ `/newbot` → đặt tên → nhận **token**.
2. Nhắn một tin bất kỳ cho bot vừa tạo.
3. Mở trình duyệt: `https://api.telegram.org/bot<TOKEN>/getUpdates` → tìm `"chat":{"id": 123456789` → đó là **chat id**.
   (Muốn nhận vào nhóm: thêm bot vào nhóm, nhắn 1 tin trong nhóm, chat id của nhóm là số âm.)
```
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=123456789
```

Sau khi thêm biến, bấm **Redeploy**. Kiểm tra trạng thái: mở `https://ten-mien-cua-ban.com/healthz`, kênh nào đã cấu hình sẽ hiện `true`.

---

## Bước 7 — Đo lường quảng cáo (tùy chọn)

| Công cụ | Biến | Lấy ở đâu |
|---|---|---|
| Google Analytics 4 | `GA4_ID=G-XXXXXXX` | analytics.google.com → Quản trị → Luồng dữ liệu |
| Google Tag Manager | `GTM_ID=GTM-XXXXXXX` | tagmanager.google.com |
| Facebook Pixel | `FB_PIXEL_ID=1234567890` | business.facebook.com → Trình quản lý sự kiện |

Website tự gửi các sự kiện: `generate_lead` (gửi form thành công, tương ứng **Lead** trên Facebook), `call_click`, `zalo_click` (tương ứng **Contact**), `lead_form_open` và `map_open`. Bạn dùng các sự kiện này để tối ưu quảng cáo theo chuyển đổi.

Sau đó vào **Google Search Console**, thêm tên miền và gửi sitemap `https://ten-mien-cua-ban.com/sitemap.xml`.

---

## Chạy thử trên máy tính

```bash
npm install
```

```bash
npm run dev
```

Mở http://localhost:3000. Nếu chưa cấu hình kênh nào, lead sẽ được lưu vào `data/leads.jsonl` để bạn kiểm tra.

Kiểm tra cấu hình trước khi deploy:

```bash
npm run check
```

## Cập nhật nội dung về sau

1. Sửa `config/site.js` (nội dung) hoặc thay ảnh trong `public/images/` (giữ nguyên tên file).
2. Chạy:
```bash
git add . && git commit -m "Cap nhat noi dung" && git push
```
3. Hostinger tự deploy lại sau 1–2 phút.

## Xử lý sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| Trang báo 503 / không mở | hPanel → Node.js app → xem **Logs**; kiểm tra Start command là `npm start` |
| Form báo "Hệ thống đang bận" | Tất cả kênh đều lỗi: kiểm tra lại SMTP_PASS / token Telegram / URL Sheet trong Logs |
| Email không về | Xem thư mục Spam; với Gmail phải dùng Mật khẩu ứng dụng, không dùng mật khẩu đăng nhập |
| Sheet không ghi | Phải triển khai lại Apps Script (Tùy chọn triển khai mới) sau mỗi lần sửa code |
