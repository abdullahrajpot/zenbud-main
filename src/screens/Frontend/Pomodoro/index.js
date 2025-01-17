import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PomodoroTimer from './PomodoroTimer';
import TimerSetting from './TimerSetting';

const Stack = createNativeStackNavigator();

export default function Pomodoro() {
  return (
    
      <Stack.Navigator initialRouteName="PomodoroTimer">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="PomodoroTimer" component={PomodoroTimer} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="TimerSetting" component={TimerSetting} />
      </Stack.Navigator>
    
  );
}
