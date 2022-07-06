import {StyleSheet,Text, TouchableOpacity, SafeAreaView} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../styles/globalColors";

const Configuration = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex:1}}>
        <Text style={styles.title}>Configuracion</Text>
        <TouchableOpacity style={styles.listButton} onPress={()=> {navigation.navigate("Locations")}}>
            <Text style={styles.listItemsText}>Dirrecciones</Text>
            <AntDesign name="right" size={24} />
        </TouchableOpacity>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight:"bold",
        
    },
    listButton: {
        // backgroundColor:"red",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"

    },
    listItemsText: {
        fontSize: 20,
        fontWeight: "bold",
    }
})

export default Configuration