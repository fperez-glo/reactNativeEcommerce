import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";

const ProductsContainer = ({
  selectedCategory,
  // onPressProduct,
  // onPressHandleBack,
  navigation
}) => {
  const [productsData, setProductsData] = useState(null);

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
  ];

  useEffect(() => {
    setProductsData(products);
  }, []);

  const onPressProduct = (product) => {
    console.log("producto:", product)
  }

  const renderProducts = ({ item }) => {
    // return item.categoryId === selectedCategory.id ? (
    ////                                                                      ////
    // TODO:    Por el momento dejo hardcodeada una categoria hasta poder     ////
    // TODO:    pasarle informacion al componente por medio de la navegacion. ////
    ////                                                                      ////
    return item.categoryId === 1 ? (
      <View>
        <TouchableOpacity
          style={styles.productsButton}
          onPress={() => onPressProduct(item)}
        >
          <Text style={styles.productsText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      null
    );
  };

  const [productInput, setProductInput] = useState("");

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
  } 

  return (
    <View style={styles.container}>
      <Searcher
        onChangeText={searchProduct}
        searchInputValue={productInput}
      ></Searcher>
      <FlatList
        renderItem={renderProducts}
        data={productsData}
        keyExtractor={(product) => product.id}
        horizontal
        // pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.button} onPress={onPressHandleBack}>
        <Text>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
    width: "100%",
    height: 200,
    alignItems: "center",
    // padding: 5,
    marginTop: 42
  },
  productsButton: {
    backgroundColor: colors.lighGreen,
    margin: 5,
    height: 100,
    width: 100,
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
  },
  button: {
    backgroundColor: "lightblue",
    width: 100,
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
  productsText: {},
});

export default ProductsContainer;
