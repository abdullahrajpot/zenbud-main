import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'
import AuthContextProvider from './src/contexts/AuthContext'
import TaskContextProvider from './src/contexts/TaskContext'
import { PaperProvider } from 'react-native-paper'

export default function App() {

  return (
    <>
   
      <AuthContextProvider>
        <TaskContextProvider>
        <PaperProvider>

          <AppNavigator />
        </PaperProvider>
        </TaskContextProvider>
      </AuthContextProvider>
    </>
  )
}

