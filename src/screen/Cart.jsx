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
import { showInfo, showSuccess } from "../utils/MessageBar";
import { bindActionCreators } from "@reduxjs/toolkit";
import { deleteCartProduct, cleanCart } from "../features/cart";
import CartItemCard from "../components/CartItemCard";
import Button from "../components/Button"
import { colors } from "../styles/globalColors";
import { useState, useEffect } from "react";

const mapStateToProps = (state) => ({
  cartProducts: selectCartProducts(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteCartProduct,
      cleanCart,
    },
    dispatch
  );
};

const Cart = ({ cartProducts, deleteCartProduct, cleanCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cartProducts.reduce((acum, valor) => acum + valor.productQty * valor.price, 0)
    );
  }, [cartProducts]);

  const renderCartProducts = ({ item }) => {
    return (
      <CartItemCard item={item} onPressTrash={()=> handleDelete(item.id)} />
    );
  };

  const handleDelete = (productId) => {
    deleteCartProduct(productId);
    showInfo({ message: "Producto eliminado del carrito." });
  };

  const handleConfirmPurchase = () => {
    console.log("confirmo la compra...")
    cleanCart();
    showSuccess({message: "La compra ha sido confirmada."})
  }

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
        <View style={styles.totalPurchaseSummaryContainer}>
          <View style={styles.totalPurchasePriceContainer}>
            <Text>Total</Text>
            <Text>${totalPrice}</Text>
          </View>
          
          <Button
            buttonTitle="Confirmar Compra"
            style={styles.confirmPurchaseButton}
            onPress={()=> handleConfirmPurchase()}
          />
        </View>
        
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
  },
  cardsContainer:{
    width:"100%",
    height:"90%",
    // backgroundColor:"blue"
  },
  list: {
    // backgroundColor:"green",
    width: "100%",
  },
  confirmPurchaseButton:{
    // width: "100%",
    // maxWidth: "100%"
    borderRadius: 10,
    marginHorizontal: 0,
  },
  totalPurchaseSummaryContainer:{
    justifyContent:"flex-end",
    backgroundColor: colors.white,
    height: "15%",
    borderStyle: "solid",
    borderWidth:.3,
    borderRadius: 10,
    borderColor:colors.lightGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: .3,
    shadowRadius: 2.5,
    elevation: 3,
    // backgroundColor:"red"
  },
  totalPurchasePriceContainer: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    // backgroundColor:"green",
    width:"100%",
    height:"45%"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
