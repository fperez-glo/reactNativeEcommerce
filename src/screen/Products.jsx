import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { colors } from "../styles/globalColors";
import Searcher from "../components/Searcher";
import { bindActionCreators } from "@reduxjs/toolkit";
import { showSuccess } from "../utils/MessageBar";
import { selectSelectedCategory, selectProductAssets } from "../store/selectors";
import ButtonItem from "../components/ButtonItem";
import { AntDesign } from "@expo/vector-icons";
import Counter from "../components/Counter";
import Button from "../components/Button";
import { fetchProducts, selectedProductAddPropertie, setSelectedProduct } from "../features/products";

const mapStateToProps = (state) => ({
  selectedCategoryId: selectSelectedCategory(state),
  selectedProductAssets: selectProductAssets(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setSelectedProduct,
      selectedProductAddPropertie,
      fetchProducts,
    },
    dispatch
  );
};

const Products = ({
  selectedProductAssets,
  selectedCategoryId,
  setSelectedProduct,
  selectedProductAddPropertie,
  fetchProducts,
  // onPressProduct,
  // onPressHandleBack,
  navigation,
}) => {
  const [productsToRender, setProductsToRender] = useState([]);
  const [productsToFilter, setProductsToFilter] = useState([]);
  const [productInput, setProductInput] = useState("");
  const [selectedProductItem, setSelectedProductItem] = useState(undefined);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    const dbProducts = await fetchProducts();
    // Filtro antes por categoria de producto.
    const productsByCategory = dbProducts.payload.filter(
      (product) => product.categoryId === selectedCategoryId
    );
    setProductsToRender(productsByCategory);
    setProductsToFilter(productsByCategory);
  }

  const onPressProduct = async (product) => {
    setSelectedProduct(product.id);
    selectedProductAddPropertie({propertieName: "asset",data: getProductAsset(product.localAssetName)});
    navigation.navigate("ProductDetail");
    // console.log("apreto el boton", product);
    // addCartProduct(product);
    // showSuccess({ message: "Producto agregado al carrito." });
  };

  const renderProductCartOptionsOnLongPress = () => {
    return (
      <View style={styles.productCartOptionsContainer}>
        <View style={styles.cartButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <AntDesign name="shoppingcart" size={28} color={"#FFF"} />
          </TouchableOpacity>
        </View>
        <View style={styles.counterContainer}>
          <Button onPress={() => onPressProduct(selectedProductItem)} buttonTitle="Agregar al Carrito" style={styles.addToCartButton}/>
          <Counter maxCount={selectedProductItem?.stock}></Counter>
        </View>
      </View>
    );
  };

  const renderProducts = ({ item }) => {
    return (
      <ButtonItem
        onPress={() => onPressProduct(item)}
        buttonItemText={item.title}
        renderOnLongPress={() => renderProductCartOptionsOnLongPress()}
        onLongPressCallback={() => setSelectedProductItem(item)}
        backgroundImage={getProductAsset(item.localAssetName)}
        // backgroundImage={{uri: "http://192.168.3.45:19000/assets/src/assets/products/wdBlue500gb.png?platform=ios&hash=a2dbedb83351e2ce747bc18f246e229f?platform=ios&dev=true&hot=false&strict=false&minify=false"}}
      />
    );
  };

  const getProductAsset = (localAssetName) => {
    let assetToRender;
    for (let i = 0; i < selectedProductAssets.length; i++) {
      const asset = selectedProductAssets[i];
      if (asset.assetName === localAssetName){
        // setSelectedProduct(...{asset});
        assetToRender = asset;
        break;
      }
    }
    return assetToRender;
  }

  const searchProduct = async (text) => {  
    setProductInput(text);
    if (text !== "") {
      const productFilter = productsToFilter.filter(product => product.description.toLowerCase().search(text.toLowerCase()) !== -1)
      setProductsToRender(productFilter)
    } else if (text === "") {
      setProductsToRender(productsToFilter);
    }
  }

  const onPressHandleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Searcher onChangeText={searchProduct} searchInputValue={productInput} />
      <FlatList
        renderItem={renderProducts}
        data={productsToRender}
        keyExtractor={(product) => product.id}
        // vertical
        // pagingEnabled={true}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.button} onPress={onPressHandleBack}>
        <Text>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  productsButton: {
    backgroundColor: colors.lighGreen,
    margin: 10,
    height: 150,
    width: 150,
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightGrey,
    borderWidth: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 1.5,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
    // backgroundColor:"blue"
  },
  button: {
    backgroundColor: "lightblue",
    width: 200,
    height: 40,
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
  },
  productCartOptionsContainer: {
    position: "absolute",
    // top: "45%",
    zIndex: 1,
    width: "90%",
    height: "90%",
    // flexDirection:"row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  cartButtonContainer:{
    // backgroundColor:"green",
    alignItems:"flex-end",
  },
  counterContainer:{
    // backgroundColor:"blue",
    justifyContent:"flex-end"
  },
  addToCartButton: {
    width:"100%",
    height:"40%",
    backgroundColor: colors.boldGreen,
    marginBottom: 2,
    borderRadius:10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
