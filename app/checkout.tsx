import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Truck, Wallet, Package, Edit3, CheckCircle, Tag, X, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function CheckoutScreen() {
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState('express');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/order-confirmation');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thanh Toán</Text>
        </View>
        <Text style={styles.stepLabel}>1 Bước</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.progressSegment} />
          <View style={styles.progressSegment} />
          <View style={styles.progressSegment} />
        </View>

        {/* 1. Shipping Address Summary */}
        <TouchableOpacity style={styles.section} onPress={() => router.push('/delivery-address')} activeOpacity={0.9}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <MapPin size={18} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            </View>
            <Edit3 size={16} color={Colors.outline} />
          </View>
          <View style={styles.addressBody}>
            <Text style={styles.addressName}>Nguyễn Minh Anh • 0908 123 456</Text>
            <Text style={styles.addressText}>123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh</Text>
          </View>
        </TouchableOpacity>

        {/* 2. Delivery Method */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Truck size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
          </View>
          <View style={styles.shippingOptions}>
            {/* Express */}
            <TouchableOpacity
              style={[
                styles.shippingOption,
                shippingMethod === 'express' ? styles.shippingOptionActive : styles.shippingOptionInactive,
              ]}
              onPress={() => setShippingMethod('express')}
              activeOpacity={0.8}
            >
              <View style={styles.shippingLeft}>
                <View style={[styles.radioOuter, shippingMethod === 'express' && styles.radioOuterActive]}>
                  {shippingMethod === 'express' && <View style={styles.radioInner} />}
                </View>
                <View>
                  <Text style={[styles.shippingNameText, shippingMethod === 'express' && styles.textActive]}>Giao hàng nhanh</Text>
                  <Text style={styles.shippingDesc}>Dự kiến: Ngày mai</Text>
                </View>
              </View>
              <Text style={[styles.shippingPrice, shippingMethod === 'express' && styles.textActive]}>35.000đ</Text>
            </TouchableOpacity>

            {/* Economy */}
            <TouchableOpacity
              style={[
                styles.shippingOption,
                shippingMethod === 'standard' ? styles.shippingOptionActive : styles.shippingOptionInactive,
                shippingMethod !== 'standard' && styles.opacity60
              ]}
              onPress={() => setShippingMethod('standard')}
              activeOpacity={0.8}
            >
              <View style={styles.shippingLeft}>
                <View style={[styles.radioOuter, shippingMethod === 'standard' && styles.radioOuterActive]}>
                  {shippingMethod === 'standard' && <View style={styles.radioInner} />}
                </View>
                <View>
                  <Text style={[styles.shippingNameText, shippingMethod === 'standard' && styles.textActive]}>Tiết kiệm</Text>
                  <Text style={styles.shippingDesc}>Dự kiến: 3-5 ngày</Text>
                </View>
              </View>
              <Text style={[styles.shippingPrice, shippingMethod === 'standard' && styles.textActive]}>15.000đ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Wallet size={18} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Thanh toán</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/payment-method')}>
              <Text style={styles.changeLink}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentCard}>
            <View style={styles.paymentLogoWrapper}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0lPl0ioy3CEa21IJq3qKiLVm3lyz8T0NrmR0cMVKsUbeuJouFyuJtIvWIdiLOp0B4MQvHTTNydta5-XmvrTzByq6vYDwGuL4mF1A1a9QLQd15-fRY_JgvoO8END8hfzEk-fVB90l6Sm4HrQT21e6GmrtAa71SbFTOeKQRBkEEU4u6UIUSkctVCu4df15KJiVy5T_qtUPEkCr4HVUjRPfUo9d7H6tZF2vprDHlKpdptT1kZDwbLYuJyx5IQyp8G8AmHGhd1xoN2GJ9' }}
                style={styles.paymentLogo as any}
                resizeMode="contain"
              />
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentName}>Ví MoMo</Text>
              <Text style={styles.paymentDesc}>Liên kết: 0908****56</Text>
            </View>
            <CheckCircle size={22} color={Colors.primary} />
          </View>
        </View>

        {/* 4. Order Items Summary */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Package size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Sản phẩm (2)</Text>
          </View>
          
          <View style={styles.orderItemsList}>
            {/* Item 1 */}
            <View style={styles.orderItem}>
              <Image source={{ uri: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png' }} style={styles.orderItemImage as any} />
              <View style={styles.orderItemContent}>
                <Text style={styles.orderItemName} numberOfLines={2}>Nhiệt kế hồng ngoại đa năng Con Khỏe</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.orderItemPrice}>850.000đ</Text>
                  <Text style={styles.orderItemOriginalPrice}>990.000đ</Text>
                </View>
              </View>
            </View>

            {/* Item 2 */}
            <View style={styles.orderItem}>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVlRfwrRNi8AFexGaAedXrjal0gLenVWgKfazjoFZMg7haBaotQ1JgBcJreVMTQiXShNxq01pvLuysXoqKV12V6JeJ0qmO7Pt84gueJ7sC-_VdkaePbR0uZFLduws05iCt8o4Sb7U_BJFuqo_lWwJ3wMOpD6lJqZfEEwCxcNGo6l_80BxqXKjIagayDvk44wjGXePY1iXPlCspz_8UtLtUdck9cmK9i-lFBPhcR2759P-2B5gJrRr2na5L618WiU-Re3Xt7wT5sYxN' }} style={styles.orderItemImage as any} />
              <View style={styles.orderItemContent}>
                <Text style={styles.orderItemName} numberOfLines={2}>Bộ Body Cotton Hữu Cơ - Xanh Sky</Text>
                <Text style={styles.orderItemPrice}>245.000đ</Text>
              </View>
            </View>
          </View>

          {/* Coupon */}
          <View style={styles.couponLine}>
            <View style={styles.couponLeft}>
              <Tag size={16} color={Colors.primary} />
              <Text style={styles.couponText}>Mã giảm giá "BEYEU50"</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn}>
              <X size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 260 }} />
      </ScrollView>

      {/* Footer Action Bar */}
      <View style={styles.footer}>
        <View style={styles.footerDetails}>
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Tạm tính</Text>
            <Text style={styles.footerVal}>1.095.000đ</Text>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Phí vận chuyển</Text>
            <Text style={styles.footerVal}>35.000đ</Text>
          </View>
          <View style={styles.footerRow}>
            <Text style={styles.discountLabel}>Giảm giá</Text>
            <Text style={styles.discountVal}>-50.000đ</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.footerTotalRow}>
            <Text style={styles.footerTotalLabel}>Tổng cộng</Text>
            <View style={styles.totalPriceWrapper}>
              <Text style={styles.footerTotalPrice}>1.080.000đ</Text>
              <Text style={styles.footerVatText}>(Đã bao gồm VAT)</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder} activeOpacity={0.85} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.placeOrderBtnText}>Đặt Hàng Ngay</Text>
              <ArrowRight size={24} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softGrey },
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
    zIndex: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
    letterSpacing: -0.5,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
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
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  changeLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  addressBody: {
    paddingLeft: 26,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    fontFamily: 'NunitoSans-Regular',
  },
  shippingOptions: {
    gap: 8,
    marginTop: 12,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  shippingOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryContainer + '1a',
  },
  shippingOptionInactive: {
    borderColor: 'transparent',
    backgroundColor: Colors.softGrey,
  },
  shippingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  shippingNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  shippingDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
    marginTop: 2,
  },
  shippingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  textActive: {
    color: Colors.primary,
  },
  opacity60: {
    opacity: 0.6,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softGrey + '80',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    marginTop: 12,
  },
  paymentLogoWrapper: {
    width: 48,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentLogo: {
    width: '100%',
    height: '100%',
  },
  paymentDetails: {
    flex: 1,
    paddingLeft: 12,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  paymentDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  orderItemsList: {
    gap: 16,
    marginTop: 16,
  },
  orderItem: {
    flexDirection: 'row',
    gap: 16,
  },
  orderItemImage: {
    width: 80,
    height: 80,
    backgroundColor: Colors.softGrey,
    borderRadius: 8,
  },
  orderItemContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  orderItemPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  orderItemOriginalPrice: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textDecorationLine: 'line-through',
    opacity: 0.5,
    fontFamily: 'NunitoSans-Regular',
  },
  couponLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.skyBlue + '1a',
    borderWidth: 1,
    borderColor: Colors.skyBlue + '4d',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  couponText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  closeBtn: {
    padding: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  footerDetails: {
    gap: 8,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  footerVal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  discountLabel: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  discountVal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
    fontFamily: 'NunitoSans-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant + '40',
    marginVertical: 8,
  },
  footerTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerTotalLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  totalPriceWrapper: {
    alignItems: 'flex-end',
  },
  footerTotalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  footerVatText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  placeOrderBtn: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  placeOrderBtnText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'NunitoSans-Bold',
  },
});
