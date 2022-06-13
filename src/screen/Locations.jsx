import {Text,StyleSheet,SafeAreaView} from 'react-native'

import Button from "../components/Button"

const Locations = ({navigation}) => {
  return (
      <SafeAreaView>
        <Text style={styles.title}>Direcciones</Text>
    <Button buttonTitle='Volver'  onPress={()=> {navigation.goBack()}}></Button>      
      </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight:"bold",
        
    },
})

export default Locations