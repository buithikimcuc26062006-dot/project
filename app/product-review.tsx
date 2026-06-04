import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Switch,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  X,
  Star,
  Video,
  ImagePlus,
  Pencil,
  EyeOff,
  Send,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import {
  RATING_LABELS,
  MIN_REVIEW_LENGTH,
  DEFAULT_REVIEW_PRODUCT,
} from '@/constants/review';

const GRID_GAP = 12;
const HORIZONTAL_PADDING = 20;

function getSlotSize(): number {
  const width = Dimensions.get('window').width;
  return (width - HORIZONTAL_PADDING * 2 - GRID_GAP * 3) / 4;
}

export default function ProductReviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const slotSize = getSlotSize();
  const videoSize = slotSize * 2 + GRID_GAP;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const canSubmit = rating > 0 && review.trim().length >= MIN_REVIEW_LENGTH;

  const handleMediaPress = (type: 'video' | 'photo', index?: number) => {
    Alert.alert(
      type === 'video' ? 'Thêm Video' : 'Thêm ảnh',
      `Chọn ${type === 'video' ? 'video' : 'hình ảnh'} từ thư viện hoặc máy ảnh${index != null ? ` (${index + 1})` : ''}.`
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Chưa chọn sao', 'Vui lòng chọn mức độ hài lòng của bạn.');
      return;
    }
    if (review.trim().length < MIN_REVIEW_LENGTH) {
      Alert.alert(
        'Nội dung quá ngắn',
        `Vui lòng nhập ít nhất ${MIN_REVIEW_LENGTH} ký tự.`
      );
      return;
    }
    Alert.alert(
      'Gửi thành công',
      'Cảm ơn bạn đã đánh giá sản phẩm!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={styles.headerBtn}
        >
          <X size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Viết Đánh Giá</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 120 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.productCard}>
          <View style={styles.productImageWrapper}>
            <Image
              source={{ uri: DEFAULT_REVIEW_PRODUCT.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>
              {DEFAULT_REVIEW_PRODUCT.name}
            </Text>
            <Text style={styles.productDesc}>
              {DEFAULT_REVIEW_PRODUCT.desc}
            </Text>
          </View>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingQuestion}>
            Mức độ hài lòng của bạn?
          </Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.8}
                style={styles.starBtn}
              >
                <Star
                  size={48}
                  color={
                    star <= rating ? Colors.primary : Colors.outlineVariant
                  }
                  fill={star <= rating ? Colors.primary : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingLabel}>{RATING_LABELS[rating]}</Text>
          )}
        </View>

        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>Hình ảnh & Video thực tế</Text>
          <View style={styles.uploadGrid}>
            <TouchableOpacity
              style={[
                styles.videoSlot,
                {
                  width: videoSize,
                  height: videoSize,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => handleMediaPress('video')}
            >
              <Video size={32} color={Colors.primary} />
              <Text style={styles.videoSlotText}>Thêm Video</Text>
            </TouchableOpacity>
            <View style={styles.photoGrid}>
              <View style={styles.photoRow}>
                {[0, 1].map((i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.photoSlot,
                      { width: slotSize, height: slotSize },
                    ]}
                    activeOpacity={0.85}
                    onPress={() => handleMediaPress('photo', i)}
                  >
                    <ImagePlus size={24} color={Colors.onSurfaceVariant} />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.photoRow}>
                {[2, 3].map((i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.photoSlot,
                      { width: slotSize, height: slotSize },
                    ]}
                    activeOpacity={0.85}
                    onPress={() => handleMediaPress('photo', i)}
                  >
                    <ImagePlus size={24} color={Colors.onSurfaceVariant} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitleDark}>
              Chia sẻ trải nghiệm của bạn
            </Text>
            <Text style={styles.charHint}>Tối thiểu 20 ký tự</Text>
          </View>
          <View style={styles.textareaWrapper}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Hãy kể về chất lượng sản phẩm, dịch vụ giao hàng để giúp người mua sau nhé..."
              placeholderTextColor={Colors.outlineVariant}
              multiline
              textAlignVertical="top"
              value={review}
              onChangeText={setReview}
            />
            <View style={styles.editIconWrap}>
              <Pencil size={14} color={Colors.onSurfaceVariant + '99'} />
            </View>
          </View>
        </View>

        <View style={styles.anonymousBox}>
          <View style={styles.anonymousLeft}>
            <EyeOff size={22} color={Colors.primary} fill={Colors.primary} />
            <View>
              <Text style={styles.anonymousLabel}>Đánh giá ẩn danh</Text>
              <Text style={styles.anonymousDesc}>
                Tên của bạn sẽ hiển thị là B***
              </Text>
            </View>
          </View>
          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            trackColor={{
              false: Colors.outlineVariant + '4D',
              true: Colors.primary,
            }}
            thumbColor="#ffffff"
            ios_backgroundColor={Colors.outlineVariant + '4D'}
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={!canSubmit && styles.submitDisabled}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnText}>Gửi Đánh Giá</Text>
            <Send size={22} color={Colors.onPrimary} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 8,
    backgroundColor: Colors.surface,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
    zIndex: 50,
  },
  headerBtn: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 32,
    gap: 32,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
  },
  productImageWrapper: {
    width: 80,
    height: 80,
    backgroundColor: Colors.softGrey,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  productDesc: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  ratingSection: {
    alignItems: 'center',
    gap: 8,
  },
  ratingQuestion: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontFamily: 'NunitoSans-Bold',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starBtn: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  mediaSection: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  sectionTitleDark: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  uploadGrid: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  videoSlot: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary + '33',
    backgroundColor: Colors.primary + '0D',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  videoSlotText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  photoGrid: {
    flex: 1,
    gap: GRID_GAP,
  },
  photoRow: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  photoSlot: {
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.outlineVariant + '4D',
    backgroundColor: Colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewSection: {
    gap: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  charHint: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  textareaWrapper: {
    position: 'relative',
  },
  reviewInput: {
    height: 160,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 3,
    ...Platform.select({
      web: { outlineStyle: 'none' } as object,
      default: {},
    }),
  },
  editIconWrap: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  anonymousBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
  },
  anonymousLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 12,
  },
  anonymousLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  anonymousDesc: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: 'rgba(1, 131, 78, 0.1)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 12,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 9999,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  submitDisabled: {
    opacity: 0.5,
  },
});
