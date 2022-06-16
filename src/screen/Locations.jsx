import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LocationCard from "../components/LocationCard";
import { selectAllLocations } from "../store/selectors";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  locations: selectAllLocations(state)
});

const Locations = ({ navigation, locations }) => {
  const handleAddLocation = () => {
    navigation.navigate("MapLocationSearcher");
  };

  const renderLocations = ({ item }) => {
    return (
      <LocationCard title={`${item.street}, ${item.cp}, ${item.country}`}/>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Direcciones</Text>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={() => handleAddLocation()}>
            <Ionicons name="add-circle-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
        <FlatList
          renderItem={renderLocations}
          data={locations}
          keyExtractor={(location) => location.adress}
          vertical
          style={styles.locationsContainer}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  addButtonContainer: {
    width:"95%",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    position:"absolute"
  },
  locationsContainer: {
    // backgroundColor:"green",
    padding:7,
    height:"100%"
  }
});

export default connect(mapStateToProps, undefined)(Locations);
