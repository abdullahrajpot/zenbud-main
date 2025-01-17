import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from '../../../contexts/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';

const NotesDisplay = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?.uid) {
      console.error('User not authenticated!');
      return;
    }

    const unsubscribe = firestore()
      .collection('notes')
      .where('uid', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const tasksList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksList);
        },
        (error) => {
          console.error('Error fetching notes: ', error);
        }
      );

    return () => unsubscribe();
  }, [user]);

  // Remove note
  const removeNote = (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore().collection('notes').doc(id).delete();
            Alert.alert('Note Deleted', 'Your note was successfully deleted.');
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update state to remove deleted note
          } catch (error) {
            console.error('Error deleting note:', error);
            Alert.alert('Error', 'Failed to delete the note.');
          }
        },
      },
    ]);
  };

  // Navigate to NotePad for editing
  const editNote = (note) => {
    navigation.navigate('NotePad', { note }); // Pass the note as a parameter
  };

  // Filter notes based on the search query
  const filteredNotes = tasks.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Match title
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) // Match content
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notes</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search notes by title..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {filteredNotes.length > 0 ? (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LinearGradient
              colors={['#000', '#dd5201']}
              start={{ x: 0, y: 1 }}
              end={{ x: 2, y: 0 }}
              style={styles.taskCard}
            >
              <View style={styles.left}>
                <TouchableOpacity onPress={() => editNote(item)}>
                  <View style={styles.taskTitleView}>
                  <Text style={styles.taskTitle}>
                    {item.title || 'Untitled Note'}
                  </Text>
                  <Text style={styles.taskDate}>
                    {item.createdAt
                      ? new Date(item.createdAt.toDate()).toLocaleString()
                      : 'No Date'}
                  </Text>
                  </View>
                  <Text style={styles.taskContent}>{item.content}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Buttons}>
                <Button
                  mode="contained"
                  onPress={() => removeNote(item.id)}
                  style={styles.taskButton}
                  labelStyle={styles.buttonText}
                >
                  Remove
                </Button>
              </View>
            </LinearGradient>
          )}
          contentContainerStyle={styles.taskList}
        />
      ) : (
        <Text style={styles.emptyText}>No notes available. Add one!</Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NotePad')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  taskList: {
    paddingBottom: 60,
  },
  taskCard: {
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  left: {
    marginBottom: 10,
  },
  taskTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  taskContent: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  taskDate: {
    color: '#bbb',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    left:60

  },
  Buttons: {
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  taskButton: {
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#dd5201',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#dd5201',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  taskTitleView:{
  flexDirection:'row',
  gap:0,
  }
});

export default NotesDisplay;
