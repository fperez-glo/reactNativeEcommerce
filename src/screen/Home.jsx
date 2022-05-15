import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CategoriesContainer from "../components/CategoriesContainer";
import ProductsContainer from "../components/ProductsContainer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleBackProducts = () => {
    setSelectedCategory(null);
  };

  return (
    <View style={styles.homeContainer}>
      {/* <TouchableOpacity
            style={styles.button}>
            <Text>Aceptar</Text>
        </TouchableOpacity> */}
      {selectedCategory ? (
        <View style={styles.productsContainer}>
          <Text>Productos</Text>
          <ProductsContainer
          onPressHandleBack={handleBackProducts}
          selectedCategory={selectedCategory}
        />
        </View>
        
      ) : (
        <View style={styles.categoriesContainer}>
          <Text>Categorias de Productos</Text>
          <CategoriesContainer
          onPressCategory={handleSelectCategory}
          />
        </View>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    width: "90%",
    height: "95%",
    // backgroundColor:"green",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  productsContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor:"green",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  categoriesContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor:"green",
    justifyContent: "flex-start",
    alignItems: "center",
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
});

export default Home;
