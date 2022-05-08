import React from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/globalColors";
import Searcher from "./Searcher";

const CategoriesContainer = () => {
  const renderCategories = ({ item }) => {
    return (
        <View>
            <TouchableOpacity style={styles.categoriesButton}>
                <Text style={styles.categoriesText}>{item.description}</Text>
            </TouchableOpacity>
        </View>
        
    );
  };

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

  return (
    <View style={styles.container}>
        <Searcher></Searcher>
      <FlatList
        renderItem={renderCategories}
        data={categories}
        keyExtractor={(category) => category.id}
        horizontal
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
