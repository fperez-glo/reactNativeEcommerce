import { bindActionCreators } from "@reduxjs/toolkit";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import CategoriesContainer from "../components/CategoriesContainer";
import { setSelectedCategory } from "../features/categories";

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedCategory,
    },
    dispatch,
  );
};

const Home = ({ navigation, setSelectedCategory }) => {

  const handleSelectCategory = (item) => {
    setSelectedCategory(item.id)
    navigation.navigate("Products")
  };

  return (
    <SafeAreaView>
      <View style={styles.homeContainer}>
        <Text>Categorias de Productos</Text>
        <CategoriesContainer
          onPressCategory={handleSelectCategory}
        />
      </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    // width: "90%",
    height: "95%",
    // backgroundColor:"green",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    marginTop: 42
  },
  button: {
    backgroundColor: "lightblue",
    width: 100,
    height: 40,
    marginTop: 20,
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

export default connect(null, mapDispatchToProps)(Home);
