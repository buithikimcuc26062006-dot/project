export interface Product {
  id: string;
  name: string;
  category: string;
  slug: string;
  price: number;
  price_min: number;
  price_max: number;
  price_display: string;
  currency: string;
  discount_percent: number;
  main_image: string;
  gallery_images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'SP001',
    name: 'Bình Sữa Pigeon – An Toàn, Núm Ti Giống Ti Mẹ, Bé Dễ Ti',
    category: 'ĂN DẶM',
    slug: 'binh-sua-pigeon-an-toan-giong-num-ti-me-be-de-ti',
    price: 189000,
    price_min: 189000,
    price_max: 376000,
    price_display: '189.000 Đ-376.000 Đ',
    currency: 'VND',
    discount_percent: 0,
    main_image: 'https://i.ibb.co/3ymYX195/n-i-n-u-ch-m-0-8l-15.png',
    gallery_images: [
      'https://i.ibb.co/3ymYX195/n-i-n-u-ch-m-0-8l-15.png',
      'https://i.ibb.co/2HCK9J6/n-i-n-u-ch-m-0-8l-16.png',
      'https://i.ibb.co/3mGm5KpF/n-i-n-u-ch-m-0-8l-17.png',
      'https://i.ibb.co/Kjn5bpjd/n-i-n-u-ch-m-0-8l-18.png',
    ],
    description:
      'Bình sữa Pigeon là thương hiệu nổi tiếng đến từ Nhật Bản, được hàng triệu bà mẹ tin dùng. Núm ti silicone mềm mại, hệ thống van khí chống sặc, chống đầy hơi.',
    sizes: ['50ML', '120ML', '160ML', '240ML'],
    colors: ['Natural'],
    stock: 100,
    featured: false,
  },
  {
    id: 'SP002',
    name: 'Nhiệt Kế Hồng Ngoại Đo Trán Cho Bé & Gia Đình',
    category: 'SỨC KHỎE',
    slug: 'nhiet-ke-hong-ngoai-do-tran-cho-be-gia-dinh',
    price: 279000,
    price_min: 279000,
    price_max: 279000,
    price_display: '279.000 Đ',
    currency: 'VND',
    discount_percent: 10,
    main_image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    gallery_images: ['https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png'],
    description:
      'Đo không chạm – an toàn. Thời gian đo siêu nhanh: ~1 giây. Phạm vi đo: 32°C – 43°C. Độ chính xác: ±0.2°C.',
    sizes: ['One Size'],
    colors: ['Natural'],
    stock: 100,
    featured: false,
  },
  {
    id: 'SP003',
    name: 'Vòng Tay Dâu Tằm Cho Bé – Phụ Kiện Bình An',
    category: 'SỨC KHỎE',
    slug: 'vong-tay-dau-tam-cho-be',
    price: 30000,
    price_min: 30000,
    price_max: 30000,
    price_display: '30.000 Đ',
    currency: 'VND',
    discount_percent: 0,
    main_image: 'https://i.ibb.co/274ndCPk/n-i-n-u-ch-m-0-8l-19.png',
    gallery_images: [
      'https://i.ibb.co/274ndCPk/n-i-n-u-ch-m-0-8l-19.png',
      'https://i.ibb.co/zW956KzJ/n-i-n-u-ch-m-0-8l-20.png',
    ],
    description:
      'Gỗ dâu tằm tự nhiên, mùi thơm nhẹ. Hạt được mài nhẵn an toàn cho da bé. Dây chun co giãn tốt, dễ đeo.',
    sizes: ['TRÒN TRƠN', 'BẦU DỤC TRƠN'],
    colors: ['Natural'],
    stock: 100,
    featured: false,
  },
  {
    id: 'SP004',
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L – Hầm Cháo Nhừ Ngon',
    category: 'ĂN DẶM',
    slug: 'noi-nau-chao-cham-bear-08l',
    price: 980000,
    price_min: 980000,
    price_max: 980000,
    price_display: '980.000 Đ',
    currency: 'VND',
    discount_percent: 15,
    main_image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    gallery_images: [
      'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
      'https://i.ibb.co/qY6LhMhQ/n-i-n-u-ch-m-0-8l-13.png',
      'https://i.ibb.co/cKwMW2xz/n-i-n-u-ch-m-0-8l-2.png',
    ],
    description:
      'Nấu cháo chậm – cháo nhừ mịn. Lòng nồi sứ cao cấp. Dung tích 0.8L lý tưởng cho bé ăn dặm. Hẹn giờ tiện lợi.',
    sizes: ['One Size'],
    colors: ['HỒNG', 'XANH', 'VÀNG'],
    stock: 100,
    featured: false,
  },
  {
    id: 'SP005',
    name: 'Chậu Tắm Ếch Cao Cấp Cho Bé Có Van Thoát Nước Việt Nhật',
    category: 'KHÁC',
    slug: 'chau-tam-ech-cao-cap-cho-be',
    price: 118000,
    price_min: 118000,
    price_max: 118000,
    price_display: '118.000 Đ',
    currency: 'VND',
    discount_percent: 0,
    main_image: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
    gallery_images: ['https://i.ibb.co/9H1p5zyX/11-2203.jpg'],
    description:
      'Nhựa PP cao cấp, không chứa BPA. Thiết kế hình ếch ngộ nghĩnh. Có lỗ thoát nước và van kiểm soát. Bề mặt chống trơn trượt.',
    sizes: ['One Size'],
    colors: ['Natural'],
    stock: 100,
    featured: false,
  },
  {
    id: 'SP006',
    name: 'Xe Chòi 4 Chân Thú Cừu Cho Bé – Dễ Thương, Êm Ái',
    category: 'ĐỒ CHƠI',
    slug: 'xe-choi-4-chan-thu-cuu-cho-be',
    price: 678000,
    price_min: 678000,
    price_max: 678000,
    price_display: '678.000 Đ',
    currency: 'VND',
    discount_percent: 25,
    main_image: 'https://i.ibb.co/t50QHBv/n-i-n-u-ch-m-0-8l.png',
    gallery_images: [
      'https://i.ibb.co/t50QHBv/n-i-n-u-ch-m-0-8l.png',
      'https://i.ibb.co/WW4Lb0MK/n-i-n-u-ch-m-0-8l-12.png',
      'https://i.ibb.co/7xSMM47z/n-i-n-u-ch-m-0-8l-11.png',
      'https://i.ibb.co/HLkN0qxD/n-i-n-u-ch-m-0-8l-10.png',
    ],
    description:
      'Thiết kế thú cừu siêu dễ thương. Ghế ngồi bọc nệm êm ái. 4 bánh xe vững chắc. Phù hợp bé từ 12 tháng trở lên.',
    sizes: ['One Size'],
    colors: ['HỒNG', 'XANH LÁ', 'XANH DƯƠNG', 'NÂU'],
    stock: 100,
    featured: false,
  },
  {
    id: 'SP007',
    name: 'Ghế Hơi Tập Ngồi Bar-rot Cho Bé – Bơm Tự Động',
    category: 'KHÁC',
    slug: 'ghe-hoi-tap-ngoi-bar-rot',
    price: 118000,
    price_min: 118000,
    price_max: 118000,
    price_display: '118.000 Đ',
    currency: 'VND',
    discount_percent: 0,
    main_image: 'https://i.ibb.co/9HJvtK2y/n-i-n-u-ch-m-0-8l-9.png',
    gallery_images: ['https://i.ibb.co/9HJvtK2y/n-i-n-u-ch-m-0-8l-9.png'],
    description:
      'Hỗ trợ bé tập ngồi đúng tư thế. Giúp tăng cường cơ lưng. Kích thước: 48x57x35cm. Gọn nhẹ, dễ bảo quản.',
    sizes: ['One Size'],
    colors: ['Natural'],
    stock: 100,
    featured: false,
  },
];

export const FLASH_SALE_PRODUCTS = [
  {
    id: 'SP006',
    name: 'Xe Chòi 4 Chân Thú Cừu Cho Bé',
    price: '678.000 Đ',
    discount: 25,
    sold: 65,
    image: 'https://i.ibb.co/t50QHBv/n-i-n-u-ch-m-0-8l.png',
    label: 'Đang bán chạy',
  },
  {
    id: 'SP004',
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L',
    price: '833.000 Đ',
    discount: 15,
    sold: 40,
    image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    label: 'Đang bán chạy',
  },
  {
    id: 'SP002',
    name: 'Nhiệt Kế Hồng Ngoại Đo Trán',
    price: '251.000 Đ',
    discount: 10,
    sold: 85,
    image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    label: 'Sắp hết hàng',
  },
];

export const CATEGORIES = [
  { id: 'suc-khoe', label: 'Sức khỏe', icon: 'stethoscope' },
  { id: 'an-dam', label: 'Ăn dặm', icon: 'utensils-crossed' },
  { id: 'do-choi', label: 'Đồ chơi', icon: 'gamepad-2' },
  { id: 'khac', label: 'Khác', icon: 'grid' },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + ' Đ';
