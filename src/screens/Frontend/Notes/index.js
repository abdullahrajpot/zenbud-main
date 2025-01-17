import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotePad from './NotePad';
import NotesDisplay from './NotesDisplay';


const Stack = createNativeStackNavigator();

export default function Notes() {
  return (
    
      <Stack.Navigator initialRouteName="NotesDisplay">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="NotePad" component={NotePad} />
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="NotesDisplay" component={NotesDisplay} />
        
        {/* <Stack.Screen
        options={{
          headerShown:false
        }}
        name="AddTasks" component={AddTasks} />
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="TaskList" component={TaskList} /> */}
      </Stack.Navigator>
    
  );
}
