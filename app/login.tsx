import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Decorative blobs */}
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      <View style={styles.main}>
        {/* Brand */}
        <View style={styles.brand}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGOg0Kp69oSbso-L_vMeBfFoSWBtIHZI9QkjXpQt_NXOAj2o2woL-QN0zywqxj1G3dFCETOQLIcJe8U3bWHssbUGFQlr_XOFAwylxOSBYJzFLVMIGe9bA3GQAq4McEVcd0VJSqO2yPK6PbuNSK0bzUA_Ir81vWjIW-W15lUPsems19X6mZ0YCGONjW6R7J45xW6ZZWRIcC3k3Gskut7puAalb-LUPNG2MJtw7j33LVruRFX96jYO32bXqPJRVOUVOUtWz37izedQL-' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeTitle}>Chào mừng ba mẹ</Text>
          <Text style={styles.welcomeSubtitle}>
            Đăng nhập để bắt đầu hành trình chăm sóc sức khỏe cho bé yêu
          </Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          {/* Google Button */}
          <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
            <View style={styles.googleIconWrapper}>
              {/* Google G SVG equivalent using colored circles */}
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Tiếp tục với Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Hoặc</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Phone Button */}
          <TouchableOpacity
            style={styles.phoneButton}
            activeOpacity={0.85}
            onPress={() => router.push('/verify')}
          >
            <Text style={styles.phoneButtonText}>Đăng nhập bằng số điện thoại</Text>
          </TouchableOpacity>

          {/* Email Button */}
          <TouchableOpacity
            style={styles.emailButton}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.emailButtonText}>Sử dụng Email</Text>
          </TouchableOpacity>
        </View>

        {/* Security Badge */}
        <View style={styles.securityContainer}>
          <View style={styles.securityBadge}>
            <ShieldCheck size={16} color={Colors.primary} fill={Colors.primary} />
            <Text style={styles.securityBadgeText}>BẢO MẬT CHUẨN Y KHOA</Text>
          </View>
          <Text style={styles.securityCaption}>
            Thông tin của bạn được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn an toàn dữ liệu.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Điều khoản dịch vụ</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>Chính sách bảo mật</Text>
        </View>
        <Text style={styles.footerCopy}>© 2024 Con Khỏe. Phát triển bởi sự tận tâm.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  blobTopRight: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: 300,
    height: 300,
    backgroundColor: Colors.primaryFixed + '33',
    borderRadius: 9999,
  },
  blobBottomLeft: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: 350,
    height: 350,
    backgroundColor: Colors.secondaryFixed + '33',
    borderRadius: 9999,
  },
  main: {
    width: '100%',
    maxWidth: 448,
    zIndex: 10,
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  brand: {
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 96,
    height: 96,
  },
  welcomeTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  welcomeSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    fontFamily: 'NunitoSans-Regular',
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 32,
    padding: 32,
    gap: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 8,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
  },
  googleIconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 12,
  },
  googleG: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.5,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.outline,
    fontFamily: 'NunitoSans-SemiBold',
  },
  phoneButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  phoneButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  emailButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
  },
  emailButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
  securityContainer: {
    alignItems: 'center',
    gap: 8,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primaryContainer + '33',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  securityBadgeText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: 'NunitoSans-Bold',
  },
  securityCaption: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 16,
    fontFamily: 'NunitoSans-Regular',
  },
  footer: {
    paddingBottom: 32,
    alignItems: 'center',
    gap: 8,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  footerLink: {
    fontSize: 12,
    color: Colors.outline,
    fontFamily: 'NunitoSans-SemiBold',
  },
  footerDot: {
    color: Colors.outlineVariant,
  },
  footerCopy: {
    fontSize: 11,
    color: Colors.outlineVariant,
    fontFamily: 'NunitoSans-Regular',
  },
});
