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
import { ArrowLeft, Search } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const ORDERS = [
  {
    id: 1,
    orderCode: '#CKH-8829410',
    status: 'Hoàn thành',
    statusColor: Colors.primaryContainer,
    date: '20 Th08, 2023',
    image: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
    name: 'Chậu Tắm Ếch cao cấp Việt Nhật',
    count: 3,
    price: '118.000đ',
    action: 'Mua lại',
  },
  {
    id: 2,
    orderCode: '#CKH-9012354',
    status: 'Đang giao',
    statusColor: Colors.secondaryContainer,
    date: 'Hôm nay, 10:45',
    image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
    name: 'Nhiệt kế hồng ngoại đa năng',
    count: 1,
    price: '279.000đ',
    action: 'Theo dõi',
  },
  {
    id: 3,
    orderCode: '#CKH-7721098',
    status: 'Đã hủy',
    statusColor: Colors.errorContainer,
    date: '15 Th08, 2023',
    image: 'https://i.ibb.co/qY6LhMhQ/n-i-n-u-ch-m-0-8l-13.png',
    name: 'Nồi Nấu Cháo Chậm Bear 0.8L',
    count: 2,
    price: '1.010.000đ',
    action: 'Chi tiết',
  },
];

export default function OrderHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'completed', label: 'Hoàn thành' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

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
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
        <TouchableOpacity>
          <Search size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.tabActive,
              ]}
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

      {/* Orders List */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {visibleOrders.length > 0 ? (
          visibleOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderCode}>{order.orderCode}</Text>
                <Text
                  style={[
                    styles.orderStatus,
                    { backgroundColor: order.statusColor },
                  ]}
                >
                  {order.status}
                </Text>
              </View>

              <View style={styles.orderContent}>
                <Image
                  source={{ uri: order.image }}
                  style={styles.orderImage}
                />
                <View style={styles.orderInfo}>
                  <Text style={styles.orderName} numberOfLines={2}>
                    {order.name}
                  </Text>
                  <Text style={styles.orderCount}>+ {order.count} sản phẩm khác</Text>
                </View>
              </View>

              <View style={styles.orderFooter}>
                <View>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <Text style={styles.orderPrice}>{order.price}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    order.status === 'Đã hủy' && styles.actionBtnDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.actionBtnText,
                      order.status === 'Đã hủy' && styles.actionBtnTextDisabled,
                    ]}
                  >
                    {order.action}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>👶</Text>
            <Text style={styles.emptyStateTitle}>Chưa có đơn hàng nào</Text>
            <Text style={styles.emptyStateDesc}>
              Hãy khám phá các sản phẩm tuyệt vời cho bé yêu của bạn ngay hôm nay!
            </Text>
            <TouchableOpacity style={styles.emptyStateBtn}>
              <Text style={styles.emptyStateBtnText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 60 }} />
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
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  tabsContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '20',
  },
  tabsScroll: {
    flexGrow: 0,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  tabActive: {},
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-SemiBold',
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },
  orderCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderCode: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.outline,
    textTransform: 'uppercase',
    fontFamily: 'NunitoSans-Bold',
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onPrimaryFixed,
    fontFamily: 'NunitoSans-Bold',
  },
  orderContent: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  orderName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
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
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '10',
  },
  orderDate: {
    fontSize: 11,
    color: Colors.outline,
    fontFamily: 'NunitoSans-Regular',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 2,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnDisabled: {
    backgroundColor: Colors.surfaceContainer,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  actionBtnTextDisabled: {
    color: Colors.onSurfaceVariant,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  emptyStateDesc: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
  },
  emptyStateBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
