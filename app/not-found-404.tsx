import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Home, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function NotFoundScreen() {
  const router = useRouter();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Animated Icon */}
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <View style={styles.iconBox}>
          <Text style={styles.errorCode}>404</Text>
        </View>
      </Animated.View>

      {/* Error Title */}
      <Text style={styles.title}>Trang không tìm thấy</Text>

      {/* Error Description */}
      <Text style={styles.description}>
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </Text>

      {/* Suggestion Box */}
      <View style={styles.suggestionBox}>
        <Text style={styles.suggestionTitle}>Có thể bạn muốn:</Text>
        <TouchableOpacity style={styles.suggestionItem} activeOpacity={0.7}>
          <View style={styles.suggestionIcon}>
            <Home size={20} color={Colors.primary} />
          </View>
          <Text style={styles.suggestionText}>Về trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.suggestionItem} activeOpacity={0.7}>
          <View style={styles.suggestionIcon}>
            <Search size={20} color={Colors.primary} />
          </View>
          <Text style={styles.suggestionText}>Tìm kiếm sản phẩm</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.homeBtn} activeOpacity={0.8} onPress={() => router.push('/')}>
          <Text style={styles.homeBtnText}>Về Trang chủ</Text>
          <ArrowRight size={18} color={Colors.onPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8} onPress={() => router.push('/search')}>
          <Search size={18} color={Colors.primary} />
          <Text style={styles.searchBtnText}>Tìm kiếm</Text>
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
    paddingVertical: 40,
  },
  iconBox: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  errorCode: {
    fontSize: 60,
    fontWeight: '800',
    color: Colors.error,
    fontFamily: 'NunitoSans-ExtraBold',
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
  suggestionBox: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  suggestionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  suggestionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primaryContainer + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionText: {
    fontSize: 13,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  homeBtn: {
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
  homeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  searchBtn: {
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
  searchBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
});
