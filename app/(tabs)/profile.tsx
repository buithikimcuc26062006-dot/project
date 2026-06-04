import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Bell,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const MENU_ITEMS = [
  { icon: ShoppingBag, label: 'Đơn hàng của tôi', sub: '3 đơn đang xử lý' },
  { icon: Heart, label: 'Yêu thích', sub: '12 sản phẩm' },
  { icon: MapPin, label: 'Địa chỉ giao hàng', sub: 'Thêm địa chỉ' },
  { icon: Bell, label: 'Thông báo', sub: '5 thông báo mới' },
];

const BOTTOM_ITEMS = [
  { icon: ShieldCheck, label: 'Bảo mật & Quyền riêng tư' },
  { icon: HelpCircle, label: 'Trợ giúp & Hỗ trợ' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBg}>
              <User size={44} color={Colors.onPrimary} />
            </View>
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>✎</Text>
            </View>
          </View>
          <Text style={styles.profileName}>Mẹ Lan Anh</Text>
          <Text style={styles.profileEmail}>lananh@gmail.com</Text>
          <View style={styles.profileBadge}>
            <ShieldCheck size={14} color={Colors.primary} fill={Colors.primary} />
            <Text style={styles.profileBadgeText}>Thành viên Con Khỏe</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>12</Text>
            <Text style={styles.statLabel}>Yêu thích</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>560</Text>
            <Text style={styles.statLabel}>Điểm thưởng</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBg}>
                <item.icon size={20} color={Colors.primary} />
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <ChevronRight size={18} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom menu */}
        <View style={styles.menuSection}>
          {BOTTOM_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBg}>
                <item.icon size={20} color={Colors.outline} />
              </View>
              <Text style={[styles.menuLabel, { flex: 1 }]}>{item.label}</Text>
              <ChevronRight size={18} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.85}
          onPress={() => router.replace('/login')}
        >
          <LogOut size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Con Khỏe v1.0.0 • © 2024</Text>
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20, height: 56, backgroundColor: Colors.surface,
    justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  scroll: { flex: 1 },
  profileCard: {
    margin: 20, backgroundColor: Colors.primary, borderRadius: 24, padding: 24,
    alignItems: 'center', gap: 8,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 10,
  },
  avatarWrapper: { position: 'relative' },
  avatarBg: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: Colors.primaryFixed + '33',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.primary,
  },
  editBadgeText: { fontSize: 12, color: Colors.onSecondaryContainer },
  profileName: { fontSize: 20, fontWeight: '800', color: '#fff', fontFamily: 'NunitoSans-ExtraBold' },
  profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.75)', fontFamily: 'NunitoSans-Regular' },
  profileBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 9999,
  },
  profileBadgeText: { fontSize: 12, color: '#fff', fontFamily: 'NunitoSans-SemiBold' },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.surfaceContainerLowest,
    marginHorizontal: 20, borderRadius: 20, padding: 16,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statNum: { fontSize: 20, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  statLabel: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  statDivider: { width: 1, backgroundColor: Colors.outlineVariant, marginVertical: 4 },
  menuSection: {
    marginHorizontal: 20, marginTop: 16, backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 20, overflow: 'hidden',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.outlineVariant + '30',
  },
  menuIconBg: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center', justifyContent: 'center',
  },
  menuText: { flex: 1, gap: 2 },
  menuLabel: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  menuSub: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginHorizontal: 20, marginTop: 20, paddingVertical: 16,
    backgroundColor: Colors.errorContainer + '40', borderRadius: 16,
    borderWidth: 1, borderColor: Colors.error + '30',
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: Colors.error, fontFamily: 'NunitoSans-Bold' },
  version: { textAlign: 'center', fontSize: 12, color: Colors.outlineVariant, marginTop: 12, fontFamily: 'NunitoSans-Regular' },
});
