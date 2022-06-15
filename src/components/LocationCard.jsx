import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import config from "../config/aplication.config";

const LocationCard = ({
  image = config.extra.defaultLocationImage,
  title = "Location Title",
}) => {
  const handleEditLocation = () => {
    console.log("Navegar a una screen para editar la direccion");
  };

  const handleEditPicture = () => {
    console.log("Navegar a una screen para editar la foto");
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationImageContainer}>
        <TouchableOpacity
          style={styles.asdasd}
          onPress={() => handleEditPicture()}
        >
          <Image style={styles.locationImage} source={{ uri: image }}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => handleEditLocation()}
      >
        <Text>{title}</Text>
        <AntDesign name="right" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: 80,
    borderRadius: 10,
    padding: 8,
    marginVertical:3,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
  },
  locationImageContainer: {
    width: "18%",
    height: "100%",
  },
  locationImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  locationButton: {
    // backgroundColor:"red",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
});

export default LocationCard;
