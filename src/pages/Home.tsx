import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let task = tasks.find(task => task.title === newTaskTitle);

    if (task) {
      return Alert.alert('Você não pode cadastrar uma task com o mesmo nome');
    }

    //TODO - add new task
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        done: false,
        title: newTaskTitle
      }
    ])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks(tasks.map(el => {
      if(el.id === id) {
        el.done = !el.done
      }

      return el;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Sim',
        onPress: () => setTasks(tasks.filter(el => el.id !== id))
      },
      {text: 'Não', onPress: () => {}},
    ]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    setTasks(tasks.map(el => {
      if(el.id === taskId) {
        el.title = taskNewTitle
      }

      return el;
    }));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})