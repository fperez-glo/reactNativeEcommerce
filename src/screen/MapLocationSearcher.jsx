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
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import config from "../config/aplication.config";
import StaticMapConsts from "./const/StaticMap.enum";
import Button from "../components/Button";
import { showInfo } from "../utils/MessageBar";
import axios from "axios";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { addLocation, addDBLocation } from "../features/configuration/locations";
import MapView from "react-native-maps"

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addLocation,
      addDBLocation,
    },
    dispatch
  );
};

const MapLocationSearcher = ({ navigation, addLocation, addDBLocation }) => {
  const [location, setLocation] = useState(undefined);
  const [staticMap, setStaticMap] = useState(undefined);
  const [geoCodeAdress, setGeoCodeAdress] = useState(undefined);
  const [textInput, setTextInput] = useState("");
  const [loadingMap, setLoadingMap] = useState(true);
  const [dropDownData, setDropDownData] = useState([]);
  // const [counter, setCounter] = useState(0);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location?.latitude) {
      getStaticMap();
      // getGeoDefaultCode();
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

  const getGeoDefaultCode = async () => {
    const geoCodeUrl = replaceParams(
      config.extra.googleCloudPlatformGeoCodeApi
    );
    const geoCode = await axios.get(geoCodeUrl);
    setGeoCodeAdress(geoCode.data.results[0].formatted_address);
  };

  const replaceParams = (url) => {
    url = url.replace(StaticMapConsts.mapHeight, config.extra.mapHeight);
    url = url.replace(StaticMapConsts.mapWidth, config.extra.mapWidth);
    url = url.replace(StaticMapConsts.mapZoom, config.extra.mapZoom);
    url = url.replaceAll(StaticMapConsts.mapLatitude, location.latitude);
    url = url.replaceAll(StaticMapConsts.mapLongitude, location.longitude);
    return url;
  };

  const handleOnChangeSearchAdress = async (input) => {
    let autoCompleteData = [];
    setTextInput(input);
    if(input.length > 9){
      const autocomplete = await axios.get(replacePlaceAutocompleteInput(input));

      autocomplete && autocomplete.data.predictions.forEach(place => {
        const adress = {
          id: Math.random(),
          description: place.description,
          selected: false,
        }
        autoCompleteData.push(adress)
      });

      setDropDownData(autoCompleteData);
    } else {
      setDropDownData([]);
    }
  }

  const replacePlaceAutocompleteInput = (input) => {
    let autoCompleteUrl = config.extra.googleCloudPlatformPlacesAutoCompleteApi;
    autoCompleteUrl = autoCompleteUrl.replace(StaticMapConsts.autoCompletePlacesInput, input);
    return autoCompleteUrl;
  }

  const handleConfirmLocation = async () => {
    try {
      const adress = geoCodeAdress.split(",");
      const location = {
        id: Date.now(),
        street: adress[0],
        country:adress[2],
        cp: adress[1]
      }
      const result = await addDBLocation(location);
      console.log("results!!!:", result)
      addLocation(location);
      navigation.goBack()  
    } catch (error) {
      console.log("error al confirmar direccion:", error);
    }
  }

  const handleSelectLocation = async(item) => {
    let newDropDownData = [];
    setLoadingMap(true);
    const geoCodeAdress = item.description.replaceAll(" ",StaticMapConsts.geoCodeSpace);
    let geoCodeUrl = config.extra.googleCloudPlatformGeoCodeAdressApi;
    geoCodeUrl = geoCodeUrl.replace(StaticMapConsts.mapAdress, geoCodeAdress);
    const geoCode = await axios.get(geoCodeUrl);
    setGeoCodeAdress(geoCode.data.results[0].formatted_address);
    const {lat, lng} = geoCode.data.results[0].geometry.location;
    setLocation({
      latitude: lat,
      longitude: lng,
    });
    
    //Marco el item seleccionado y desmarco todos los demas
    dropDownData.forEach(adress => {
      adress.selected = false;
    })
    item.selected = true;
    const filterNoSelected = dropDownData.filter(adress => adress.id !== item.id)
    // Primero meto el item seleccionado para que este arriba de todo del array.
    newDropDownData.push(item);
    newDropDownData.push(...filterNoSelected);
    setDropDownData(newDropDownData);

    setLoadingMap(false);
  }

  const renderLocationsMatched = ({item})=>{
    return (
      <TouchableOpacity 
        style={{marginBottom:2}} 
        onPress={()=> handleSelectLocation(item)}
        >
          {item.selected ?
          <Text style={{
            fontSize: 15, color:"blue", fontWeight:"bold"
          }}>- {item.description}</Text>
          : <Text style={{
            fontSize: 15
          }}>- {item.description}</Text>
          }
        
      </TouchableOpacity>
    )
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

        <View style={styles.dropDownLocations}>
          <TextInput
            style={styles.textInput}
            onChangeText={(input)=> handleOnChangeSearchAdress(input)}
            value={textInput}
            placeholder="Direccion"
          />
          {dropDownData.length ?
              // Meti este flatlist para utilizarlo como un dropDown asi a lo bestia pero funciona.
             <FlatList
             renderItem={renderLocationsMatched}
             data={dropDownData}
             keyExtractor={(location) => location.id}
             vertical
             style={{borderColor:"grey", borderWidth:.5,borderRadius:10,padding:5, marginTop:5}}
             // pagingEnabled={true}
             showsVerticalScrollIndicator={false}
           />
           : null
          }
           
          
          
        </View>
      
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
    width: "100%",
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
  },
  dropDownLocations: {
    // backgroundColor:"red",
    height:"20%",
    width:"90%"
  }
});

export default connect(undefined,mapDispatchToProps)(MapLocationSearcher);
