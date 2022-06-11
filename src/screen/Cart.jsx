import { Text, StyleSheet, FlatList, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { selectCartProducts } from "../store/selectors";
import { colors } from "../styles/globalColors";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { showInfo } from "../utils/MessageBar";
import { bindActionCreators } from "@reduxjs/toolkit";
import { deleteCartProduct } from "../features/cart";

const mapStateToProps = (state) => ({
  cartProducts: selectCartProducts(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteCartProduct,
    },
    dispatch,
  );
};

const Cart = ({cartProducts, deleteCartProduct}) => {
  const renderCartProducts = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.productsText}>{item.title}</Text>
        <TouchableOpacity
        onPress={() => handleDelete(item)}>
          <Entypo name="trash" size={24} color={"red"} />
        </TouchableOpacity>
      </View>
    )
  };

  const handleDelete = (product) => {
    console.log(product);
    deleteCartProduct(product.id);
    showInfo({message:"Producto eliminado del carrito."})
  }

  return (
    <SafeAreaView style={styles.cartContainer}>
      {cartProducts?.length 
          ? <FlatList
              renderItem={renderCartProducts}
              data={cartProducts}
              keyExtractor={(product) => product.id}
              vertical
              pagingEnabled={true}
              showsVerticalScrollIndicator={false}
              style={styles.list}
            />
          : <Text>No hay productos en el carrito</Text>
          }
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  cartContainer: {
    height: "95%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    marginTop: 42,
    // backgroundColor:"red"
  },
  card: {
    backgroundColor:colors.lighGreen,
    marginTop: 5,
    borderRadius: 20,
    padding: 8,
    height:100,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.boldGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
  },
  productsText: {
    fontSize: 20
  },
  list: {
    // backgroundColor:"green",
    width:"100%"
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);