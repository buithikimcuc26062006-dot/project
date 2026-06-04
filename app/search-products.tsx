import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Search, X, Clock, TrendingUp } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface SearchSuggestion {
  id: string;
  text: string;
  icon: any;
}

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  { id: '1', text: 'Bình sữa Pigeon', icon: Clock },
  { id: '2', text: 'Tã sơ sinh Merries', icon: Clock },
  { id: '3', text: 'Bộ quần áo sơ sinh', icon: Clock },
  { id: '4', text: 'Xe đẩy em bé', icon: Clock },
];

const TRENDING_SEARCHES = [
  'Bình sữa',
  'Tã sơ sinh',
  'Quần áo bé',
  'Đồ chơi an toàn',
  'Ghế ăn dặm',
];

export default function SearchProductsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Bình sữa',
    'Tã sơ sinh',
  ]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchQuery(query);
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches].slice(0, 5));
      }
    }
  };

  const clearRecentSearch = (index: number) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.outlineVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor={Colors.outlineVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={Colors.outlineVariant} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchQuery)}>
          <Text style={styles.searchBtnText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!searchQuery ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
                </View>
                <View style={styles.searchList}>
                  {recentSearches.map((search, index) => (
                    <View key={index} style={styles.searchItem}>
                      <Clock size={18} color={Colors.onSurfaceVariant} />
                      <TouchableOpacity
                        style={styles.searchItemContent}
                        onPress={() => setSearchQuery(search)}
                      >
                        <Text style={styles.searchItemText}>{search}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => clearRecentSearch(index)}>
                        <X size={18} color={Colors.outlineVariant} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={18} color={Colors.primary} />
                <Text style={styles.sectionTitle}>Tìm kiếm hot</Text>
              </View>
              <View style={styles.trendingTags}>
                {TRENDING_SEARCHES.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tagButton}
                    onPress={() => handleSearch(search)}
                  >
                    <Text style={styles.tagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Featured Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Danh mục nổi bật</Text>
              <View style={styles.categoriesGrid}>
                {[
                  { name: 'Sữa & Thức uống', emoji: '🍼' },
                  { name: 'Đồ chơi', emoji: '🧸' },
                  { name: 'Quần áo', emoji: '👕' },
                  { name: 'Phụ kiện', emoji: '👶' },
                ].map((cat, index) => (
                  <TouchableOpacity key={index} style={styles.categoryCard} activeOpacity={0.8}>
                    <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Search Results */}
            <Text style={styles.resultsTitle}>
              Kết quả tìm kiếm cho "{searchQuery}"
            </Text>
            <View style={styles.resultsList}>
              {SEARCH_SUGGESTIONS.map((suggestion) => (
                <TouchableOpacity key={suggestion.id} style={styles.resultItem} activeOpacity={0.7}>
                  <Search size={18} color={Colors.primary} />
                  <Text style={styles.resultText}>{suggestion.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.softGrey,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  searchBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'NunitoSans-Bold',
  },
  searchList: {
    gap: 8,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 10,
  },
  searchItemContent: {
    flex: 1,
  },
  searchItemText: {
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
  trendingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    backgroundColor: Colors.primaryContainer + '30',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: 'NunitoSans-SemiBold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'NunitoSans-Bold',
  },
  resultsList: {
    gap: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 14,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
  },
});
