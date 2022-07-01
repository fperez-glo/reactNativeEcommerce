import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from '../styles/globalColors';

const CartItemCard = ({item, onPressTrash}) => {
  return (
    <View style={styles.card}>
      <View style={styles.qtyContainer}>
        <Text style={styles.productsText}>({item.stock})</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.productsText}>{item.title}</Text>
        <Text style={styles.productsText}>$ {item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => onPressTrash()}>
          <Entypo name="trash" size={24} color={"red"} />
        </TouchableOpacity>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  detailContainer:{
    // backgroundColor:"green",
    width: "70%",
    height:"90%",
    flexDirection:"column",
    justifyContent:"space-around"
  },
  buttonContainer: {
    // backgroundColor:"blue"
  },
  card: {
    backgroundColor: colors.lighGreen,
    marginTop: 5,
    borderRadius: 20,
    padding: 8,
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.boldGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
    flexDirection:"row",
    alignItems: "center",
    justifyContent:"space-between"
  },
  productsText: {
    fontSize: 20,
  },
})

export default CartItemCard