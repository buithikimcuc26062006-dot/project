import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Wallet, CreditCard, Building2 } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'COD',
    desc: 'Thanh toán khi nhận hàng',
    icon: Wallet,
  },
  {
    id: 'ewallet',
    name: 'Ví điện tử',
    desc: 'MoMo, ZaloPay, ShopeePay',
    icon: CreditCard,
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    desc: 'Vietcombank, Techcombank, BIDV...',
    icon: Building2,
  },
];

export default function PaymentMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('cod');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính (3 sản phẩm)</Text>
              <Text style={styles.summaryValue}>850.000đ</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Text style={[styles.summaryValue, { color: Colors.tertiary }]}>Miễn phí</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalPrice}>850.000đ</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods Section */}
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <View style={styles.methodsList}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardActive,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              <View style={styles.methodIconBox}>
                <method.icon
                  size={32}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.methodContent}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDesc}>{method.desc}</Text>
              </View>
              <View style={styles.radioButton}>
                {selectedMethod === method.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promotion Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoBannerContent}>
            <Text style={styles.promoBannerTitle}>Ưu đãi thanh toán MoMo</Text>
            <Text style={styles.promoBannerDesc}>Giảm thêm 20k cho đơn từ 500k</Text>
          </View>
          <TouchableOpacity style={styles.promoBannerBtn}>
            <Text style={styles.promoBannerBtnText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <View>
            <Text style={styles.totalLabel}>Tổng số tiền</Text>
            <Text style={styles.totalPrice}>850.000đ</Text>
          </View>
          <TouchableOpacity style={styles.placeOrderBtn}>
            <Text style={styles.placeOrderBtnText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softGrey },
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
  summaryCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  summaryContent: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant + '20',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  methodsList: {
    gap: 12,
    marginBottom: 20,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  methodCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
  },
  methodIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.softGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodContent: {
    flex: 1,
    gap: 2,
  },
  methodName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  methodDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
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
    backgroundColor: Colors.primaryContainer + '40',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promoBannerContent: {
    flex: 1,
    gap: 2,
  },
  promoBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
  promoBannerDesc: {
    fontSize: 12,
    color: Colors.onPrimaryContainer,
    fontFamily: 'NunitoSans-Regular',
  },
  promoBannerBtn: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  placeOrderBtn: {
    flex: 1,
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
  placeOrderBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
