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
import {
  ArrowLeft,
  ShoppingCart,
  MapPin,
  MessageCircle,
  Clock,
  Truck,
  CheckCircle,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const TIMELINE_STEPS = [
  { icon: Clock, label: 'Đơn hàng đã tạo', time: '15/03/2024 10:30 AM', completed: true },
  { icon: Truck, label: 'Đơn hàng đang được giao', time: '15/03/2024 2:45 PM', completed: true, active: true },
  { icon: MapPin, label: 'Đơn hàng sẽ đến hôm nay', time: '15/03/2024 6:00 PM', completed: false },
  { icon: CheckCircle, label: 'Đơn hàng được giao', time: 'Sắp tới', completed: false },
];

export default function OrderTrackingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theo dõi đơn hàng</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Identity Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderLabel}>Mã đơn hàng</Text>
              <Text style={styles.orderNumber}>#CKH-8829410</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Đang giao</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.orderDetail}>
            <Text style={styles.detailLabel}>Thời gian giao dự kiến</Text>
            <Text style={styles.detailValue}>Hôm nay, 18:00 - 20:00</Text>
          </View>
        </View>

        {/* Shipper Info */}
        <View style={styles.shipperCard}>
          <View style={styles.shipperHeader}>
            <Text style={styles.shipperTitle}>Người giao hàng</Text>
          </View>
          <View style={styles.shipperContent}>
            <Image
              source={{ uri: 'https://i.ibb.co/1s3h4K5/male-avatar-profile-202604202009.jpg' }}
              style={styles.shipperAvatar}
            />
            <View style={styles.shipperInfo}>
              <Text style={styles.shipperName}>Trần Minh Tú</Text>
              <Text style={styles.shipperPhone}>098 765 4321</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStars}>★★★★★</Text>
                <Text style={styles.ratingText}>(4.8)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
              <MessageCircle size={18} color={Colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <MapPin size={32} color={Colors.primary} />
          <Text style={styles.mapText}>Xem trên bản đồ</Text>
        </View>

        {/* Timeline */}
        <Text style={styles.timelineTitle}>Quá trình giao hàng</Text>
        <View style={styles.timeline}>
          {TIMELINE_STEPS.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineCircle,
                    step.completed && styles.timelineCircleCompleted,
                    step.active && styles.timelineCircleActive,
                  ]}
                >
                  <step.icon
                    size={16}
                    color={step.completed || step.active ? Colors.onPrimary : Colors.outline}
                  />
                </View>
                {index !== TIMELINE_STEPS.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      (step.completed || step.active) && styles.timelineLineCompleted,
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineLabel}>{step.label}</Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Product Summary */}
        <Text style={styles.productsTitle}>Sản phẩm trong đơn</Text>
        <View style={styles.productCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3537895/pexels-photo-3537895.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Bộ gôm mặc nhỏ Organic</Text>
            <Text style={styles.productDesc}>Size: M | Màu: Xanh</Text>
            <View style={styles.productPriceRow}>
              <Text style={styles.productQuantity}>x2</Text>
              <Text style={styles.productPrice}>199.000 đ</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <MessageCircle size={18} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Nhắn tin người giao</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Clock size={18} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Xem lịch sử</Text>
          </TouchableOpacity>
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
  orderCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 4,
    fontFamily: 'NunitoSans-Bold',
  },
  statusBadge: {
    backgroundColor: Colors.tertiary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.tertiary,
    fontFamily: 'NunitoSans-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant + '20',
    marginVertical: 12,
  },
  orderDetail: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  shipperCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  shipperHeader: {
    marginBottom: 12,
  },
  shipperTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  shipperContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shipperAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  shipperInfo: {
    flex: 1,
    gap: 2,
  },
  shipperName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  shipperPhone: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingStars: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholder: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 160,
  },
  mapText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  timeline: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
    width: 32,
  },
  timelineCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.outlineVariant + '30',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
  },
  timelineCircleCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timelineCircleActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  timelineLine: {
    width: 2,
    height: 48,
    backgroundColor: Colors.outlineVariant + '30',
    marginTop: 8,
  },
  timelineLineCompleted: {
    backgroundColor: Colors.primary,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  timelineTime: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    fontFamily: 'NunitoSans-Regular',
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginBottom: 12,
    fontFamily: 'NunitoSans-Bold',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 12,
    gap: 12,
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  productDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productQuantity: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  actionsSection: {
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary + '20',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
});
