import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  ShoppingCart,
  Heart,
  Zap,
  ChevronRight,
  Stethoscope,
  UtensilsCrossed,
  Gamepad2,
  Grid,
  ShoppingBag,
  Baby,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { FLASH_SALE_PRODUCTS } from '@/constants/products';
import { DEFAULT_CART_ITEMS } from '@/constants/cart';

const BANNER_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDmRk9e889PA1lZ4X30ONzYSPLadIVgnSz4hnqAV060WOjUmMoUVj4et0-tkN-T5t4g_rvfc5MlCw-LPm5v69RMov23L9b4guPAZZplL-EsJdlPQdm3tBg3Eamj5AvdZclbtx3pY82c4NUOcaaOPpWf2148zlCOEDHnoloOiw7CAT_ls1EW7TwvYAG1xOz8pbxXDrjTQweeSbXnPiVhZ6TZl931jB4UcDUcnetTEyahaY4Ey6Eh4x4DIXwrTOZ6gsbwyBh6iDk-wh09';

const CATS = [
  { icon: Stethoscope, label: 'Sức khỏe', color: Colors.primary },
  { icon: UtensilsCrossed, label: 'Ăn dặm', color: Colors.secondary },
  { icon: Gamepad2, label: 'Đồ chơi', color: Colors.tertiary },
  { icon: Grid, label: 'Khác', color: Colors.primary },
];

