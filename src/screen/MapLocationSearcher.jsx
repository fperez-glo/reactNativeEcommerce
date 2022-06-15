import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import config from "../config/aplication.config";
import StaticMapConsts from "./const/StaticMap.enum";
import Button from "../components/Button";
import { showInfo } from "../utils/MessageBar";
import axios from "axios";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { addLocation } from "../features/configuration/locations";
import MapView from "react-native-maps"

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addLocation,
    },
    dispatch
  );
};

const MapLocationSearcher = ({ navigation, addLocation }) => {
  const [location, setLocation] = useState(undefined);
  const [staticMap, setStaticMap] = useState(undefined);
  const [geoCodeAdressLabel, setGeoCodeAdressLabel] = useState(undefined);
  const [textInput, setTextInput] = useState("");
  const [loadingMap, setLoadingMap] = useState(true);
  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location?.latitude) {
      getStaticMap();
      getGeoCode();
      setLoadingMap(false);
    }
  }, [location]);

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== "granted") {
      showInfo({ message: "No se otorgo permiso de locacion a la aplicacion" });
      navigation.goBack();
      return;
    }

    const location = await getCurrentPositionAsync();
    setLocation({
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude,
    });
  };

  const getStaticMap = async () => {
    const mapUrl = replaceParams(config.extra.googleCloudPlatformStaticMapsApi);
    setStaticMap(mapUrl);
  };

  const getGeoCode = async () => {
    const geoCodeUrl = replaceParams(
      config.extra.googleCloudPlatformGeoCodeApi
    );
    console.log("geoCodeUrl:", geoCodeUrl)
    const geoCode = await axios.get(geoCodeUrl);

    // const urladress ="https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAvBSp5AIi_hZUJfTNd2Ece26hrr37Wces";
    // const geoCodeAdress = await axios.get(urladress);
    // console.log("geoCodeAdress:",geoCodeAdress.data.results[0])
    setGeoCodeAdressLabel(geoCode.data.results[0].formatted_address);
    // console.log("geoCode:", geoCode.data.results[0].formatted_address);
  };

  const replaceParams = (url) => {
    url = url.replace(StaticMapConsts.mapHeight, config.extra.mapHeight);
    url = url.replace(StaticMapConsts.mapWidth, config.extra.mapWidth);
    url = url.replace(StaticMapConsts.mapZoom, config.extra.mapZoom);
    url = url.replaceAll(StaticMapConsts.mapLatitude, location.latitude);
    url = url.replaceAll(StaticMapConsts.mapLongitude, location.longitude);

    return url;
  };

  // const handleSearchAdress = (input) => {
  //   setTextInput(input);
    
  //   // console.log(replacePlaceAutocompleteInput(input));

  //   setTimeout( () => {
  //     setCounter(counter +1)
  //     const autocomplete = (await axios.get(replacePlaceAutocompleteInput(input))).data;
  //     // console.log("autocomplete:", autocomplete.predictions)
  //     autocomplete.predictions.forEach(place => {
  //       console.log(place.description)
  //     });
  //   }, 5000);

  // }
  // console.log("veces que ejecuta la api:", counter)

  const replacePlaceAutocompleteInput = (input) => {
    let autoCompleteUrl = config.extra.googleCloudPlatformPlacesAutoCompleteApi;
    autoCompleteUrl = autoCompleteUrl.replace("%PLACES_INPUT%", input);

    return autoCompleteUrl;
  }

  const handleConfirmLocation = async () => {
    console.log("confirmo la locacion..")
    
    const autocomplete = await axios.get(replacePlaceAutocompleteInput(textInput));
    // console.log("autocomplete:", autocomplete.predictions)
    autocomplete && autocomplete.data.predictions.forEach(place => {
      console.log(place.description)
    });
    
    // const location = {
    //   adress: textInput,
    //   country:"AR",
    //   city: "Buenos Aires",
    //   cp: "1427"
    // }
    // addLocation(location);
    // navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Agregar Direccion</Text>

      {loadingMap ? (
        <ActivityIndicator style={styles.activityIndicator} size={"large"}/>
      ) : (
        <View style={styles.mapContainer}>
          <Image source={{ uri: staticMap }} style={styles.mapImage}></Image>
        </View>
      )}

      <TextInput
        style={styles.textInput}
        onChangeText={setTextInput}
        value={textInput}
      ></TextInput>
      <View style={styles.buttonContainer}>
        <Button
          buttonTitle="Volver"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.button}
        />
        <Button
          buttonTitle="Confirmar"
          onPress={() => {
            handleConfirmLocation();
          }}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    height: "100%",
    // backgroundColor:"red"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  mapImage: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  mapContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
    elevation: 3,
    marginVertical: 8,
  },
  textInput: {
    width: "90%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.5,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    width: "60%",
    // backgroundColor:"red"
  },
  button: {
    marginHorizontal: 2,
    marginVertical: 5
  },
  activityIndicator: {
    // width:100,
    height:"60%",
    // backgroundColor:'red'
  }
});

export default connect(undefined,mapDispatchToProps)(MapLocationSearcher);
