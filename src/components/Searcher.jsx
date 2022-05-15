import { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const Searcher = ({ onChangeText, searchInputValue }) => {
  
  return (
    <TextInput style={styles.textInput} placeholder={"Search"} onChangeText={onChangeText} value={searchInputValue}>
        
    </TextInput>
  )
}

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        height:40,
        backgroundColor:"white",
        borderRadius:25,
        padding:8,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 1.5,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.5,
        elevation: 3,
    }
})

export default Searcher