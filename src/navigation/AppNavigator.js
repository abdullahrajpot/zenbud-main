// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from '../screens/Frontend/Home';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Login from '../screens/Auth/Login';
// import Register from '../screens/Auth/Register';
// import AuthHome from '../screens/Auth/AuthHome';
// import { useAuthContext } from '../contexts/AuthContext'; // Import the context
// import Tasks from '../screens/Frontend/Tasks';
// import Pomodoro from '../screens/Frontend/Pomodoro';
// import AiChat from '../screens/Frontend/AiChat';
// import Notes from '../screens/Frontend/Notes';
// import Spotify from '../screens/Frontend/Spotify';

// export default function AppNavigator() {
//     const Stack = createNativeStackNavigator();
//     const Tab = createBottomTabNavigator();
//     const { isAuthenticated } = useAuthContext(); // Get the authentication state

//     return (
//         <NavigationContainer>
//             {/* If user is not authenticated, show authentication flow */}
//             {!isAuthenticated ? (
//                 <Stack.Navigator>
//                     <Stack.Screen
//                         name="AuthHome"
//                         component={AuthHome}
//                         options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                         name="Login"
//                         component={Login}
//                         options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                         name="Register"
//                         component={Register}
//                         options={{ headerShown: false }}
//                     />
//                 </Stack.Navigator>
//             ) : (
//                 // Authenticated flow, show Tab.Navigator
//                 <Tab.Navigator
//                     screenOptions={({ route }) => ({
//                         tabBarShowLabel: false,
//                         tabBarStyle: {
//                             backgroundColor: '#000000', // Tab bar background color
//                             borderTopWidth: 0, // Removes the border
//                         },
//                         tabBarActiveTintColor: '#dd5201', // Active icon color
//                         tabBarInactiveTintColor: '#888', // Inactive icon color
//                         tabBarIcon: ({ color, size }) => {
//                             let iconName;
//                             switch (route.name) {
//                                 case 'Home':
//                                     iconName = 'home';
//                                     break;
//                                 case 'AiChat':
//                                     iconName = 'wechat';
//                                     break;
//                                 case 'Tasks':
//                                     iconName = 'tasks';
//                                     break;
//                                 case 'Pomodoro':
//                                     iconName = 'clock-o';
//                                     break;
//                                 case 'Notes':
//                                     iconName = 'clipboard';
//                                     break;
//                                 case 'Spotify':
//                                     iconName = 'spotify';
//                                     break;
//                                 default:
//                                     iconName = 'circle';
//                             }
//                             return <Icon name={iconName} size={size} color={color} />;
//                         },
//                     })}
//                 >
//                     <Tab.Screen
//                         name="Home"
//                         component={Home}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Tab.Screen
//                         name="AiChat"
//                         component={AiChat}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Tab.Screen
//                         name="Tasks"
//                         component={Tasks}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Tab.Screen
//                         name="Pomodoro"
//                         component={Pomodoro}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Tab.Screen
//                         name="Spotify"
//                         component={Spotify}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Tab.Screen
//                         name="Notes"
//                         component={Notes}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                 </Tab.Navigator>
//             )}
//         </NavigationContainer>
//     );
// }





// import React from 'react';
// import { useAuthContext } from '../contexts/AuthContext';
// import DrawerNavigation from './DrawerNavigation';
// import AuthStack from './AuthStack';

// export default function AppNavigator() {
//   const { isAuthenticated } = useAuthContext();

//   return isAuthenticated ? <DrawerNavigation /> : <AuthStack />;
// }

import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import DrawerNavigation from './DrawerNavigation';
import AuthStack from './AuthStack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dd5201" />
      </View>
    );
  }

  return isAuthenticated ? <DrawerNavigation /> : <AuthStack />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
