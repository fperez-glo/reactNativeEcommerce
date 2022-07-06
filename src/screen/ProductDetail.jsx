import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import Button from "../components/Button";
import Counter from "../components/Counter";
import { selectDeviceHeight, selectSelectedProduct } from "../store/selectors";
import { showInfo, showSuccess } from "../utils/MessageBar";
import { addCartProduct } from "../features/cart";
import { bindActionCreators } from "@reduxjs/toolkit";
import { colors } from "../styles/globalColors";

const mapStateToProps = (state) => ({
  selectedProductData: selectSelectedProduct(state),
  deviceHeight: selectDeviceHeight(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addCartProduct,
    },
    dispatch
  );
};

const ProductDetail = ({
  navigation,
  selectedProductData,
  addCartProduct,
  deviceHeight,
}) => {
  const [productQty, setProductQty] = useState();

  const handleAddToCart = () => {
    const product = {
      id: selectedProductData.id,
      productQty,
      title: selectedProductData.title,
      price: selectedProductData.price,
      asset: selectedProductData.asset,
    };
    addCartProduct(product);
    showSuccess({ message: "Producto agregado al carrito." });
  };

  return (
    // <SafeAreaView style={{flex:1}}>
    <ScrollView style={{ backgroundColor: colors.white }}>
      <View style={styles.container}>
        <Image style={styles.image} source={selectedProductData.asset}></Image>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedProductData.title}</Text>
          <Text style={styles.priceText}>${selectedProductData.price}</Text>
        </View>
        <View style={styles.addToCartContainer}>
          <Counter
            maxCount={selectedProductData.stock}
            whenTapMaxCount={() =>
              showInfo({ message: "No hay mas stock disponible." })
            }
            onChange={setProductQty}
          ></Counter>
          <Button
            buttonTitle="Agregar al carrito"
            style={styles.addToCartButton}
            onPress={() => handleAddToCart()}
          ></Button>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{selectedProductData.description}</Text>
        </View>
        <Button
          buttonTitle="Volver"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get('window').height - ((Dimensions.get('window').height * 10)/100),
    // width: "100%",
    padding: 8,
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "stretch",
    borderRadius: 15,
    // marginHorizontal:5
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 25,
  },
  addToCartContainer: {
    flexDirection: "row",
    // backgroundColor:"red",
    maxWidth: "90%",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  addToCartButton: {
    height: 35,
    marginLeft: 5,
  },
  descriptionContainer: {
    // backgroundColor:"red"
    marginTop: 5,
  },
  backButton: {
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
