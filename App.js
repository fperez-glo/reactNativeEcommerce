import { StyleSheet, View, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation';
import { colors } from './src/styles/globalColors';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <MainNavigator/>        
    </SafeAreaProvider>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
});
