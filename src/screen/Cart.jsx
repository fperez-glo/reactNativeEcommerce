import { Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Cart = () => {
  return (
    <SafeAreaView style={styles.cartContainer}>
      <Text>Carrito Screen</Text>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  cartContainer: {
    height: "95%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    marginTop: 42
  },
})

export default Cart