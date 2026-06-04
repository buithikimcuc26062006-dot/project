import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Lock, Eye, Bell, Smartphone, Globe } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface PrivacySetting {
  id: string;
  title: string;
  desc: string;
  icon: any;
  enabled: boolean;
}

const INITIAL_SETTINGS: PrivacySetting[] = [
  {
    id: 'profile_visible',
    title: 'Hồ sơ công khai',
    desc: 'Cho phép mọi người xem hồ sơ của bạn',
    icon: Eye,
    enabled: true,
  },
  {
    id: 'activity_visible',
    title: 'Hiển thị hoạt động',
    desc: 'Hiển thị trạng thái hoạt động của bạn',
    icon: Eye,
    enabled: false,
  },
  {
    id: 'notifications',
    title: 'Thông báo',
    desc: 'Nhận thông báo từ ứng dụng',
    icon: Bell,
    enabled: true,
  },
  {
    id: 'mobile_login',
    title: 'Đăng nhập từ thiết bị khác',
    desc: 'Cảnh báo khi có đăng nhập mới',
    icon: Smartphone,
    enabled: true,
  },
  {
    id: 'two_factor',
    title: 'Xác thực hai bước',
    desc: 'Bảo vệ tài khoản với xác thực hai bước',
    icon: Lock,
    enabled: false,
  },
  {
    id: 'data_share',
    title: 'Chia sẻ dữ liệu',
    desc: 'Cho phép chia sẻ dữ liệu để cải thiện dịch vụ',
    icon: Globe,
    enabled: true,
  },
];

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quyền riêng tư & Bảo mật</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro Section */}
        <View style={styles.introBox}>
          <Lock size={32} color={Colors.primary} />
          <Text style={styles.introText}>
            Quản lý cài đặt quyền riêng tư và bảo mật tài khoản của bạn
          </Text>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Cài đặt quyền riêng tư</Text>
        <View style={styles.settingsList}>
          {settings.map((setting) => {
            const IconComponent = setting.icon;
            return (
              <View key={setting.id} style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <View style={styles.settingIcon}>
                    <IconComponent size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    <Text style={styles.settingDesc}>{setting.desc}</Text>
                  </View>
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggleSetting(setting.id)}
                  trackColor={{ false: Colors.outlineVariant + '40', true: Colors.primaryContainer }}
                  thumbColor={setting.enabled ? Colors.primary : Colors.outlineVariant}
                />
              </View>
            );
          })}
        </View>

        {/* Danger Zone */}
        <Text style={styles.dangerTitle}>Nâng cao</Text>
        <TouchableOpacity style={styles.dangerBox}>
          <Text style={styles.dangerText}>Xóa tài khoản</Text>
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
  introBox: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  introText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  settingsList: {
    gap: 12,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryContainer + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    gap: 2,
  },
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
  dangerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.error,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  dangerBox: {
    backgroundColor: Colors.error + '15',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.error + '30',
    alignItems: 'center',
  },
  dangerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.error,
    fontFamily: 'NunitoSans-Bold',
  },
});
