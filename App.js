import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert,
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  function addTask() {
    if (taskText.trim() === '') {
      Alert.alert('Please enter a task');
      return;
    }
    
    const newTaskItem = {
      id: Date.now().toString(),
      text: taskText.trim(),
      done: false
    };
    
    setTasks([...tasks, newTaskItem]);
    setTaskText('');
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter new task"
            value={taskText}
            onChangeText={setTaskText}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addTask}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <TouchableOpacity onPress={() => toggleTask(item.id)}>
                <Text style={styles.checkboxIcon}>
                  {item.done ? "✅" : "◻️"}
                </Text>
              </TouchableOpacity>
              <Text
                style={[styles.taskTitle, item.done && styles.completedTask]}
                onPress={() => toggleTask(item.id)}
              >
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteIcon}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#32414bff'
  },
  container: {
    flex: 1,
    padding: 20
  },
  inputSection: {
    flexDirection: 'row',
    marginBottom: 15
  },
  textInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  addBtn: {
    marginLeft: 8,
    backgroundColor: '#13b82eff',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center'
  },
  addBtnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  checkboxIcon: {
    fontSize: 20,
    marginRight: 12
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999'
  },
  deleteIcon: {
    fontSize: 16,
    marginLeft: 12
  }
});