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
import { ArrowLeft, Search, Home, Grid, ShoppingCart, User } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const ORDERS = [
  {
    id: 1,
    orderCode: '#CKH-8829410',
    status: 'Hoàn thành',
    statusBg: Colors.primaryContainer + '1a', // 10% opacity
    statusText: Colors.primary,
    date: '20 Th08, 2023',
    image: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
    name: 'Chậu Tắm Ếch cao cấp Việt Nhật',
    countText: '+ 2 sản phẩm khác',
    price: '118.000đ',
    action: 'Mua lại',
  },
  {
    id: 2,
    orderCode: '#CKH-9012354',
    status: 'Đang giao',
    statusBg: Colors.secondaryContainer + '4d', // 30% opacity
    statusText: Colors.onSecondaryContainer,
    date: 'Hôm nay, 10:45',
    image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    name: 'Nhiệt kế hồng ngoại đa năng',
    countText: '1 sản phẩm',
    price: '279.000đ',
    action: 'Theo dõi',
  },
  {
    id: 3,
    orderCode: '#CKH-7721098',
    status: 'Đã hủy',
    statusBg: Colors.errorContainer + '4d', // 30% opacity
    statusText: Colors.error,
    date: '15 Th08, 2023',
    image: 'https://i.ibb.co/qY6LhMhQ/n-i-n-u-ch-m-0-8l-13.png',
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L',
    countText: '2 sản phẩm',
    price: '1.010.000đ',
    action: 'Chi tiết',
    isCancelled: true,
  },
];

export default function OrderHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'shipping' | 'completed' | 'cancelled'>('all');

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'completed', label: 'Hoàn thành' },
    { id: 'cancelled', label: 'Đã hủy' },
  ] as const;

  const filterOrders = () => {
    if (activeTab === 'all') return ORDERS;
    if (activeTab === 'shipping') return ORDERS.filter((o) => o.status === 'Đang giao');
    if (activeTab === 'completed') return ORDERS.filter((o) => o.status === 'Hoàn thành');
    if (activeTab === 'cancelled') return ORDERS.filter((o) => o.status === 'Đã hủy');
    return ORDERS;
  };

  const visibleOrders = filterOrders();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ArrowLeft size={22} color={Colors.onSurfaceVariant} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Search size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs Navigation */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.id && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
              {activeTab === tab.id && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List / Empty State */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {visibleOrders.length > 0 ? (
          <View style={styles.ordersList}>
            {visibleOrders.map((order) => (
              <View key={order.id} style={[styles.orderCard, order.isCancelled && styles.orderCardCancelled]}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderCode}>{order.orderCode}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
                    <Text style={[styles.statusBadgeText, { color: order.statusText }]}>{order.status}</Text>
                  </View>
                </View>

                <View style={styles.orderContent}>
                  <View style={[styles.orderImageWrapper, order.isCancelled && styles.grayscaleImage]}>
                    <Image
                      source={{ uri: order.image }}
                      style={styles.orderImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.orderInfo}>
                    <Text style={[styles.orderName, order.isCancelled && styles.textMuted]} numberOfLines={2}>
                      {order.name}
                    </Text>
                    <Text style={styles.orderCount}>{order.countText}</Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <View>
                    <Text style={styles.orderDate}>{order.date}</Text>
                    <Text style={[styles.orderPrice, order.isCancelled && styles.orderPriceCancelled]}>
                      {order.price}
                    </Text>
                  </View>
                  
                  {order.status === 'Hoàn thành' ? (
                    <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85}>
                      <Text style={styles.btnPrimaryText}>{order.action}</Text>
                    </TouchableOpacity>
                  ) : order.status === 'Đang giao' ? (
                    <TouchableOpacity style={styles.btnOutline} activeOpacity={0.85}>
                      <Text style={styles.btnOutlineText}>{order.action}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.btnMuted} activeOpacity={0.85}>
                      <Text style={styles.btnMutedText}>{order.action}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIconCircle}>
              <Text style={styles.emptyStateEmoji}>👶</Text>
            </View>
            <Text style={styles.emptyStateTitle}>Chưa có đơn hàng nào</Text>
            <Text style={styles.emptyStateDesc}>
              Hãy khám phá các sản phẩm tuyệt vời cho bé yêu của bạn ngay hôm nay!
            </Text>
            <TouchableOpacity
              style={styles.emptyStateBtn}
              activeOpacity={0.85}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.emptyStateBtnText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/')}>
          <Home size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Trang chủ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => alert('Mở Danh mục')}>
          <Grid size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Danh mục</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/(tabs)/cart')}>
          <ShoppingCart size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive} onPress={() => router.push('/my-profile')}>
          <User size={18} color={Colors.onSecondaryContainer} />
          <Text style={styles.navLabelActive}>Tài khoản</Text>
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
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
    letterSpacing: -0.5,
  },
  tabsContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '4d',
    zIndex: 50,
  },
  tabsScroll: {
    flexGrow: 0,
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  tabLabelActive: {
    color: Colors.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 99,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  ordersList: {
    gap: 16,
  },
  orderCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '4d',
    shadowColor: 'rgba(1, 131, 78, 0.08)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
  },
  orderCardCancelled: {
    opacity: 0.9,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderCode: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'NunitoSans-Bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  orderContent: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  orderImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.outlineVariant + '4d',
    backgroundColor: Colors.softGrey,
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  grayscaleImage: {
    opacity: 0.5,
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
    lineHeight: 20,
  },
  textMuted: {
    color: Colors.onSurfaceVariant,
  },
  orderCount: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '1a',
  },
  orderDate: {
    fontSize: 12,
    color: Colors.outline,
    fontFamily: 'NunitoSans-Regular',
  },
  orderPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
    marginTop: 2,
  },
  orderPriceCancelled: {
    color: Colors.outline,
    textDecorationLine: 'line-through',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  btnOutline: {
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  btnOutlineText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  btnMuted: {
    backgroundColor: Colors.outlineVariant + '40', // equivalent of surface-variant/50
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  btnMutedText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateIconCircle: {
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyStateEmoji: {
    fontSize: 120,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  emptyStateDesc: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 24,
  },
  emptyStateBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 9999,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  emptyStateBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '20',
    shadowColor: 'rgba(1, 131, 78, 0.1)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 12,
    zIndex: 50,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 4,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  navLabelActive: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
    fontFamily: 'NunitoSans-Bold',
  },
});
