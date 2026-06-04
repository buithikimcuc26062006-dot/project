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
  Star,
  Gift,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Award,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const MENU_ITEMS = [
  { icon: Gift, label: 'Kho Voucher', sub: '12 mới', color: Colors.tertiary, badge: '12' },
  { icon: Heart, label: 'Sản phẩm đã thích', sub: '', color: Colors.babyPink },
  { icon: Settings, label: 'Cài đặt', sub: '', color: Colors.outlineVariant },
  { icon: HelpCircle, label: 'Hỗ trợ', sub: '', color: Colors.skyBlue },
];

export default function MyProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={styles.menuBtn} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <TouchableOpacity>
          <ShoppingCart size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.ibb.co/Wp67Y0pD/Create-a-high-quality-202604202008.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>✓</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Nguyễn Minh Anh</Text>
            <View style={styles.loyaltyRow}>
              <Star size={14} color={Colors.primary} fill={Colors.primary} />
              <Text style={styles.loyaltyText}>2,450 điểm thưởng</Text>
            </View>
            <View style={styles.memberBadge}>
              <Text style={styles.memberText}>Thành viên Kim Cương</Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionLabel}>Đơn hàng của tôi</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: Colors.babyPink + '40' }]}>
                <Text style={styles.summaryIconText}>⏳</Text>
              </View>
              <Text style={styles.summaryLabel}>Chờ thanh toán</Text>
              <Text style={styles.summaryBadge}>2</Text>
            </View>
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: Colors.skyBlue + '40' }]}>
                <Text style={styles.summaryIconText}>🚚</Text>
              </View>
              <Text style={styles.summaryLabel}>Đang giao</Text>
            </View>
            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: Colors.secondaryContainer + '40' }]}>
                <Text style={styles.summaryIconText}>✓</Text>
              </View>
              <Text style={styles.summaryLabel}>Hoàn thành</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} activeOpacity={0.8}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.sub && <Text style={styles.menuSub}>{item.sub}</Text>}
              </View>
              <View style={styles.menuRight}>
                {item.badge && <Text style={styles.badge2}>{item.badge}</Text>}
                <ChevronRight size={18} color={Colors.outline} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85} onPress={() => router.push('/logout' as any)}>
          <LogOut size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  menuBtn: { width: 24, height: 24 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  profileCard: {
    flexDirection: 'row', gap: 12, marginBottom: 24,
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 12, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 3,
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  badge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  badgeIcon: { fontSize: 12, color: Colors.onPrimaryContainer, fontWeight: '700' },
  profileInfo: { flex: 1, justifyContent: 'center', gap: 4 },
  name: { fontSize: 18, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  loyaltyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  loyaltyText: { fontSize: 12, color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  memberBadge: { backgroundColor: Colors.secondaryContainer + '30', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999, alignSelf: 'flex-start' },
  memberText: { fontSize: 11, color: Colors.onSecondaryContainer, fontWeight: '600', fontFamily: 'NunitoSans-SemiBold' },
  summarySection: { marginBottom: 20 },
  sectionLabel: { fontSize: 12, color: Colors.onSurfaceVariant, fontWeight: '700', marginBottom: 12, fontFamily: 'NunitoSans-Bold' },
  summaryGrid: { flexDirection: 'row', gap: 12 },
  summaryCard: {
    flex: 1, backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 12, alignItems: 'center', gap: 8,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 3,
  },
  summaryIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  summaryIconText: { fontSize: 20 },
  summaryLabel: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  summaryBadge: {
    position: 'absolute', top: 4, right: 4,
    backgroundColor: Colors.error, color: '#fff',
    fontSize: 10, fontWeight: '700', width: 20, height: 20,
    borderRadius: 10, textAlign: 'center', lineHeight: 20,
  },
  menuSection: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.outlineVariant + '20',
  },
  menuIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuContent: { flex: 1 },
  menuLabel: { fontSize: 16, fontWeight: '600', color: Colors.onSurface, fontFamily: 'NunitoSans-SemiBold' },
  menuSub: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 2, fontFamily: 'NunitoSans-Regular' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  badge2: {
    backgroundColor: Colors.error, color: '#fff', fontSize: 9,
    fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 9999,
    fontFamily: 'NunitoSans-Bold',
  },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, borderRadius: 12,
    backgroundColor: Colors.errorContainer + '30', borderWidth: 2, borderColor: Colors.error + '30',
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: Colors.error, fontFamily: 'NunitoSans-Bold' },
});
