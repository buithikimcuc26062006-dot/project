import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const TOTAL_AMOUNT = '1.250.000đ';
const TOTAL_RAW = '1.250.000đ';

const WALLETS = [
  {
    id: 'momo',
    name: 'Ví MoMo',
    balanceText: 'Số dư đủ: 2.450.000đ',
    balanceSufficient: true,
    bgColor: '#A50064',
    logo: 'https://i.ibb.co/N2qdDFzG/Mo-Mo-Logo-App-svg.png',
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    balanceText: 'Số dư: 450.000đ',
    balanceSufficient: false,
    bgColor: '#008FE5',
    logo: 'https://i.ibb.co/N6YWxmLK/images.png',
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    balanceText: 'Số dư đủ: 5.100.000đ',
    balanceSufficient: true,
    bgColor: '#EE4D2D',
    logo: 'https://i.ibb.co/689L5Z6z/Shopee-Pay-logo-svg.png',
  },
];

export default function EWalletScreen() {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState('momo');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Amount Highlight */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Tổng số tiền cần thanh toán</Text>
          <Text style={styles.amountValue}>{TOTAL_AMOUNT}</Text>
          <View style={styles.encryptedBadge}>
            <ShieldCheck size={16} color={Colors.onSecondaryContainer} fill={Colors.onSecondaryContainer} />
            <Text style={styles.encryptedText}>Giao dịch được mã hóa an toàn</Text>
          </View>
        </View>

        {/* Wallet Selection */}
        <Text style={styles.walletSectionTitle}>Chọn ví điện tử liên kết</Text>
        <View style={styles.walletList}>
          {WALLETS.map((wallet) => {
            const isSelected = selectedWallet === wallet.id;
            return (
              <TouchableOpacity
                key={wallet.id}
                style={[styles.walletCard, isSelected && styles.walletCardActive]}
                onPress={() => setSelectedWallet(wallet.id)}
                activeOpacity={0.85}
              >
                <View style={styles.walletLeft}>
                  <View style={[styles.walletLogoBox, { backgroundColor: wallet.bgColor }]}>
                    <Image
                      source={{ uri: wallet.logo }}
                      style={styles.walletLogo}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>{wallet.name}</Text>
                    {wallet.balanceSufficient ? (
                      <Text style={styles.balanceSufficient}>{wallet.balanceText}</Text>
                    ) : (
                      <Text style={styles.balanceInsufficient}>
                        {wallet.balanceText}{' '}
                        <Text style={styles.balanceInsufficientNote}>(Không đủ)</Text>
                      </Text>
                    )}
                  </View>
                </View>
                {isSelected && (
                  <ShieldCheck
                    size={24}
                    color={Colors.primary}
                    fill={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Security Info */}
        <View style={styles.securityBox}>
          <ShieldCheck size={22} color={Colors.outline} />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Bảo mật đa lớp</Text>
            <Text style={styles.securityDesc}>
              Thông tin thanh toán của bạn được bảo mật tuyệt đối theo tiêu chuẩn PCI DSS và chỉ sử dụng cho mục đích thanh toán đơn hàng này.
            </Text>
          </View>
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Bottom Action Footer */}
      <View style={styles.footer}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerSummaryLabel}>Sản phẩm (4)</Text>
          <Text style={styles.footerSummaryValue}>{TOTAL_RAW}</Text>
        </View>
        <TouchableOpacity
          style={[styles.payBtn, isProcessing && styles.payBtnDisabled]}
          onPress={handlePay}
          activeOpacity={0.85}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <ActivityIndicator size="small" color={Colors.onPrimaryContainer} />
              <Text style={styles.payBtnText}>Đang xử lý...</Text>
            </>
          ) : (
            <>
              <Text style={styles.payBtnText}>Thanh toán ngay</Text>
              <ChevronRight size={20} color={Colors.onPrimaryContainer} />
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.footerDisclaimer}>
          Bằng việc thanh toán, bạn đồng ý với Điều khoản của Con Khỏe
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
    zIndex: 100,
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
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },

  // Amount section
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 4,
    fontFamily: 'NunitoSans-Bold',
  },
  amountValue: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.8,
    marginBottom: 8,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  encryptedText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },

  // Wallet selection
  walletSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'NunitoSans-Bold',
  },
  walletList: {
    gap: 12,
    marginBottom: 16,
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 3,
  },
  walletCardActive: {
    borderColor: Colors.primary,
    transform: [{ scale: 1.02 }],
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  walletLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletLogo: {
    width: 32,
    height: 32,
  },
  walletInfo: { flex: 1, gap: 2 },
  walletName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  balanceSufficient: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  balanceInsufficient: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  balanceInsufficientNote: {
    color: Colors.error,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },

  // Security box
  securityBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '4d',
    padding: 16,
    marginBottom: 8,
  },
  securityText: { flex: 1, gap: 4 },
  securityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  securityDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 18,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 12,
  },
  footerSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  footerSummaryLabel: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  footerSummaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primaryContainer,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  payBtnDisabled: {
    opacity: 0.8,
  },
  payBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
  footerDisclaimer: {
    fontSize: 12,
    color: Colors.outline,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  },
});
