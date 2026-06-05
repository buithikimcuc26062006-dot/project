import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  HelpCircle,
  Clock,
  CheckCircle,
  Tag,
  Truck,
  Gift,
  Home,
  Grid,
  ShoppingCart,
  User,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const VOUCHERS = [
  {
    id: 1,
    type: 'voucher',
    discount: 'Giảm 50k',
    desc: 'Cho đơn hàng từ 500k khi mua sữa bột Enfamil',
    expiry: '30/11/2024',
    color: Colors.primaryContainer,
    status: 'Sắp hết',
    tag: 'GIẢM',
    icon: Tag,
  },
  {
    id: 2,
    type: 'freeship',
    discount: 'Miễn phí vận chuyển',
    desc: 'Tối đa 25k cho đơn hàng từ 250k',
    expiry: '15/12/2024',
    color: Colors.tertiaryContainer,
    status: '',
    tag: 'FREESHIP',
    icon: Truck,
  },
  {
    id: 3,
    type: 'voucher',
    discount: 'Combo Tiết Kiệm',
    desc: 'Giảm 15% khi mua combo tã dán và khăn ướt',
    expiry: '31/12/2024',
    color: Colors.sunYellow + '66', // ~40% opacity
    status: 'Mới',
    tag: 'GIẢM 15%',
    icon: Gift,
    iconColor: Colors.primary,
  },
];

