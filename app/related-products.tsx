import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Plus, Check, ChevronRight, Home, Grid, User } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const RELATED_PRODUCTS = [
  {
    id: 1,
    name: 'Nhiệt Kế Hồng Ngoại Đa Năng',
    price: '279.000đ',
    image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    status: 'Bán chạy',
    statusColor: Colors.babyPink,
    selected: true,
  },
  {
    id: 2,
    name: 'Vòng Tay Dâu Tằm Cho Bé',
    price: '30.000đ',
    image: 'https://i.ibb.co/274ndCPk/n-i-n-u-ch-m-0-8l-19.png',
    status: 'Mới',
    statusColor: Colors.skyBlue,
    selected: false,
  },
  {
    id: 3,
    name: 'Nồi Nấu Cháo Chậm Bear 0,8L',
    price: '980.000đ',
    image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    status: '',
    selected: true,
  },
  {
    id: 4,
    name: 'Chậu Tắm Ếch cao cấp Việt Nhật',
    price: '118.000đ',
    image: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
    status: 'Khuyên dùng',
    statusColor: Colors.sunYellow,
    selected: false,
  },
  {
    id: 5,
    name: 'Xe Chòi 4 Chân Thú Cừu Cho Bé',
    price: '678.000đ',
    image: 'https://i.ibb.co/WW4Lb0MK/n-i-n-u-ch-m-0-8l-12.png',
    status: '',
    selected: true,
  },
  {
    id: 6,
    name: 'Ghế hơi tập ngồi Bar-rot',
    price: '118.000đ',
    image: 'https://i.ibb.co/9HJvtK2y/n-i-n-u-ch-m-0-8l-9.png',
    status: '',
    selected: false,
  },
];

const BUNDLE_BASE_PRICE = 350000;

export default function RelatedProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState(RELATED_PRODUCTS);

  const toggleProduct = (id: number) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const selectedCount = products.filter((p) => p.selected).length;
  const selectedTotal = products
    .filter((p) => p.selected)
    .reduce((sum, p) => {
      const price = parseInt(p.price.replace(/[^\d]/g, ''), 10);
      return sum + price;
    }, BUNDLE_BASE_PRICE);

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ArrowLeft size={22} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mẹ thường mua kèm</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <ShoppingCart size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Active Bundle Section */}
        <View style={styles.activeBundle}>
          <View style={styles.bundleImageWrapper}>
            <Image
              source={{ uri: 'https://i.ibb.co/3mGm5KpF/n-i-n-u-ch-m-0-8l-17.png' }}
              style={styles.bundleImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.bundleInfo}>
            <Text style={styles.bundleLabel}>Đang xem</Text>
            <Text style={styles.bundleName}>Bình Sữa Pigeon- 160ml</Text>
            <Text style={styles.bundleDesc}>Thương hiệu Thụy Sĩ • Chống sặc & đầy hơi</Text>
          </View>
          <Text style={styles.bundlePrice}>350.000đ</Text>
        </View>

        {/* Suggestions Header */}
        <View style={styles.suggestionsHeader}>
          <View style={styles.suggestionsTextGroup}>
            <Text style={styles.suggestionsTitle}>Gợi ý hoàn hảo</Text>
            <Text style={styles.suggestionsDesc}>Sản phẩm bổ trợ giúp việc chăm sóc bé dễ dàng hơn</Text>
          </View>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>Xem tất cả</Text>
            <ChevronRight size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => toggleProduct(product.id)}
              activeOpacity={0.9}
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                {product.status ? (
                  <View style={[styles.statusBadge, { backgroundColor: product.statusColor }]}>
                    <Text style={styles.statusBadgeText}>{product.status}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View
                  style={[
                    styles.actionBtn,
                    product.selected ? styles.actionBtnActive : styles.actionBtnInactive,
                  ]}
                >
                  {product.selected ? (
                    <Check size={16} color={Colors.onPrimary} />
                  ) : (
                    <Plus size={16} color={Colors.onPrimaryContainer} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Sticky Summary Action */}
      {selectedCount > 0 && (
        <View style={styles.fixedSummaryContainer} pointerEvents="box-none">
          <View style={styles.summaryBox}>
            <View>
              <Text style={styles.summaryText}>Đã chọn {selectedCount} sản phẩm kèm</Text>
              <Text style={styles.summaryTotal}>
                Tổng: {selectedTotal.toLocaleString('vi-VN')}đ
              </Text>
            </View>
            <TouchableOpacity style={styles.addAllBtn} activeOpacity={0.85}>
              <Text style={styles.addAllBtnText}>Thêm tất cả vào giỏ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/')}>
          <Home size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Trang chủ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive} onPress={() => alert('Mở Danh mục')}>
          <Grid size={18} color={Colors.onSecondaryContainer} />
          <Text style={styles.navLabelActive}>Danh mục</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/(tabs)/cart')}>
          <ShoppingCart size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/my-profile')}>
          <User size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
    letterSpacing: -0.5,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },
  activeBundle: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '1a',
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 3,
    alignItems: 'center',
  },
  bundleImageWrapper: {
    width: 96,
    height: 96,
    backgroundColor: Colors.softGrey,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bundleImage: {
    width: '100%',
    height: '100%',
  },
  bundleInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  bundleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Bold',
  },
  bundleName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  bundleDesc: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  bundlePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  suggestionsTextGroup: {
    flex: 1,
    gap: 4,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  suggestionsDesc: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  productCard: {
    width: '47%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '0d',
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.softGrey,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    paddingHorizontal: 4,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
    lineHeight: 18,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 'auto',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnInactive: {
    backgroundColor: Colors.primaryContainer,
  },
  actionBtnActive: {
    backgroundColor: Colors.primary,
  },
  fixedSummaryContainer: {
    position: 'absolute',
    bottom: 76,
    left: 20,
    right: 20,
    zIndex: 40,
  },
  summaryBox: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.onPrimary,
    opacity: 0.9,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
    marginTop: 2,
  },
  addAllBtn: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  addAllBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '20',
    shadowColor: 'rgba(1, 131, 78, 0.1)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 12,
    zIndex: 50,
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
