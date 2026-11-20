# Gamuda Central Park Yên Sở — Website dự án

Landing page cao cấp cho dự án chung cư **Gamuda Central Park** (Lô HH2, Gamuda City, Hoàng Mai, Hà Nội), do chuyên viên tư vấn độc lập vận hành.

**Công nghệ:** Node.js 18+ · Express · EJS · CSS/JS thuần (không cần build) · Nodemailer
**Deploy:** Hostinger Node.js Apps (Business / Cloud) kết nối GitHub

👉 **Hướng dẫn từng bước:** [HUONG-DAN-DEPLOY.md](HUONG-DAN-DEPLOY.md)

## Tính năng

- Hero trình chiếu ảnh toàn màn hình, số liệu đếm động, hiệu ứng xuất hiện khi cuộn (tôn trọng `prefers-reduced-motion`)
- 9 phần: Tổng quan · Vị trí (Google Maps tải khi bấm) · 40 tiện ích kèm bản đồ · 3 tòa tháp (tab) · 6 loại căn hộ (3D/2D) · 4 chính sách thanh toán · Thư viện ảnh có lọc · Liên hệ · Hỏi đáp
- **Máy tính dòng tiền**: nhập giá căn, xem số tiền từng đợt theo từng phương án
- **Form nhận báo giá** (popup + cuối trang): kiểm tra dữ liệu 2 phía, honeypot, chặn gửi quá nhanh, giới hạn 8 lần/15 phút/IP
- Lead gửi song song về **Email + Google Sheet + Telegram**, kèm bản sao `data/leads.jsonl`
- Nút Zalo và nút gọi luôn hiển thị (desktop), thanh liên hệ dưới đáy (mobile)
- GA4 / GTM / Facebook Pixel bật bằng biến môi trường, tự gửi sự kiện chuyển đổi
- SEO: meta + Open Graph, JSON-LD (ApartmentComplex, RealEstateAgent, FAQPage), `sitemap.xml`, `robots.txt`
- Bảo mật: Helmet (CSP), giới hạn tần suất gửi, chống chèn công thức vào Google Sheet
- Trang chính sách bảo mật (theo Nghị định 13/2023), trang cảm ơn, trang 404

## Cấu trúc

```
server.js               Express server, các route, API /api/lead
config/site.js          ★ Toàn bộ nội dung & thông tin dự án (sửa tại đây)
src/leads.js            Kiểm tra dữ liệu + gửi Email / Sheet / Telegram
src/icons.js            Bộ icon SVG
views/                  Giao diện EJS (index, privacy, thanks, 404, partials)
public/css/style.css    Hệ thống thiết kế (xanh rừng + vàng champagne)
public/js/main.js       Tương tác: slider, tabs, lightbox, form, máy tính
public/images/          Ảnh WebP đã tối ưu
google-apps-script/     Script nhận lead cho Google Sheet
.env.example            Danh sách biến môi trường
```

## Chạy trên máy

```bash
npm install
cp .env.example .env   # rồi điền thông tin
npm run dev            # http://localhost:3000
npm run check          # kiểm tra cấu hình trước khi deploy
```

## Lưu ý pháp lý

Website ghi rõ là trang của chuyên viên tư vấn độc lập, **không phải website chính thức của Gamuda Land**. Hình ảnh phối cảnh và mặt bằng lấy từ tài liệu bán hàng của dự án; chính sách bán hàng đang là bản **dự kiến**, cần cập nhật khi Chủ đầu tư công bố chính thức.
