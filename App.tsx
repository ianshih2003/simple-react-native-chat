/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from './src/screens/home/homeScreen';
import LoginScreen from './src/screens/login/loginScreen';
import RegisterScreen from './src/screens/register/registerScreen';

const Stack = createNativeStackNavigator();

function App(): Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
        />
        <Stack.Screen
          name='RegisterScreen'
          component={RegisterScreen}
        />
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
