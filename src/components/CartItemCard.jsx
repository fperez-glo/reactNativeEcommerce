import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { colors } from '../styles/globalColors';

const CartItemCard = ({item, onPressTrash}) => {
  return (
    <View style={styles.card}>
      <Image
            style={styles.backgroundImageDefault}
            source={item.asset}
          ></Image>
      <View style={styles.qtyContainer}>
        <Text style={styles.productsText}>({item.productQty})</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.productsText}>{item.title}</Text>
        <Text style={styles.productsText}>$ {item.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => onPressTrash()} style={styles.trashButton}>
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
    backgroundColor: "black",
    marginTop: 2,
    borderRadius: 20,
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
    fontWeight:"bold",
    color: colors.white
  },
  backgroundImageDefault:{
    width:"100%",
    height:"100%",
    position:"absolute",
    opacity: .3,
    resizeMode:"cover",
    borderRadius: 20
  },
  trashButton: {
    right: 20
  }
})

export default CartItemCard