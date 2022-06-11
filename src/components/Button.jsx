import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Button = ({
  onPress,
  buttonTitle = "Aceptar",
  style,
  loading = false,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => onPress()}>
      {loading ? <ActivityIndicator />
      : <Text>{buttonTitle}</Text>}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightblue",
    width: 100,
    height: 40,
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
  },
});

export default Button;
