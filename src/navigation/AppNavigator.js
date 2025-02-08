
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
