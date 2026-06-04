import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Copy, AlertCircle } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function BankTransferScreen() {
  const router = useRouter();

  const copyToClipboard = (text: string) => {
    // In real app, use Clipboard API
    alert(`Copied: ${text}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chuyển khoản ngân hàng</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Mã đơn hàng</Text>
            <Text style={styles.summaryValue}>#CKH-8829410</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tổng thanh toán</Text>
            <Text style={styles.summaryPrice}>279.000 Đ</Text>
          </View>
        </View>

        {/* QR Code */}
        <View style={styles.qrSection}>
          <View style={styles.qrWrapper}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZxk-LQLbXr6YLaaluCKMM9s6IR-_StJZ5-4g9jk1jPt7-RRezSCh302OQtHzb-xlzgzJiF4pOIhHrg14WyLYzS5XnJ4YVo8sSjX-aMvtrVSvvwBCranAoMni-UnHsePI1r88UZEvCkjlOHzUErHDeIAJQLtVaczG0Y5DRZLUOE-pf3kqoIoL7j3rpULhNmz3HcPf4OU7h5ZwrS4EFAKMGnMxyaKLFOAOKPgF0AWwrO4s2QjBPWYuYKY6uWi6-QrGuLqxKcIBnj2aI' }}
              style={styles.qr}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.qrCaption}>Quét mã để thanh toán nhanh</Text>
        </View>

        {/* Bank Details */}
        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        <View style={styles.bankCard}>
          <View style={styles.bankRow}>
            <View>
              <Text style={styles.bankLabel}>Ngân hàng</Text>
              <Text style={styles.bankValue}>Vietcombank</Text>
              <Text style={styles.bankSub}>Chi nhánh TP. Hồ Chí Minh</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.bankLabel}>Tên tài khoản</Text>
            <Text style={styles.bankValue}>CON KHOE ECOSYSTEM</Text>
          </View>

          <View style={[styles.bankRow, { marginTop: 16 }]}>
            <View>
              <Text style={styles.bankLabel}>Số tài khoản</Text>
              <Text style={styles.accountNumber}>1234567890</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={() => copyToClipboard('1234567890')}>
              <Copy size={18} color={Colors.primary} />
              <Text style={styles.copyText}>Sao chép</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transfer Content */}
        <Text style={styles.sectionTitle}>Nội dung chuyển khoản</Text>
        <View style={styles.contentCard}>
          <Text style={styles.contentValue}>CKH8829410</Text>
          <TouchableOpacity style={styles.copyBtn2} onPress={() => copyToClipboard('CKH8829410')}>
            <Copy size={16} color={Colors.onPrimary} />
            <Text style={styles.copyText2}>Sao chép</Text>
          </TouchableOpacity>
        </View>

        {/* Warning */}
        <View style={styles.warningBox}>
          <AlertCircle size={16} color={Colors.error} />
          <Text style={styles.warningText}>Vui lòng chuyển khoản đúng số tiền và nội dung để hệ thống tự động xác nhận đơn hàng của bạn ngay lập tức.</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmBtnText}>Tôi đã chuyển khoản</Text>
        </TouchableOpacity>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  summaryCard: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 12, marginBottom: 16,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 3,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  summaryValue: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  summaryPrice: { fontSize: 20, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  qrSection: { alignItems: 'center', marginVertical: 20, gap: 12 },
  qrWrapper: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 12, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 3,
  },
  qr: { width: 160, height: 160 },
  qrCaption: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurfaceVariant, marginBottom: 12, fontFamily: 'NunitoSans-Bold' },
  bankCard: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 16, marginBottom: 16,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 3,
  },
  bankRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bankLabel: { fontSize: 12, color: Colors.onSurfaceVariant, marginBottom: 2, fontFamily: 'NunitoSans-Regular' },
  bankValue: { fontSize: 16, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  bankSub: { fontSize: 11, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  accountNumber: { fontSize: 16, fontWeight: '800', color: Colors.onSurface, letterSpacing: 2, fontFamily: 'NunitoSans-ExtraBold' },
  divider: { height: 1, backgroundColor: Colors.outlineVariant + '20', marginVertical: 12 },
  copyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: Colors.primary + '20', borderRadius: 8 },
  copyText: { fontSize: 12, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  contentCard: {
    backgroundColor: Colors.tertiary + '10', borderRadius: 16,
    padding: 12, marginBottom: 16, borderWidth: 2, borderColor: Colors.tertiaryContainer + '30',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  contentValue: { fontSize: 18, fontWeight: '700', color: Colors.tertiary, letterSpacing: 1, fontFamily: 'NunitoSans-Bold' },
  copyBtn2: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: Colors.tertiary, borderRadius: 8 },
  copyText2: { fontSize: 12, fontWeight: '700', color: Colors.onTertiary, fontFamily: 'NunitoSans-Bold' },
  warningBox: {
    flexDirection: 'row', gap: 10,
    backgroundColor: Colors.surfaceContainerHigh, borderRadius: 16,
    padding: 12, marginBottom: 16,
  },
  warningText: { flex: 1, fontSize: 14, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular', lineHeight: 20 },
  bottomBar: { paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 20, backgroundColor: Colors.surfaceContainerLowest },
  confirmBtn: {
    width: '100%', height: 52, borderRadius: 12,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  confirmBtnText: { fontSize: 16, fontWeight: '700', color: Colors.onPrimary, fontFamily: 'NunitoSans-Bold' },
});
