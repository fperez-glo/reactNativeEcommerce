import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../Styles/GlobalColors';

const AddTaskInput = ({
  addTaskButtonOnPress,
  onChangeText,
  value,
}) => {

  return (
    <View style={styles.textInputButtonContainer}>
        <TextInput placeholder="Add task" value={value} onChangeText={onChangeText} style={styles.textInput}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addTaskButtonOnPress(value)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    textInput: {
      width: "88%",
      height: 50,
      fontSize: 20,
      borderRadius: 25,
      padding: 10,
      shadowColor:"blue",
      elevation: 7,
      backgroundColor: 'white',
    },
    textInputButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      width: 50,
      backgroundColor: colors.boldGreen,
      borderRadius:100,
      marginLeft: 5,
      alignItems: "center",
      justifyContent:"center",
      shadowColor:"blue",
      elevation: 10,
    },
    buttonText: {
      color: colors.white,
      fontSize: 35,
      marginBottom: 4,
    }
  });

export default AddTaskInput