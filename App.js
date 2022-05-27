import { StyleSheet, View, SafeAreaView, Prov } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation';
import { colors } from './src/styles/globalColors';
import store from "./src/store"
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <MainNavigator/>         
      </SafeAreaProvider>
    </Provider>
    
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});
