import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MessageCircle, Heart, Share2, Users, PlusCircle } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const POSTS = [
  {
    id: 1,
    author: 'Mẹ Ngọc Anh',
    avatar: 'https://i.pravatar.cc/40?img=47',
    time: '2 giờ trước',
    content: 'Hôm nay bé nhà mình đã biết đứng vịn rồi các mẹ ơi 🎉 Cảm ơn chiếc xe chòi thú cừu từ Con Khỏe đã giúp bé tập đi nhanh hơn!',
    image: 'https://i.ibb.co/t50QHBv/n-i-n-u-ch-m-0-8l.png',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    author: 'Bố Minh Tuấn',
    avatar: 'https://i.pravatar.cc/40?img=12',
    time: '5 giờ trước',
    content: 'Chia sẻ kinh nghiệm: Nồi cháo Bear 0.8L nấu được khoảng 2-3 bữa cho bé. Cháo ra mịn và thơm lắm, bé ăn rất thích!',
    image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
    likes: 47,
    comments: 15,
  },
  {
    id: 3,
    author: 'Mẹ Thu Hà',
    avatar: 'https://i.pravatar.cc/40?img=32',
    time: '1 ngày trước',
    content: 'Nhiệt kế hồng ngoại đo rất nhanh và chính xác. Bé sốt đêm không cần đánh thức bé dậy nữa, chỉ cần đưa máy lại là biết ngay!',
    image: null,
    likes: 63,
    comments: 22,
  },
];

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Users size={22} color={Colors.primary} />
          <Text style={styles.headerTitle}>Cộng đồng</Text>
        </View>
        <TouchableOpacity style={styles.newPostBtn}>
          <PlusCircle size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>12.4K</Text>
            <Text style={styles.statLabel}>Thành viên</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>3.2K</Text>
            <Text style={styles.statLabel}>Bài viết</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>89K</Text>
            <Text style={styles.statLabel}>Lượt thích</Text>
          </View>
        </View>

        {/* Posts */}
        {POSTS.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.postMeta}>
                <Text style={styles.postAuthor}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
            )}
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Heart size={18} color={Colors.onSurfaceVariant} />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MessageCircle size={18} color={Colors.onSurfaceVariant} />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Share2 size={18} color={Colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, height: 56, backgroundColor: Colors.surface,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary, fontFamily: 'NunitoSans-Bold' },
  newPostBtn: { padding: 4 },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, gap: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  statCard: {
    flex: 1, backgroundColor: Colors.surfaceContainerLowest, borderRadius: 16,
    padding: 16, alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  statNum: { fontSize: 20, fontWeight: '800', color: Colors.primary, fontFamily: 'NunitoSans-ExtraBold' },
  statLabel: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular', marginTop: 2 },
  postCard: {
    backgroundColor: Colors.surfaceContainerLowest, borderRadius: 20,
    padding: 16, gap: 12,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  postMeta: { gap: 2 },
  postAuthor: { fontSize: 14, fontWeight: '700', color: Colors.onSurface, fontFamily: 'NunitoSans-Bold' },
  postTime: { fontSize: 12, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
  postContent: { fontSize: 14, color: Colors.onSurface, lineHeight: 22, fontFamily: 'NunitoSans-Regular' },
  postImage: { width: '100%', height: 180, borderRadius: 14 },
  postActions: { flexDirection: 'row', gap: 20, paddingTop: 4, borderTopWidth: 1, borderTopColor: Colors.outlineVariant + '40' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 13, color: Colors.onSurfaceVariant, fontFamily: 'NunitoSans-Regular' },
});
