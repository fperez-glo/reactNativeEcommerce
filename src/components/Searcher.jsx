import { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from '../styles/globalColors'

const Searcher = ({ onChangeText, searchInputValue }) => {
  
  return (
    <TextInput style={styles.textInput} placeholder={"Search"} onChangeText={onChangeText} value={searchInputValue}>
        
    </TextInput>
  )
}

const styles = StyleSheet.create({
    textInput: {
        width: "95%",
        height:"6%",
        backgroundColor: colors.white,
        borderRadius:25,
        padding:8,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 1.5,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 5.5,
        elevation: 3,
    }
})

export default Searcher