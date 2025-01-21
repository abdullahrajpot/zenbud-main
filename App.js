import React, { useEffect } from 'react'
import { Platform, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'
import AuthContextProvider from './src/contexts/AuthContext'
import TaskContextProvider from './src/contexts/TaskContext'
import { PaperProvider } from 'react-native-paper'
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// import SplashScreen from 'react-native-splash-screen'


export default function App() {

  // useEffect(()=>{
  //   if(Platform.OS === 'android')
  //   SplashScreen.hide();
  // },[])

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#dd5201',
          borderLeftWidth: 7,
          width: '90%',
          height: 70,
          borderRightColor: '#dd5201',
          borderRightWidth: 7,
          backgroundColor: 'black'
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '700',
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: props => (
      <ErrorToast
        {...props}
        text2NumberOfLines={3}
        style={{
          borderLeftColor: 'red',
          borderLeftWidth: 7,
          width: '90%',
          height: 70,
          borderRightColor: 'red',
          borderRightWidth: 7,
          backgroundColor: 'black',

        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '700',
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
  };


  useEffect(() => {
    // Request permissions
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
      }
    };

    requestPermission();

    // Listen for messages in foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: 'tasks',
        },
      });
    });

    return unsubscribe;
  }, []);
  return (
    <>

      <AuthContextProvider>
        <TaskContextProvider>
          <PaperProvider>
            <NavigationContainer>

              <AppNavigator />
              <Toast config={toastConfig} />
            </NavigationContainer>

          </PaperProvider>
        </TaskContextProvider>
      </AuthContextProvider>
    </>
  )
}

