import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useNavigation } from '@react-navigation/native';

export default function AuthHome() {

  const navigation= useNavigation();
  return (
    <ImageBackground 
      source={require("../../assets/image/bghome4.jpg")}  
      style={styles.imageBackground}  
    >
      <View style={styles.overlay} />
     <View style={styles.TopText}>
      <Image
          source={require('../../assets/image/zendark.png')} 
          style={styles.icon}
        />
     </View>
      <View style={styles.flexContainer}>
        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>
          Start a new world adventure
        </Text>
      </View>

      <View style={styles.bottomView}>
        <Text style={{ fontSize: 16, color: 'white' }}>
          Get involved with people and events around you
        </Text>

        <Button
          mode="contained"
          styles={{paddingHorizontal:'40'}}
          style={styles.button} 
          onPress={()=>{navigation.navigate("Login")}}
        >
          Sign In
        </Button>

        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Or Create Account    <Icon onPress={()=>{navigation.navigate("Register")}}
 name="arrow-right" size={25} color='#dd5201' /> </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const primaryColor = '#000000';
const smokeColor = '#FF4D00'; 

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:'30' 
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  
    backgroundColor: primaryColor,  
    opacity: 0.5, 
  },
  bottomView: {
    backgroundColor: 'black',
    width: '100%',
    height: '40%',
    paddingHorizontal: '8%',
    borderTopRightRadius: 70,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: smokeColor, 
    marginTop: 30,
    paddingVertical: 6,
    borderRadius: 10,
    width:'100%',
        alignSelf: 'center',  
  },

  createAccountContainer: {
    marginTop: 10,
    alignItems: 'flex-end', 
  },
  TopText: {
    marginTop: 10,
    paddingLeft:20,
    opacity: 1,
  },
  icon: {
    width: 160, 
    height: 80,
  },
  createAccountText: {
    fontSize: 16,
    color: 'gray',
    fontStyle:'italic'
  },
});
