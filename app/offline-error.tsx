import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { WifiOff, RefreshCw, Home } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function OfflineErrorScreen() {
  const router = useRouter();
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -20, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Icon */}
      <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
        <View style={styles.iconBox}>
          <WifiOff size={64} color={Colors.error} />
        </View>
      </Animated.View>

      {/* Error Title */}
      <Text style={styles.title}>Mất kết nối Internet</Text>

      {/* Error Description */}
      <Text style={styles.description}>
        Vui lòng kiểm tra kết nối Internet của bạn và thử lại
      </Text>

      {/* Tips */}
      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>Mẹo:</Text>
        <Text style={styles.tipItem}>• Kiểm tra kết nối Wi-Fi hoặc dữ liệu di động</Text>
        <Text style={styles.tipItem}>• Tắt rồi bật lại máy bay chế độ</Text>
        <Text style={styles.tipItem}>• Khởi động lại ứng dụng</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.retryBtn} activeOpacity={0.8}>
          <RefreshCw size={20} color={Colors.onPrimary} />
          <Text style={styles.retryBtnText}>Thử lại</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} activeOpacity={0.8} onPress={() => router.push('/')}>
          <Home size={20} color={Colors.primary} />
          <Text style={styles.homeBtnText}>Về Trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.error + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  description: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
  },
  tipsBox: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    width: '100%',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  tipItem: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginBottom: 6,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  retryBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  retryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  homeBtn: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.softGrey,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  homeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
});
