import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopNavigator from "../stacks/shop/index";
import CartNavigator from "../stacks/cart/index";
import ConfigurationNavigator from "../stacks/configuration";
import { StyleSheet } from "react-native";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/globalColors';

const BottomTabs = createBottomTabNavigator();

const UserLoggedTabNavigation = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName='ShopTab'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveBackgroundColor: colors.boldGreen,
        tabBarItemStyle: styles.buttons,
      }}>
        <BottomTabs.Screen
            name= "ShopTab"
            component={ShopNavigator}
            options={{
              tabBarIcon: ({focused}) => {
                return <Entypo name="shopping-bag" size={24} color={focused ? "#006600" : "#8e8e93"} />
              }
            }}
        />
        <BottomTabs.Screen
            name= "CartTab"
            component={CartNavigator}
            options={{
              tabBarIcon: ({focused}) => {
                return <AntDesign name="shoppingcart" size={24} color={focused ? "#006600" : "#8e8e93"} />
              },
            }}
        />
        <BottomTabs.Screen
            name= "ConfigTab"
            component={ConfigurationNavigator}
            options={{
              tabBarIcon: ({focused}) => {
                return <Ionicons name="settings" size={24} color={focused ? "#006600" : "#8e8e93"}/>
              },
            }}
        />
    </BottomTabs.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    width: "90%",
    backgroundColor: colors.lighGreen,
    borderRadius: 15,
    alignSelf: "center",
    height:"7%",
    // border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
  },
  buttons: {
    borderRadius:15,
  }
})

export default UserLoggedTabNavigation;