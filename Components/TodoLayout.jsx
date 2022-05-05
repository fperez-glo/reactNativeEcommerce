import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import AddTaskInput from "./AddTaskInput";
import TodoList from "./TodoList";

const TodoLayout = () => {

  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTask = (input) => {
    if (!input) {
      return;
    };

    const todo = {
      key: Date.now(),
      task: input,
    }
    setTodoList([...todoList, todo]);
    setInput("");
  };
 
  const handleDeleteTask = (keyTaskSelected) => {
    const deleteSelectedTask = todoList.filter(task => task.key !== keyTaskSelected);
    setTodoList(deleteSelectedTask);
  }

  return (
    <View style={styles.todoLayoutContainer}>
      <AddTaskInput addTaskButtonOnPress={addTask} onChangeText={setInput} value={input}></AddTaskInput>
      <TodoList data={todoList} onPressDelete={handleDeleteTask}></TodoList>
    </View>
  );
};

const styles = StyleSheet.create({
  todoLayoutContainer: {
    width:"90%"
  }
});

export default TodoLayout;
