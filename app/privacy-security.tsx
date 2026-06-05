import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ShieldCheck,
  Fingerprint,
  Smartphone,
  Tablet,
  MapPin,
  Bell,
  TriangleAlert,
  Home,
  Grid,
  Lock,
  User,
  LogOut,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [biometric, setBiometric] = useState(true);
  const [location, setLocation] = useState(true);
  const [personalizedNotifs, setPersonalizedNotifs] = useState(false);

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ArrowLeft size={22} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy &amp; Security</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <ShieldCheck size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Visual */}
        <View style={styles.heroCard}>
          <View style={styles.heroDecorTop} />
          <View style={styles.heroDecorBottom} />
          <View style={styles.heroContent}>
            <ShieldCheck
              size={48}
              color={Colors.primary}
              fill={Colors.primary}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.heroText}>Your data is safe with us</Text>
          </View>
        </View>

        {/* Section: Security */}
        <Text style={styles.sectionLabel}>Security</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: Colors.primary + '1a' }]}>
                <Fingerprint size={20} color={Colors.primary} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Biometric Login</Text>
                <Text style={styles.settingDesc}>Use FaceID or TouchID to login</Text>
              </View>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
              thumbColor={Colors.surfaceContainerLowest}
            />
          </View>
        </View>

        {/* Section: Devices */}
        <Text style={styles.sectionLabel}>Devices</Text>
        <View style={styles.card}>
          {/* Header row */}
          <View style={[styles.settingRow, styles.borderBottom]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: Colors.skyBlue + '33' }]}>
                <Smartphone size={20} color={Colors.primary} />
              </View>
              <Text style={styles.settingTitle}>Login Sessions</Text>
            </View>
          </View>

          {/* iPhone 13 - current device */}
          <View style={[styles.settingRow, styles.borderBottom]}>
            <View style={styles.settingLeft}>
              <Smartphone size={20} color={Colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={styles.deviceName}>iPhone 13</Text>
                <Text style={styles.deviceActiveText}>Active now</Text>
              </View>
            </View>
            <View style={styles.thisDeviceBadge}>
              <Text style={styles.thisDeviceText}>This Device</Text>
            </View>
          </View>

          {/* iPad Pro - other device */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Tablet size={20} color={Colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={styles.deviceName}>iPad Pro</Text>
                <Text style={styles.settingDesc}>Last active: 2 hours ago</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất thiết bị này không?')}
            >
              <LogOut size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Privacy Permissions */}
        <Text style={styles.sectionLabel}>Privacy Permissions</Text>
        <View style={styles.card}>
          {/* Location Access */}
          <View style={[styles.settingRow, styles.borderBottom]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: Colors.tertiaryContainer + '1a' }]}>
                <MapPin size={20} color={Colors.tertiary} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Location Access</Text>
                <Text style={styles.settingDesc}>Needed for finding nearby clinics</Text>
              </View>
            </View>
            <Switch
              value={location}
              onValueChange={setLocation}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
              thumbColor={Colors.surfaceContainerLowest}
            />
          </View>

          {/* Personalized Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: Colors.babyPink + '4d' }]}>
                <Bell size={20} color={Colors.onSurface} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Personalized Notifications</Text>
                <Text style={styles.settingDesc}>App tracking for custom wellness tips</Text>
              </View>
            </View>
            <Switch
              value={personalizedNotifs}
              onValueChange={setPersonalizedNotifs}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
              thumbColor={Colors.surfaceContainerLowest}
            />
          </View>
        </View>

        {/* Section: Account Management */}
        <Text style={[styles.sectionLabel, { paddingTop: 16 }]}>Account Management</Text>
        <View style={styles.dangerBox}>
          <TriangleAlert size={28} color={Colors.error} />
          <Text style={styles.dangerDesc}>
            Want to stop using Con Khỏe? All your medical records and baby progress will be permanently erased.
          </Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.85}
            onPress={() =>
              Alert.alert(
                'Xóa tài khoản',
                'Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Bạn có chắc không?',
                [
                  { text: 'Hủy', style: 'cancel' },
                  { text: 'Xóa', style: 'destructive' },
                ]
              )
            }
          >
            <Text style={styles.deleteBtnText}>Request Permanent Account Deletion</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.gdprNote}>
          Legal Compliance: General Data Protection Regulation (GDPR) Ready.
        </Text>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/')}>
          <Home size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Grid size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Danh mục</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Lock size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive} onPress={() => router.push('/my-profile')}>
          <User size={18} color={Colors.onSecondaryContainer} fill={Colors.onSecondaryContainer} />
          <Text style={styles.navLabelActive}>Tài khoản</Text>
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
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },

  // Hero
  heroCard: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.primaryContainer + '33',
    borderWidth: 1,
    borderColor: Colors.primary + '1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
    position: 'relative',
  },
  heroDecorTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.primary,
    opacity: 0.1,
    transform: [{ translateX: 32 }, { translateY: -32 }],
  },
  heroDecorBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: Colors.tertiaryContainer,
    opacity: 0.1,
    transform: [{ translateX: -64 }, { translateY: 64 }],
  },
  heroContent: {
    zIndex: 1,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },

  // Section label
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 4,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },

  // Card
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 3,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '4d',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: { flex: 1, gap: 2 },
  settingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  settingDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  deviceActiveText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  thisDeviceBadge: {
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  thisDeviceText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Danger zone
  dangerBox: {
    backgroundColor: Colors.errorContainer + '33',
    borderWidth: 1,
    borderColor: Colors.error + '1a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dangerDesc: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
    lineHeight: 24,
  },
  deleteBtn: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: Colors.error,
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.error,
    fontFamily: 'NunitoSans-Bold',
  },
  gdprNote: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    paddingTop: 8,
    fontFamily: 'NunitoSans-Regular',
  },

  // Bottom Nav
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
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '20',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 12,
    zIndex: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
});
