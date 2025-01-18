import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Music from './Music';
import SongPlayer from './SongPlayer';


const Stack = createNativeStackNavigator();

export default function Spotify() {
  return (
    
      <Stack.Navigator initialRouteName="Music">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="Music" component={Music} />
        
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="SongPlayer" component={SongPlayer} />
        {/* <Stack.Screen
        options={{
          headerShown:false
        }}
        name="TaskList" component={songsList} /> */}
      </Stack.Navigator>
    
  );
}
