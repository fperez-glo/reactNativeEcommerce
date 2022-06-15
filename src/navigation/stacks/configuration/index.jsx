import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Configuration from '../../../screen/Configuration';
import Locations from '../../../screen/Locations';
import MapLocationSearcher from '../../../screen/MapLocationSearcher';

const Stack = createNativeStackNavigator();

const ConfigurationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Configuration'
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name='Configuration' component={Configuration}/>
        <Stack.Screen name='Locations' component={Locations}/>
        <Stack.Screen name='MapLocationSearcher' component={MapLocationSearcher}/>
    </Stack.Navigator>
  )
}

export default ConfigurationNavigator;