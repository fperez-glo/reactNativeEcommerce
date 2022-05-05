import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import { colors } from '../Styles/GlobalColors';

const TodoList = ({
  data,
  onPressDelete,
}) => {

  const renderTodoList = ({item}) => {
    return (
      <View style={styles.taskContainer}>
          <Text style={styles.taskText}>{item.task}</Text>
          <TouchableOpacity style={styles.button} onPress={() => onPressDelete(item.key)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
    )
  }

  return (
    <View style={styles.todoListContainer}>
      {data.length ? <FlatList
        data={data} 
        renderItem={renderTodoList}  
        keyExtractor={task => task.key}
      /> : 
      <Text style={styles.notTodoFoundText}>No TODO tasks found</Text>}
    </View>
    )
}

const styles = StyleSheet.create({
  todoListContainer: {
    height: 650,
    borderRadius: 20,
    padding:5,
    marginTop:10
  },
  taskContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    padding: 10,
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor:"blue",
    elevation:5,
    backgroundColor: "#CFDAC8"
  },
  taskText: {
    color:colors.black,
    fontSize: 25,
  },
  buttonText: {
    color: colors.white,
    fontSize: 50,
    left:12,
    top:-18,
  },
  button: {
    backgroundColor:"red",
    height: 40,
    width: 40,
    borderRadius:100,
    borderColor: "#000",
  },
  notTodoFoundText: {
    fontSize: 18,
    // backgroundColor:"red",
    paddingLeft:90,
    marginTop:20
    
  }
})

export default TodoList
