import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";

const CategoriesContainer = ({onPressCategory}) => {
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

export default CategoriesContainer;
