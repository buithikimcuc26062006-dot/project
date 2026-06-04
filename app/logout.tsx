import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { X, LogOut } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function LogoutScreen() {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const scaleAnim = new Animated.Value(0.95);

  const handleLogout = () => {
    setVisible(false);
    setTimeout(() => {
      router.replace('/login');
    }, 300);
  };

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
          <X size={24} color={Colors.onSurface} />
        </TouchableOpacity>

        {/* Modal Card */}
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <LogOut size={48} color={Colors.error} />
          </View>

          {/* Content */}
          <Text style={styles.title}>Đăng xuất</Text>
          <Text style={styles.message}>Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng Con Khỏe không?</Text>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleLogout} activeOpacity={0.85}>
              <Text style={styles.confirmBtnText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} activeOpacity={0.85}>
              <Text style={styles.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(23, 29, 21, 0.4)',
    backdropFilter: 'blur(8px)', alignItems: 'center', justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute', top: 48, right: 24,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 20,
    paddingHorizontal: 32, paddingVertical: 32,
    maxWidth: 380, width: '85%',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, shadowRadius: 16, elevation: 8,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.errorContainer, alignItems: 'center',
    justifyContent: 'center', marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold', marginBottom: 8 },
  message: {
    fontSize: 16, color: Colors.onSurfaceVariant, textAlign: 'center',
    marginBottom: 24, fontFamily: 'NunitoSans-Regular', lineHeight: 24,
  },
  buttons: { width: '100%', gap: 12 },
  confirmBtn: {
    width: '100%', height: 52, borderRadius: 12,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  confirmBtnText: { fontSize: 16, fontWeight: '700', color: Colors.onPrimary, fontFamily: 'NunitoSans-Bold' },
  cancelBtn: {
    width: '100%', height: 52, borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh, borderWidth: 2, borderColor: Colors.outlineVariant,
    alignItems: 'center', justifyContent: 'center',
  },
  cancelBtnText: { fontSize: 16, fontWeight: '700', color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Bold' },
});
