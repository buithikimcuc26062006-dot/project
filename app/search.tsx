import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Animated,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, ShoppingCart, Mic, X } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { PRODUCTS } from '@/constants/products';

const SUGGESTIONS = ['Bình sữa Pigeon', 'Ghế hơi tập ngồi', 'Nhiệt kế hồng ngoại', 'Xe chòi chân'];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [voiceVisible, setVoiceVisible] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const wave1 = useRef(new Animated.Value(1)).current;
  const wave2 = useRef(new Animated.Value(1)).current;
  const wave3 = useRef(new Animated.Value(1)).current;
  const typeIndex = useRef(0);

  const fullText = 'Tìm xe chòi chân cho bé';

  useEffect(() => {
    if (!voiceVisible) return;
    setRecognizedText('');
    typeIndex.current = 0;

    // Start wave animations
    const animate = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1.5, duration: 800, delay, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();

    animate(wave1, 0);
    animate(wave2, 300);
    animate(wave3, 600);

    // Typewriter
    const typeTimer = setInterval(() => {
      if (typeIndex.current < fullText.length) {
        setRecognizedText(fullText.slice(0, typeIndex.current + 1));
        typeIndex.current++;
      } else {
        clearInterval(typeTimer);
      }
    }, 80);

    return () => clearInterval(typeTimer);
  }, [voiceVisible]);

  const filteredProducts = query
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : PRODUCTS.slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Con Khỏe</Text>
        <TouchableOpacity>
          <ShoppingCart size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm cho bé..."
            placeholderTextColor={Colors.onSurfaceVariant}
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity onPress={() => setVoiceVisible(true)}>
            <Mic size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {!query && (
          <View style={styles.suggestionsSection}>
            <Text style={styles.suggestionsTitle}>Tìm kiếm phổ biến</Text>
            <View style={styles.chips}>
              {SUGGESTIONS.map((s, i) => (
                <TouchableOpacity key={i} style={styles.chip} onPress={() => setQuery(s)}>
                  <Text style={styles.chipText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageBg}>
                <Image source={{ uri: product.main_image }} style={styles.productImage} resizeMode="contain" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price_display}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Voice Overlay Modal */}
      <Modal visible={voiceVisible} transparent animationType="fade">
        <View style={styles.voiceOverlay}>
          {/* Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => setVoiceVisible(false)}>
            <X size={24} color={Colors.onSurface} />
          </TouchableOpacity>

          {/* Waves + Mic */}
          <View style={styles.waveContainer}>
            <Animated.View style={[styles.wave, styles.wave3, { transform: [{ scale: wave3 }] }]} />
            <Animated.View style={[styles.wave, styles.wave2, { transform: [{ scale: wave2 }] }]} />
            <Animated.View style={[styles.wave, styles.wave1, { transform: [{ scale: wave1 }] }]} />
            <View style={styles.micCircle}>
              <Mic size={56} color="#ffffff" fill="#ffffff" />
            </View>
          </View>

          {/* Text */}
          <View style={styles.voiceTextSection}>
            <Text style={styles.listeningText}>Đang lắng nghe...</Text>
            <Text style={styles.recognizedText}>"{recognizedText}"</Text>
          </View>

          {/* Hints */}
          <View style={styles.hints}>
            <View style={styles.hintChips}>
              {SUGGESTIONS.slice(0, 2).map((s, i) => (
                <View key={i} style={styles.hintChip}>
                  <Text style={styles.hintChipText}>{s}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.hintsLabel}>Gợi ý tìm kiếm</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, height: 56, backgroundColor: Colors.surface,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  searchBarWrapper: { paddingHorizontal: 20, paddingVertical: 14 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 9999,
    paddingHorizontal: 20, height: 52,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
    borderWidth: 1.5, borderColor: Colors.primaryContainer + '40',
  },
  searchInput: {
    flex: 1, fontSize: 15, color: Colors.onSurface, fontFamily: 'NunitoSans-Regular',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
  suggestionsSection: { marginBottom: 20 },
  suggestionsTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, marginBottom: 10, fontFamily: 'NunitoSans-Bold' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9999,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1, borderColor: Colors.outlineVariant,
  },
  chipText: { fontSize: 13, color: Colors.primary, fontFamily: 'NunitoSans-SemiBold' },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productCard: {
    width: '47%', backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16, overflow: 'hidden', padding: 12,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  productImageBg: { aspectRatio: 1, backgroundColor: Colors.softGrey, borderRadius: 12, marginBottom: 8 },
  productImage: { width: '100%', height: '100%' },
  productName: { fontSize: 13, color: Colors.onSurface, lineHeight: 18, fontFamily: 'NunitoSans-Regular', marginBottom: 6 },
  productPrice: { fontSize: 16, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  // Voice overlay
  voiceOverlay: {
    flex: 1, backgroundColor: 'rgba(244,252,238,0.88)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute', top: 48, right: 24,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  waveContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  wave: {
    position: 'absolute', borderRadius: 9999,
    backgroundColor: Colors.primaryContainer, opacity: 0.2,
  },
  wave1: { width: 128, height: 128 },
  wave2: { width: 192, height: 192 },
  wave3: { width: 256, height: 256 },
  micCircle: {
    width: 128, height: 128, borderRadius: 64,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 12,
  },
  voiceTextSection: { alignItems: 'center', gap: 8, paddingHorizontal: 40, marginTop: 16 },
  listeningText: { fontSize: 24, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  recognizedText: { fontSize: 18, color: Colors.onSurface, textAlign: 'center', fontFamily: 'NunitoSans-Regular' },
  hints: { position: 'absolute', bottom: 80, alignItems: 'center', gap: 8 },
  hintChips: { flexDirection: 'row', gap: 10 },
  hintChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 9999, borderWidth: 1, borderColor: Colors.primaryContainer + '50',
  },
  hintChipText: { fontSize: 13, color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  hintsLabel: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
});
