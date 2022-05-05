import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoLayout from './Components/TodoLayout';
import { colors } from './Styles/GlobalColors';

export default function App() {
  return (
    <View style={styles.container}>
     <TodoLayout/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: 'flex-start',
    paddingTop:100
  },
});
