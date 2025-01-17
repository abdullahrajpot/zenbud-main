import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthContext } from '../../../contexts/AuthContext';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const initialState = { title: '', description: '', category: '', date: '', time: '' };

export default function AddTasks() {
  const [state, setState] = useState(initialState);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const { user } = useAuthContext();

  const handleChange = (name, value) => {
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleAdd = () => {
    let { title, description, category, date, time } = state;
    title = title.trim();
    description = description.trim();

    let taskData = { title, description, category, date, time };
    taskData.id = Math.random().toString(36).slice(2);
    taskData.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
    taskData.status = 'Pending';
    taskData.createdBy = {
      email: user.email,
      uid: user.uid,
    };

    createDocument(taskData);
  };

  const createDocument = (taskData) => {
    firestore()
      .collection('Tasks')
      .doc(taskData.id)
      .set(taskData)
      .then(() => {
        console.log('Task has been added successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      handleChange('date', formattedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setTimePickerVisible(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM AM/PM
      handleChange('time', formattedTime);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={{ width: '100%' }}>
          {/* Top View */}
          <View style={styles.topView}>
            <Text style={styles.mainText}>Add Task</Text>
          </View>

          {/* Input Fields */}
          <TextInput
            mode="flat"
            label="Title"
            style={styles.inputField}
            onChangeText={(val) => handleChange('title', val)}
            theme={{
              colors: {
                text: smokeColor,
                placeholder: smokeColor,
                background: 'transparent',
                underlineColor: 'transparent',
                primary: smokeColor,
              },
            }}
          />
          <TextInput
            mode="flat"
            label="Description"
            style={styles.inputField}
            onChangeText={(val) => handleChange('description', val)}
            theme={{
              colors: {
                text: smokeColor,
                placeholder: smokeColor,
                background: 'transparent',
                underlineColor: 'transparent',
                primary: smokeColor,
              },
            }}
          />
          <TextInput
            mode="flat"
            label="Category"
            style={styles.inputField}
            onChangeText={(val) => handleChange('category', val)}
            theme={{
              colors: {
                text: smokeColor,
                placeholder: smokeColor,
                background: 'transparent',
                underlineColor: 'transparent',
                primary: smokeColor,
              },
            }}
          />

          {/* Date Picker */}
          <Button
            mode="outlined"
            onPress={() => setDatePickerVisible(true)}
            style={styles.button}
            textColor={smokeColor}
          >
            {state.date ? `Date: ${state.date}` : 'Select Date'}
          </Button>
          {datePickerVisible && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
            />
          )}

          {/* Time Picker */}
          <Button
            mode="outlined"
            onPress={() => setTimePickerVisible(true)}
            style={styles.button}
            textColor={smokeColor}
          >
            {state.time ? `Time: ${state.time}` : 'Select Time'}
          </Button>
          {timePickerVisible && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}

          {/* Add Task Button */}
          <Button mode="contained" onPress={handleAdd} style={styles.addButton}>
            Add Task
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const primaryColor = '#000000';
const smokeColor = '#dd5201';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  topView: {
    marginVertical: 30,
    alignItems: 'center',
  },
  mainText: {
    color: smokeColor,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderColor: smokeColor,
    borderWidth: 1,
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: smokeColor,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  inputField: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderBottomWidth: 1,
    // borderBottomColor: 'white',
    color: smokeColor,
  },
});
