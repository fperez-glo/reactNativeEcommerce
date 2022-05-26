import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from "../../../screen/Cart"

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Cart'
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name='Cart' component={Cart}/>
    </Stack.Navigator>
  )
}

export default CartNavigator;