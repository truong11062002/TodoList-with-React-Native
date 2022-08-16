import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Task from './src/components/Task';

const App = props => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task.length === 0) {
      alert('Please! Enter a your task');
      return false;
    }
    setTaskItems([...taskItems, task]);
    setTask('');
    Keyboard.dismiss();
  };

  const handleCompleteTask = index => {
    Alert.alert('Notification', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          let taskListtmp = [...taskItems];
          taskListtmp.splice(index, 1);
          setTaskItems(taskListtmp);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <Text style={styles.title}>Today’s tasks</Text>

          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <Task
                  key={index}
                  text={item}
                  onDeleteTask={() => {
                    handleCompleteTask(index);
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          onChangeText={text => setTask(text)}
          value={task}
        />
        <TouchableOpacity
          onPress={() => {
            handleAddTask();
          }}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#76b5c5',
  },
  addWrapper: {
    paddingVertical: 15,
    width: 60,
    paddingHorizontal: 15,
    backgroundColor: '#76b5c5',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
});
