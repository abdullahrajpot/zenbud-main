import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import Toast from 'react-native-toast-message';

const TimerSetting = ({ route, navigation }) => {
  const { workTime, breakTime, updateTimes } = route.params;

  const [newWorkTime, setNewWorkTime] = useState(workTime.toString());
  const [newBreakTime, setNewBreakTime] = useState(breakTime.toString());
  const [isWorkTimeModalVisible, setWorkTimeModalVisible] = useState(false);
  const [isBreakTimeModalVisible, setBreakTimeModalVisible] = useState(false);

  const timeOptions = Array.from({ length: 60 }, (_, i) => (i + 1).toString()); // Options from 1 to 60 minutes

  const handleSave = () => {
    const work = parseInt(newWorkTime);
    const breakT = parseInt(newBreakTime);

    if (work > 0 && breakT > 0) {
      updateTimes(work, breakT);
      navigation.goBack();
    } else {
      // alert('Please select valid times!');.
      Toast.show({
        type: 'error',
        text2: 'Please select valid times!',
        visibilityTime: 10000,
    });
    }
  };

  const renderOption = (item, onPress) => (
    <Pressable style={styles.option} onPress={() => onPress(item)}>
      <Text style={styles.optionText}>{item} min</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Timer</Text>

      {/* Work Time Dropdown */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Focus Time</Text>
        <Pressable
          style={styles.dropdown}
          onPress={() => setWorkTimeModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{newWorkTime} min</Text>
        </Pressable>
      </View>

      {/* Work Time Modal */}
      <Modal
        visible={isWorkTimeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={timeOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) =>
              renderOption(item, (value) => {
                setNewWorkTime(value);
                setWorkTimeModalVisible(false);
              })
            }
          />
        </View>
      </Modal>

      {/* Break Time Dropdown */}
      <View style={styles.settingRow}>
        <Text style={styles.label}>Short Break</Text>
        <Pressable
          style={styles.dropdown}
          onPress={() => setBreakTimeModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{newBreakTime} min</Text>
        </Pressable>
      </View>

      {/* Break Time Modal */}
      <Modal
        visible={isBreakTimeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={timeOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) =>
              renderOption(item, (value) => {
                setNewBreakTime(value);
                setBreakTimeModalVisible(false);
              })
            }
          />
        </View>
      </Modal>

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dd5201',
    textAlign: 'center',
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#ffffff',
    flex: 1,
  },
  dropdown: {
    flex: 1.5,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#ffffff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#ffffff',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#dd5201',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveText: {
    fontSize: 16,
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  optionText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