export default function CouponCodeScreen() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [activeTab, setActiveTab] = useState<'voucher' | 'freeship'>('voucher');
  const [selectedVouchers, setSelectedVouchers] = useState<number[]>([]);

  const handleToggleVoucher = (id: number) => {
    if (selectedVouchers.includes(id)) {
      setSelectedVouchers(selectedVouchers.filter((vId) => vId !== id));
    } else {
      setSelectedVouchers([...selectedVouchers, id]);
    }
  };

  const filteredVouchers = VOUCHERS.filter((v) => v.type === activeTab);

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ArrowLeft size={22} color={Colors.primary} />
          </TouchableOpacity>
          <h1 style={styles.headerTitle}>Áp mã giảm giá</h1>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <HelpCircle size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Manual Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>Nhập mã ưu đãi</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ví dụ: CONKHOE2024"
                placeholderTextColor={Colors.outlineVariant}
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity style={styles.applyBtn} activeOpacity={0.85}>
                <Text style={styles.applyBtnText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Category Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'voucher' ? styles.tabButtonActive : styles.tabButtonInactive,
            ]}
            onPress={() => setActiveTab('voucher')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === 'voucher' ? styles.tabTextActive : styles.tabTextInactive
            ]}>
              Voucher (8)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'freeship' ? styles.tabButtonActive : styles.tabButtonInactive,
            ]}
            onPress={() => setActiveTab('freeship')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === 'freeship' ? styles.tabTextActive : styles.tabTextInactive
            ]}>
              Freeship (3)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voucher List */}
        <View style={styles.voucherList}>
          {filteredVouchers.map((voucher) => {
            const IconComponent = voucher.icon;
            const isSelected = selectedVouchers.includes(voucher.id);
            return (
              <TouchableOpacity
                key={voucher.id}
                style={[
                  styles.voucherCard,
                  isSelected && styles.voucherCardSelected,
                ]}
                onPress={() => handleToggleVoucher(voucher.id)}
                activeOpacity={0.9}
              >
                {/* Color Accent Side */}
                <View style={[styles.colorAccent, { backgroundColor: voucher.color }]}>
                  <IconComponent size={30} color={voucher.iconColor || Colors.onSurfaceVariant} />
                  <Text style={styles.discountLabel}>{voucher.tag}</Text>

                  {/* Ticket edge recesses */}
                  <View style={styles.recessWrapper}>
                    <View style={styles.recessCircle} />
                    <View style={styles.recessCircle} />
                    <View style={styles.recessCircle} />
                  </View>
                </View>

                {/* Content */}
                <View style={styles.voucherContent}>
                  <View style={styles.voucherHeader}>
                    <Text style={styles.discountText}>{voucher.discount}</Text>
                    {voucher.status ? (
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: voucher.status === 'Sắp hết' ? Colors.babyPink : Colors.skyBlue + '4d' }
                      ]}>
                        <Text style={[
                          styles.statusBadgeText,
                          { color: voucher.status === 'Sắp hết' ? Colors.onErrorContainer : Colors.onTertiaryFixedVariant }
                        ]}>
                          {voucher.status}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.descText}>{voucher.desc}</Text>
                  <View style={styles.voucherFooter}>
                    <View style={styles.expiryRow}>
                      <Clock size={14} color={Colors.outline} />
                      <Text style={styles.expiryText}>HSD: {voucher.expiry}</Text>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.detailLink}>Chi tiết</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Checkbox circle indicator */}
                <View style={styles.rightSection}>
                  <View style={[
                    styles.radioButton,
                    voucher.id === 1 && { borderColor: Colors.primaryContainer },
                    voucher.id === 2 && { borderColor: Colors.tertiaryContainer },
                    voucher.id === 3 && { borderColor: Colors.outlineVariant },
                    isSelected && voucher.id === 1 && { backgroundColor: Colors.primaryContainer + '20' },
                    isSelected && voucher.id === 2 && { backgroundColor: Colors.tertiaryContainer + '20' },
                    isSelected && voucher.id === 3 && { backgroundColor: Colors.softGrey },
                  ]}>
                    {isSelected && (
                      <View style={[
                        styles.radioDot,
                        voucher.id === 2 ? { backgroundColor: Colors.tertiary } : { backgroundColor: Colors.primary }
                      ]} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Banner Ad / Suggestion */}
        <ImageBackground
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMaY-R6OS4M7G4Bpm6zZEVDpytIkQC8mLnP4fMWSk9X1XRqOQ5vh3PLvsdizJssgBt5qO6lx9MidIaSIX4V48z-PD4italVPZcem4fYl5srCRKvZLgO7Tlg8xBJP5GAIedCBbx8THh5Vdp6FISp6oyeuSdDo8ct7bzDuovt2iFCflQXbXmqY7dTtpjb2xeMiLgTs7oYRCA88N8QmSeYXGFC2UnWwoaKp0HfWBxvgAU7knPbQK0doVnRouo0ZT88iKJ_z3mmXxWfNpY' }}
          style={styles.promoBanner}
          imageStyle={styles.promoBannerImage}
        >
          <LinearGradient
            colors={[Colors.primary + 'a6', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.promoBannerContent}>
            <Text style={styles.promoBannerText}>Nhận thêm mã khi thanh toán qua Ví</Text>
            <TouchableOpacity style={styles.promoBannerBtn} activeOpacity={0.85}>
              <Text style={styles.promoBannerBtnText}>Liên kết ngay</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Fixed Action Button */}
      <View style={styles.fixedActionBtnContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.confirmBtn}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.confirmBtnText}>Xác nhận áp mã</Text>
          <CheckCircle size={20} color={Colors.onPrimary} fill={Colors.onPrimary} />
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

        <TouchableOpacity style={styles.navItemActive} onPress={() => router.replace('/(tabs)/cart')}>
          <ShoppingCart size={18} color={Colors.onSecondaryContainer} />
          <Text style={styles.navLabelActive}>Giỏ hàng</Text>
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
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
    letterSpacing: -0.5,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  inputSection: {
    marginBottom: 24,
  },
  inputCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.surfaceVariant + '4d',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.softGrey,
    paddingHorizontal: 24,
    fontSize: 16,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  applyBtn: {
    paddingHorizontal: 24,
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  tabButtonInactive: {
    borderColor: Colors.outlineVariant,
    backgroundColor: 'transparent',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  tabTextActive: {
    color: Colors.onPrimary,
  },
  tabTextInactive: {
    color: Colors.onSurfaceVariant,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  voucherList: {
    gap: 16,
    marginBottom: 24,
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceVariant + '33',
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
    alignItems: 'center',
  },
  voucherCardSelected: {
    borderColor: Colors.primary + '50',
    backgroundColor: Colors.primary + '05',
  },
  colorAccent: {
    width: 96,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
    paddingVertical: 16,
  },
  discountLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'NunitoSans-Bold',
    textAlign: 'center',
  },
  recessWrapper: {
    position: 'absolute',
    right: -8,
    top: 0,
    bottom: 0,
    justifyContent: 'space-around',
    paddingVertical: 4,
    zIndex: 10,
  },
  recessCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  voucherContent: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  voucherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Bold',
  },
  descText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  voucherFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiryText: {
    fontSize: 11,
    color: Colors.outline,
    fontFamily: 'NunitoSans-Regular',
  },
  detailLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  rightSection: {
    paddingRight: 16,
    justifyContent: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  promoBanner: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 24,
  },
  promoBannerImage: {
    width: '100%',
    height: '100%',
  },
  promoBannerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  promoBannerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'NunitoSans-Bold',
    maxWidth: 180,
    lineHeight: 24,
  },
  promoBannerBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginTop: 8,
    width: 'fit-content' as any,
  },
  promoBannerBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  fixedActionBtnContainer: {
    position: 'absolute',
    bottom: 76,
    left: 20,
    right: 20,
    zIndex: 40,
  },
  confirmBtn: {
    width: '100%',
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
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
