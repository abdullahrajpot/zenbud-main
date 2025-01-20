import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext, logoutUser } from '../contexts/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

const DrawerContent = (props) => {
  const { user, dispatch, logOut } = useAuthContext();
  const navigation = useNavigation();

  const menuItems = [
    { label: 'Home', icon: 'home-outline', navigateTo: 'Home' },
    { label: 'AiChat', icon: 'wechat', navigateTo: 'AiChat' },
    { label: 'Tasks', icon: 'check-circle-outline', navigateTo: 'Tasks' },
    { label: 'Pomodoro', icon: 'clock-outline', navigateTo: 'Pomodoro' },
    { label: 'Spotify', icon: 'spotify', navigateTo: 'Spotify' },
    { label: 'Notes', icon: 'note-outline', navigateTo: 'Notes' },
    { label: 'Img-To-Text', icon: 'image-text', navigateTo: 'ImgToText' },
  ];

  const signOut = () => {
    logoutUser(dispatch);
    navigation.navigate('Login');
    Toast.show({
      type: 'error',
      text2: 'You have logged out successfully!',
    });
  };

  return (
    <LinearGradient colors={['#000000', '#1E1E2C']} style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileSection}>
          <Avatar.Image
            source={{
              uri: user?.image || 'https://randomuser.me/api/portraits/men/41.jpg',
            }}
            size={50}
          />
          <View style={{ marginLeft: 10 }}>
            <Title style={styles.title}>{user?.name || 'Guest User'}</Title>
            <Text style={styles.caption}>{user?.email || 'guest@example.com'}</Text>
          </View>
        </View>
        <View style={styles.drawerMenu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.navigateTo)}
            >
              <Icon name={item.icon} size={24} color="#dd5201" />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Icon name="logout" size={24} color="#000000" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E2C',
  },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  caption: { color: '#ccc', fontSize: 14 },
  drawerMenu: { marginTop: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  menuText: { marginLeft: 15, color: '#dd5201', fontSize: 16 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#dd5201',
    justifyContent: 'center',
  },
  logoutText: { color:'#000000' , marginLeft: 10, fontSize: 16 },
});
