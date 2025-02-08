import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Frontend/Home';
import Tasks from '../screens/Frontend/Tasks';
import Pomodoro from '../screens/Frontend/Pomodoro';
import Spotify from '../screens/Frontend/Spotify';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#dd5201', 
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Tasks': iconName = 'tasks'; break;
            case 'Pomodoro': iconName = 'clock-o'; break;
            case 'Spotify': iconName = 'spotify'; break;
          }

          return (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Icon name={iconName} size={size} color={color} />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          );
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

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#121212', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, 
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingTop:10
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
 
  activeIndicator: {
    width: 6,
    height: 6,
    backgroundColor: '#dd5201',
    borderRadius: 3,
    position: 'absolute',
    bottom: -10,
  },
});
