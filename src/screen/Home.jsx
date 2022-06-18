import { bindActionCreators } from "@reduxjs/toolkit";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
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
    // backgroundColor:"blue",
    // flex:1,
    alignItems: "center",
    // height:"100%",
    // width:"100%"
    
  },
});

export default connect(null, mapDispatchToProps)(Home);
