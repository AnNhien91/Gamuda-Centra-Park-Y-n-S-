/**
 * ============================================================
 *  CẤU HÌNH NỘI DUNG WEBSITE — chỉnh sửa tại đây là đủ.
 *  Thông tin liên hệ có thể ghi đè bằng biến môi trường (.env)
 *  để không phải sửa code khi đổi số điện thoại / email.
 * ============================================================
 */
const env = process.env;

const site = {
  url: (env.SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  name: 'Gamuda Central Park Yên Sở',
  shortName: 'Central Park',
  title: 'Gamuda Central Park Yên Sở – Căn hộ view hồ trong công viên Yên Sở',
  description:
    'Chung cư Gamuda Central Park (Lô HH2, Gamuda City, Hoàng Mai): 3 tòa tháp 40 tầng, 2.605 căn hộ Studio – 4PN, mật độ xây dựng 20,5%, view hồ Yên Sở. Nhận bảng giá, mặt bằng và chính sách bán hàng mới nhất.',
  locale: 'vi_VN',
};

/** Chuyên viên tư vấn (môi giới cá nhân) — THAY BẰNG THÔNG TIN THẬT */
const agent = {
  name: env.AGENT_NAME || 'Nguyễn Đăng Nhiên',
  title: env.AGENT_TITLE || 'Chuyên viên tư vấn dự án Gamuda Central Park',
  phone: env.AGENT_PHONE || '0985227566', // số dùng cho nút gọi
  phoneDisplay: env.AGENT_PHONE_DISPLAY || '0985 227 566',
  zalo: env.AGENT_ZALO || env.AGENT_PHONE || '0985227566', // https://zalo.me/<số này>
  email: env.AGENT_EMAIL || 'annhien.manager@gmail.com',
  photo: env.AGENT_PHOTO || '/images/agent.webp', // ảnh vuông (avatar); để trống = dùng chữ cái đầu
  portrait: env.AGENT_PORTRAIT || '/images/agent-portrait.webp', // ảnh dọc 4:5 ở mục Liên hệ
  facebook: env.AGENT_FACEBOOK || '',
  workingHours: '8:00 – 21:00, tất cả các ngày trong tuần',
};

/** Mã theo dõi — để trống nếu chưa dùng */
const tracking = {
  ga4: env.GA4_ID || '', // G-XXXXXXX
  gtm: env.GTM_ID || '', // GTM-XXXXXXX
  fbPixel: env.FB_PIXEL_ID || '', // 15-16 chữ số
};

const project = {
  facts: [
    { label: 'Vị trí', value: 'Lô HH2, KĐT Gamuda City, Km1.5 Pháp Vân, P. Yên Sở, Hoàng Mai, Hà Nội' },
    { label: 'Chủ đầu tư', value: 'Gamuda Land (Malaysia)' },
    { label: 'Tổng thầu thi công', value: 'Phục Hưng Holdings' },
    { label: 'Quy mô', value: '3,65 ha · 3 tòa tháp 40 tầng · 2.605 căn hộ' },
    { label: 'Mật độ xây dựng', value: '20,5%' },
    { label: 'Chỗ đỗ xe', value: '1 chỗ / 1 căn hộ, đường dốc riêng từng tháp' },
    { label: 'Khởi công', value: 'Quý 1/2026' },
    { label: 'Mở bán chính thức', value: 'Tháng 12/2026 (dự kiến)' },
    { label: 'Bàn giao dự kiến', value: 'Quý 2/2029' },
  ],
  /** Phân khu chức năng theo tầng */
  zones: [
    {
      id: 'parking',
      level: 'Tầng hầm & Tầng 2 – 5',
      title: 'Đỗ xe & kỹ thuật',
      icon: 'car',
      items: ['1 chỗ đỗ xe / 1 căn hộ', 'Đường dốc riêng từng tháp', 'Khu kỹ thuật tập trung'],
      text: 'Thiết kế đủ 1 chỗ xe cho mỗi căn hộ. Các đường dốc lên xuống tách riêng cho từng tháp, đảm bảo giao thông không xung đột.',
    },
    {
      id: 'retail',
      level: 'Tầng 1',
      title: 'Sảnh & phố thương mại',
      icon: 'building',
      items: ['Sảnh căn hộ', 'Sảnh nhà trẻ', 'Trung tâm thương mại', 'Bán lẻ', 'F&B'],
      text: 'Tạo nên khu phố thương mại sầm uất ngay chân tòa nhà, đồng thời vẫn giữ sự tách biệt cho cư dân.',
    },
    {
      id: 'amenity',
      level: 'Tầng 5 – 6',
      title: 'Tầng tiện ích cộng đồng',
      icon: 'trees',
      items: ['Phòng sinh hoạt cộng đồng', 'Vườn cảnh quan', 'Bể bơi vô cực', 'Bể bơi trẻ em', 'Spa', 'BBQ', 'Sân chơi đa thế hệ', 'Đường dạo bộ'],
      text: 'Một “tầng tiện ích” trên cao liên kết cộng đồng cư dân, nơi mọi thế hệ cùng thư giãn, vận động và gặp gỡ.',
    },
  ],
  /** Các mốc chính hiển thị trên hero */
  milestones: [
    { label: 'Khởi công', value: 'Q1/2026' },
    { label: 'Mở bán chính thức', value: 'T12/2026' },
    { label: 'Bàn giao dự kiến', value: 'Q2/2029' },
    { label: 'Chiết khấu tới', value: '7%' },
  ],
  stats: [
    { value: 3.65, decimals: 2, suffix: ' ha', label: 'Diện tích khu đất' },
    { value: 40, suffix: ' tầng', label: '3 tòa tháp cao' },
    { value: 2605, suffix: '', label: 'Căn hộ', format: true },
    { value: 20.5, decimals: 1, suffix: '%', label: 'Mật độ xây dựng' },
  ],
  location: {
    address: 'Lô HH2, Gamuda City, Km1.5 đường Pháp Vân, P. Yên Sở, Q. Hoàng Mai, Hà Nội',
    mapQuery: 'Gamuda City, Yên Sở, Hoàng Mai, Hà Nội',
    distances: [
      { place: 'Công viên Yên Sở', time: 'Ngay sát vách', note: 'Lá phổi xanh phía Nam Thủ đô' },
      { place: 'Trường Quốc tế Singapore (SIS)', time: '~5 phút', note: 'Ngay trong Gamuda City' },
      { place: 'Nút giao Pháp Vân – Cầu Giẽ', time: 'Liền kề', note: 'Cửa ngõ phía Nam, đi các tỉnh' },
      { place: 'Đường Vành đai 3', time: 'Liền kề', note: 'Đi Nội Bài, Bắc Ninh, Hưng Yên' },
      { place: 'Bến xe Nước Ngầm', time: '1,5 – 2 km', note: 'Giao thông liên tỉnh' },
      { place: 'Hồ Hoàn Kiếm', time: '25 – 30 phút', note: 'Khoảng 9 – 10 km' },
    ],
  },
  towers: [
    {
      id: 'arden',
      code: 'Tòa A',
      name: 'Arden',
      units: 910,
      perFloor: 27,
      lifts: '12 thang máy + 1 thang hàng',
      image: 'lobby-arden',
      plan: 'floor-arden',
      floors: 'Mặt bằng tầng điển hình: 9–12, 14–32, 34–38',
      mix: [
        { type: 'Studio', area: '35 – 36,8 m²', count: '4 căn/sàn' },
        { type: '1 phòng ngủ', area: '40,22 – 42,12 m²', count: '3 căn/sàn' },
        { type: '2 phòng ngủ', area: '60,46 – 71,38 m²', count: '14 căn/sàn' },
        { type: '3 phòng ngủ', area: '89 – 97,35 m²', count: '6 căn/sàn' },
      ],
    },
    {
      id: 'brighton',
      code: 'Tòa B',
      name: 'Brighton',
      units: 980,
      perFloor: 29,
      lifts: '12 thang máy + 1 thang hàng',
      image: 'lobby-brighton',
      plan: 'floor-brighton',
      floors: 'Mặt bằng tầng điển hình: 9–12, 14–32, 34–38',
      mix: [
        { type: 'Studio', area: '36,22 m²', count: '2 căn/sàn' },
        { type: '1 phòng ngủ', area: '42,11 m²', count: '3 căn/sàn' },
        { type: '2 phòng ngủ', area: '60,46 – 71,38 m²', count: '18 căn/sàn' },
        { type: '3 phòng ngủ', area: '88 – 97,51 m²', count: '6 căn/sàn' },
      ],
    },
    {
      id: 'claremont',
      code: 'Tòa C',
      name: 'Claremont',
      units: 715,
      perFloor: 22,
      lifts: '12 thang máy + 1 thang hàng',
      image: 'lobby-claremont',
      plan: 'floor-claremont',
      floors: 'Mặt bằng tầng điển hình: 9–12, 14–32, 34–38',
      mix: [
        { type: '1 phòng ngủ', area: '48,9 m²', count: '2 căn/sàn' },
        { type: '2 phòng ngủ', area: '85,6 – 91,6 m²', count: '12 căn/sàn' },
        { type: '3 phòng ngủ', area: '112,97 – 116,85 m²', count: '6 căn/sàn' },
        { type: '4 phòng ngủ', area: '138,93 m²', count: '2 căn/sàn' },
      ],
    },
  ],
  units: [
    {
      id: 'studio', name: 'Studio', area: '35,8 – 39,3 m²', image: 'plan-studio', plan2d: 'plan2d-studio',
      rooms: ['1 phòng khách kết hợp ngủ', '1 bếp', '1 phòng tắm'],
      fit: 'Người trẻ độc thân, đầu tư cho thuê chuyên gia',
    },
    {
      id: '1pn', name: '1 Phòng ngủ', area: '41,9 – 45,2 m²', image: 'plan-1pn', plan2d: 'plan2d-1pn',
      rooms: ['1 phòng ngủ', '1 phòng khách', '1 phòng ăn & bếp', '1 phòng tắm'],
      fit: 'Vợ chồng trẻ, cho thuê dài hạn',
    },
    {
      id: '2pn-a', name: '2 Phòng ngủ A', area: '60,9 – 65,0 m²', image: 'plan-2pn-a', plan2d: 'plan2d-2pn',
      rooms: ['2 phòng ngủ', '2 phòng tắm', '1 phòng khách', '1 phòng ăn & bếp'],
      fit: 'Gia đình trẻ có 1 – 2 con',
    },
    {
      id: '2pn-b', name: '2 Phòng ngủ B', area: '71,6 – 73,6 m²', image: 'plan-2pn-b', plan2d: 'plan2d-2pn-b',
      rooms: ['2 phòng ngủ', '2 phòng tắm', '1 phòng khách rộng', '1 phòng ăn & bếp'],
      fit: 'Gia đình cần không gian sinh hoạt rộng',
    },
    {
      id: '3pn-a', name: '3 Phòng ngủ A', area: '97,0 – 99,5 m²', image: 'plan-3pn-a', plan2d: 'plan2d-3pn',
      rooms: ['3 phòng ngủ', '2 phòng tắm', '1 phòng khách', '1 phòng ăn & bếp'],
      fit: 'Gia đình đa thế hệ',
    },
    {
      id: '3pn-b', name: '3 Phòng ngủ B', area: '89,9 – 91,0 m²', image: 'plan-3pn-b', plan2d: 'plan2d-3pn',
      rooms: ['3 phòng ngủ', '2 phòng tắm', '1 phòng khách', '1 phòng ăn & bếp'],
      fit: 'Gia đình 3 thế hệ, tối ưu ngân sách',
    },
  ],
  premiumUnits: 'Duplex, Penthouse & Sky Villa từ 150 m²',
  amenityGroups: [
    {
      id: 'water', name: 'Khu bể bơi', color: 'water',
      items: ['Bể bơi vô cực', 'Bể bơi trong nhà', 'Jacuzzi', 'Khu tắm nắng'],
    },
    {
      id: 'green', name: 'Không gian xanh', color: 'green',
      items: ['Cabana', 'Vườn đọc sách', 'Thể thao dưới nước', 'Vườn dưỡng sinh', 'Vườn sinh thái', 'Đường đi bộ', 'Đường chạy bộ', 'Con đường văn cảnh', 'Bồn cỏ', 'Khu cafe ngoài trời', 'Quầy dịch vụ', 'Khu để đồ', 'Sân khiêu vũ'],
    },
    {
      id: 'play', name: 'Sân chơi & thể thao', color: 'play',
      items: ['Sân tập thể thao', 'Quảng trường sự kiện', 'Quán cafe ngắm cảnh', 'Sân chơi trẻ em', 'Đài vọng cảnh', 'Biển tên dự án', 'Sân khấu biểu diễn', 'Vườn sắc màu', 'Đồi nhân tạo', 'Bãi tập kết rác', 'Khu vườn tĩnh', 'Giàn hoa điểm nhấn', 'Sân thể thao', 'Đồi picnic'],
    },
    {
      id: 'other', name: 'Tiện ích khác', color: 'other',
      items: ['Hành lang cây xanh', 'Đảo cọ', 'Sân trượt Patin', 'Giàn hoa lối xuống hầm', 'Sân chơi trẻ em', 'Bãi đỗ xe', 'Khoảng lùi', 'Vườn thảo dược', 'Khu vọng cảnh'],
    },
  ],
  amenityHighlights: [
    { title: 'Bể bơi vô cực', text: 'Làn nước xanh trải dài giữa vườn nhiệt đới, hướng thẳng ra hồ.', image: 'pool-main' },
    { title: 'Bể bơi trên cao', text: 'Bể bơi mái kính với tầm nhìn panorama toàn khu đô thị.', image: 'pool-rooftop' },
    { title: 'Vườn sinh thái', text: 'Đồi cỏ, sân chơi và đường dạo bộ phủ bóng cây ngay chân tháp.', image: 'garden' },
    { title: 'Sảnh đón kiểu khách sạn', text: 'Sảnh ốp đá, trần vòm và thư viện mở chào đón cư dân mỗi ngày.', image: 'lobby' },
  ],
  /** Chính sách bán hàng DỰ KIẾN — cập nhật khi có chính sách chính thức */
  paymentPlans: [
    {
      id: 'standard', name: 'Thanh toán tiêu chuẩn', en: 'Standard Payment', discount: '3%',
      summary: 'Ký HĐMB 10% · 2027 – Q2/2028 chỉ 5%/quý · 25% khi nhận nhà Q2/2029',
      steps: [
        { date: '12/2026', pct: 10, label: 'Ký HĐMB' },
        { date: '03/2027', pct: 5 }, { date: '06/2027', pct: 5 },
        { date: '09/2027', pct: 5 }, { date: '12/2027', pct: 5 },
        { date: '03/2028', pct: 5 }, { date: '06/2028', pct: 5 },
        { date: '09/2028', pct: 15 }, { date: '12/2028', pct: 15 },
        { date: 'Q2/2029', pct: 25, label: 'Bàn giao' },
        { date: 'Q3/2029', pct: 5, label: 'Sổ hồng' },
      ],
    },
    {
      id: 'low', name: 'Thanh toán tối ưu', en: 'Low-down Payment', discount: '1%',
      summary: 'Trước bàn giao chỉ thanh toán 45%, mỗi đợt cách nhau 6 tháng',
      steps: [
        { date: '12/2026', pct: 10, label: 'Ký HĐMB' },
        { date: '06/2027', pct: 5 }, { date: '12/2027', pct: 5 },
        { date: '06/2028', pct: 5 }, { date: '12/2028', pct: 20 },
        { date: 'Q2/2029', pct: 50, label: 'Bàn giao' },
        { date: 'Q3/2029', pct: 5, label: 'Sổ hồng' },
      ],
    },
    {
      id: 'fast', name: 'Thanh toán nhanh', en: 'Fast Payment', discount: '7%',
      summary: 'Thanh toán 70% trong 6 tháng đầu, nhận chiết khấu cao nhất 7%',
      steps: [
        { date: '12/2026', pct: 30, label: 'Ký HĐMB' },
        { date: '03/2027', pct: 20 }, { date: '06/2027', pct: 20 },
        { date: 'Q2/2029', pct: 25, label: 'Bàn giao' },
        { date: 'Q3/2029', pct: 5, label: 'Sổ hồng' },
      ],
    },
    {
      id: 'loan', name: 'Hỗ trợ lãi suất', en: 'Interest Subsidy', discount: '70%',
      discountLabel: 'Vay tới',
      summary: 'Ngân hàng giải ngân tới 70% GTCH, CĐT hỗ trợ lãi suất 24 tháng (tối đa 8%/năm)',
      steps: [
        { date: '12/2026', pct: 10, own: 10, label: 'Ký HĐMB' },
        { date: '06/2027', pct: 10, bank: 10 }, { date: '12/2027', pct: 10, bank: 10 },
        { date: '06/2028', pct: 10, bank: 10 }, { date: '12/2028', pct: 30, own: 5, bank: 25 },
        { date: 'Q2/2029', pct: 25, own: 15, bank: 10, label: 'Bàn giao' },
        { date: 'Q3/2029', pct: 5, bank: 5, label: 'Sổ hồng' },
      ],
    },
  ],
  timeline: [
    { date: 'Q1/2026', title: 'Khởi công', text: 'Chính thức khởi công xây dựng dự án.', done: true },
    { date: 'T12/2026', title: 'Mở bán chính thức', text: 'Dự kiến mở bán và ký hợp đồng mua bán.' },
    { date: 'Q2/2029', title: 'Bàn giao', text: 'Dự kiến bàn giao căn hộ cho cư dân.' },
    { date: 'Q3/2029', title: 'Sổ hồng', text: 'Dự kiến cấp giấy chứng nhận sau bàn giao.' },
  ],
  gallery: [
    { src: 'aerial-towers', cat: 'phoi-canh', caption: 'Toàn cảnh 3 tòa tháp bên hồ' },
    { src: 'tower-sunset', cat: 'phoi-canh', caption: 'Hoàng hôn trên hồ Yên Sở' },
    { src: 'pool-main', cat: 'tien-ich', caption: 'Bể bơi vô cực nội khu' },
    { src: 'lobby', cat: 'noi-that', caption: 'Sảnh đón Central Park' },
    { src: 'aerial-clouds', cat: 'phoi-canh', caption: 'Dự án giữa quần thể hồ và công viên' },
    { src: 'garden', cat: 'tien-ich', caption: 'Vườn sinh thái và sân chơi' },
    { src: 'upshot-dusk', cat: 'phoi-canh', caption: 'Mặt đứng khối đế phủ xanh' },
    { src: 'pool-rooftop', cat: 'tien-ich', caption: 'Bể bơi mái kính trên cao' },
    { src: 'lobby-claremont', cat: 'noi-that', caption: 'Sảnh tòa Claremont' },
    { src: 'podium-night', cat: 'phoi-canh', caption: 'Khối đế thương mại về đêm' },
    { src: 'pool-aerial', cat: 'tien-ich', caption: 'Bể bơi trung tâm nhìn từ trên cao' },
    { src: 'lakeside-dusk', cat: 'phoi-canh', caption: 'Dự án nhìn từ mặt hồ' },
    { src: 'lobby-arden', cat: 'noi-that', caption: 'Sảnh tòa Arden' },
    { src: 'street', cat: 'phoi-canh', caption: 'Phố thương mại chân đế' },
    { src: 'pool-infinity', cat: 'tien-ich', caption: 'Bể bơi giữa vườn nhiệt đới' },
    { src: 'lobby-brighton', cat: 'noi-that', caption: 'Sảnh tòa Brighton' },
  ],
  faqs: [
    {
      q: 'Gamuda Central Park nằm ở đâu?',
      a: 'Dự án tại Lô HH2, khu đô thị Gamuda City, Km1.5 đường Pháp Vân, phường Yên Sở, quận Hoàng Mai, Hà Nội — nằm trong quần thể công viên Yên Sở, sát nút giao Pháp Vân – Cầu Giẽ và Vành đai 3.',
    },
    {
      q: 'Chủ đầu tư và đơn vị thi công là ai?',
      a: 'Chủ đầu tư là Gamuda Land (Malaysia), tổng thầu thi công là Phục Hưng Holdings.',
    },
    {
      q: 'Dự án có những loại căn hộ nào?',
      a: 'Studio 34–36 m², 1PN 40–42 m², 2PN 60–72,8 m², 3PN 87–99 m² và các dòng sản phẩm đặc biệt Duplex, Penthouse, Sky Villa từ 150 m². Riêng tòa Claremont có căn 2PN 85–91 m², 3PN 113–117 m² và 4PN 138,93 m².',
    },
    {
      q: 'Khi nào dự án bàn giao?',
      a: 'Dự án khởi công Quý 1/2026, dự kiến mở bán chính thức tháng 12/2026 và bàn giao căn hộ Quý 2/2029. Sổ hồng dự kiến cấp sau bàn giao (theo chính sách dự kiến).',
    },
    {
      q: 'Dự án có đủ chỗ đỗ xe không?',
      a: 'Tầng hầm và tầng 2–5 dành cho đỗ xe và kỹ thuật, thiết kế đủ 1 chỗ xe cho mỗi căn hộ. Đường dốc lên xuống tách riêng cho từng tháp nên giao thông không xung đột.',
    },
    {
      q: 'Có hỗ trợ vay ngân hàng không?',
      a: 'Theo chính sách dự kiến, ngân hàng hỗ trợ giải ngân tới 70% giá trị căn hộ, chủ đầu tư hỗ trợ lãi suất trong 24 tháng (tối đa 8%/năm). Chính sách chính thức sẽ được cập nhật khi mở bán.',
    },
    {
      q: 'Làm sao để nhận bảng giá và chọn căn đẹp?',
      a: 'Bạn để lại thông tin trong form "Nhận bảng giá" hoặc gọi/nhắn Zalo trực tiếp. Chuyên viên sẽ gửi bảng giá, mặt bằng chi tiết và tư vấn căn phù hợp trong vòng 15 phút trong giờ làm việc.',
    },
  ],
  disclaimer:
    'Website do chuyên viên tư vấn độc lập vận hành nhằm cung cấp thông tin tham khảo, không phải website chính thức của Chủ đầu tư Gamuda Land. Thông tin, hình ảnh, diện tích và chính sách mang tính tham khảo, có thể thay đổi theo quyết định của Chủ đầu tư tại từng thời điểm. Các cam kết chính thức được quy định cụ thể tại Hợp đồng mua bán.',
};

module.exports = { site, agent, tracking, project };
