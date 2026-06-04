import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Wrench, CheckCircle, Home } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function MaintenanceScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Icon */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View style={styles.iconBox}>
          <Wrench size={64} color={Colors.primary} />
        </View>
      </Animated.View>

      {/* Title */}
      <Text style={styles.title}>Bảo trì hệ thống</Text>

      {/* Description */}
      <Text style={styles.description}>
        Chúng tôi đang bảo trì hệ thống để cung cấp dịch vụ tốt hơn cho bạn
      </Text>

      {/* Maintenance Info */}
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <CheckCircle size={20} color={Colors.tertiary} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Dự kiến hoàn thành</Text>
            <Text style={styles.infoDesc}>Hôm nay lúc 18:00</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <CheckCircle size={20} color={Colors.tertiary} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Các tính năng bị ảnh hưởng</Text>
            <Text style={styles.infoDesc}>Toàn bộ ứng dụng</Text>
          </View>
        </View>
      </View>

      {/* Message */}
      <View style={styles.messageBox}>
        <Text style={styles.messageTitle}>Cảm ơn bạn vì sự chờ đợi!</Text>
        <Text style={styles.messageDesc}>
          Chúng tôi sẽ cố gắng hoàn thành sớm hơn. Vui lòng kiểm tra lại sau.
        </Text>
      </View>

      {/* Contact Support */}
      <View style={styles.supportBox}>
        <Text style={styles.supportText}>Cần hỗ trợ?</Text>
        <TouchableOpacity style={styles.supportBtn} activeOpacity={0.8}>
          <Text style={styles.supportBtnText}>Liên hệ với bộ phận hỗ trợ</Text>
        </TouchableOpacity>
      </View>

      {/* Home Button */}
      <TouchableOpacity style={styles.homeBtn} onPress={() => router.push('/')} activeOpacity={0.8}>
        <Home size={18} color={Colors.primary} />
        <Text style={styles.homeBtnText}>Về Trang chủ</Text>
      </TouchableOpacity>
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
    paddingVertical: 40,
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryContainer + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  description: {
    fontSize: 15,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
  },
  infoBox: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    gap: 12,
  },
  infoText: {
    flex: 1,
    gap: 2,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  infoDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  messageBox: {
    width: '100%',
    backgroundColor: Colors.tertiary + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.tertiary,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.tertiary,
    marginBottom: 6,
    fontFamily: 'NunitoSans-Bold',
  },
  messageDesc: {
    fontSize: 12,
    color: Colors.tertiary,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  supportBox: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
    gap: 12,
  },
  supportText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  supportBtn: {
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
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
