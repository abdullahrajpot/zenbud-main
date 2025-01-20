import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Converter from './Converter';


const Stack = createNativeStackNavigator();

export default function ImgToText() {
  return (
    
      <Stack.Navigator initialRouteName="Converter">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="Converter" component={Converter} />
        
        
      </Stack.Navigator>
    
  );
}
