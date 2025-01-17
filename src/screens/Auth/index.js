import React from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import Home1 from './Home1';

const stack= createNativeStackNavigator();

export default function index(){
  
    return (
      <stack.Navigator>
        <stack.Screen name='Home1' component={Home1}
        options={{headerShown:false}}
        />
        <stack.Screen name='Register' component={Register}
        options={{headerShown:false}}
        />
        <stack.Screen name='Login' component={Login}
        options={{headerShown:false}}
        />
      </stack.Navigator>
    )
  }

