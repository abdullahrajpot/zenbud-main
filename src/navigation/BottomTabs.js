import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Frontend/Home';
import Tasks from '../screens/Frontend/Tasks';
import Pomodoro from '../screens/Frontend/Pomodoro';
import Spotify from '../screens/Frontend/Spotify';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000',
          paddingTop:8,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#dd5201',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Tasks': iconName = 'tasks'; break;
            case 'Pomodoro': iconName = 'clock-o'; break;
            case 'Spotify': iconName = 'spotify'; break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Pomodoro" component={Pomodoro} />
      <Tab.Screen name="Spotify" component={Spotify} />
    </Tab.Navigator>
  );
}
