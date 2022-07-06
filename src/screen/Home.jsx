import { bindActionCreators } from "@reduxjs/toolkit";
import { useAssets } from "expo-asset";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { connect } from "react-redux";
import CategoriesContainer from "../components/CategoriesContainer";
import { setSelectedCategory } from "../features/categories";
import { setGlobalAplicationProductsAssets } from "../features/assets";
import { colors } from "../styles/globalColors";

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedCategory,
      setGlobalAplicationProductsAssets
    },
    dispatch,
  );
};

const Home = ({ navigation, setSelectedCategory, setGlobalAplicationProductsAssets }) => {

  //Cargo desde temprano los assets de los productos.
  const [assets, error] = useAssets([
    require('../assets/products/i57400F.png'),
    require('../assets/products/i77700K.png'),
    require('../assets/products/gtx1070ti.png'),
    require('../assets/products/ryzen3600.png'),
    require('../assets/products/ryzen5000.png'),
    require('../assets/products/seasonic500.png'),
    require('../assets/products/wdBlack1tb.png'),
    require('../assets/products/wdBlue1tb.png'),
    require('../assets/products/wdBlue500gb.png'),
  ]);

  setGlobalAplicationProductsAssets(assets);

  const handleSelectCategory = (item) => {
    setSelectedCategory(item.id);
    navigation.navigate("Products");
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
    backgroundColor: colors.white,
    // flex:1,
    alignItems: "center",
    // height:"100%",
    // width:"100%"
    
  },
});

export default connect(null, mapDispatchToProps)(Home);
