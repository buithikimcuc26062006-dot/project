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
import {
  ArrowLeft,
  ShoppingCart,
  MapPin,
  Lock,
  Globe,
  FileText,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const MENU_ITEMS = [
  { icon: MapPin, label: 'Địa chỉ giao hàng', desc: 'Quản lý địa chỉ của bạn' },
  { icon: Lock, label: 'Mật khẩu & Bảo mật', desc: 'Đổi mật khẩu và cấu hình bảo mật' },
  { icon: Globe, label: 'Ngôn ngữ', desc: 'Chọn ngôn ngữ ưu tiên' },
  { icon: FileText, label: 'Điều khoản & Chính sách', desc: 'Xem các điều khoản sử dụng' },
];

const STATS = [
  { icon: '⭐', label: 'Điểm thưởng', value: '2,450' },
  { icon: '✓', label: 'Đơn hàng hoàn thành', value: '24' },
  { icon: '🎁', label: 'Voucher khả dụng', value: '12' },
];

export default function AccountSettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://i.ibb.co/Wp67Y0pD/Create-a-high-quality-202604202008.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nguyễn Minh Anh</Text>
            <Text style={styles.profileEmail}>maianh.nguyen@email.com</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <ChevronRight size={20} color={Colors.outline} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          {STATS.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statEmoji}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings Menu */}
        <Text style={styles.sectionLabel}>Cài đặt tài khoản</Text>
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, i !== MENU_ITEMS.length - 1 && styles.menuItemBorder]}
              activeOpacity={0.8}
            >
              <View style={styles.menuIcon}>
                <item.icon size={20} color={Colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
              <ChevronRight size={18} color={Colors.outline} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger Zone */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Zona nguy hiểm</Text>
        <TouchableOpacity style={styles.dangerBtn} activeOpacity={0.85}>
          <Text style={styles.dangerBtnText}>Xóa tài khoản</Text>
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
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  profileEmail: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  statEmoji: { fontSize: 24 },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  statLabel: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
    textTransform: 'uppercase',
  },
  menuSection: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '20',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    gap: 2,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  menuDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  dangerBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.errorContainer + '30',
    borderWidth: 2,
    borderColor: Colors.error + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.error,
    fontFamily: 'NunitoSans-Bold',
  },
});
