import { StyleSheet, View, SafeAreaView } from 'react-native';
import MainNavigator from './src/navigation/shop';
import Home from './src/screen/Home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      
        <MainNavigator/>
      
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
