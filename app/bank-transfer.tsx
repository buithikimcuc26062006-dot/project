import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Copy, Info, CheckCircle2, QrCode } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function BankTransferScreen() {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);

  const copyToClipboard = (text: string) => {
    // In a real app, use Clipboard setString API
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chuyển khoản ngân hàng</Text>
        <View style={styles.spacer} />
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

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <View style={styles.qrCard}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZxk-LQLbXr6YLaaluCKMM9s6IR-_StJZ5-4g9jk1jPt7-RRezSCh302OQtHzb-xlzgzJiF4pOIhHrg14WyLYzS5XnJ4YVo8sSjX-aMvtrVSvvwBCranAoMni-UnHsePI1r88UZEvCkjlOHzUErHDeIAJQLtVaczG0Y5DRZLUOE-pf3kqoIoL7j3rpULhNmz3HcPf4OU7h5ZwrS4EFAKMGnMxyaKLFOAOKPgF0AWwrO4s2QjBPWYuYKY6uWi6-QrGuLqxKcIBnj2aI' }}
              style={styles.qrImage}
              resizeMode="contain"
            />
            <View style={styles.qrBadge}>
              <QrCode size={18} color={Colors.primary} />
              <Text style={styles.qrBadgeText}>Quét mã để thanh toán nhanh</Text>
            </View>
          </View>
          <Text style={styles.qrTip}>
            Sử dụng ứng dụng Ngân hàng hoặc Ví điện tử để quét mã VietQR. Hệ thống sẽ tự động điền số tiền và nội dung.
          </Text>
        </View>

        {/* Bank Details */}
        <Text style={styles.sectionTitle}>Thông tin tài khoản</Text>
        <View style={styles.bankCard}>
          <View style={styles.bankHeader}>
            <View style={styles.bankHeaderLeft}>
              <Text style={styles.captionText}>Ngân hàng</Text>
              <Text style={styles.bankValue}>Vietcombank</Text>
              <Text style={styles.captionText}>Chi nhánh TP. Hồ Chí Minh</Text>
            </View>
            <View style={styles.bankLogoWrapper}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT5GnFgqZYBcuheQNw0-vHLB09rdZFJGFMuhpqNXe90KGh4z8z08PLCB_9suWCbGBuUkSWq4OqmJL7rLq3WG-HxPbG9Vr3PPzycMc-71uP74ctB7RQ_S2d1NpIfEx-Fr-MAbRJBxx0UGrIv6roT2PysVXyolbUljjpMC3038Rnj-ZPD4KR4EVGR1QMbSSDrICQpZVIZayDD-KYkjpf_EIcGgkkx-6fvQZWy1DXNQABrdki1t3zeEVtsmjYE35m2wUyEz8aWiA-WIGh' }}
                style={styles.bankLogo}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.bankOwnerSection}>
            <Text style={styles.captionText}>Tên tài khoản</Text>
            <Text style={styles.bankOwnerName}>CON KHOE ECOSYSTEM</Text>
          </View>

          <View style={styles.accountNumberSection}>
            <View>
              <Text style={styles.captionText}>Số tài khoản</Text>
              <Text style={styles.accountNumber}>1234567890</Text>
            </View>
            <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard('1234567890')}>
              <Copy size={16} color={Colors.primary} />
              <Text style={styles.copyButtonText}>Sao chép</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transfer Content */}
        <Text style={styles.sectionTitle}>Nội dung chuyển khoản</Text>
        <View style={styles.contentCard}>
          <View style={styles.contentLeft}>
            <Text style={styles.contentValue}>CKH8829410</Text>
            <Text style={styles.contentSub}>Vui lòng nhập chính xác nội dung này</Text>
          </View>
          <TouchableOpacity style={styles.copyButtonContent} onPress={() => copyToClipboard('CKH8829410')}>
            <Copy size={16} color={Colors.onTertiary} />
            <Text style={styles.copyButtonTextContent}>Sao chép</Text>
          </TouchableOpacity>
        </View>

        {/* Warning */}
        <View style={styles.warningBox}>
          <Info size={20} color={Colors.error} style={styles.warningIcon} />
          <Text style={styles.warningText}>
            Vui lòng chuyển khoản <Text style={styles.warningBold}>đúng số tiền</Text> và <Text style={styles.warningBold}>nội dung</Text> để hệ thống tự động xác nhận đơn hàng của bạn ngay lập tức.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmBtnText}>Tôi đã chuyển khoản</Text>
          <CheckCircle2 size={24} color={Colors.onPrimary} />
        </TouchableOpacity>
      </View>

      {/* Toast Notification */}
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Đã sao chép vào bộ nhớ tạm</Text>
        </View>
      )}
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
  backButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    width: 40, height: 40, borderRadius: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  spacer: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  summaryCard: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 16, marginBottom: 16,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08, shadowRadius: 30, elevation: 3,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 16, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  summaryValue: { fontSize: 16, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  summaryPrice: { fontSize: 22, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  qrSection: { alignItems: 'center', marginVertical: 16 },
  qrCard: {
    backgroundColor: Colors.surfaceContainerLowest, padding: 24, borderRadius: 16,
    borderWidth: 2, borderColor: Colors.primaryContainer + '20',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08, shadowRadius: 30, elevation: 5, marginBottom: 16, alignItems: 'center',
  },
  qrImage: { width: 256, height: 256, borderRadius: 8 },
  qrBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 },
  qrBadgeText: { fontSize: 14, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  qrTip: { fontSize: 12, color: Colors.onSurfaceVariant, textAlign: 'center', paddingHorizontal: 16, fontFamily: 'NunitoSans-Regular', lineHeight: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurfaceVariant, marginBottom: 12, marginLeft: 4, fontFamily: 'NunitoSans-Bold' },
  bankCard: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 16, marginBottom: 16,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08, shadowRadius: 30, elevation: 3,
  },
  bankHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 1, borderBottomColor: Colors.outlineVariant + '40', paddingBottom: 16 },
  bankHeaderLeft: { gap: 4 },
  bankValue: { fontSize: 16, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  bankLogoWrapper: { width: 48, height: 48, backgroundColor: Colors.softGrey, borderRadius: 8, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  bankLogo: { width: 40, height: 40 },
  bankOwnerSection: { gap: 4, marginTop: 16 },
  bankOwnerName: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, textTransform: 'uppercase', fontFamily: 'NunitoSans-Bold' },
  accountNumberSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surfaceContainerLow, padding: 12, borderRadius: 8, marginTop: 16 },
  accountNumber: { fontSize: 22, fontWeight: '800', color: Colors.onSurface, letterSpacing: 1, fontFamily: 'NunitoSans-ExtraBold' },
  copyButton: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: Colors.surfaceContainerLowest, borderRadius: 8, borderWidth: 1, borderColor: Colors.outlineVariant + '40' },
  copyButtonText: { fontSize: 14, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  captionText: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  contentCard: {
    backgroundColor: Colors.tertiaryContainer + '1a', borderWidth: 2, borderColor: Colors.tertiaryContainer + '4d', borderRadius: 16, padding: 16, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.08, shadowRadius: 30, elevation: 5, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  contentLeft: { gap: 4 },
  contentValue: { fontSize: 24, fontWeight: '800', color: Colors.tertiary, letterSpacing: 2, fontFamily: 'NunitoSans-ExtraBold' },
  contentSub: { fontSize: 12, color: Colors.tertiary + 'cc', fontFamily: 'NunitoSans-Regular' },
  copyButtonContent: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: Colors.tertiary, borderRadius: 9999, shadowColor: Colors.tertiary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
  copyButtonTextContent: { fontSize: 14, fontWeight: '700', color: Colors.onTertiary, fontFamily: 'NunitoSans-Bold' },
  warningBox: { flexDirection: 'row', gap: 12, backgroundColor: Colors.surfaceContainerHigh, padding: 16, borderRadius: 16, alignItems: 'flex-start', marginBottom: 24 },
  warningIcon: { marginTop: 2 },
  warningText: { flex: 1, fontSize: 16, color: Colors.onSurfaceVariant, lineHeight: 24, fontFamily: 'NunitoSans-Regular' },
  warningBold: { color: Colors.onSurface, fontWeight: '700', fontFamily: 'NunitoSans-Bold' },
  bottomBar: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.surfaceContainerLowest, borderTopLeftRadius: 16, borderTopRightRadius: 16, shadowColor: Colors.primary, shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.08, shadowRadius: 30, elevation: 8, position: 'absolute', bottom: 0, left: 0, right: 0 },
  confirmBtn: { width: '100%', height: 56, borderRadius: 9999, backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  confirmBtnText: { fontSize: 24, fontWeight: '700', color: Colors.onPrimary, fontFamily: 'NunitoSans-Bold' },
  toast: { position: 'absolute', bottom: 120, alignSelf: 'center', backgroundColor: Colors.inverseSurface, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 9999, alignItems: 'center', justifyContent: 'center', zIndex: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  toastText: { color: Colors.inverseOnSurface, fontSize: 14, fontWeight: '700', fontFamily: 'NunitoSans-Bold' },
});
