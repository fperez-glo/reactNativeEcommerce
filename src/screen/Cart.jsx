import {
  Text,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { selectCartProducts } from "../store/selectors";
import { showInfo, showSuccess, showOverlay } from "../utils/MessageBar";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  deleteCartProduct,
  cleanCart,
  confirmPurchase,
} from "../features/cart";
import CartItemCard from "../components/CartItemCard";
import Button from "../components/Button";
import { colors } from "../styles/globalColors";
import { useState, useEffect } from "react";
import AlertHelper from "../utils/AlertHelper";
import DropdownAlert from "react-native-dropdownalert";

const mapStateToProps = (state) => ({
  cartProducts: selectCartProducts(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteCartProduct,
      cleanCart,
      confirmPurchase,
    },
    dispatch
  );
};

const Cart = ({
  cartProducts,
  deleteCartProduct,
  cleanCart,
  confirmPurchase,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingConfirmPurchase, setLoadingConfirmPurchase] = useState(false);

  useEffect(() => {
    setTotalPrice(
      cartProducts.reduce(
        (acum, valor) => acum + valor.productQty * valor.price,
        0
      )
    );
  }, [cartProducts]);

  const renderCartProducts = ({ item }) => {
    return (
      <CartItemCard item={item} onPressTrash={() => handleDelete(item.id)} />
    );
  };

  const handleDelete = (productId) => {
    deleteCartProduct(productId);
    showInfo({ message: "Producto eliminado del carrito." });
  };

  const handleConfirmPurchase = async () => {
    showOverlay({ type: "info", message: "hola", infoColor: "#FFF" });
    setLoadingConfirmPurchase(true);
    await confirmPurchase({ items: cartProducts, totalPrice });
    
    
    //Para simular la comunicacion con los servicios de pago..
    setTimeout(() => {
      cleanCart();
      setLoadingConfirmPurchase(false);
      showSuccess({ message: "La compra ha sido confirmada." });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.areaViewCartContainer}>
      <Text style={styles.screenTitle}>Carrito</Text>
      {cartProducts?.length ? (
        <>
          <View style={styles.cartContainer}>
            {loadingConfirmPurchase && (
              <Image
                style={styles.loadingBackground}
                source={{
                  uri: "https://wallpapers.com/images/high/grey-dots-on-white-background-aeqfbtxb29qj1zd6.jpg",
                }}
              ></Image>
            )}
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
            </View>
            <View style={styles.totalPurchaseSummaryContainer}>
              <View style={styles.totalPurchasePriceContainer}>
                <Text style={styles.summaryText}>Total</Text>
                <Text style={styles.summaryText}>${totalPrice}</Text>
              </View>

              <Button
                buttonTitle="Confirmar Compra"
                style={styles.confirmPurchaseButton}
                onPress={() => handleConfirmPurchase()}
              />
            </View>
          </View>
          {/* Despues de haber puesto esta cagada me arrepenti de no haber instalado una dependencia OVERLAY.. */}
          <DropdownAlert
            defaultContainer={styles.loadingAlert}
            ref={(ref) => AlertHelper.setCustomDropDown(ref)}
            onClose={() => setLoadingConfirmPurchase(false)}
            closeInterval={0}
            infoColor={colors.lighGreen}
            renderMessage={() => (
              <ActivityIndicator size={"large"} color={colors.boldGreen} />
            )}
            // infoImageSrc={false}
            onTap={()=> setLoadingConfirmPurchase(false)}
          ></DropdownAlert>
        </>
      ) : (
        <Text>No hay productos en el carrito</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenTitle:{
    fontSize:18,
    fontWeight:"500",
  },
  cartContainer: {
    flex:1,
    paddingHorizontal: 18
  },
  cardsContainer: {
    flex:1,
  },
  list: {
    width: "100%",
  },
  confirmPurchaseButton: {
    borderRadius: 10,
    marginHorizontal: 0,
  },
  totalPurchaseSummaryContainer: {
    justifyContent: "flex-end",
    backgroundColor: colors.white,
    height: "15%",
    borderStyle: "solid",
    borderWidth: 0.3,
    borderRadius: 10,
    borderColor: colors.lightGrey,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
    elevation: 3,
    // marginBottom:2,
  },
  totalPurchasePriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // width: "100%",
    height: "45%",
  },
  summaryText: {
    fontWeight: "500",
    fontSize: 16,
  },
  loadingAlert: {
    height: 0,
    marginTop: "70%",
    // opacity: 1,
  },
  loadingBackground: {
    width: "150%",
    height: "150%",
    opacity: 0.8,
    zIndex: 1,
    position: "absolute",
  },
  areaViewCartContainer:{ 
    backgroundColor: colors.white, 
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
