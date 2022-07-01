import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from "../../../components/CategoriesContainer"
import ProductsScreen from "../../../screen/Products"
import ProductDetailScreen from "../../../screen/ProductDetail"
import Home from '../../../screen/Home';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Categories' component={CategoriesScreen}/>
        <Stack.Screen name='Products'  component={ProductsScreen}/>
        <Stack.Screen name='ProductDetail'  component={ProductDetailScreen}/>
    </Stack.Navigator>
  )
}

export default ShopNavigator;