import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './screens';
import SplashScreen from './screens/SplashScreen';
import EditUser from './screens/EditUser';
import RateUser from './screens/RateUser';
import ViewUser from './screens/ViewUser';
const Stack = createNativeStackNavigator();
const MainPage = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewUser"
        component={ViewUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RateUser"
        component={RateUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainPage;
