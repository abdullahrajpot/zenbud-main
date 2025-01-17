import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome from react-native-vector-icons
import { useNavigation } from '@react-navigation/native';

export default function AuthHome() {

  const navigation= useNavigation();
  return (
    <ImageBackground 
      source={require("../../assets/image/bghome.jpg")}  // Provide the correct image path
      style={styles.imageBackground}  // Apply styles to the background image
    >
      {/* Overlay with opacity */}
      <View style={styles.overlay} />
     <View style={styles.TopText}>
     <Text style={{ fontSize: 25,fontWeight:'bold', color: 'white', paddingTop:'20' }}>
          Zenbud
        </Text>
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
          style={styles.button} // Applying custom button style
          onPress={()=>{navigation.navigate("Login")}}
        >
          Sign In
        </Button>

        {/* This is the container that holds the "Create Account" text */}
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Or Create Account    <Icon onPress={()=>{navigation.navigate("Register")}}
 name="arrow-right" size={25} color='#dd5201' /> </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const primaryColor = '#000000';
// const smokeColor = '#dd5201'; // Light gray (smoke color)
const smokeColor = '#FF4D00'; // Light gray (smoke color)

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:'30' // Centering text horizontally
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  // This makes the overlay fill the entire container
    backgroundColor: primaryColor,  // You can change this to any color
    opacity: 0.5,  // Set the opacity to your desired level
  },
  bottomView: {
    backgroundColor: 'black',
    width: '100%',
    height: '40%',
    paddingHorizontal: '8%',
    borderTopRightRadius: 70,
    justifyContent: 'center', // Centering content vertically
  },
  button: {
    backgroundColor: smokeColor, // Set the background color to smoke (light gray)
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
    paddingLeft:'30',
    opacity: 0.5,
  },
  createAccountText: {
    fontSize: 16,
    color: 'gray',
    fontStyle:'italic'
    // fontWeight: 'bold',
  },
});
