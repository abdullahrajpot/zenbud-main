import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from '../../../contexts/AuthContext';

const NotePad = ({ route, navigation }) => {
  const { user } = useAuthContext();
  const { note } = route.params || {}; // Retrieve passed note data (for edit)

  const [title, setTitle] = useState(note?.title || '');
  const [noteContent, setNoteContent] = useState(note?.content || '');
  const [noteId, setNoteId] = useState(note?.id || null);

  const saveNote = async () => {
    if (!title.trim() || !noteContent.trim()) {
      ToastAndroid.show('Title or Note cannot be empty!', ToastAndroid.SHORT);
      return;
    }

    if (!user?.uid) {
      console.error('User UID is undefined!');
      ToastAndroid.show('Failed to save note: User not authenticated.', ToastAndroid.SHORT);
      return;
    }

    try {
      if (noteId) {
        // Update existing note
        await firestore().collection('notes').doc(noteId).update({
          title: title.trim(),
          content: noteContent.trim(),
        });
        ToastAndroid.show('Note updated successfully!', ToastAndroid.SHORT);
      } else {
        // Create new note
        await firestore().collection('notes').add({
          title: title.trim(),
          content: noteContent.trim(),
          createdAt: firestore.FieldValue.serverTimestamp(),
          uid: user.uid,
        });
        ToastAndroid.show('Note saved successfully!', ToastAndroid.SHORT);
      }
      navigation.goBack(); // Navigate back after saving/updating
    } catch (error) {
      console.error('Error saving/updating note:', error);
      ToastAndroid.show('Failed to save note!', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{noteId ? 'Edit Note' : 'New Note'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title..."
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Type your note here..."
        placeholderTextColor="#888"
        value={noteContent}
        onChangeText={setNoteContent}
        multiline
      />
      <Text style={styles.footer}>TODAY - {new Date().toDateString()}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    color: '#dd5201',
  },
  saveButton: {
    backgroundColor: '#dd5201',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#2C2C2C',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#2C2C2C',
    flex: 1,
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
  },
});

export default NotePad;
