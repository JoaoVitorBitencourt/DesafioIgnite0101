import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import pen from '../assets/icons/trash/pen.png'
import { Icon } from 'react-native-vector-icons/Icon';

interface TasksItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  item: Task;
  index: number;
}

export default function TaskItem({
  removeTask,
  toggleTaskDone,
  item,
  index,
  editTask
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, taskNewTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          //TODO - use style prop 
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            //TODO - use style prop
            style={item.done ? styles.taskTextDone : styles.taskText}
            onChangeText={setTaskNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          >
            {item.title}
          </TextInput>
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer} >
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={pen} />
          </TouchableOpacity>
        )}

        <View
          style={styles.iconsDivider}
        />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {

  },
  iconsDivider: {
    width: 1,
    height: 24,
    color: 'rgba(196, 196, 196, 0.24)',
  }
})