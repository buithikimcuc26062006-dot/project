import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Menu,
  ShoppingBasket,
  Plus,
  Minus,
  Trash2,
  Ticket,
  ChevronRight,
  ArrowRight,
  Home,
  Grid,
  ShoppingCart,
  User,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface CartItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  image: string;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: 'Bình Sữa Pigeon PPSU Plus',
    desc: 'Dung tích 240ml • Màu Xanh',
    price: 376000,
    quantity: 1,
    image: 'https://i.ibb.co/Kjn5bpjd/n-i-n-u-ch-m-0-8l-18.png',
  },
  {
    id: 2,
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L',
    desc: 'Đa năng • Hẹn giờ 24h',
    price: 980000,
    quantity: 1,
    image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;
  const productCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const formatVnd = (value: number) => {
    return value.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} style={styles.headerBtn}>
          <Menu size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.headerBtn}>
          <ShoppingBasket size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Header */}
        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>Giỏ hàng</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {productCount} sản phẩm
            </Text>
          </View>
        </View>

        {/* Cart List */}
        <View style={styles.itemsList}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemImageWrapper}>
                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
              </View>
              <View style={styles.itemContent}>
                <View>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>{formatVnd(item.price)}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.qtyBtnMinus}
                      onPress={() => updateQuantity(item.id, -1)}
                      activeOpacity={0.8}
                    >
                      <Minus size={18} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtnPlus}
                      onPress={() => updateQuantity(item.id, 1)}
                      activeOpacity={0.8}
                    >
                      <Plus size={18} color={Colors.onPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeItem(item.id)}
                activeOpacity={0.8}
              >
                <Trash2 size={20} color={Colors.outline} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {cartItems.length === 0 && (
          <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        )}

        {/* Coupon Section */}
        <TouchableOpacity
          style={styles.couponBox}
          activeOpacity={0.9}
          onPress={() => router.push('/coupon-code')}
        >
          <View style={styles.couponLeft}>
            <View style={styles.couponIcon}>
              <Ticket size={22} color={Colors.onSecondaryContainer} />
            </View>
            <View>
              <Text style={styles.couponLabel}>Chọn mã giảm giá</Text>
              <Text style={styles.couponDesc}>
                Giảm đến 50k cho mẹ mới
              </Text>
            </View>
          </View>
          <View style={styles.couponAction}>
            <Text style={styles.couponLink}>Chọn</Text>
            <ChevronRight size={18} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Summary Details */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>{formatVnd(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>0đ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Giảm giá</Text>
            <Text style={styles.summaryDiscount}>-0đ</Text>
          </View>
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Sticky Bottom Checkout & Nav */}
      <View style={styles.bottomBar}>
        {/* Checkout Bar */}
        <View style={styles.checkoutBar}>
          <View>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>{formatVnd(total)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            activeOpacity={0.9}
            onPress={() => router.push('/checkout')}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.checkoutBtnText}>Thanh toán ngay</Text>
            <ArrowRight size={20} color={Colors.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/')}>
            <Home size={22} color={Colors.onSurfaceVariant} />
            <Text style={styles.navLabel}>Trang chủ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem} onPress={() => alert('Chuyển đến Danh mục')}>
            <Grid size={22} color={Colors.onSurfaceVariant} />
            <Text style={styles.navLabel}>Danh mục</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItemActive} onPress={() => alert('Mở Giỏ hàng')}>
            <ShoppingCart size={18} color={Colors.onSecondaryContainer} />
            <Text style={styles.navLabelActive}>Giỏ hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/my-profile')}>
            <User size={22} color={Colors.onSurfaceVariant} />
            <Text style={styles.navLabel}>Tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softGrey,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.surface,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
    zIndex: 100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
    letterSpacing: -0.5,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 200,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cartTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  cartBadge: {
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  cartBadgeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
  itemsList: { gap: 16 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  itemImageWrapper: {
    width: 96,
    height: 96,
    backgroundColor: Colors.softGrey,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: { width: '100%', height: '100%' },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  itemDesc: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
    marginTop: 2,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 9999,
    padding: 4,
    gap: 12,
  },
  qtyBtnMinus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  qtyBtnPlus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    width: 16,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.onSurfaceVariant,
    marginVertical: 24,
    fontFamily: 'NunitoSans-Regular',
  },
  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 32,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  couponIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  couponDesc: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  couponAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  couponLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  summary: {
    marginTop: 32,
    gap: 8,
    paddingHorizontal: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryValue: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryDiscount: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.tertiary,
    fontFamily: 'NunitoSans-Regular',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    zIndex: 100,
  },
  checkoutBar: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '40',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: 'rgba(1, 131, 78, 0.1)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 12,
  },
  totalLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  totalPrice: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  checkoutBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 9999,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutBtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '20',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 4,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  navLabelActive: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
});
