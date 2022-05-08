import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CategoriesContainer from "../components/CategoriesContainer";

const Home = () => {
  return (
    <View style={styles.homeContainer}>
        <Text>HomeScreen!</Text>
        <TouchableOpacity
            style={styles.button}>
            <Text>Aceptar</Text>
        </TouchableOpacity>
        <CategoriesContainer></CategoriesContainer>
    </View>
  )
}

const styles = StyleSheet.create({
    homeContainer:{
        width: "90%",
        height: "95%",
        // backgroundColor:"green",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    button:{
        backgroundColor: "lightblue",
        width:100,
        height:40,
        borderRadius: 25,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
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

export default Home