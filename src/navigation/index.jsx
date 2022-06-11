import { NavigationContainer } from "@react-navigation/native"
import { connect } from "react-redux";
import { selectUserInfo } from "../store/selectors";
import UserLoggedTabNavigation from "./tabs/UserLogged"
import UserNotLoggedTabNavigation from "./tabs/UserNotLogged";

const mapStateToProps = (state) => ({
  user: selectUserInfo(state),
});

const MainNavigator = ({user}) => {
  return (
    <NavigationContainer>
      {!user 
        ? <UserNotLoggedTabNavigation/>
        : <UserLoggedTabNavigation/>}
    </NavigationContainer>
  )
}

export default connect(mapStateToProps, undefined)(MainNavigator);