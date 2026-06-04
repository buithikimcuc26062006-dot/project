export interface CartItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  quantity: number;
}

export const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'Bình Sữa Pigeon PPSU Plus',
    desc: 'Dung tích 240ml • Màu Xanh',
    price: 376000,
    image: 'https://i.ibb.co/Kjn5bpjd/n-i-n-u-ch-m-0-8l-18.png',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L',
    desc: 'Đa năng • Hẹn giờ 24h',
    price: 980000,
    image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    quantity: 1,
  },
];

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}đ`;
}

export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
