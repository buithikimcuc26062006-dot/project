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
import { ArrowLeft, MapPin, Truck, Wallet, Package, Edit3 } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function CheckoutScreen() {
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState('express');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh Toán</Text>
        <Text style={styles.stepLabel}>1 Bước</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* 1. Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <MapPin size={18} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            </View>
            <TouchableOpacity>
              <Edit3 size={16} color={Colors.outline} />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>Nguyễn Minh Anh • 0908 123 456</Text>
          <Text style={styles.sectionContent}>
            123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
          </Text>
        </View>

        {/* 2. Shipping Method */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Truck size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
          </View>
          <View style={styles.shippingOptions}>
            {[
              { id: 'express', name: 'Giao hàng nhanh', desc: 'Dự kiến: Ngày mai', price: '35.000đ' },
              { id: 'standard', name: 'Tiết kiệm', desc: 'Dự kiến: 3-5 ngày', price: '15.000đ' },
            ].map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.shippingOption,
                  shippingMethod === method.id && styles.shippingOptionActive,
                ]}
                onPress={() => setShippingMethod(method.id)}
              >
                <View style={styles.radioButton}>
                  {shippingMethod === method.id && <View style={styles.radioDot} />}
                </View>
                <View style={styles.shippingInfo}>
                  <Text style={styles.shippingName}>{method.name}</Text>
                  <Text style={styles.shippingDesc}>{method.desc}</Text>
                </View>
                <Text style={styles.shippingPrice}>{method.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Wallet size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Thanh toán</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0lPl0ioy3CEa21IJq3qKiLVm3lyz8T0NrmR0cMVKsUbeuJouFyuJtIvWIdiLOp0B4MQvHTTNydta5-XmvrTzByq6vYDwGuL4mF1A1a9QLQd15-fRY_JgvoO8END8hfzEk-fVB90l6Sm4HrQT21e6GmrtAa71SbFTOeKQRBkEEU4u6UIUSkctVCu4df15KJiVy5T_qtUPEkCr4HVUjRPfUo9d7H6tZF2vprDHlKpdptT1kZDwbLYuJyx5IQyp8G8AmHGhd1xoN2GJ9' }}
              style={styles.paymentLogo}
            />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentMethod_Text}>Ví MoMo</Text>
              <Text style={styles.paymentDesc}>Liên kết: 0908****56</Text>
            </View>
          </View>
        </View>

        {/* 4. Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Package size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Sản phẩm (2)</Text>
          </View>
          <View style={styles.itemsList}>
            {[
              {
                name: 'Nhiệt kế hồng ngoại đa năng Con Khỏe',
                price: '850.000đ',
                image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
              },
              {
                name: 'Bộ Body Cotton Hữu Cơ - Xanh Sky',
                price: '245.000đ',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVlRfwrRNi8AFexGaAedXrjal0gLenVWgKfazjoFZMg7haBaotQ1JgBcJreVMTQiXShNxq01pvLuysXoqKV12V6JeJ0qmO7Pt84gueJ7sC-_VdkaePbR0uZFLduws05iCt8o4Sb7U_BJFuqo_lWwJ3wMOpD6lJqZfEEwCxcNGo6l_80BxqXKjIagayDvk44wjGXePY1iXPlCspz_8UtLtUdck9cmK9i-lFBPhcR2759P-2B5gJrRr2na5L618WiU-Re3Xt7wT5sYxN',
              },
            ].map((item, i) => (
              <View key={i} style={styles.orderItem}>
                <Image source={{ uri: item.image }} style={styles.orderItemImage} />
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemPrice}>{item.price}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Summary & Checkout */}
      <View style={styles.bottomBar}>
        <View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>1.095.000đ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
            <Text style={styles.summaryValue}>35.000đ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel} style={{ color: Colors.error }}>Giảm giá</Text>
            <Text style={styles.summaryValue} style={{ color: Colors.error }}>-50.000đ</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>1.080.000đ</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          activeOpacity={0.9}
          onPress={() => router.replace('/order-confirmation')}
        >
          <Text style={styles.placeOrderBtnText}>Đặt Hàng Ngay</Text>
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
  stepLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12 },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  progressDot: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  section: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 4,
    fontFamily: 'NunitoSans-SemiBold',
  },
  sectionContent: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  shippingOptions: {
    gap: 12,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  shippingOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  shippingInfo: {
    flex: 1,
  },
  shippingName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  shippingDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  shippingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.softGrey + '50',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  paymentLogo: {
    width: 48,
    height: 32,
    borderRadius: 6,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethod_Text: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  paymentDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  itemsList: {
    gap: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  orderItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
    fontFamily: 'NunitoSans-Bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant + '20',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  placeOrderBtn: {
    width: '100%',
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
  placeOrderBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
