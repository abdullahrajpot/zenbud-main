import React from 'react'
import { Text, View, StyleSheet, Image, Alert, BackHandler } from 'react-native'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export default function Home(){
  const {logOut}=useAuthContext();

  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, []),
  );

  
    return (
      <View style={styles.flexContainer}>
        <Text style={{fontSize:30}}>Name: Abdullah Tariq </Text>
        <Text style={{fontSize:30}}>RollNo: 182866 </Text>
        <Button mode="contained" onPress={logOut} style={styles.button}>
            Sign out
          </Button>

    {/* <Image
    style={styles.image}
    source= {require("./src/assets/")}
    /> */}
      </View>
    )
  }



const styles = StyleSheet.create({
flexContainer:{
  flex:1,
  // backgroundColor:"gray",
  justifyContent:'center',
  alignItems:'center'
  
},
image:{
  width:"80%",
  height:"60%",

}



})