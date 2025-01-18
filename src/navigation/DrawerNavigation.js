import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import BottomTabs from './BottomTabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import AiChat from '../screens/Frontend/AiChat';
import Notes from '../screens/Frontend/Notes';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        drawerStyle: { backgroundColor: '#1E1E2C' },
        drawerActiveTintColor: '#dd5201',
        drawerInactiveTintColor: '#ccc',
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <Icon name="menu" size={30} color="#dd5201" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Main" component={BottomTabs} />
       <Drawer.Screen name="AiChat" component={AiChat} />
      <Drawer.Screen name="Notes" component={Notes} />
    </Drawer.Navigator>
  );
}
