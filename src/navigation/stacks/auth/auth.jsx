import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogIn from '../../../screen/LogIn';
import SignUp from "../../../screen/Signup"

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name='Login' component={LogIn}/>
        <Stack.Screen name='Signup' component={SignUp}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator;