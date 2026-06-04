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
import { ArrowLeft, ShoppingCart, Plus, Check } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const RELATED_PRODUCTS = [
  {
    id: 1,
    name: 'Nhiệt Kế Hồng Ngoại Đa Năng',
    price: '279.000đ',
    image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    status: 'Bán chạy',
    statusColor: Colors.babyPink,
    selected: false,
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
      const price = parseInt(p.price.replace(/[^\d]/g, ''));
      return sum + price;
    }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mẹ thường mua kèm</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Active Bundle */}
        <View style={styles.activeBundle}>
          <Image
            source={{ uri: 'https://i.ibb.co/3mGm5KpF/n-i-n-u-ch-m-0-8l-17.png' }}
            style={styles.bundleImage}
          />
          <View style={styles.bundleInfo}>
            <Text style={styles.bundleLabel}>Đang xem</Text>
            <Text style={styles.bundleName}>Bình Sữa Pigeon- 160ml</Text>
            <Text style={styles.bundleDesc}>Thương hiệu Thụy Sĩ • Chống sặc & đầy hơi</Text>
          </View>
          <Text style={styles.bundlePrice}>350.000đ</Text>
        </View>

        {/* Suggestions */}
        <View style={styles.suggestionsHeader}>
          <View>
            <Text style={styles.suggestionsTitle}>Gợi ý hoàn hảo</Text>
            <Text style={styles.suggestionsDesc}>Sản phẩm bổ trợ giúp việc chăm sóc bé dễ dàng hơn</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllLink}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => toggleProduct(product.id)}
              activeOpacity={0.8}
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                {product.status && (
                  <Text style={[styles.statusBadge, { backgroundColor: product.statusColor }]}>
                    {product.status}
                  </Text>
                )}
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    product.selected && { backgroundColor: Colors.primary },
                  ]}
                >
                  {product.selected ? (
                    <Check size={16} color={Colors.onPrimary} />
                  ) : (
                    <Plus size={16} color={Colors.onPrimaryContainer} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Summary */}
        {selectedCount > 0 && (
          <View style={styles.summaryBox}>
            <View>
              <Text style={styles.summaryText}>Đã chọn {selectedCount} sản phẩm kèm</Text>
              <Text style={styles.summaryTotal}>
                Tổng: {selectedTotal.toLocaleString('vi-VN')}đ
              </Text>
            </View>
            <TouchableOpacity style={styles.addAllBtn}>
              <Text style={styles.addAllBtnText}>Thêm tất cả vào giỏ</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  activeBundle: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  bundleImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  bundleInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  bundleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Bold',
  },
  bundleName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  bundleDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  bundlePrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  suggestionsDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  productCard: {
    width: '23%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.softGrey,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onPrimaryFixed,
    fontFamily: 'NunitoSans-Bold',
  },
  productName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    paddingHorizontal: 8,
    marginBottom: 6,
    fontFamily: 'NunitoSans-Bold',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  actionBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryBox: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  addAllBtn: {
    backgroundColor: Colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addAllBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
});
