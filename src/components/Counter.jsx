import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/globalColors";

const Counter = () => {
  const [counter, setCounter] = useState(1);

    const add = () => {
        console.log("counter:",counter)
        setCounter(counter+1)
    }

    const subtract = () => {
       counter > 1 && setCounter(counter-1)
    }

  return (
    <View style={styles.container}>
     
     <TouchableOpacity style={styles.button} onPress={()=> subtract()}>
        <Text style={styles.addSubtractText}>-</Text>
      </TouchableOpacity>
      <Text>{counter}</Text>

      
      <TouchableOpacity style={styles.button} onPress={()=> add()}>
        <Text style={styles.addSubtractText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.lightGrey,
    opacity: 0.6,
    borderRadius: 25,
    justifyContent:"space-between",
    padding: 4
  },
  addSubtractText: {
    fontWeight: "bold",
    padding:4
  },
  button:{
    width:"30%",
    backgroundColor:colors.lighGreen,
    borderRadius: 100
  }
});

export default Counter;
