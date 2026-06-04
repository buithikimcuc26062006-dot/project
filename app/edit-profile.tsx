import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Camera, User, Phone, Mail, Calendar, ShieldCheck } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function EditProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: 'Nguyễn Thị Mai Anh',
    phone: '0987 654 321',
    email: 'maianh.nguyen@email.com',
    dob: '1992-05-15',
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1500);
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

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.ibb.co/Wp67Y0pD/Create-a-high-quality-202604202008.jpg' }}
              style={styles.largeAvatar}
            />
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={20} color={Colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.editTitle}>Chỉnh sửa hồ sơ</Text>
          <Text style={styles.editSubtitle}>Cập nhật thông tin cá nhân của bạn</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.inputWrapper}>
              <User size={20} color={Colors.outline} style={{ marginRight: 12 }} />
              <TextInput
                style={styles.input}
                value={form.fullname}
                onChangeText={(text) => setForm({ ...form, fullname: text })}
                placeholder="Họ và tên"
                placeholderTextColor={Colors.onSurfaceVariant}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color={Colors.outline} style={{ marginRight: 12 }} />
              <TextInput
                style={styles.input}
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                placeholder="Số điện thoại"
                placeholderTextColor={Colors.onSurfaceVariant}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color={Colors.outline} style={{ marginRight: 12 }} />
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                placeholder="Email"
                placeholderTextColor={Colors.onSurfaceVariant}
              />
            </View>
          </View>

          {/* DOB */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <View style={styles.inputWrapper}>
              <Calendar size={20} color={Colors.outline} style={{ marginRight: 12 }} />
              <TextInput
                style={styles.input}
                value={form.dob}
                onChangeText={(text) => setForm({ ...form, dob: text })}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={Colors.onSurfaceVariant}
              />
            </View>
          </View>
        </View>

        {/* Security Badge */}
        <View style={styles.securityBadge}>
          <ShieldCheck size={18} color={Colors.primary} fill={Colors.primary} />
          <View style={styles.badgeText}>
            <Text style={styles.badgeTitle}>Thông tin được bảo mật</Text>
            <Text style={styles.badgeDesc}>Con Khỏe cam kết bảo vệ dữ liệu cá nhân của gia đình bạn theo tiêu chuẩn y tế.</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.8 }]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
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
  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  largeAvatar: { width: 112, height: 112, borderRadius: 56 },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 5,
  },
  editTitle: { fontSize: 24, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  editSubtitle: { fontSize: 16, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular', marginTop: 4 },
  formSection: { gap: 16, marginBottom: 20 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: '700', color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Bold' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 12,
    paddingHorizontal: 16, height: 56, borderWidth: 1, borderColor: Colors.outlineVariant + '20',
  },
  input: {
    flex: 1, fontSize: 16, color: Colors.onSurface, fontFamily: 'NunitoSans-Regular',
  },
  securityBadge: {
    flexDirection: 'row', gap: 12,
    backgroundColor: Colors.secondaryContainer + '20', borderRadius: 16,
    padding: 16, marginBottom: 24, borderWidth: 1, borderColor: Colors.secondaryContainer + '30',
  },
  badgeText: { flex: 1, gap: 4 },
  badgeTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSecondaryContainer, fontFamily: 'NunitoSans-Bold' },
  badgeDesc: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular', lineHeight: 18 },
  saveBtn: {
    width: '100%', height: 56, borderRadius: 12,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: Colors.onPrimary, fontFamily: 'NunitoSans-Bold' },
});
