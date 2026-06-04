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
import { ArrowLeft, ShoppingCart, ChevronRight, Wallet } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const WALLETS = [
  {
    id: 1,
    name: 'MoMo',
    icon: '📱',
    balance: '1,250,000',
    color: Colors.primary,
    bgColor: Colors.primary + '20',
  },
  {
    id: 2,
    name: 'ZaloPay',
    icon: '👛',
    balance: '3,500,000',
    color: Colors.secondary,
    bgColor: Colors.secondary + '20',
  },
  {
    id: 3,
    name: 'ShopeePay',
    icon: '🛒',
    balance: '890,000',
    color: Colors.tertiary,
    bgColor: Colors.tertiary + '20',
  },
];

export default function EWalletScreen() {
  const router = useRouter();
  const [selectedWallet, setSelectedWallet] = useState(0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ví điện tử</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <Text style={styles.title}>Chọn phương thức thanh toán</Text>
        <Text style={styles.subtitle}>Chọn ví điện tử yêu thích của bạn để thanh toán</Text>

        {/* Wallet Cards */}
        <View style={styles.walletsSection}>
          {WALLETS.map((wallet, index) => (
            <TouchableOpacity
              key={wallet.id}
              style={[
                styles.walletCard,
                selectedWallet === index && styles.walletCardActive,
              ]}
              onPress={() => setSelectedWallet(index)}
              activeOpacity={0.85}
            >
              <View style={styles.walletContent}>
                <View style={[styles.walletIcon, { backgroundColor: wallet.bgColor }]}>
                  <Text style={styles.walletEmoji}>{wallet.icon}</Text>
                </View>
                <View style={styles.walletInfo}>
                  <Text style={styles.walletName}>{wallet.name}</Text>
                  <Text style={styles.walletBalance}>Số dư: {wallet.balance} đ</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedWallet === index && [styles.radioButtonActive, { backgroundColor: wallet.color }],
                ]}
              >
                {selectedWallet === index && <Text style={styles.radioCheck}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active Wallet Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Thông tin ví</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tên ví</Text>
              <Text style={styles.detailValue}>{WALLETS[selectedWallet].name}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Số dư hiện tại</Text>
              <Text style={[styles.detailValue, { color: Colors.primary, fontWeight: '700' }]}>
                {WALLETS[selectedWallet].balance} đ
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Trạng thái</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>✓ Hoạt động</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.actionTitle}>Thao tác nhanh</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionEmoji}>💰</Text>
            <Text style={styles.actionLabel}>Nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionEmoji}>📤</Text>
            <Text style={styles.actionLabel}>Rút tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionEmoji}>📋</Text>
            <Text style={styles.actionLabel}>Lịch sử</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Text style={styles.actionEmoji}>⚙️</Text>
            <Text style={styles.actionLabel}>Cài đặt</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmBtnText}>Tiếp tục thanh toán</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    marginBottom: 20,
    fontFamily: 'NunitoSans-Regular',
  },
  walletsSection: { gap: 12, marginBottom: 24 },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.outlineVariant + '20',
  },
  walletCardActive: {
    borderColor: WALLETS[0].color + '50',
    backgroundColor: WALLETS[0].color + '10',
  },
  walletContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletEmoji: { fontSize: 24 },
  walletInfo: { flex: 1, gap: 4 },
  walletName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  walletBalance: {
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
  radioButtonActive: {
    borderWidth: 0,
  },
  radioCheck: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  detailsSection: { marginBottom: 24 },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  detailsCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant + '20',
    marginVertical: 12,
  },
  statusBadge: {
    backgroundColor: Colors.secondaryContainer + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  actionEmoji: { fontSize: 28 },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  confirmBtn: {
    width: '100%',
    height: 56,
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
