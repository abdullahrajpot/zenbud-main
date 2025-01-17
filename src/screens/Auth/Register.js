import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Text, IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const initialState = { email: '', password: '', number: '', name: '' };

export default function Register() {  
  const [state, setState] = useState(initialState);
  const [focusedField, setFocusedField] = useState('');
  const navigation = useNavigation();
  
  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }));
  }

  const handleRegister = () => {
    let { email, password, name, number } = state;

    if (!email) {
      return Alert.alert('Error', 'Enter your correct email');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    // Firebase create user logic
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('User account created !', user);

        // Create the user profile in Firebase Firestore (Optional step)
        createUserProfile(user, name, number);
        Toast.show({
          type: 'success',
          text2: 'User account created',
          visibilityTime: 20000,
      });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Toast.show({
            type: 'error',
            text2: 'That email address is already in use!',
            visibilityTime: 20000,
        });
          // alert('Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          alert('Error', 'That email address is invalid!');
        }

        console.error(error);
      });
  };

  const createUserProfile = (user, name, number) => {
    const userRef = firestore().collection('users').doc(user.uid);

    userRef.set({
      name,
      email: user.email,
      uid: user.uid,
      phoneNumber: number,
      dateCreated: new Date(),
    })
      .then(() => {
        console.log('User profile created!');
      })
      .catch(error => {
        console.log('Error creating user profile', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <IconButton
          icon="arrow-left"
          size={30}
          color='#fff'
          onPress={() => navigation.goBack()}  
          style={styles.backButton}
        />
        <Text style={styles.headerText}>Create Account.</Text>
      </View>

      <View style={styles.flexContainer}>
        <View style={{ width: '100%' }}>
          <TextInput
            mode="flat"
            label="Name"
            // placeholder="Enter Name"
            placeholderTextColor={focusedField === 'name' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'name' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('name', val)}
            keyboardType="text"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'name' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField('')}
          />
          <TextInput
            mode="flat"
            label="Phone"
            // placeholder="Phone Number"
            placeholderTextColor={focusedField === 'number' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'number' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('number', val)}
            keyboardType="number-pad"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'number' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('number')}
            onBlur={() => setFocusedField('')}
          />
          <TextInput
            mode="flat"
            label="Email"
            // placeholder="Enter Email"
            placeholderTextColor={focusedField === 'email' ? smokeColor : 'white'}
            style={[styles.inputField, { borderBottomColor: focusedField === 'email' ? smokeColor : 'white' }]}
            onChangeText={val => handleChange('email', val)}
            keyboardType="email-address"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'email' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
          />

          <TextInput
            mode="flat"
            label="Password"
            secureTextEntry
            style={[styles.inputField, { borderBottomColor: focusedField === 'password' ? smokeColor : 'white' }]}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={val => handleChange('password', val)}
            keyboardType="default"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: focusedField === 'password' ? smokeColor : 'white',
                text: 'white',
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField('')}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button} 
          >
            Sign Up
          </Button>

          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <Text style={[styles.bottomText, styles.signInText]} onPress={()=>{navigation.navigate("Login")}}>Sign In</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const primaryColor = '#000000';
const smokeColor = '#dd5201';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 18,
  },
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },

  header: {
    backgroundColor: smokeColor,
    height: 200,
    justifyContent: 'center',
    width: '100%',
    borderBottomLeftRadius: 50,
    marginBottom: 20,
    paddingLeft: 25,
    position: 'relative',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:40,
    marginRight:150
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  button: {
    backgroundColor: smokeColor,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bottomText: {
    color: 'white',
    marginTop: 15,
  },
  bottom: {
    flexDirection: 'row', // Aligns text in one line
    justifyContent: 'center',  // Centers the text horizontally
    marginTop: 15,
    gap:65 
  },
  signInText: {
    color: smokeColor,
    // textDecorationLine: 'underline', // Optional: Adds an underline to "Sign In"
  },
  inputField: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderBottomWidth: 1, // Only bottom border
  },
});


