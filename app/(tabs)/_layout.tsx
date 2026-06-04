import { Tabs } from 'expo-router';
import { Home, LayoutGrid, ShoppingCart, Users, User } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.onPrimaryContainer,
        tabBarInactiveTintColor: Colors.onSurfaceVariant,
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <Home size={22} color={color} fill={focused ? Colors.onPrimaryContainer : 'transparent'} />
            </View>
          ),
          tabBarActiveBackgroundColor: 'transparent',
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Danh mục',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <LayoutGrid size={22} color={color} fill={focused ? Colors.onPrimaryContainer : 'transparent'} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTabCart : undefined}>
              <ShoppingCart
                size={22}
                color={focused ? Colors.onSecondaryContainer : color}
                fill={focused ? Colors.onSecondaryContainer : 'transparent'}
              />
            </View>
          ),
          tabBarActiveTintColor: Colors.onSecondaryContainer,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Cộng đồng',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <Users size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeTab : undefined}>
              <User size={22} color={color} fill={focused ? Colors.onPrimaryContainer : 'transparent'} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
    paddingTop: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    position: 'absolute',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'NunitoSans-Bold',
    marginTop: 2,
  },
  activeTab: {
    backgroundColor: Colors.primaryContainer,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  activeTabCart: {
    backgroundColor: Colors.secondaryContainer,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});
