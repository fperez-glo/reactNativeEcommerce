import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LocationCard from "../components/LocationCard";
import { selectAllLocations } from "../store/selectors";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import {
  selectDBLocations,
  deleteDBLocation,
} from "../features/configuration/locations";
import { useEffect, useState } from "react";
import { showError } from "../utils/MessageBar";
import { colors } from "../styles/globalColors";

const mapStateToProps = (state) => ({
  globalStateLocations: selectAllLocations(state),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      selectDBLocations,
      deleteDBLocation,
    },
    dispatch
  );
};

const Locations = ({
  navigation,
  selectDBLocations,
  globalStateLocations,
  deleteDBLocation,
}) => {
  const [renderedLocations, setRenderedLocations] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchDBLocations();
    setloading(false);
  }, [globalStateLocations]);

  const fetchDBLocations = async () => {
    const dbLocations = await selectDBLocations();
    setRenderedLocations(dbLocations.payload);
  };

  const handleAddLocation = () => {
    navigation.navigate("MapLocationSearcher");
  };

  const renderLocations = ({ item }) => {
    // console.log("item:", item)
    return (
      <LocationCard
        title={`${item.street}, ${item.cp}, ${item.country}`}
        handleLocationCardClick={() => handleDeleteLocation(item.id)}
      />
    );
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      setloading(true);
      await deleteDBLocation(locationId);
      await fetchDBLocations();
    } catch (error) {
      showError({ message: "Error al intentar eliminar la direccion." });
    }
    setloading(false);
  };

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
      {!renderedLocations.length && 
      <Text style={styles.noDataText}>No hay direcciones registradas aun</Text>
      }
      {loading ? (
        <ActivityIndicator size={"large"} color={colors.boldGreen} />
      ) : (
        <FlatList
          renderItem={renderLocations}
          data={renderedLocations}
          keyExtractor={(location) => location.id}
          vertical
          style={styles.locationsContainer}
          // pagingEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:"center"
  },
  headerContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  addButtonContainer: {
    width: "95%",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    position: "absolute",
  },
  locationsContainer: {
    // backgroundColor:"green",
    padding: 7,
    height: "100%",
  },
  noDataText: {
    fontSize:16,
    fontWeight:"500",
    marginTop:"50%"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
