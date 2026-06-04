import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  ShoppingCart,
  Heart as HeartIcon,
  Plus,
  Activity,
  UtensilsCrossed,
  Gamepad2,
  Grid3x3,
  Thermometer,
  Sparkles,
  Bath,
  ShoppingBag,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { PRODUCTS, formatPrice } from '@/constants/products';

type CategoryId = 'suc-khoe' | 'an-dam' | 'do-choi' | 'khac';

interface CategoryData {
  title: string;
  desc: string;
  img: string;
  subs: { name: string; Icon: any }[];
  productIds: string[];
}

const CATEGORY_DATA: Record<CategoryId, CategoryData> = {
  'suc-khoe': {
    title: 'Chăm sóc Sức khỏe',
    desc: 'Bảo vệ bé yêu với thiết bị y tế chính xác',
    img: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    subs: [
      { name: 'Nhiệt kế', Icon: Thermometer },
      { name: 'Vòng dâu tằm', Icon: Sparkles },
      { name: 'Chậu tắm', Icon: Bath },
      { name: 'Tất cả', Icon: Grid3x3 },
    ],
    productIds: ['SP002', 'SP003'],
  },
  'an-dam': {
    title: 'Thế giới Ăn dặm',
    desc: 'Bữa ăn ngon, đủ chất cho hành trình khôn lớn',
    img: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    subs: [
      { name: 'Bình sữa', Icon: ShoppingBag },
      { name: 'Nồi cháo', Icon: UtensilsCrossed },
      { name: 'Bát thìa', Icon: Sparkles },
      { name: 'Tất cả', Icon: Grid3x3 },
    ],
    productIds: ['SP004', 'SP001'],
  },
  'do-choi': {
    title: 'Vui chơi Phát triển',
    desc: 'Khám phá thế giới qua những món đồ chơi thông minh',
    img: 'https://i.ibb.co/t50QHBv/n-i-n-u-ch-m-0-8l.png',
    subs: [
      { name: 'Xe chòi chân', Icon: Gamepad2 },
      { name: 'Gấu bông', Icon: HeartIcon },
      { name: 'Xếp hình', Icon: Sparkles },
      { name: 'Tất cả', Icon: Grid3x3 },
    ],
    productIds: ['SP006'],
  },
  'khac': {
    title: 'Tiện ích Mẹ & Bé',
    desc: 'Những vật dụng không thể thiếu cho cuộc sống tiện lợi',
    img: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
    subs: [
      { name: 'Chậu tắm', Icon: Bath },
      { name: 'Ghế hơi', Icon: Sparkles },
      { name: 'Vệ sinh', Icon: Sparkles },
      { name: 'Tất cả', Icon: Grid3x3 },
    ],
    productIds: ['SP005', 'SP007'],
  },
};

const SIDEBAR_ITEMS: { id: CategoryId; label: string; Icon: any }[] = [
  { id: 'suc-khoe', label: 'Sức khỏe', Icon: Activity },
  { id: 'an-dam', label: 'Ăn dặm', Icon: UtensilsCrossed },
  { id: 'do-choi', label: 'Đồ chơi', Icon: Gamepad2 },
  { id: 'khac', label: 'Khác', Icon: Grid3x3 },
];

