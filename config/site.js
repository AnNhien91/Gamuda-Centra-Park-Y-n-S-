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
    { label: 'Ký HĐMB', value: 'Quý 1/2027 (dự kiến)' },
    { label: 'Bàn giao dự kiến', value: 'Quý 4/2029' },
    { label: 'Giá bán đợt 1', value: 'Chỉ từ 92 triệu/m² (sau chiết khấu, đã gồm VAT, chưa gồm KPBT)' },
  ],
  /** Giá & ưu đãi đợt 1 */
  price: {
    from: 92,
    unit: 'triệu/m²',
    note: 'Đơn giá sau chiết khấu, áp dụng thanh toán tiêu chuẩn, đã bao gồm VAT, chưa bao gồm kinh phí bảo trì (KPBT).',
  },
  offers: [
    { value: '1%', label: 'Chiết khấu', sub: 'Ưu đãi đặt chỗ sớm' },
    { value: '24 tháng', label: 'Miễn phí QLVH', sub: 'Phí quản lý vận hành' },
    { value: '92 tr/m²', label: 'Giá chỉ từ', sub: 'Thanh toán tiêu chuẩn' },
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
    { label: 'Giá chỉ từ', value: '92 tr/m²' },
    { label: 'Mở bán chính thức', value: 'T12/2026' },
    { label: 'Ký HĐMB dự kiến', value: 'Q1/2027' },
    { label: 'Bàn giao dự kiến', value: 'Q4/2029' },
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
      { place: 'Trung tâm thương mại', time: 'Liền kề', note: 'Quỹ đất thương mại sát dự án (theo quy hoạch)' },
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
      plan: 'floor-brighton-8-12',
      plans: [
        { img: 'floor-brighton-8-12', caption: 'Tòa B Brighton – Mặt bằng tầng điển hình tầng 8–12' },
        { img: 'floor-brighton-15-40', caption: 'Tòa B Brighton – Mặt bằng tầng điển hình tầng 15–31 & 35–40' },
      ],
      floors: 'Mặt bằng mới: tầng 8–12 và 15–31, 35–40 · diện tích thông thủy',
      mix: [
        { type: 'Studio', area: '36,2 – 38,6 m²', count: '2 căn/sàn' },
        { type: '1 phòng ngủ', area: '42,4 m²', count: '3 căn/sàn' },
        { type: '2 phòng ngủ', area: '60,9 – 72,3 m²', count: '18 căn/sàn' },
        { type: '3 phòng ngủ', area: '87,9 – 97,4 m²', count: '6 căn/sàn' },
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
    { title: 'Vườn trên cao', text: 'Tầng tiện ích phủ xanh với sân chơi, lối dạo và khu thư giãn giữa các tòa tháp.', image: 'sky-garden' },
    { title: 'Khu lửa trại đêm', text: 'Góc quây quần ấm cúng bên lửa trại cho những buổi tối cùng gia đình, bạn bè.', image: 'firepit' },
    { title: 'Sảnh đón kiểu khách sạn', text: 'Sảnh ốp đá, trần vòm và thư viện mở chào đón cư dân mỗi ngày.', image: 'lobby' },
    { title: 'Không gian làm việc', text: 'Khoang làm việc riêng tư hai tầng, lý tưởng cho họp trực tuyến và tập trung.', image: 'cowork' },
    { title: 'Thư viện cộng đồng', text: 'Phòng đọc ấm áp với giá sách cao kịch trần và sofa tròn trung tâm.', image: 'library' },
    { title: 'Sân bóng rổ', text: 'Sân thể thao ngoài trời giữa hàng cây, cho cư dân vận động mỗi ngày.', image: 'basketball' },
    { title: 'Sân chơi đa thế hệ', text: 'Không gian vui chơi cho trẻ nhỏ, đường dạo cho ông bà ngay trong vườn.', image: 'playground' },
  ],
  /** Chính sách bán hàng ĐỢT 1 (dự kiến) — nguồn: tài liệu chính sách bán hàng Gamuda Central Park */
  paymentPlans: [
    {
      id: 'standard', name: 'Tiến độ chuẩn', en: 'Standard', badgeLabel: 'Trước bàn giao', badge: '50%',
      summary: 'Ký HĐMB 10% · 5 đợt đầu chỉ 2%/đợt · 6 đợt tiếp 5%/đợt · 45% khi nhận nhà',
      steps: [
        { name: 'Ký HĐMB', time: 'Q1/2027', pct: 10, key: true },
        { name: 'Đợt 1 – 5', time: '+3 → +15 tháng', pct: 10, note: '2%/đợt · 3 tháng/đợt' },
        { name: 'Đợt 6 – 11', time: '+18 → +33 tháng', pct: 30, note: '5%/đợt · 3 tháng/đợt' },
        { name: 'Bàn giao', time: 'Q4/2029', pct: 45, key: true },
        { name: 'Cấp sổ', time: 'Sau bàn giao', pct: 5, key: true },
      ],
    },
    {
      id: 'relax', name: 'Tiến độ thảnh thơi', en: 'Easy', badgeLabel: 'Giãn', badge: '6 tháng/đợt',
      summary: '4 đợt đầu giãn 6 tháng/đợt, chỉ 3 – 5% mỗi đợt · 45% khi nhận nhà',
      steps: [
        { name: 'Ký HĐMB', time: 'Q1/2027', pct: 10, key: true },
        { name: 'Đợt 1', time: '+6 tháng', pct: 3 },
        { name: 'Đợt 2', time: '+12 tháng', pct: 3 },
        { name: 'Đợt 3', time: '+18 tháng', pct: 5 },
        { name: 'Đợt 4', time: '+24 tháng', pct: 5 },
        { name: 'Đợt 5', time: '+27 tháng', pct: 12 },
        { name: 'Đợt 6', time: '+30 tháng', pct: 12 },
        { name: 'Bàn giao', time: 'Q4/2029', pct: 45, key: true },
        { name: 'Cấp sổ', time: 'Sau bàn giao', pct: 5, key: true },
      ],
    },
    {
      id: 'fast', name: 'Tiến độ nhanh', en: 'Fast', badgeLabel: 'Trong 2 tháng', badge: '50%',
      summary: 'Thanh toán 50% trong 2 tháng đầu, sau đó không phát sinh đợt nào đến khi nhận nhà',
      steps: [
        { name: 'Ký HĐMB', time: 'Q1/2027', pct: 30, key: true },
        { name: 'Đợt 1', time: '+2 tháng', pct: 20 },
        { name: 'Bàn giao', time: 'Q4/2029', pct: 45, key: true },
        { name: 'Cấp sổ', time: 'Sau bàn giao', pct: 5, key: true },
      ],
    },
    {
      id: 'loan', name: 'Hỗ trợ lãi suất', en: 'Interest Support', badgeLabel: 'NH giải ngân', badge: '70%',
      summary: 'Khách chỉ cần 30% vốn tự có · ngân hàng giải ngân 70% từ đợt 1 đến bàn giao',
      steps: [
        { name: 'Ký HĐMB', time: 'Q1/2027', pct: 10, own: 10, key: true },
        { name: 'Đợt 1', time: '+6 tháng', pct: 10, bank: 10 },
        { name: 'Đợt 2', time: '+9 tháng', pct: 5, bank: 5 },
        { name: 'Đợt 3', time: '+12 tháng', pct: 5, bank: 5 },
        { name: 'Đợt 4', time: '+15 tháng', pct: 10, bank: 10 },
        { name: 'Đợt 5', time: '+18 tháng', pct: 5, bank: 5 },
        { name: 'Đợt 6', time: '+21 tháng', pct: 5, bank: 5 },
        { name: 'Bàn giao', time: 'Q4/2029', pct: 45, own: 15, bank: 30, key: true },
        { name: 'Cấp sổ', time: 'Sau bàn giao', pct: 5, own: 5, key: true },
      ],
    },
    {
      id: 'special', name: 'Tiến độ đặc biệt', en: 'Monthly', badgeLabel: 'Chỉ', badge: '1%/tháng',
      summary: 'Ký HĐMB 10% · sau đó chỉ 1% mỗi tháng trong 35 tháng · 50% khi nhận nhà',
      steps: [
        { name: 'Ký HĐMB', time: 'Q1/2027', pct: 10, key: true },
        { name: 'Đợt 1 – 35', time: '+1 → +35 tháng', pct: 35, note: '1%/đợt · mỗi tháng 1 đợt' },
        { name: 'Bàn giao', time: 'Q4/2029', pct: 50, key: true },
        { name: 'Cấp sổ', time: 'Sau bàn giao', pct: 5, key: true },
      ],
    },
  ],
  timeline: [
    { date: 'Q1/2026', title: 'Khởi công', text: 'Chính thức khởi công xây dựng dự án.', done: true },
    { date: 'T12/2026', title: 'Mở bán chính thức', text: 'Dự kiến mở bán, nhận đặt chỗ đợt 1.' },
    { date: 'Q1/2027', title: 'Ký HĐMB', text: 'Dự kiến ký hợp đồng mua bán.' },
    { date: 'Q4/2029', title: 'Bàn giao', text: 'Dự kiến bàn giao căn hộ cho cư dân.' },
  ],
  gallery: [
    { src: 'aerial-towers', cat: 'phoi-canh', caption: 'Toàn cảnh 3 tòa tháp bên hồ' },
    { src: 'sky-garden', cat: 'tien-ich', caption: 'Vườn trên cao tầng tiện ích' },
    { src: 'pool-main', cat: 'tien-ich', caption: 'Bể bơi vô cực nội khu' },
    { src: 'lobby', cat: 'noi-that', caption: 'Sảnh đón Central Park' },
    { src: 'tower-sunset', cat: 'phoi-canh', caption: 'Hoàng hôn trên hồ Yên Sở' },
    { src: 'firepit', cat: 'tien-ich', caption: 'Khu lửa trại ngoài trời' },
    { src: 'interior-living', cat: 'noi-that', caption: 'Phòng khách căn hộ (minh họa)' },
    { src: 'retail-street', cat: 'phoi-canh', caption: 'Phố thương mại chân đế' },
    { src: 'cowork', cat: 'noi-that', caption: 'Khoang làm việc chung' },
    { src: 'garden', cat: 'tien-ich', caption: 'Vườn sinh thái và sân chơi' },
    { src: 'aerial-clouds', cat: 'phoi-canh', caption: 'Dự án giữa quần thể hồ và công viên' },
    { src: 'library', cat: 'noi-that', caption: 'Thư viện cộng đồng' },
    { src: 'pavilion', cat: 'tien-ich', caption: 'Chòi nghỉ giữa vườn' },
    { src: 'upshot-dusk', cat: 'phoi-canh', caption: 'Mặt đứng khối đế phủ xanh' },
    { src: 'basketball', cat: 'tien-ich', caption: 'Sân bóng rổ ngoài trời' },
    { src: 'lobby-claremont', cat: 'noi-that', caption: 'Sảnh tòa Claremont' },
    { src: 'pool-rooftop', cat: 'tien-ich', caption: 'Bể bơi mái kính trên cao' },
    { src: 'lakeside-dusk', cat: 'phoi-canh', caption: 'Dự án nhìn từ mặt hồ' },
    { src: 'playground', cat: 'tien-ich', caption: 'Sân chơi đa thế hệ' },
    { src: 'lobby-arden', cat: 'noi-that', caption: 'Sảnh tòa Arden' },
    { src: 'podium-night', cat: 'phoi-canh', caption: 'Khối đế thương mại về đêm' },
    { src: 'pool-aerial', cat: 'tien-ich', caption: 'Bể bơi trung tâm nhìn từ trên cao' },
    { src: 'lobby-brighton', cat: 'noi-that', caption: 'Sảnh tòa Brighton' },
    { src: 'street', cat: 'phoi-canh', caption: 'Lối vào sảnh căn hộ' },
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
      a: 'Dự án khởi công Quý 1/2026, dự kiến mở bán chính thức tháng 12/2026 và ký hợp đồng mua bán Quý 1/2027 và bàn giao căn hộ Quý 4/2029 (theo chính sách bán hàng đợt 1).',
    },
    {
      q: 'Dự án có đủ chỗ đỗ xe không?',
      a: 'Tầng hầm và tầng 2–5 dành cho đỗ xe và kỹ thuật, thiết kế đủ 1 chỗ xe cho mỗi căn hộ. Đường dốc lên xuống tách riêng cho từng tháp nên giao thông không xung đột.',
    },
    {
      q: 'Có hỗ trợ vay ngân hàng không?',
      a: 'Có. Với phương án Hỗ trợ lãi suất, khách chỉ cần thanh toán 30% (ký HĐMB 10%, bàn giao 15%, cấp sổ 5%), ngân hàng giải ngân 70% từ đợt 1 đến khi bàn giao. Điều kiện vay và mức hỗ trợ cụ thể theo chính sách của chủ đầu tư và ngân hàng tại thời điểm ký.',
    },
    {
      q: 'Giá bán đợt 1 là bao nhiêu?',
      a: 'Giá chỉ từ 92 triệu/m² — đơn giá sau chiết khấu, áp dụng thanh toán tiêu chuẩn, đã bao gồm VAT, chưa bao gồm kinh phí bảo trì. Đợt 1 có thêm chiết khấu 1% ưu đãi đặt chỗ sớm và miễn phí phí quản lý vận hành 24 tháng.',
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
