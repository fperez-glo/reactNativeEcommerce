import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { selectSelectedProduct } from '../store/selectors';

const mapStateToProps = (state) => ({
  selectedProductData: selectSelectedProduct(state),
});

const ProductDetail = ({navigation, selectedProductData}) => {
  console.log("selectedProductData:",selectedProductData)
  return (
    <View style={styles.container}>
    <Text>ProductDetail</Text>
    <Text>{selectedProductData.title}</Text>
    <Text>${selectedProductData.price}</Text>
    
    <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
        <Text>Volver</Text>
      </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{}
})

export default connect(mapStateToProps, undefined)(ProductDetail);