import { bindActionCreators } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect, useSelector } from "react-redux";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";
import { fetchCategories, setSelectedCategory } from "../features/categories";

const mapStateToProps = () => ({
  // categories: useSelector(state => state.categories.data),
  // selectedCategory: useSelector(state => state.categories.selectedCategory || null)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedCategory,
      fetchCategories,
    },
    dispatch,
  );
};

const CategoriesContainer = ({navigation, onPressCategory, categories, setSelectedCategory, selectedCategory, fetchCategories}) => {
  const [ categoryInput, setCategoryInput ] = useState("");
  const [ categoriesData, setCategoriesData] = useState(null);
  

  useEffect(() => {
    fetchCategoriesData();
  },[])

  console.log("selectedCategory!!!:", useSelector(state => state.categories.selectedCategory || null))

  const fetchCategoriesData = async () => {
    const dbCategories = await fetchCategories();
    setCategoriesData(dbCategories.payload);
  }


  // console.log("categorias desde redux!!!;", categorias)
  // console.log("selectedCategory!!!;", selectedCategory)
  
  const onPressHere =(item)=> {
    
    setSelectedCategory(item.id)
    navigation.navigate("Products")
  }


  const renderCategories = ({ item }) => {
    return (
        <View>
          <TouchableOpacity style={styles.categoriesButton} onPress={() => onPressCategory(item)}>
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
