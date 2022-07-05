import { NavigationContainer } from "@react-navigation/native"
import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { selectUserInfo } from "../store/selectors";
import UserLoggedTabNavigation from "./tabs/UserLogged"
import UserNotLoggedTabNavigation from "./tabs/UserNotLogged";
import { setDeviceWindowsDimensions } from "../features/device"

const mapStateToProps = (state) => ({
  user: selectUserInfo(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setDeviceWindowsDimensions,
    },
    dispatch,
  );
};

const MainNavigator = ({user, setDeviceWindowsDimensions}) => {

  
  useEffect(()=> {
    const deviceDimensions = {
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
    }

    setDeviceWindowsDimensions(deviceDimensions)
  },[])

  return (
    <NavigationContainer>
      {user 
        ? <UserNotLoggedTabNavigation/>
        : <UserLoggedTabNavigation/>}
    </NavigationContainer>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);