const RECOMMENDED = [
  {
    id: 'SP001',
    name: 'Bình Sữa Pigeon Chính Hãng Nhật Bản',
    price: '189.000 Đ',
    category: 'ĂN DẶM',
    image: 'https://i.ibb.co/3ymYX195/n-i-n-u-ch-m-0-8l-15.png',
  },
  {
    id: 'SP005',
    name: 'Chậu Tắm Ếch Cao Cấp Việt Nhật',
    price: '118.000 Đ',
    category: 'KHÁC',
    image: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
  },
  {
    id: 'SP007',
    name: 'Ghế Hơi Tập Ngồi Bar-rot Đa Năng',
    price: '118.000 Đ',
    category: 'KHÁC',
    image: 'https://i.ibb.co/9HJvtK2y/n-i-n-u-ch-m-0-8l-9.png',
  },
  {
    id: 'SP003',
    name: 'Vòng Tay Dâu Tằm Bảo Vệ Bé',
    price: '30.000 Đ',
    category: 'SỨC KHỎE',
    image: 'https://i.ibb.co/274ndCPk/n-i-n-u-ch-m-0-8l-19.png',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'ĂN DẶM': Colors.secondary,
  'KHÁC': Colors.skyBlue,
  'SỨC KHỎE': Colors.secondary,
  'ĐỒ CHƠI': Colors.tertiary,
};

export default function HomeScreen() {
  const router = useRouter();
  const cartCount = DEFAULT_CART_ITEMS.reduce((n, item) => n + item.quantity, 0);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(45);
  const [seconds, setSeconds] = useState(12);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        setMinutes((m) => {
          if (m > 0) return m - 1;
          setHours((h) => (h > 0 ? h - 1 : 0));
          return 59;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Baby size={22} color={Colors.primary} />
          <Text style={styles.headerTitle}>Con Khỏe</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => router.push('/search')}>
            <Search size={22} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartWrapper}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <ShoppingCart size={22} color={Colors.primary} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.bannerWrapper}>
            <Image source={{ uri: BANNER_IMAGE }} style={styles.bannerImage} resizeMode="cover" />
            <View style={styles.bannerOverlay}>
              <View style={styles.bannerContent}>
                <View style={styles.bannerTag}>
                  <Text style={styles.bannerTagText}>Ưu đãi tháng mới</Text>
                </View>
                <Text style={styles.bannerTitle}>Giảm tới 50%{'\n'}cho đồ dùng ăn dặm</Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text style={styles.bannerButtonText}>Mua ngay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Dots */}
          <View style={styles.bannerDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.catsSection}>
          <View style={styles.catsGrid}>
            {CATS.map((cat, i) => (
              <TouchableOpacity key={i} style={styles.catItem} activeOpacity={0.8}
                onPress={() => router.push('/store' as any)}>
                <View style={styles.catIcon}>
                  <cat.icon size={28} color={cat.color} />
                </View>
                <Text style={styles.catLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Flash Sale */}
        <View style={styles.flashSection}>
          <View style={styles.flashHeader}>
            <View>
              <View style={styles.flashTitleRow}>
                <Zap size={20} color={Colors.primary} fill={Colors.primary} />
                <Text style={styles.flashTitle}>FLASH SALE</Text>
              </View>
              <View style={styles.flashTimerRow}>
                <Text style={styles.flashTimerLabel}>Kết thúc trong:</Text>
                <View style={styles.timerBoxes}>
                  <View style={styles.timerBox}><Text style={styles.timerNum}>{pad(hours)}</Text></View>
                  <Text style={styles.timerSep}>:</Text>
                  <View style={styles.timerBox}><Text style={styles.timerNum}>{pad(minutes)}</Text></View>
                  <Text style={styles.timerSep}>:</Text>
                  <View style={styles.timerBox}><Text style={styles.timerNum}>{pad(seconds)}</Text></View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllText}>Tất cả</Text>
              <ChevronRight size={14} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flashList}>
            {FLASH_SALE_PRODUCTS.map((item) => (
              <View key={item.id} style={styles.flashCard}>
                <View style={styles.flashDiscountBadge}>
                  <Text style={styles.flashDiscountText}>-{item.discount}%</Text>
                </View>
                <View style={styles.flashImageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.flashImage} resizeMode="contain" />
                </View>
                <View style={styles.flashInfo}>
                  <Text style={styles.flashName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.flashPrice}>{item.price}</Text>
                  <View style={styles.soldBar}>
                    <View style={[styles.soldFill, { width: `${item.sold}%` as any }]} />
                    <Text style={styles.soldLabel}>{item.label}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended */}
        <View style={styles.recommendSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dành riêng cho bé</Text>
            <TouchableOpacity style={styles.seeAll}>
              <Text style={styles.seeAllText}>Xem thêm</Text>
              <ChevronRight size={14} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {RECOMMENDED.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <View style={styles.productImageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                  <TouchableOpacity style={styles.wishlistBtn}>
                    <Heart size={18} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <View style={[styles.categoryChip, { backgroundColor: (CATEGORY_COLORS[item.category] || Colors.secondary) + '1A' }]}>
                    <Text style={[styles.categoryChipText, { color: CATEGORY_COLORS[item.category] || Colors.secondary }]}>
                      {item.category}
                    </Text>
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addCartBtn}>
                      <ShoppingBag size={14} color={Colors.onPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  cartWrapper: { position: 'relative' },
  cartBadge: {
    position: 'absolute', top: -6, right: -6,
    width: 16, height: 16,
    backgroundColor: Colors.error,
    borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  cartBadgeText: { fontSize: 10, color: Colors.onError, fontWeight: '700', fontFamily: 'NunitoSans-Bold' },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 16 },
  bannerSection: { paddingHorizontal: 20, marginBottom: 8 },
  bannerWrapper: { borderRadius: 16, overflow: 'hidden', aspectRatio: 21 / 9 },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  bannerContent: { flex: 1, maxWidth: '65%', gap: 8 },
  bannerTag: {
    backgroundColor: Colors.babyPink,
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 9999, alignSelf: 'flex-start',
  },
  bannerTagText: { fontSize: 11, color: Colors.onSecondaryFixed, fontWeight: '600', fontFamily: 'NunitoSans-SemiBold' },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#ffffff', fontFamily: 'NunitoSans-Bold', lineHeight: 26 },
  bannerButton: {
    backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 9999, alignSelf: 'flex-start', marginTop: 4,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  bannerButtonText: { fontSize: 13, fontWeight: '700', color: '#fff', fontFamily: 'NunitoSans-Bold' },
  bannerDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.outlineVariant },
  dotActive: { width: 20, backgroundColor: Colors.primary },
  catsSection: { paddingHorizontal: 20, marginTop: 20, marginBottom: 8 },
  catsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  catItem: { alignItems: 'center', gap: 6 },
  catIcon: {
    width: 64, height: 64, borderRadius: 18,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  catLabel: { fontSize: 11, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-SemiBold' },
  flashSection: { marginTop: 24, backgroundColor: Colors.primary + '1A', paddingVertical: 20 },
  flashHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 20, marginBottom: 16 },
  flashTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flashTitle: { fontSize: 20, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  flashTimerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  flashTimerLabel: { fontSize: 13, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  timerBoxes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timerBox: { backgroundColor: Colors.primary, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4 },
  timerNum: { fontSize: 12, fontWeight: '700', color: Colors.onPrimary, fontFamily: 'NunitoSans-Bold' },
  timerSep: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  seeAllText: { fontSize: 13, color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  flashList: { paddingHorizontal: 20, gap: 12 },
  flashCard: {
    width: 160, backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16, overflow: 'hidden',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  flashDiscountBadge: {
    position: 'absolute', top: 8, left: 8, zIndex: 2,
    backgroundColor: Colors.error, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9999,
  },
  flashDiscountText: { fontSize: 10, fontWeight: '700', color: Colors.onError, fontFamily: 'NunitoSans-Bold' },
  flashImageWrapper: { aspectRatio: 1, backgroundColor: Colors.softGrey, padding: 12 },
  flashImage: { width: '100%', height: '100%' },
  flashInfo: { padding: 10 },
  flashName: { fontSize: 13, color: Colors.onSurface, lineHeight: 18, minHeight: 36, fontFamily: 'NunitoSans-Regular' },
  flashPrice: { fontSize: 16, fontWeight: '800', color: Colors.primary, marginTop: 6, fontFamily: 'NunitoSans-ExtraBold' },
  soldBar: {
    height: 10, backgroundColor: Colors.outlineVariant, borderRadius: 5,
    overflow: 'hidden', marginTop: 8, position: 'relative',
  },
  soldFill: { height: '100%', backgroundColor: Colors.error, borderRadius: 5 },
  soldLabel: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    textAlign: 'center', fontSize: 8, fontWeight: '700', color: '#fff', lineHeight: 10,
    fontFamily: 'NunitoSans-Bold',
  },
  recommendSection: { paddingHorizontal: 20, marginTop: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productCard: {
    width: '48%', backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16, overflow: 'hidden',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  productImageWrapper: { aspectRatio: 1, padding: 8 },
  productImage: { width: '100%', height: '100%' },
  wishlistBtn: {
    position: 'absolute', top: 8, right: 8,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center', justifyContent: 'center',
  },
  productInfo: { padding: 10, gap: 6 },
  categoryChip: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  categoryChipText: { fontSize: 10, fontWeight: '700', fontFamily: 'NunitoSans-Bold' },
  productName: { fontSize: 14, color: Colors.onSurface, lineHeight: 20, fontFamily: 'NunitoSans-Regular' },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  productPrice: { fontSize: 15, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  addCartBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
});
