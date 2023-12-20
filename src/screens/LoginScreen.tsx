import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator, passwordValidator} from '../core/utils';
import {Navigation} from '../types';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
type Props = {
  navigation: Navigation;
};

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const _onLoginPressed = async () => {
    console.log('email--', email, 'password--', password);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    try {
      console.log('Try blocked executing');
      let response = await auth().signInWithEmailAndPassword(
        email.value,
        password.value,
      );
      const SuccessMessage = 'Login successfull';
      if (response && response.user) {
        console.log('response', response, 'response---->', response.user);
        // Alert.alert('Success ✅', 'Welcome to Dashboard screen');
        Toast.showWithGravity(SuccessMessage, Toast.SHORT, Toast.BOTTOM);
        navigation.navigate('Dashboard');
      }
    } catch (e) {
      // console.error(e.message);
      const errMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      Toast.showWithGravity(errMessage, Toast.SHORT, Toast.BOTTOM);
    }

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        //autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 22,
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
