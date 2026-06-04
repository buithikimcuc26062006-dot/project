import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
import { Heart, Baby, Truck, MapPin } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { ORDER_CONFIRMATION, CONFETTI_COLORS } from '@/constants/order';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ConfettiParticle {
  id: number;
  color: string;
  left: number;
  scale: number;
  duration: number;
  drift: number;
}

function ConfettiOverlay() {
  const [particles] = useState<ConfettiParticle[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      left: Math.random() * SCREEN_WIDTH,
      scale: 0.4 + Math.random() * 0.6,
      duration: 2000 + Math.random() * 3000,
      drift: (Math.random() - 0.5) * 200,
    }))
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <ConfettiPiece key={p.id} particle={p} />
      ))}
    </View>
  );
}

function ConfettiPiece({ particle }: { particle: ConfettiParticle }) {
  const translateY = useRef(new Animated.Value(-10)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = 300 + Math.random() * 400;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT + 20,
        duration: particle.duration,
        delay,
        easing: Easing.bezier(0.1, 0.8, 0.3, 1),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: particle.drift,
        duration: particle.duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: particle.duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: particle.duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const size = 8 * particle.scale;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: particle.left,
        top: -10,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: particle.color,
        opacity,
        transform: [{ translateY }, { translateX }, { rotate: spin }],
      }}
    />
  );
}

function AnimatedCheckmark() {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const dashOffset = useRef(new Animated.Value(100)).current;
  const heartBounce = useRef(new Animated.Value(0)).current;
  const babyBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();

    Animated.timing(dashOffset, {
      toValue: 0,
      duration: 800,
      easing: Easing.bezier(0.65, 0, 0.45, 1),
      useNativeDriver: false,
    }).start();

    const bounce = (anim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: -6,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    bounce(heartBounce, 200);
    bounce(babyBounce, 500);
  }, []);

  return (
    <View style={styles.checkmarkWrapper}>
      <View style={styles.glowBg} />
      <Animated.View
        style={[
          styles.checkmarkCircle,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Svg width={64} height={64} viewBox="0 0 50 50">
          <AnimatedPath
            d="M10 25L20 35L40 15"
            stroke="#ffffff"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeDasharray={100}
            strokeDashoffset={dashOffset}
          />
        </Svg>
      </Animated.View>
      <Animated.View
        style={[
          styles.decorHeart,
          { transform: [{ translateY: heartBounce }] },
        ]}
      >
        <Heart size={20} color={Colors.primary} fill={Colors.primary} />
      </Animated.View>
      <Animated.View
        style={[
          styles.decorBaby,
          { transform: [{ translateY: babyBounce }] },
        ]}
      >
        <Baby size={24} color={Colors.onTertiaryContainer} />
      </Animated.View>
    </View>
  );
}

export default function OrderConfirmationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ConfettiOverlay />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedCheckmark />

        <View style={styles.headlineBlock}>
          <Text style={styles.title}>Đặt hàng thành công!</Text>
          <Text style={styles.subtitle}>
            Cảm ơn bạn đã tin tưởng Con Khỏe. Đơn hàng của bạn đang được
            xử lý nhanh chóng.
          </Text>
        </View>

        <View style={styles.orderCard}>
          <View style={styles.orderCodeRow}>
            <Text style={styles.orderCodeLabel}>Mã đơn hàng</Text>
            <Text style={styles.orderCodeValue}>
              {ORDER_CONFIRMATION.orderId}
            </Text>
          </View>

          <View style={styles.orderDetail}>
            <View style={styles.iconBoxShipping}>
              <Truck size={24} color={Colors.primary} fill={Colors.primary} />
            </View>
            <View>
              <Text style={styles.detailTitle}>Thời gian dự kiến</Text>
              <Text style={styles.detailValuePrimary}>
                {ORDER_CONFIRMATION.estimatedDelivery}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetail}>
            <View style={styles.iconBoxLocation}>
              <MapPin size={24} color={Colors.tertiary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Địa chỉ giao hàng</Text>
              <Text style={styles.detailValueMuted} numberOfLines={1}>
                {ORDER_CONFIRMATION.deliveryAddress}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.illustrationWrapper}>
          <Image
            source={{ uri: ORDER_CONFIRMATION.illustration }}
            style={styles.illustrationImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', Colors.primary + '33']}
            style={styles.illustrationGradient}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.trackBtn}
            activeOpacity={0.9}
            onPress={() => router.push('/order-tracking')}
          >
            <Text style={styles.trackBtnText}>Theo dõi đơn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.9}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Text style={styles.continueBtnText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 128,
    alignItems: 'center',
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  checkmarkWrapper: {
    width: 160,
    height: 160,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowBg: {
    position: 'absolute',
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: Colors.primary + '1A',
    transform: [{ scale: 1.1 }],
  },
  checkmarkCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 10,
  },
  decorHeart: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.babyPink,
    padding: 8,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  decorBaby: {
    position: 'absolute',
    bottom: 8,
    left: -16,
    backgroundColor: Colors.skyBlue,
    padding: 8,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  headlineBlock: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: 'NunitoSans-Bold',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    fontFamily: 'NunitoSans-Regular',
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 48,
    gap: 24,
    borderWidth: 1,
    borderColor: Colors.surfaceContainerHighest,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
  },
  orderCodeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainer,
  },
  orderCodeLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  orderCodeValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurface,
    backgroundColor: Colors.softGrey,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconBoxShipping: {
    backgroundColor: Colors.secondaryContainer,
    padding: 12,
    borderRadius: 12,
  },
  iconBoxLocation: {
    backgroundColor: Colors.tertiaryContainer + '33',
    padding: 12,
    borderRadius: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  detailValuePrimary: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
    marginTop: 2,
  },
  detailValueMuted: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
    marginTop: 2,
  },
  illustrationWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 48,
    position: 'relative',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  illustrationGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  actions: {
    width: '100%',
    gap: 16,
  },
  trackBtn: {
    width: '100%',
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  trackBtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  continueBtn: {
    width: '100%',
    height: 56,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
});
