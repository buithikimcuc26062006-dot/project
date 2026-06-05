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
import { ArrowLeft, MoreVertical, Edit3, Plus, Home, Grid, ShoppingCart, User } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const ADDRESSES = [
  {
    id: 1,
    type: 'Nhà riêng',
    name: 'Nguyễn Minh Anh',
    phone: '0908 123 456',
    address: 'Số 45, Ngõ 123, Đường Láng\nPhường Láng Thượng, Quận Đống Đa\nHà Nội',
    badgeBg: Colors.secondaryContainer,
    badgeText: Colors.onSecondaryContainer,
  },
  {
    id: 2,
    type: 'Công ty',
    name: 'Nguyễn Thu Thủy',
    phone: '091 234 5678',
    address: 'Tòa nhà Bitexco, Tầng 45\nSố 2 Hải Triều, Bến Nghé, Quận 1\nTP. Hồ Chí Minh',
    badgeBg: Colors.tertiaryContainer,
    badgeText: Colors.onTertiary,
  },
];

export default function DeliveryAddressScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Địa chỉ giao hàng</Text>
        <TouchableOpacity style={styles.headerButton}>
          <MoreVertical size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Địa chỉ của bạn</Text>
          <Text style={styles.sectionSubtitle}>Chọn nơi bạn muốn nhận hàng</Text>
        </View>

        {/* Address List */}
        <View style={styles.addressList}>
          {ADDRESSES.map((addr) => (
            <TouchableOpacity
              key={addr.id}
              style={[
                styles.addressCard,
                selectedAddress === addr.id && styles.addressCardActive,
              ]}
              onPress={() => setSelectedAddress(addr.id)}
              activeOpacity={0.9}
            >
              {/* Radio Circle */}
              <View style={[
                styles.radioOuter,
                selectedAddress === addr.id && styles.radioOuterActive
              ]}>
                {selectedAddress === addr.id && (
                  <View style={styles.radioInner} />
                )}
              </View>

              {/* Address Details */}
              <View style={styles.addressContent}>
                <View style={styles.addressHeader}>
                  <View style={[styles.badge, { backgroundColor: addr.badgeBg }]}>
                    <Text style={[styles.badgeText, { color: addr.badgeText }]}>{addr.type}</Text>
                  </View>
                  <TouchableOpacity style={styles.editBtn} onPress={() => alert('Mở form sửa địa chỉ')}>
                    <Edit3 size={18} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.addressName}>{addr.name}</Text>
                <Text style={styles.addressPhone}>{addr.phone}</Text>
                <Text style={styles.addressText}>{addr.address}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Add New Address Placeholder */}
          <TouchableOpacity style={styles.addNewBtn} onPress={() => alert('Mở form thêm địa chỉ mới')} activeOpacity={0.8}>
            <View style={styles.addNewIconWrapper}>
              <Plus size={24} color={Colors.primary} />
            </View>
            <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Action Button */}
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmBtnText}>Giao đến địa chỉ này</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Illustrative Footer Background Image */}
      <View style={styles.footerIllustrationWrapper} pointerEvents="none">
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByFj9Z9VDcWeHZpKwqxqJHossb_bsZZGOEuNanMmokLuCLUaeEmkkIhSJexbKKzyJewwvkuY3x8v1uGZznGQXobR4UrLGAxB80Ugtvw6nLiGxwqnSTsemhR6SVaPCS4UWXrylR7b4YP2ZsomAXYXbXxV9Tr_bXVUJTw4w4lPZjxoEFbai4JLy3FburIJhYB475h3iOmwL7W7IV3K6oBdmMsJdXI6g84_lURqgB1dTVBSxcCMnAFxDxxzuYM4pCiQH-iiZj5v6K75-y' }}
          style={styles.footerIllustration}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/')}>
          <Home size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Trang chủ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => alert('Chuyển đến Danh mục')}>
          <Grid size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Danh mục</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive} onPress={() => alert('Mở Giỏ hàng')}>
          <ShoppingCart size={18} color={Colors.onSecondaryContainer} />
          <Text style={styles.navLabelActive}>Giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/my-profile')}>
          <User size={22} color={Colors.onSurfaceVariant} />
          <Text style={styles.navLabel}>Tài khoản</Text>
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
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
    letterSpacing: -0.5,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 160 },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  addressList: {
    gap: 16,
    marginBottom: 24,
    zIndex: 5,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 3,
  },
  addressCardActive: {
    borderColor: Colors.primary,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  radioOuterActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  addressContent: {
    flex: 1,
    gap: 8,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
  },
  editBtn: {
    padding: 6,
  },
  addressName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  addressPhone: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  addressText: {
    fontSize: 16,
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
    fontFamily: 'NunitoSans-Regular',
  },
  addNewBtn: {
    width: '100%',
    paddingVertical: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.outlineVariant,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addNewIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.softGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  confirmBtn: {
    width: '100%',
    height: 56,
    borderRadius: 9999,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 16,
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
  footerIllustrationWrapper: {
    position: 'absolute',
    bottom: 96,
    left: '5%',
    width: '90%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.2,
    zIndex: 1,
  },
  footerIllustration: {
    width: '100%',
    height: '100%',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
