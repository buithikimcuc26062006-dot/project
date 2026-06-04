import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface SortOption {
  id: string;
  label: string;
  icon: string;
}

const SORT_OPTIONS: SortOption[] = [
  { id: 'default', label: 'Mặc định', icon: '⇅' },
  { id: 'newest', label: 'Mới nhất', icon: '⭐' },
  { id: 'best-selling', label: 'Bán chạy nhất', icon: '🔥' },
  { id: 'price-low', label: 'Giá: Thấp đến Cao', icon: '↑' },
  { id: 'price-high', label: 'Giá: Cao đến Thấp', icon: '↓' },
  { id: 'rating', label: 'Đánh giá cao nhất', icon: '⭐' },
  { id: 'discount', label: 'Giảm giá nhiều nhất', icon: '🏷' },
];

export default function SortProductsScreen() {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState('default');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sắp xếp</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Sort Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Chọn cách sắp xếp sản phẩm</Text>
          <Text style={styles.infoDesc}>
            Thay đổi thứ tự hiển thị sản phẩm theo sở thích của bạn
          </Text>
        </View>

        {/* Sort Options */}
        <View style={styles.sortList}>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortItem,
                selectedSort === option.id && styles.sortItemActive,
              ]}
              onPress={() => setSelectedSort(option.id)}
              activeOpacity={0.8}
            >
              <View style={styles.sortContent}>
                <Text style={styles.sortIcon}>{option.icon}</Text>
                <Text
                  style={[
                    styles.sortLabel,
                    selectedSort === option.id && { fontWeight: '700' },
                  ]}
                >
                  {option.label}
                </Text>
              </View>
              {selectedSort === option.id && (
                <Check size={20} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelBtnText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} activeOpacity={0.8}>
          <Text style={styles.applyBtnText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
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
  infoBox: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  infoDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  sortList: {
    gap: 10,
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sortItemActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
  },
  sortContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortIcon: {
    fontSize: 20,
  },
  sortLabel: {
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelBtn: {
    flex: 0.3,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.softGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  applyBtn: {
    flex: 0.7,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
