
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';
import Toast from 'react-native-toast-message';

const initialState = { email: '', password: '' };

export default function Login() {
  const [state, setState] = useState(initialState);
  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigation = useNavigation();
  const { dispatch, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [state.isAuthenticated, navigation]);

  const handleChange = (name, value) => {
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleLogin = () => {
    const { email, password } = state;

    if (!email) {
      return alert('Enter your correct email');
    }
    if (password.length < 6) {
      return alert('Password must be at least 6 characters');
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User account signed in!');

        dispatch({ type: 'SET_LOGGED_IN', payload: { user: user } });

        Toast.show({
          type: 'success',
          text2: 'User account signed in!',
          visibilityTime: 20000,
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Toast.show({
            type: 'error',
            text2: 'That email address is already in use!',
            visibilityTime: 20000,
          });
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Toast.show({
            type: 'error',
            text2: 'That email address is invalid!',
            visibilityTime: 20000,
          });
        }

        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={30}
          color="#fff"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.headerText2}>Continue your adventure.</Text>
      </View>

      <View style={styles.flexContainer}>
        <View style={{ width: '100%' }}>
          <TextInput
            mode="flat"
            label="Email"
            placeholderTextColor="#bdbdbd"
            style={[
              styles.inputField,
              { borderBottomColor: focusedField === 'email' ? smokeColor : 'white' },
            ]}
            onChangeText={(val) => handleChange('email', val)}
            keyboardType="email-address"
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: '#bdbdbd',
                text: '#ffffff', 
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
            secureTextEntry={!showPassword} 
            style={[
              styles.inputField,
              { borderBottomColor: focusedField === 'password' ? smokeColor : 'white' },
            ]}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowPassword(!showPassword)} // Toggle state
              />
            }
            onChangeText={(val) => handleChange('password', val)}
            theme={{
              colors: {
                primary: smokeColor,
                placeholder: '#bdbdbd',
                text: '#ffffff', 
                background: 'transparent',
                underlineColor: 'transparent',
              },
            }}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField('')}
          />

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Sign In
          </Button>

          <View style={styles.bottom}>
            <Text style={[styles.bottomText, styles.signUpText]}>Forgot Password</Text>
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
    marginTop: 40,
    marginRight: 150,
  },
  headerText2: {
    fontSize: 15,
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  inputField: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderBottomWidth: 1,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  signUpText: {
    color: smokeColor,
    fontWeight: 'bold',
  },
});
