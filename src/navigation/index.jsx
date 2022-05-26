import { NavigationContainer } from "@react-navigation/native"
import UserLoggedTabNavigation from "./tabs/UserLogged"


const MainNavigator = () => {
  return (
    <NavigationContainer>
        <UserLoggedTabNavigation/>
    </NavigationContainer>
  )
}

export default MainNavigator;