export default function StoreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('suc-khoe');
  const cat = CATEGORY_DATA[activeCategory];
  const products = PRODUCTS.filter((p) => cat.productIds.includes(p.id));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => router.push('/(tabs)/cart')}
        >
          <ShoppingCart size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.sideItem, isActive && styles.sideItemActive]}
                onPress={() => setActiveCategory(item.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.sideIconBg, isActive && styles.sideIconBgActive]}>
                  <item.Icon size={22} color={isActive ? Colors.onPrimaryContainer : Colors.onSurfaceVariant} />
                </View>
                <Text style={[styles.sideLabel, isActive && styles.sideLabelActive]}>{item.label}</Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Banner */}
          <View style={styles.bannerWrapper}>
            <Image source={{ uri: cat.img }} style={styles.bannerImage} resizeMode="cover" />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>{cat.title}</Text>
              <Text style={styles.bannerDesc}>{cat.desc}</Text>
            </View>
          </View>

          {/* Sub-categories */}
          <View style={styles.subsSection}>
            <Text style={styles.subsTitle}>DANH MỤC CON</Text>
            <View style={styles.subsGrid}>
              {cat.subs.map((sub, i) => (
                <TouchableOpacity key={i} style={styles.subCard} activeOpacity={0.8}>
                  <View style={styles.subIconBg}>
                    <sub.Icon size={18} color={Colors.secondary} />
                  </View>
                  <Text style={styles.subLabel}>{sub.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Products */}
          <View style={styles.productsSection}>
            <View style={styles.productsSectionHeader}>
              <Text style={styles.productsSectionTitle}>Sản phẩm nổi bật</Text>
              <TouchableOpacity style={styles.seeAll}>
                <Text style={styles.seeAllText}>Xem tất cả</Text>
                <ChevronRight size={14} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <View style={styles.productImageWrapper}>
                    <Image
                      source={{ uri: product.main_image }}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.wishlistBtn}>
                      <HeartIcon size={16} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                    <View style={styles.productFooter}>
                      <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                      <TouchableOpacity style={styles.addBtn}>
                        <Plus size={14} color={Colors.onPrimary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, height: 56, backgroundColor: Colors.surface,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  cartBtn: { padding: 4 },
  body: { flex: 1, flexDirection: 'row' },
  sidebar: {
    width: 80, backgroundColor: Colors.surfaceContainerLowest,
    borderRightWidth: 1, borderRightColor: Colors.outlineVariant + '4D',
    paddingTop: 12,
  },
  sideItem: {
    alignItems: 'center', paddingVertical: 14, gap: 4, position: 'relative',
  },
  sideItemActive: {},
  sideIconBg: {
    width: 48, height: 48, borderRadius: 9999,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  sideIconBgActive: { backgroundColor: Colors.primaryContainer },
  sideLabel: { fontSize: 11, color: Colors.onSurfaceVariant, textAlign: 'center', fontFamily: 'NunitoSans-SemiBold' },
  sideLabelActive: { color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  activeIndicator: {
    position: 'absolute', right: 0, top: '25%',
    width: 4, height: '50%', backgroundColor: Colors.primary, borderRadius: 4,
  },
  content: { flex: 1 },
  bannerWrapper: { margin: 12, borderRadius: 16, overflow: 'hidden', height: 128 },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,110,32,0.55)',
    padding: 16, justifyContent: 'flex-end',
  },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', fontFamily: 'NunitoSans-Bold' },
  bannerDesc: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'NunitoSans-Regular' },
  subsSection: { paddingHorizontal: 12, marginBottom: 16 },
  subsTitle: { fontSize: 11, fontWeight: '700', color: Colors.primary, letterSpacing: 1, marginBottom: 10, fontFamily: 'NunitoSans-Bold' },
  subsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  subCard: {
    width: '47%', backgroundColor: Colors.surfaceContainerLowest,
    padding: 10, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 8,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  subIconBg: {
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: Colors.secondaryContainer + '4D',
    alignItems: 'center', justifyContent: 'center',
  },
  subLabel: { fontSize: 11, color: Colors.onSurfaceVariant, flex: 1, fontFamily: 'NunitoSans-SemiBold' },
  productsSection: { paddingHorizontal: 12 },
  productsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  productsSectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllText: { fontSize: 12, color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  productCard: {
    width: '48%', backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14, overflow: 'hidden',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  productImageWrapper: { aspectRatio: 1 },
  productImage: { width: '100%', height: '100%' },
  wishlistBtn: {
    position: 'absolute', top: 6, right: 6,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center',
  },
  productInfo: { padding: 8 },
  productName: { fontSize: 12, color: Colors.onSurface, lineHeight: 16, minHeight: 32, fontFamily: 'NunitoSans-Regular' },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  productPrice: { fontSize: 13, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  addBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
});
