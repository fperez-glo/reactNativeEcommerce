
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import {Text,StyleSheet,SafeAreaView, Image, View, TextInput} from 'react-native'
import { useEffect, useState } from "react"
import config from "../config/aplication.config"
import StaticMapConsts from "./const/StaticMap.enum";
import Button from "../components/Button"
import { showInfo } from '../utils/MessageBar'
import axios from 'axios'

const Locations = ({navigation}) => {

  const [location, setLocation] = useState(undefined);
  const [staticMap, setStaticMap] = useState(undefined);
  const [geoCode, setGeoCode] = useState(undefined)
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    requestLocationPermission();
    
  }, [])

  useEffect(() => {
    if (location?.latitude){
      getStaticMap();
      getGeoCode();
    }
    
  }, [location])
  
  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if(status !== "granted") {
      showInfo({message:"No se otorgo permiso de locacion a la aplicacion"})
      navigation.goBack()
      return
    }

    const location = await getCurrentPositionAsync();
    setLocation({
      latitude: location?.coords.latitude,
      longitude: location?.coords.longitude
    });

    
  }

  const getStaticMap = async () => {
    const mapUrl = replaceParams(config.extra.googleCloudPlatformStaticMapsApi); 
    setStaticMap(mapUrl);
  }

  const getGeoCode = async() => {
    const geoCodeUrl = replaceParams(config.extra.googleCloudPlatformGeoCodeApi);
    // console.log("geoCodeUrl:", geoCodeUrl)
    const geoCode = await axios.get(geoCodeUrl);
    console.log("geoCode:", geoCode.data.results[0].formatted_address)

  }

  const replaceParams = (url) => {
    url = url.replace(StaticMapConsts.mapHeight, config.extra.mapHeight);
    url = url.replace(StaticMapConsts.mapWidth, config.extra.mapWidth);
    url = url.replace(StaticMapConsts.mapZoom, config.extra.mapZoom);
    url = url.replaceAll(StaticMapConsts.mapLatitude, location.latitude);
    url = url.replaceAll(StaticMapConsts.mapLongitude, location.longitude);

    return url;
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Direcciones</Text>
      
      <View style={styles.mapContainer}>
      <Image source={{uri: staticMap}} style={styles.mapImage}></Image>
      </View>
      
      <TextInput style={styles.textInput} onChangeText={setTextInput} value={textInput}></TextInput>
      <Button buttonTitle='Volver'  onPress={()=> {navigation.goBack()}}></Button>
      </SafeAreaView>
      
    
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",

    height:"100%",
    // backgroundColor:"red"
  },  
  title: {
      fontSize: 28,
      fontWeight:"bold",  
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
    marginVertical: 8
  },
  textInput: {
    width:"90%",
    height: 35,
    backgroundColor:"white",
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
  }
})

export default Locations