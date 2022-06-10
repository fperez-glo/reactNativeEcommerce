import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import AuthNavigator from '../stacks/auth/auth';

const BottomTabs = createBottomTabNavigator();

const UserNotLoggedTabNavigation = () => {
  return (
    <BottomTabs.Navigator 
      initialRouteName='AuthTab'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveBackgroundColor:"lightgrey",
        tabBarItemStyle: styles.buttons,
      }}>
        <BottomTabs.Screen
            name= "AuthTab"
            component={AuthNavigator}
            options={{
              tabBarIcon: ({focused}) => {
                return <Entypo name="user" size={24} color={focused ? "#124fb3" : "#8e8e93"} />
              }
            }}
        />
    </BottomTabs.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    width: "90%",
    // backgroundColor:"red",
    borderRadius: 15,
    alignSelf: "center",
    
    
  },
  buttons: {
    borderRadius:15,
  }
})

export default UserNotLoggedTabNavigation;