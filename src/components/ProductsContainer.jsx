import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { addCartProduct } from "../features/cart";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";
import { bindActionCreators } from "@reduxjs/toolkit";
import { showSuccess } from "../utils/MessageBar";
import { selectSelectedCategory } from "../store/selectors";
import ButtonItem from "./ButtonItem";
import { AntDesign } from "@expo/vector-icons";
import Counter from "./Counter";

const mapStateToProps = (state) => ({
  selectedCategoryId: selectSelectedCategory(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addCartProduct,
    },
    dispatch
  );
};

const ProductsContainer = ({
  selectedCategoryId,
  // onPressProduct,
  // onPressHandleBack,
  addCartProduct,
  navigation,
}) => {
  const [productsData, setProductsData] = useState(null);
  const [productInput, setProductInput] = useState("");
  const [onLongPressProductOptions, setOnLongPressProductOptions] = useState(false);

  useEffect(() => {

    fetchProductsByCategory()
    
  }, []);

  const products = [
    {
      id: 1,
      categoryId: 2,
      title: "GTX 1070TI",
    },
    {
      id: 2,
      categoryId: 3,
      title: "Seasonic 500W",
    },
    {
      id: 3,
      categoryId: 1,
      title: "Intel i7 7700k",
    },
    {
      id: 4,
      categoryId: 1,
      title: "Amd Ryzen 5 3600x",
    },
    {
      id: 5,
      categoryId: 4,
      title: "WD Blue 1TB",
    },
    {
      id: 6,
      categoryId: 1,
      title: "Amd Ryzen 5 5600x",
    },
    {
      id: 7,
      categoryId: 1,
      title: "Amd Ryzen 5 3600",
    },
    {
      id: 8,
      categoryId: 4,
      title: "WD Black 1TB",
    },
    {
      id: 9,
      categoryId: 4,
      title: "WD Blue 500GB",
    },
    {
      id: 10,
      categoryId: 1,
      title: "Intel I5 7400F",
    },
  ];

 

  const fetchProductsByCategory = () => {
    const productsByCategory = products.filter(product => product.categoryId === selectedCategoryId);
    setProductsData(productsByCategory);
  }

  const onPressProduct = async (product) => {
    console.log("apreto el boton")
    addCartProduct(product);
    showSuccess({ message: "Producto agregado al carrito." });
  };

  const renderProductCartOptionsOnLongPress = () =>{
    return (
      <View style={styles.productCartOptionsContainer}>
        <View>
        <TouchableOpacity>
          <AntDesign name="shoppingcart" size={28} color={"#FFF"}/>
        </TouchableOpacity>
      </View>
      <View>
      <Counter></Counter>
    </View>
      </View>
      
      
    )
  }

  const renderProducts = ({ item }) => {
    return  (
      <ButtonItem  onPress={() => onPressProduct(item)} buttonItemText={item.title} renderOnLongPress={()=> renderProductCartOptionsOnLongPress()} />  
    )
  };

  const searchProduct = (text) => {
    setProductInput(text);
    if (text !== "" && productsData.length) {
      const productsFilter = productsData.filter(
        (product) =>
          product.title.toLowerCase().search(text.toLowerCase()) !== -1
      );
      setProductsData(productsFilter);
    } else {
      setProductsData(products);
    }
  };

  const onPressHandleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Searcher
        onChangeText={searchProduct}
        searchInputValue={productInput}
      />
      <FlatList
        renderItem={renderProducts}
        data={productsData}
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
    fontWeight: "bold"
  },
  productCartOptionsContainer:{
    position: "absolute",
    top: "45%",
    zIndex:1,
    // flexDirection:"row"
    backgroundColor:"red"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
