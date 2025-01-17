import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTasks from './AddTasks';
import Display from './Display';
import TaskList from './TaskList';


const Stack = createNativeStackNavigator();

export default function Tasks() {
  return (
    
      <Stack.Navigator initialRouteName="Display">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="Display" component={Display} />
        
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="AddTasks" component={AddTasks} />
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="TaskList" component={TaskList} />
      </Stack.Navigator>
    
  );
}
