import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigator from "./src/navigation";
import { colors } from "./src/styles/globalColors";
import { store, persistor } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import DropdownAlert from "react-native-dropdownalert";
import AlertHelper from "./src/utils/AlertHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showInfo } from "./src/utils/MessageBar";
import config from "./src/config/aplication.config"
import { init } from "./src/database";
import Constants from 'expo-constants';

// INICIALIZO LA BASE DE DATOS LOCAL DE SQLITE.
init()
  .then()
  .catch((error) => {
    console.log(error);
  })

const MainPersistedApp = () => {
  return (
    <PersistGate persistor={persistor}>
      <MainNavigator />
    </PersistGate>
  );
};

export default function App() {
  const clearAsyncStorage = async()=> {
    try {
      console.log(config.extra.cleanAsyncStorage)
      await AsyncStorage.clear()
      showInfo({message:"AsyncStorage vaciado"})
    } catch (error) {
      console.log("error:", error)
    }
  };
  // clearAsyncStorage()r
  return (
    <Provider store={store}>
      <SafeAreaProvider style={Platform.OS === "ios" ? styles.iosContainer : styles.androidContainer}>
        <MainPersistedApp />
        <DropdownAlert
          defaultContainer={styles.dropDownAlert}
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
          // closeInterval= {100}
          // showCancel
        />
      </SafeAreaProvider>
    </Provider>
  );
}

// export default function App() {
//   return (
//     <Provider store={store}>
//       <SafeAreaProvider style={styles.container}>
//         <MainNavigator/>
//       </SafeAreaProvider>
//     </Provider>
//   );
// }

const styles = StyleSheet.create({
  iosContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  androidContainer: {
    backgroundColor: colors.white,
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  dropDownAlert: {
    padding: 9,
    // paddingTop: StatusBar.currentHeight,
    width: "95%",
    borderRadius: 25,
    marginLeft:10,
    // Probar que onda esto en IOS
    // marginTop: StatusBar.currentHeight,
    marginTop: 5,
    //
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
    elevation: 7,
  },
  view: {
    alignContent: 'flex-end',
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor:"blue"
  }
});
