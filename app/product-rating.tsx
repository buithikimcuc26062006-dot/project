import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingCart, Plus, Minus, Check } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Bundle {
  id: number;
  name: string;
  description: string;
  discount: number;
  products: Product[];
  selected: boolean;
}

const PRODUCT_BUNDLES: Bundle[] = [
  {
    id: 1,
    name: 'Combo mẹ bầu',
    description: 'Bộ sản phẩm chăm sóc toàn diện cho mẹ bầu',
    discount: 15,
    products: [
      { id: 1, name: 'Viên bổ sung DHA', description: 'Cho mẹ bầu', price: 250000, quantity: 1 },
      { id: 2, name: 'Kem chống rạn mẹ', description: 'Chiết xuất tự nhiên', price: 350000, quantity: 1 },
      { id: 3, name: 'Bộ tắm cho mẹ', description: 'Xà phòng dinh dưỡng', price: 180000, quantity: 1 },
    ],
    selected: false,
  },
  {
    id: 2,
    name: 'Combo mẹ sau sinh',
    description: 'Giúp mẹ phục hồi sau sinh nhanh chóng',
    discount: 20,
    products: [
      { id: 4, name: 'Đai ôm bụng', description: 'Nịt giảm béo', price: 450000, quantity: 1 },
      { id: 5, name: 'Serum dưỡng da', description: 'Phục hồi da', price: 380000, quantity: 1 },
      { id: 6, name: 'Viên lợi sữa', description: 'Tăng tiết sữa tự nhiên', price: 200000, quantity: 1 },
    ],
    selected: false,
  },
  {
    id: 3,
    name: 'Combo wellness',
    description: 'Tăng cường sức khỏe cho cả gia đình',
    discount: 18,
    products: [
      { id: 7, name: 'Vitamin tổng hợp', description: 'Cho cả gia đình', price: 320000, quantity: 1 },
      { id: 8, name: 'Nước uống collagen', description: 'Làm đẹp từ trong', price: 280000, quantity: 1 },
    ],
    selected: false,
  },
];

export default function ProductRatingScreen() {
  const router = useRouter();
  const [bundles, setBundles] = useState(PRODUCT_BUNDLES);
  const [customNotes, setCustomNotes] = useState('');

  const toggleBundle = (id: number) => {
    setBundles(
      bundles.map((bundle) =>
        bundle.id === id ? { ...bundle, selected: !bundle.selected } : bundle
      )
    );
  };

  const updateProductQuantity = (bundleId: number, productId: number, change: number) => {
    setBundles(
      bundles.map((bundle) =>
        bundle.id === bundleId
          ? {
              ...bundle,
              products: bundle.products.map((product) =>
                product.id === productId
                  ? { ...product, quantity: Math.max(1, product.quantity + change) }
                  : product
              ),
            }
          : bundle
      )
    );
  };

  const selectedBundles = bundles.filter((b) => b.selected);
  const totalPrice = selectedBundles.reduce((sum, bundle) => {
    const bundleTotal = bundle.products.reduce((p, product) => p + product.price * product.quantity, 0);
    const discount = (bundleTotal * bundle.discount) / 100;
    return sum + (bundleTotal - discount);
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Combo Mẹ & Bé</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Section */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Lựa chọn combo phù hợp</Text>
          <Text style={styles.infoDesc}>
            Chọn combo sản phẩm và tùy chỉnh số lượng theo nhu cầu
          </Text>
        </View>

        {/* Bundles List */}
        <View style={styles.bundlesList}>
          {bundles.map((bundle) => (
            <View key={bundle.id} style={styles.bundleCard}>
              {/* Bundle Header */}
              <TouchableOpacity
                style={styles.bundleHeader}
                onPress={() => toggleBundle(bundle.id)}
                activeOpacity={0.8}
              >
                <View style={styles.bundleHeaderContent}>
                  <View
                    style={[
                      styles.checkbox,
                      bundle.selected && { backgroundColor: Colors.primary },
                    ]}
                  >
                    {bundle.selected && (
                      <Check size={16} color={Colors.onPrimary} />
                    )}
                  </View>
                  <View style={styles.bundleInfo}>
                    <Text style={styles.bundleName}>{bundle.name}</Text>
                    <Text style={styles.bundleDesc}>{bundle.description}</Text>
                  </View>
                </View>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{bundle.discount}%</Text>
                </View>
              </TouchableOpacity>

              {/* Bundle Products */}
              {bundle.selected && (
                <View style={styles.productsSection}>
                  {bundle.products.map((product) => (
                    <View key={product.id} style={styles.productRow}>
                      <View style={styles.productInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productDesc}>{product.description}</Text>
                        <Text style={styles.productPrice}>
                          {product.price.toLocaleString('vi-VN')}đ
                        </Text>
                      </View>
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          onPress={() =>
                            updateProductQuantity(bundle.id, product.id, -1)
                          }
                        >
                          <Minus size={16} color={Colors.primary} />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{product.quantity}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            updateProductQuantity(bundle.id, product.id, 1)
                          }
                        >
                          <Plus size={16} color={Colors.primary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Notes Section */}
        {selectedBundles.length > 0 && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Ghi chú</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Thêm ghi chú cho đơn hàng..."
              placeholderTextColor={Colors.outlineVariant}
              multiline
              value={customNotes}
              onChangeText={setCustomNotes}
            />
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      {selectedBundles.length > 0 && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>
              {totalPrice.toLocaleString('vi-VN')}đ
            </Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
        </View>
      )}
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
  infoBox: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 6,
    fontFamily: 'NunitoSans-Bold',
  },
  infoDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    fontFamily: 'NunitoSans-Regular',
  },
  bundlesList: {
    gap: 12,
    marginBottom: 20,
  },
  bundleCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  bundleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '20',
  },
  bundleHeaderContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  bundleInfo: {
    flex: 1,
    gap: 2,
  },
  bundleName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  bundleDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onError,
    fontFamily: 'NunitoSans-Bold',
  },
  productsSection: {
    gap: 12,
    padding: 12,
    backgroundColor: Colors.background,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant + '15',
  },
  productInfo: {
    flex: 1,
    gap: 4,
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
  productPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    width: 16,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
  },
  notesSection: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  notesTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 8,
    fontFamily: 'NunitoSans-Bold',
  },
  notesInput: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  totalLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    fontFamily: 'NunitoSans-ExtraBold',
  },
  addBtn: {
    flex: 1,
    height: 48,
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
  addBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onPrimary,
    fontFamily: 'NunitoSans-Bold',
  },
});
