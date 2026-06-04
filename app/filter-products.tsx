import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, X, Check } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface FilterOption {
  id: string;
  label: string;
  selected: boolean;
}

const PRICE_RANGES = [
  { id: 'under-100', label: 'Dưới 100k' },
  { id: '100-300', label: '100k - 300k' },
  { id: '300-500', label: '300k - 500k' },
  { id: 'over-500', label: 'Trên 500k' },
];

const CATEGORIES = [
  { id: 'milk', label: 'Sữa & Thức uống' },
  { id: 'toys', label: 'Đồ chơi' },
  { id: 'clothes', label: 'Quần áo' },
  { id: 'accessories', label: 'Phụ kiện' },
  { id: 'food', label: 'Thực phẩm' },
];

const RATINGS = [
  { id: '5star', label: '5 sao' },
  { id: '4up', label: '4 sao trở lên' },
  { id: '3up', label: '3 sao trở lên' },
];

export default function FilterProductsScreen() {
  const router = useRouter();
  const [priceRanges, setPriceRanges] = useState<FilterOption[]>(
    PRICE_RANGES.map((p) => ({ ...p, selected: false }))
  );
  const [categories, setCategories] = useState<FilterOption[]>(
    CATEGORIES.map((c) => ({ ...c, selected: false }))
  );
  const [ratings, setRatings] = useState<FilterOption[]>(
    RATINGS.map((r) => ({ ...r, selected: false }))
  );

  const toggleFilter = (
    id: string,
    type: 'price' | 'category' | 'rating'
  ) => {
    if (type === 'price') {
      setPriceRanges(
        priceRanges.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
      );
    } else if (type === 'category') {
      setCategories(
        categories.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
      );
    } else {
      setRatings(
        ratings.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
      );
    }
  };

  const selectedCount =
    priceRanges.filter((p) => p.selected).length +
    categories.filter((c) => c.selected).length +
    ratings.filter((r) => r.selected).length;

  const resetFilters = () => {
    setPriceRanges(priceRanges.map((p) => ({ ...p, selected: false })));
    setCategories(categories.map((c) => ({ ...c, selected: false })));
    setRatings(ratings.map((r) => ({ ...r, selected: false })));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bộ lọc</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Price Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Giá tiền</Text>
          <View style={styles.filterList}>
            {priceRanges.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.filterItem}
                onPress={() => toggleFilter(item.id, 'price')}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.selected && { backgroundColor: Colors.primary },
                  ]}
                >
                  {item.selected && (
                    <Check size={14} color={Colors.onPrimary} />
                  )}
                </View>
                <Text
                  style={[
                    styles.filterLabel,
                    item.selected && { fontWeight: '700' },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Danh mục</Text>
          <View style={styles.filterList}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.filterItem}
                onPress={() => toggleFilter(item.id, 'category')}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.selected && { backgroundColor: Colors.primary },
                  ]}
                >
                  {item.selected && (
                    <Check size={14} color={Colors.onPrimary} />
                  )}
                </View>
                <Text
                  style={[
                    styles.filterLabel,
                    item.selected && { fontWeight: '700' },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Đánh giá</Text>
          <View style={styles.filterList}>
            {ratings.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.filterItem}
                onPress={() => toggleFilter(item.id, 'rating')}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.selected && { backgroundColor: Colors.primary },
                  ]}
                >
                  {item.selected && (
                    <Check size={14} color={Colors.onPrimary} />
                  )}
                </View>
                <Text
                  style={[
                    styles.filterLabel,
                    item.selected && { fontWeight: '700' },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={resetFilters}
          activeOpacity={0.8}
        >
          <Text style={styles.resetBtnText}>Đặt lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} activeOpacity={0.8}>
          <Text style={styles.applyBtnText}>
            Áp dụng ({selectedCount})
          </Text>
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
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  filterList: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '20',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterLabel: {
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
  resetBtn: {
    flex: 0.3,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.softGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  resetBtnText: {
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
