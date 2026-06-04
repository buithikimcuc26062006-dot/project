import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Star, MessageCircle, ThumbsUp, PenLine } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  replies: number;
  images?: string[];
}

const REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Nguyễn Thị Hương',
    avatar: 'https://i.ibb.co/1s3h4K5/male-avatar-profile-202604202009.jpg',
    rating: 5,
    date: '15/03/2024',
    content: 'Sản phẩm chất lượng rất tốt, bé yêu của tôi rất thích. Giao hàng nhanh chóng và chuyên nghiệp. Cảm ơn cửa hàng!',
    likes: 45,
    replies: 3,
  },
  {
    id: 2,
    author: 'Trần Minh Tú',
    avatar: 'https://i.ibb.co/1s3h4K5/male-avatar-profile-202604202009.jpg',
    rating: 4,
    date: '14/03/2024',
    content: 'Chất lượng tốt nhưng giá hơi cao so với các nơi khác. Nhưng nhìn chung vẫn đáng mua.',
    likes: 12,
    replies: 1,
  },
  {
    id: 3,
    author: 'Phạm Quỳnh Anh',
    avatar: 'https://i.ibb.co/1s3h4K5/male-avatar-profile-202604202009.jpg',
    rating: 5,
    date: '12/03/2024',
    content: 'Tuyệt vời! Chính xác như mô tả. Bé mình dùng rất hài lòng.',
    likes: 28,
    replies: 2,
  },
];

export default function ReviewsScreen() {
  const router = useRouter();
  const [reviews, setReviews] = useState(REVIEWS);

  const handleLike = (id: number) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            color={star <= rating ? Colors.sunYellow : Colors.outlineVariant}
            fill={star <= rating ? Colors.sunYellow : 'transparent'}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bình luận & Nhận xét</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Rating Summary */}
        <View style={styles.ratingSummary}>
          <View style={styles.ratingScore}>
            <Text style={styles.ratingNumber}>4.7</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} color={Colors.sunYellow} fill={Colors.sunYellow} />
              ))}
            </View>
            <Text style={styles.ratingCount}>Từ 328 đánh giá</Text>
          </View>
          <View style={styles.ratingBreakdown}>
            {[5, 4, 3, 2, 1].map((rating) => (
              <View key={rating} style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>{rating}★</Text>
                <View style={styles.breakdownBar}>
                  <View
                    style={[
                      styles.breakdownFill,
                      { width: `${rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 8 : 2}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.writeReviewBtn}
          activeOpacity={0.9}
          onPress={() => router.push('/product-review')}
        >
          <PenLine size={18} color={Colors.onPrimary} />
          <Text style={styles.writeReviewText}>Viết đánh giá</Text>
        </TouchableOpacity>

        {/* Reviews List */}
        <Text style={styles.reviewsTitle}>Các bình luận ({reviews.length})</Text>
        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.authorInfo}>
                  <Image source={{ uri: review.avatar }} style={styles.avatar} />
                  <View style={styles.authorDetails}>
                    <Text style={styles.authorName}>{review.author}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                </View>
                {renderStars(review.rating)}
              </View>

              <Text style={styles.reviewContent}>{review.content}</Text>

              <View style={styles.reviewActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleLike(review.id)}
                >
                  <ThumbsUp size={14} color={Colors.primary} />
                  <Text style={styles.actionBtnText}>Thích ({review.likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <MessageCircle size={14} color={Colors.primary} />
                  <Text style={styles.actionBtnText}>Trả lời ({review.replies})</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

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
  ratingSummary: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  ratingScore: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  ratingNumber: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  ratingBreakdown: {
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    width: 28,
    fontFamily: 'NunitoSans-Regular',
  },
  breakdownBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 3,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    paddingVertical: 14,
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  writeReviewText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  reviewsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'NunitoSans-Bold',
  },
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorDetails: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  reviewDate: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  reviewContent: {
    fontSize: 13,
    color: Colors.onSurface,
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Regular',
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.softGrey,
    borderRadius: 8,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: 'NunitoSans-SemiBold',
  },
});
