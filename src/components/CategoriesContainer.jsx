import { bindActionCreators } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect, useSelector } from "react-redux";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";
import { setSelectedCategory } from "../features/categories";

const mapStateToProps = () => ({
  categorias: useSelector(state => state.categories.data),
  // selectedCategory: useSelector(state => state.categories.selectedCategory || null)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedCategory,
    },
    dispatch,
  );
};

const CategoriesContainer = ({onPressCategory, categorias, setSelectedCategory, selectedCategory}) => {
  const [ categoryInput, setCategoryInput ] = useState("");
  const [ categoriesData, setCategoriesData] = useState(null);
  
  const categories = [
    {
      id: 1,
      description: "Microprocesadores",
    },
    {
      id: 2,
      description: "Tarjetas de Video",
    },
    {
      id: 3,
      description: "Fuentes",
    },
    {
      id: 4,
      description: "Almacenamiento",
    },
  ];

  useEffect(() => {
    setCategoriesData(categories);
  },[])


  // console.log("categorias desde redux!!!;", categorias)
  // console.log("selectedCategory!!!;", selectedCategory)

  const onPressHere =(item)=> {
    console.log("category:", item)
    setSelectedCategory(item.id)
  }


  const renderCategories = ({ item }) => {
    return (
        <View>
          <TouchableOpacity style={styles.categoriesButton} onPress={() => onPressHere(item)}>
            <Text style={styles.categoriesText}>{item.description}</Text>
          </TouchableOpacity>
        </View>
    );
  };

  const searchCategory = (text) => {  
    setCategoryInput(text);
    if (text !== "" && categoriesData.length) {
      const categoryFilter = categoriesData.filter(category => category.description.toLowerCase().search(text.toLowerCase()) !== -1)
      setCategoriesData(categoryFilter)
    } else {
      setCategoriesData(categories);
    }
  }

  return (
    <View style={styles.container}>
      <Searcher onChangeText={searchCategory} searchInputValue={categoryInput}></Searcher>
      <FlatList
        renderItem={renderCategories}
        data={categoriesData}
        keyExtractor={(category) => category.id}
        horizontal
        // pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor:"red",
        width: "100%",
        height:200
    },
    categoriesButton:{
        backgroundColor: colors.lighGreen,
        margin:5,
        height:100,
        width:100,
        borderRadius:20,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        borderColor: colors.lightGrey,
        borderWidth:0.3,
        shadowColor: "#000",
        shadowOffset: {
          width: 1.5,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.5,
        elevation: 3,
    },
    categoriesText:{
        
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
