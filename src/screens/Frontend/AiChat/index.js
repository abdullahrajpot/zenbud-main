import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chatbot from './Chatbot';
import ChatBubble from './ChatBubble';

const Stack = createNativeStackNavigator();

export default function AiChat() {
  return (
    
      <Stack.Navigator initialRouteName="Chatbot">
        <Stack.Screen
        options={{
          headerShown:false
        }}
        name="Chatbot" component={Chatbot} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="ChatBubble" component={ChatBubble} />
      </Stack.Navigator>
    
  );
}
