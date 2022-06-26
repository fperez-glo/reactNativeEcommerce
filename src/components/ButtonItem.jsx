import { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";
import { colors } from '../styles/globalColors';
import defaultImage from "../assets/categories/noImage.png"

const ButtonItem = ({
    onPress,
    backgroundImage = defaultImage,
    buttonItemText,
    disabled = false,
    renderOnLongPress,
}) => {
  const [longPress, setLongPress] = useState(false);

  const handleLongPress = async() => {
    console.log("entra en un click largo!")
    setLongPress(true);
    
    // Lo mas facil por el momento es dejar un tiempo las opciones nuevas y luego deshabilitarlas si el usuario no las utiliza..
    // setTimeout(() => {
    //   setLongPress(false);
    // }, 3000);
  }

  const handleOnpress = () => {
    if(longPress) {
      setLongPress(false);
      return;
    }

    onPress();
  }

  return (
    <View style={styles.buttonItemContainer}>
        <TouchableOpacity disabled={disabled} activeOpacity={0.5} onLongPress={()=> handleLongPress()}
        style={styles.buttonItem} onPress={() => handleOnpress()}>
        {longPress && renderOnLongPress && renderOnLongPress()}
        <Image style={longPress ? styles.backgroundImageOptionsEnabled : styles.backgroundImageDefault} source={backgroundImage}>
        
        </Image>
        
        </TouchableOpacity>
        <Text style={styles.text}>{buttonItemText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonItemContainer: {
        alignItems: "center",
        margin:8
      },
      buttonItem:{
        backgroundColor: "#000",
        // backfaceVisibility:"visible",
        // margin: 10,
        height: 150,
        width: 160,
        borderRadius: 20,
        // padding: 10,
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
    text:{
        fontWeight:"bold",
    },
    backgroundImageDefault: {
        width:"100%",
        height:"100%",
        borderRadius: 20,
        
      },
      backgroundImageOptionsEnabled: {
        width:"100%",
        height:"100%",
        borderRadius: 20,
        opacity: .6 
      },
})

export default ButtonItem