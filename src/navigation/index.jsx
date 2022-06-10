import { NavigationContainer } from "@react-navigation/native"
import { connect, useSelector } from "react-redux";
import { selectUserInfo } from "../store/selectors";
import UserLoggedTabNavigation from "./tabs/UserLogged"
import UserNotLoggedTabNavigation from "./tabs/UserNotLogged";

const mapStateToProps = (state) => ({
  user: selectUserInfo(state),
 // selectedCategory: useSelector(state => state.categories.selectedCategory || null)
});

const MainNavigator = ({user}) => {
  console.log("user:", user)
  // const user = false//useSelector(state => state.auth.user.email || null)
  // console.log("user desde main navigator!!!:", useSelector(state => state.auth.user.email || null))
  return (
    <NavigationContainer>
      {user 
        ? <UserNotLoggedTabNavigation/>
        : <UserLoggedTabNavigation/>}
    </NavigationContainer>
  )
}

export default connect(mapStateToProps, undefined)(MainNavigator);