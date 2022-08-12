import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks(tasks.filter(el => el.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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