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
import { ArrowLeft, ShoppingCart, Package, Plus, Minus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface ComboProduct {
  id: number;
  name: string;
  image: string;
}

interface Combo {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  comboPrice: number;
  discount: number;
  products: ComboProduct[];
  quantity: number;
}

const COMBOS: Combo[] = [
  {
    id: 1,
    name: 'Combo Chăm sóc bé sơ sinh',
    description: 'Bộ sản phẩm thiết yếu cho bé từ 0-3 tháng',
    originalPrice: 1500000,
    comboPrice: 1200000,
    discount: 20,
    products: [
      {
        id: 1,
        name: 'Bình sữa Pigeon',
        image: 'https://i.ibb.co/Kjn5bpjd/n-i-n-u-ch-m-0-8l-18.png',
      },
      {
        id: 2,
        name: 'Nôi em bé',
        image: 'https://i.ibb.co/V8JDSzQ/n-i-n-u-ch-m-0-8l-14.png',
      },
      {
        id: 3,
        name: 'Tã sơ sinh',
        image: 'https://i.ibb.co/gMCLz93P/n-i-n-u-ch-m-0-8l-3.png',
      },
    ],
    quantity: 0,
  },
  {
    id: 2,
    name: 'Combo Tập ăn cho bé',
    description: 'Bộ dụng cụ ăn dặm an toàn cho bé',
    originalPrice: 800000,
    comboPrice: 600000,
    discount: 25,
    products: [
      {
        id: 4,
        name: 'Nôi em bé',
        image: 'https://i.ibb.co/274ndCPk/n-i-n-u-ch-m-0-8l-19.png',
      },
      {
        id: 5,
        name: 'Ghế ăn dặm',
        image: 'https://i.ibb.co/3mGm5KpF/n-i-n-u-ch-m-0-8l-17.png',
      },
    ],
    quantity: 0,
  },
  {
    id: 3,
    name: 'Combo Vệ sinh hàng ngày',
    description: 'Bộ sản phẩm tắm và vệ sinh cho bé',
    originalPrice: 600000,
    comboPrice: 480000,
    discount: 20,
    products: [
      {
        id: 6,
        name: 'Chậu tắm ếch',
        image: 'https://i.ibb.co/9H1p5zyX/11-2203.jpg',
      },
      {
        id: 7,
        name: 'Bàn thay tã',
        image: 'https://i.ibb.co/WW4Lb0MK/n-i-n-u-ch-m-0-8l-12.png',
      },
    ],
    quantity: 0,
  },
];

export default function ComboDealsScreen() {
  const router = useRouter();
  const [combos, setCombos] = useState(COMBOS);

  const updateQuantity = (id: number, change: number) => {
    setCombos(
      combos.map((combo) =>
        combo.id === id
          ? { ...combo, quantity: Math.max(0, combo.quantity + change) }
          : combo
      )
    );
  };

  const totalPrice = combos.reduce((sum, combo) => sum + combo.comboPrice * combo.quantity, 0);
  const selectedCount = combos.filter((c) => c.quantity > 0).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Combo ưu đãi</Text>
        <ShoppingCart size={22} color={Colors.primary} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Box */}
        <View style={styles.infoBox}>
          <Package size={24} color={Colors.primary} />
          <Text style={styles.infoText}>
            Tiết kiệm tối đa khi mua combo sản phẩm yêu thích
          </Text>
        </View>

        {/* Combos List */}
        <View style={styles.combosList}>
          {combos.map((combo) => (
            <View key={combo.id} style={styles.comboCard}>
              <View style={styles.comboHeader}>
                <View style={styles.comboHeaderText}>
                  <Text style={styles.comboName}>{combo.name}</Text>
                  <Text style={styles.comboDesc}>{combo.description}</Text>
                </View>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{combo.discount}%</Text>
                </View>
              </View>

              {/* Products Grid */}
              <View style={styles.productsGrid}>
                {combo.products.map((product) => (
                  <View key={product.id} style={styles.productThumb}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                    />
                  </View>
                ))}
              </View>

              {/* Price */}
              <View style={styles.priceRow}>
                <View style={styles.priceInfo}>
                  <Text style={styles.originalPrice}>
                    {combo.originalPrice.toLocaleString('vi-VN')}đ
                  </Text>
                  <Text style={styles.comboPrice}>
                    {combo.comboPrice.toLocaleString('vi-VN')}đ
                  </Text>
                </View>

                {/* Quantity Control */}
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(combo.id, -1)}
                    disabled={combo.quantity === 0}
                  >
                    <Minus
                      size={18}
                      color={combo.quantity === 0 ? Colors.outlineVariant : Colors.primary}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{combo.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(combo.id, 1)}>
                    <Plus size={18} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      {selectedCount > 0 && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.summaryText}>
              Đã chọn {selectedCount} combo
            </Text>
            <Text style={styles.summaryPrice}>
              Tổng: {totalPrice.toLocaleString('vi-VN')}đ
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  },
  combosList: {
    gap: 16,
  },
  comboCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  comboHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  comboHeaderText: {
    flex: 1,
    gap: 4,
  },
  comboName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    fontFamily: 'NunitoSans-Bold',
  },
  comboDesc: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onError,
    fontFamily: 'NunitoSans-Bold',
  },
  productsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  productThumb: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.softGrey,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
    gap: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textDecorationLine: 'line-through',
    fontFamily: 'NunitoSans-Regular',
  },
  comboPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    width: 20,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Bold',
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
  summaryText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    fontFamily: 'NunitoSans-Regular',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    fontFamily: 'NunitoSans-Bold',
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
