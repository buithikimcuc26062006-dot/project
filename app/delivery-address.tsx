import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, MapPin, Edit3, Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const ADDRESSES = [
  {
    id: 1,
    type: 'Nhà riêng',
    name: 'Nguyễn Minh Anh',
    phone: '0908 123 456',
    address: 'Số 45, Ngõ 123, Đường Láng\nPhường Láng Thượng, Quận Đống Đa\nHà Nội',
  },
  {
    id: 2,
    type: 'Công ty',
    name: 'Nguyễn Thu Thủy',
    phone: '091 234 5678',
    address: 'Tòa nhà Bitexco, Tầng 45\nSố 2 Hải Triều, Bến Nghé, Quận 1\nTP. Hồ Chí Minh',
  },
];

export default function DeliveryAddressScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Địa chỉ giao hàng</Text>
        <TouchableOpacity>
          <ShoppingCart size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Địa chỉ của bạn</Text>
            <Text style={styles.sectionSubtitle}>Chọn nơi bạn muốn nhận hàng</Text>
          </View>
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
              activeOpacity={0.8}
            >
              <View style={styles.radioButton}>
                {selectedAddress === addr.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
              <View style={styles.addressContent}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressType}>{addr.type}</Text>
                  <TouchableOpacity style={styles.editBtn}>
                    <Edit3 size={16} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.addressName}>{addr.name}</Text>
                <Text style={styles.addressPhone}>{addr.phone}</Text>
                <Text style={styles.addressText}>{addr.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Address */}
        <TouchableOpacity style={styles.addNewBtn}>
          <Plus size={24} color={Colors.primary} />
          <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmBtnText}>Giao đến địa chỉ này</Text>
        </TouchableOpacity>

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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  addressList: {
    gap: 12,
    marginBottom: 16,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  addressCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  addressContent: {
    flex: 1,
    gap: 4,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressType: {
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: Colors.secondaryContainer,
    color: Colors.onSecondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontFamily: 'NunitoSans-Bold',
  },
  editBtn: {
    padding: 4,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  addressPhone: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  addressText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  addNewBtn: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.outlineVariant,
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  addNewText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Bold',
  },
  confirmBtn: {
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
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
