import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Ticket, Clock, Copy } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const VOUCHERS = [
  {
    id: 1,
    discount: 'Giảm 50k',
    desc: 'Cho đơn hàng từ 500k khi mua sữa bột Enfamil',
    expiry: '30/11/2024',
    color: Colors.primaryContainer,
    status: 'Sắp hết',
  },
  {
    id: 2,
    discount: 'Miễn phí vận chuyển',
    desc: 'Tối đa 25k cho đơn hàng từ 250k',
    expiry: '15/12/2024',
    color: Colors.tertiaryContainer,
    status: '',
  },
  {
    id: 3,
    discount: 'Giảm 15%',
    desc: 'Giảm 15% khi mua combo tã dán và khăn ướt',
    expiry: '31/12/2024',
    color: Colors.sunYellow,
    status: 'Mới',
  },
];

export default function CouponCodeScreen() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Áp mã giảm giá</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Manual Input Section */}
        <View style={styles.inputSection}>
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

        {/* Vouchers Title */}
        <Text style={styles.sectionTitle}>Voucher Khả Dụng</Text>

        {/* Voucher List */}
        <View style={styles.voucherList}>
          {VOUCHERS.map((voucher) => (
            <TouchableOpacity
              key={voucher.id}
              style={[
                styles.voucherCard,
                selectedVoucher === voucher.id && styles.voucherCardSelected,
              ]}
              onPress={() => setSelectedVoucher(selectedVoucher === voucher.id ? null : voucher.id)}
              activeOpacity={0.85}
            >
              {/* Color Accent Side */}
              <View style={[styles.colorAccent, { backgroundColor: voucher.color }]}>
                <Ticket size={24} color={Colors.primary} />
                <Text style={styles.discountLabel}>GIẢM</Text>
              </View>

              {/* Content */}
              <View style={styles.voucherContent}>
                <View style={styles.voucherHeader}>
                  <Text style={styles.discountText}>{voucher.discount}</Text>
                  {voucher.status && (
                    <Text
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            voucher.status === 'Sắp hết' ? Colors.babyPink : Colors.skyBlue,
                        },
                      ]}
                    >
                      {voucher.status}
                    </Text>
                  )}
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

              {/* Radio Button */}
              <View style={styles.radioButton}>
                {selectedVoucher === voucher.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promotional Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoBannerText}>Nhận thêm mã khi thanh toán qua Ví</Text>
          <TouchableOpacity style={styles.promoBannerBtn}>
            <Text style={styles.promoBannerBtnText}>Liên kết ngay</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmBtnText}>Xác nhận áp mã</Text>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
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
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.softGrey,
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  applyBtn: {
    width: 100,
    height: 48,
    borderRadius: 12,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  voucherList: {
    gap: 12,
    marginBottom: 20,
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '20',
    alignItems: 'center',
  },
  voucherCardSelected: {
    borderColor: Colors.primary + '50',
    backgroundColor: Colors.primary + '05',
  },
  colorAccent: {
    width: 96,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'relative',
  },
  discountLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'NunitoSans-Bold',
  },
  voucherContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onError,
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
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  promoBanner: {
    backgroundColor: Colors.skyBlue + '30',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promoBannerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  promoBannerBtn: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  promoBannerBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  confirmBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
