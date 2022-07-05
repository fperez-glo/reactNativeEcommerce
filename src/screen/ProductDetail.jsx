import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import Button from "../components/Button";
import Counter from "../components/Counter";
import { selectSelectedProduct } from "../store/selectors";
import { showInfo, showSuccess } from "../utils/MessageBar";
import { addCartProduct } from "../features/cart";
import { bindActionCreators } from "@reduxjs/toolkit";

const mapStateToProps = (state) => ({
  selectedProductData: selectSelectedProduct(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addCartProduct,
    },
    dispatch
  );
};

const ProductDetail = ({ navigation, selectedProductData, addCartProduct }) => {
  const [productQty, setProductQty] = useState();

  const handleAddToCart = () => {
    console.log("agrego al carrito;");
    const product = {
      id: selectedProductData.id,
      productQty,
      title: selectedProductData.title,
      price: selectedProductData.price,
    };
    addCartProduct(product);
    showSuccess({ message: "Producto agregado al carrito." });
  }

  return (
    // <SafeAreaView style={{flex:1}}>
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={selectedProductData.asset}></Image>

        <Text style={styles.title}>{selectedProductData.title}</Text>
        <Text>${selectedProductData.price}</Text>
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
            onPress={()=> handleAddToCart()}
          ></Button>
        </View>

        <View style={styles.descriptionContainer}>
          <Text>{selectedProductData.description}</Text>
        </View>

        {/* <Text>{selectedProductData.description}</Text> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 5,
    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "stretch",
    borderRadius: 15,
    // marginHorizontal:5
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  addToCartContainer: {
    flexDirection: "row",
    // backgroundColor:"red",
    maxWidth: "90%",
    justifyContent: "flex-start",
  },
  addToCartButton: {
    height: 35,
    marginLeft: 5,
  },
  descriptionContainer: {
    // backgroundColor:"red"
    marginTop: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
