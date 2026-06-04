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
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Sparkles,
  CreditCard,
  Info,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const NOTIFICATIONS = [
  {
    icon: Zap,
    label: 'Flash sale',
    desc: 'Nhận tin khi có chương trình giảm giá chớp nhoáng',
    defaultOn: true,
  },
  {
    icon: Sparkles,
    label: 'Sản phẩm mới',
    desc: 'Cập nhật những bộ sưu tập và đồ dùng mới nhất cho bé',
    defaultOn: true,
  },
  {
    icon: CreditCard,
    label: 'Nhắc thanh toán',
    desc: 'Thông báo khi đơn hàng của bạn đang chờ hoàn tất',
    defaultOn: false,
  },
];

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(NOTIFICATIONS.map((n) => n.defaultOn));

  const handleToggle = (index: number) => {
    const newSettings = [...settings];
    newSettings[index] = !newSettings[index];
    setSettings(newSettings);
  };

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
        {/* Title */}
        <Text style={styles.title}>Thông báo</Text>
        <Text style={styles.subtitle}>Quản lý cách bạn nhận cập nhật từ Con Khỏe để không bỏ lỡ những điều quan trọng nhất cho bé.</Text>

        {/* Section 1: Shopping */}
        <Text style={styles.sectionLabel}>Ưu đãi & Mua sắm</Text>
        {NOTIFICATIONS.slice(0, 2).map((notif, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={[styles.icon, { backgroundColor: notif.icon === Zap ? Colors.primary + '20' : Colors.secondaryContainer + '30' }]}>
                <notif.icon size={20} color={notif.icon === Zap ? Colors.primary : Colors.secondary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{notif.label}</Text>
                <Text style={styles.cardDesc}>{notif.desc}</Text>
              </View>
            </View>
            <Switch
              value={settings[i]}
              onValueChange={() => handleToggle(i)}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
              thumbColor={settings[i] ? Colors.onPrimary : Colors.onSurfaceVariant}
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>
        ))}

        {/* Section 2: Transactions */}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Giao dịch</Text>
        {NOTIFICATIONS.slice(2).map((notif, i) => (
          <View key={i + 2} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={[styles.icon, { backgroundColor: Colors.tertiaryContainer + '20' }]}>
                <notif.icon size={20} color={Colors.tertiary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{notif.label}</Text>
                <Text style={styles.cardDesc}>{notif.desc}</Text>
              </View>
            </View>
            <Switch
              value={settings[i + 2]}
              onValueChange={() => handleToggle(i + 2)}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
              thumbColor={settings[i + 2] ? Colors.onPrimary : Colors.onSurfaceVariant}
              style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            />
          </View>
        ))}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Info size={18} color={Colors.outline} />
          <Text style={styles.infoText}>Chúng tôi cam kết chỉ gửi những thông báo thực sự cần thiết. Bạn có thể thay đổi cài đặt này bất cứ lúc nào.</Text>
        </View>

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
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: '700', color: Colors.onSurface, marginBottom: 8, fontFamily: 'NunitoSans-Bold' },
  subtitle: { fontSize: 16, color: Colors.onSurfaceVariant, marginBottom: 24, lineHeight: 24, fontFamily: 'NunitoSans-Regular' },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: Colors.primary, letterSpacing: 1, marginBottom: 12, fontFamily: 'NunitoSans-Bold', textTransform: 'uppercase' },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 12, marginBottom: 12, borderWidth: 1, borderColor: Colors.outlineVariant + '20',
  },
  cardLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardContent: { flex: 1, gap: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  cardDesc: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular', lineHeight: 16 },
  infoCard: {
    flexDirection: 'row', gap: 12,
    backgroundColor: Colors.surfaceContainerHigh, borderRadius: 16,
    padding: 16, marginTop: 20,
  },
  infoText: { flex: 1, fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular', lineHeight: 18, fontStyle: 'italic' },
});
