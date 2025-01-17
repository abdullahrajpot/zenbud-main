import React from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Chatbot from './AiChat';

const stack= createNativeStackNavigator();

export default function index(){
  
    return (
      <stack.Navigator>
        <stack.Screen name='home' component={Home}/>
        <stack.Screen name='chatbot' component={Chatbot}/>
      </stack.Navigator>
    )
  }

