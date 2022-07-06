import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/globalColors";

const Counter = ({ maxCount, whenTapMaxCount, onChange }) => {
  const [counter, setCounter] = useState(1);

  useEffect(()=> {
    onChange && onChange(counter);
  }, [counter])

  const add = () => {
    if (maxCount) {
      maxCount > counter && setCounter(counter + 1);
      maxCount === counter && whenTapMaxCount();
      return;
    }

    setCounter(counter + 1);
  };



  const subtract = () => {
    counter > 1 && setCounter(counter - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => subtract()}>
        <Text style={styles.addSubtractText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.textCounter}>{counter}</Text>
      <TouchableOpacity style={styles.button} onPress={() => add()}>
        <Text style={styles.addSubtractText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.lighGreen,
    // opacity: 0.8,
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 4,
    alignItems: "center",
  },
  addSubtractText: {
    fontWeight: "bold",
    padding: 5,
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    backgroundColor: colors.boldGreen,
    borderRadius: 5,
  },
  textCounter: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Counter;
