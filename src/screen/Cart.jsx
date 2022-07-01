import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { selectCartProducts } from "../store/selectors";
import { showInfo } from "../utils/MessageBar";
import { bindActionCreators } from "@reduxjs/toolkit";
import { deleteCartProduct } from "../features/cart";
import CartItemCard from "../components/CartItemCard";
import Button from "../components/Button"

const mapStateToProps = (state) => ({
  cartProducts: selectCartProducts(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteCartProduct,
    },
    dispatch
  );
};

const Cart = ({ cartProducts, deleteCartProduct }) => {
  const renderCartProducts = ({ item }) => {
    return (
      <CartItemCard item={item} onPressTrash={()=> handleDelete(item.id)} />
    );
  };

  const handleDelete = (productId) => {
    deleteCartProduct(productId);
    showInfo({ message: "Producto eliminado del carrito." });
  };

  return (
    <SafeAreaView style={styles.cartContainer}>
      {cartProducts?.length ? (
        <View style={styles.cardsContainer}>
          <FlatList
          renderItem={renderCartProducts}
          data={cartProducts}
          keyExtractor={(product) => product.id}
          vertical
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
        <Button/>
        </View>
        
      ) : (
        <Text>No hay productos en el carrito</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    height: "95%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 4,
    // marginTop: 42,
    // backgroundColor:"red"
  },
  
  cardsContainer:{
    width:"100%",
    height:"90%",
    backgroundColor:"blue"

  },
  list: {
    // backgroundColor:"green",
    width: "100%",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
