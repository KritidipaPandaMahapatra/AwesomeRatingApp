import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
//import { TextInputAndroidProps } from "react-native";
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {Navigation} from '../types';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {RadioButton} from 'react-native-paper';
type Props = {
  navigation: Navigation;
};
const RegisterScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [isValidName, setValidName] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [checked, setChecked] = React.useState('first');
  GoogleSignin.configure({
    webClientId:
      '339861403102-r2avnuelh0oc8so5hpjuobatd1k6t2pl.apps.googleusercontent.com',
  });
  console.log('checked role', checked);
  const emailValidation = (text: string | any[]) => {
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!text || text.length <= 0 || text === undefined) {
      setErrorEmail('Email required *');
      setValidEmail(true);
    } else if (!regex.test(email)) {
      setErrorEmail('Enter valid email *');
      setValidEmail(true);
    } else {
      setValidEmail(false);
      setErrorEmail('');
    }
  };
  const passwordValidation = (text: string | any[]) => {
    if (!text || text.length <= 0 || text === undefined) {
      setErrorPassword('Password required *');
      setValidPassword(true);
      return;
    } else if (text.length < 6) {
      setErrorPassword('Weak Password, Minimum 6 characters are required*');
      setValidPassword(true);
      return;
    } else {
      setValidPassword(false);
      setErrorPassword('');
    }
  };
  const nameValidator = (name: string) => {
    var regName = /^[A-Za-z]+$/;
    if (!name || name.length <= 0 || name === undefined) {
      setErrorName('Please enter your name *');
      setValidName(true);
      return;
    } else if (!regName.test(name)) {
      setErrorName('Please enter valid name *');
      setValidName(true);
      return;
    } else if (name.length > 20) {
      setErrorName('Name is too long *');
      setValidName(true);
      return;
    } else {
      setValidName(false);
      setErrorName('');
    }
  };
  const doCreateUser = async (email: string, password: string) => {
    const SuccessMessage = 'Account created successfully';
    try {
      console.log('try block executed');
      if (email.trim().length == 0) {
        setErrorEmail('Email required *');
      } else if (password.trim().length == 0) {
        setErrorPassword('Password required *');
      } else {
        console.log('else part executed');
        let response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        console.log('response---', response);
        if (response && response.user) {
          console.log('11111111');
          setFetching(true);
          console.log('response', response, 'response---->', response.user);
          navigation.navigate('LoginScreen');
          Toast.showWithGravity(SuccessMessage, Toast.SHORT, Toast.BOTTOM);
        }
      }
    } catch (e) {
      console.log('222222');
      const errMessage =
        'The email address is already in use by another account.';
      Toast.showWithGravity(errMessage, Toast.SHORT, Toast.BOTTOM);
    }
  };
  const _onSignUpPressed = async () => {
    console.log('Google login');
    try {
      console.log('Inside try block');
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      //if sign in before then signout first then signin
      //await GoogleSignin.signOut()
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('GOOGLE ERROR', error);
    }
  };
  const handleRegistration = () => {
    console.log('Inside handleRegistration');
    if (name && email && checked) {
      firestore()
        .collection('Users')
        .add({
          name: name,
          email: email,
          role: checked,
        })
        .then(() => {
          console.log('User added!');
          Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('LoginScreen'),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(error => {
          console.log(error);
          Alert.alert(
            'Exception',
            error,
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('LoginScreen'),
              },
            ],
            {cancelable: false},
          );
        });
    }
  };
  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name}
        onChangeText={text => {
          nameValidator(text);
          setErrorName;
          setName(text);
        }}
        error={isValidName}
        errorText={errorName}
        keyboardType="default"
        textContentType="name"
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={text => {
          emailValidation(text);
          setErrorEmail;
          setEmail(text);
        }}
        error={isValidEmail}
        errorText={errorEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={text => {
          passwordValidation(text);
          setPassword(text);
        }}
        error={isValidPassword}
        errorText={errorPassword}
        secureTextEntry
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{marginHorizontal: 20, fontWeight: '700'}}>ROLE</Text>
        <Text style={styles.label}>Manager</Text>
        <RadioButton
          value="Manager"
          status={checked === 'Manager' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Manager')}
        />
        <Text style={styles.label}>Employee</Text>
        <RadioButton
          value="Employee"
          status={checked === 'Employee' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Employee')}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => {
          doCreateUser(email, password), handleRegistration();
        }}
        //onPress={_onSignUpPressed}
        style={styles.button}>
        Sign Up
      </Button>
      <View style={styles.viewButton}>
        <Text style={styles.label}>OR</Text>
        <Text style={styles.label}>Sign In With</Text>
        <View style={styles.signinButton}>
          <TouchableOpacity
            onPress={() =>
              _onSignUpPressed()
                .then(res => {
                  handleRegistration();
                  console.log('Result');
                })
                .catch(error => {
                  console.log(error);
                })
            }>
            <Image
              source={require('../assets/google_logo.png')}
              style={styles.googleimage}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/fb_logo.png')}
              style={styles.fbimage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  googleimage: {
    width: 128,
    height: 120,
    resizeMode: 'contain',
  },
  fbimage: {
    width: 110,
    height: 55,
    marginTop: 30,
    resizeMode: 'contain',
  },
  signinButton: {
    flexDirection: 'row',
  },
  viewButton: {
    alignItems: 'center',
  },
});

export default memo(RegisterScreen);
function alert(err: any) {
  throw new Error('Function not implemented.');
}
