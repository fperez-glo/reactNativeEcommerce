import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { colors } from "../styles/globalColors";
import defaultImage from "../assets/categories/noImage.png";

const ButtonItem = ({
  onPress,
  backgroundImage = defaultImage,
  buttonItemText,
  disabled = false,
  renderOnLongPress,
  onLongPressCallback = undefined,
}) => {
  const [longPress, setLongPress] = useState(false);

  const handleLongPress = async () => {
    setLongPress(true);

    onLongPressCallback && onLongPressCallback();

    setTimeout(() => {
      setLongPress(false);
    }, 3000);
  };

  const handleOnpress = () => {
    if (longPress) {
      setLongPress(false);
      return;
    }

    onPress();
  };

  return (
    <View style={styles.buttonItemContainer}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.5}
        onLongPress={() => handleLongPress()}
        style={styles.buttonItem}
        onPress={() => handleOnpress()}
      >
        {longPress && renderOnLongPress && renderOnLongPress()}

        {!backgroundImage ? (
          <ActivityIndicator size={"small"} color={colors.boldGreen} />
        ) : (
          <Image
            style={
              longPress
                ? styles.backgroundImageOptionsEnabled
                : styles.backgroundImageDefault
            }
            source={backgroundImage}
          ></Image>
        )}
      </TouchableOpacity>
      <Text style={styles.text}>{buttonItemText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonItemContainer: {
    alignItems: "center",
    margin: 8,
  },
  buttonItem: {
    backgroundColor: colors.lighGreen,
    height: 150,
    width: 160,
    borderRadius: 20,
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
  text: {
    fontWeight: "bold",
  },
  backgroundImageDefault: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode:"stretch",
    // resizeMode:"contain",
    // resizeMode:"cover",
  },
  backgroundImageOptionsEnabled: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    opacity: 0.2,
  },
});

export default ButtonItem;
