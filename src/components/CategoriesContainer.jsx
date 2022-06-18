import { bindActionCreators } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";
import { fetchCategories, setSelectedCategory } from "../features/categories";

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSelectedCategory,
      fetchCategories,
    },
    dispatch,
  );
};

const CategoriesContainer = ({navigation, onPressCategory, setSelectedCategory, selectedCategory, fetchCategories}) => {
  const [ categoryInput, setCategoryInput ] = useState("");
  const [ categoriesToRender, setCategoriesToRender] = useState([]);
  const [ categoriesToFilter, setCategoriesToFilter] = useState([]);
  

  useEffect(() => {
    fetchCategoriesData();
  },[])

  const fetchCategoriesData = async () => {
    const dbCategories = await fetchCategories();
    setCategoriesToRender(dbCategories.payload);
    setCategoriesToFilter(dbCategories.payload);
  }
  
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

  const searchCategory = async (text) => {  
    setCategoryInput(text);
    if (text !== "") {
      const categoryFilter = categoriesToFilter.filter(category => category.description.toLowerCase().search(text.toLowerCase()) !== -1)
      setCategoriesToRender(categoryFilter)
    } else if (text === "") {
      setCategoriesToRender(categoriesToFilter);
    }
  }

  return (
    <View style={styles.container}>
      <Searcher onChangeText={searchCategory} searchInputValue={categoryInput}></Searcher>
      <FlatList
        renderItem={renderCategories}
        data={categoriesToRender}
        keyExtractor={(category) => category.id}
        // horizontal={false}
        numColumns= {2}
        // pagingEnabled={true}
        // showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        width: "95%",
        height: "100%",
        // justifyContent: "center",
        alignItems: "center"
        
    },
    categoriesButton:{
        backgroundColor: colors.lighGreen,
        margin: 10,
        height: 150,
        width: 160,
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
    categoriesText:{
        fontWeight:"bold"
    }

})

export default connect(undefined, mapDispatchToProps)(CategoriesContainer);
