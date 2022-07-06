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

  const getWidth = (style) => {
    return buttonTitle.length > 10 ? buttonTitle.length * 9 : 100
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        { maxWidth: style?.width && getWidth(style) },
      ]}
      onPress={() => onPress()}
    >
      {loading ? <ActivityIndicator /> : <Text>{buttonTitle}</Text>}
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightblue",
    height: 40,
    // marginHorizontal:5,
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
