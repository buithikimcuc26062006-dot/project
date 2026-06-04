import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function SplashScreen() {
  const router = useRouter();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -15, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();

    // Fade in animations
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.delay(200),
      Animated.timing(fadeAnim2, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.delay(200),
      Animated.timing(fadeAnim3, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top decorative blob */}
      <View style={styles.topBlob} />

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJa8y_5FEeW1dU2KWMq8CeBj2WlOHGRDnGwPLlvvsW2GMPC5QHB2N51gBtZ6GiF5YYGqQxnWh2Ke_rb2pQKCKrp8QiatRRayomJD1REuey69M3BQ5xcmem8JgYNI3L3-i_KHb0s3ilEVWNet4LrsP6xBkKeyzc8c13S9rdcYoAo-FpmBVz2M0DmFduf8pGI5-fjELbYr7XcP124i50iCuQi7ds-O7OjfEjc_1CygTCCEro4CTdL4JMzsxY_oIT7HLOAvllftRMSYmy' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <View style={styles.shadowBlob} />
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[styles.taglineContainer, { opacity: fadeAnim2 }]}>
        <Text style={styles.appName}>Con Khỏe</Text>
        <Text style={styles.tagline}>Đồng hành cùng mẹ chăm sóc bé yêu mỗi ngày</Text>
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim3 }]}>
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.85}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.startButtonText}>Bắt đầu ngay</Text>
          <ArrowRight color={Colors.onPrimary} size={20} />
        </TouchableOpacity>
        <Text style={styles.footerCaption}>Hệ sinh thái mẹ và bé hàng đầu Việt Nam</Text>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: Colors.primary + '33' }]} />
          <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: Colors.primary + '33' }]} />
        </View>
      </Animated.View>

      {/* Bottom decorative */}
      <View style={styles.bottomRight} />
      <View style={styles.midLeft} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4fcee',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    overflow: 'hidden',
  },
  topBlob: {
    position: 'absolute',
    top: -80,
    left: '-10%',
    width: '120%',
    height: 256,
    backgroundColor: Colors.primaryContainer,
    borderRadius: 9999,
    opacity: 0.4,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
  },
  logo: {
    width: 280,
    height: 157,
  },
  shadowBlob: {
    width: 140,
    height: 16,
    backgroundColor: Colors.primary + '1A',
    borderRadius: 9999,
    marginTop: -8,
  },
  taglineContainer: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 40,
  },
  appName: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  tagline: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
    maxWidth: 280,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
    marginTop: 32,
  },
  startButton: {
    width: '100%',
    maxWidth: 380,
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonText: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  footerCaption: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: 256,
    height: 256,
    backgroundColor: Colors.tertiaryContainer,
    borderRadius: 9999,
    opacity: 0.1,
  },
  midLeft: {
    position: 'absolute',
    top: '25%',
    left: -48,
    width: 128,
    height: 128,
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 9999,
    opacity: 0.2,
  },
});
