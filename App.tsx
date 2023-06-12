/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useContext, useState } from 'react';

import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme, useTheme } from 'react-native-paper';
import ChatScreen from './src/screens/chat/chatScreen';
import HomeScreen, { User } from './src/screens/home/homeScreen';
import LoginScreen from './src/screens/login/loginScreen';
import RegisterScreen from './src/screens/register/registerScreen';

const Stack = createNativeStackNavigator();

export const DefaultTheme: Theme = {
  dark:   false,
  colors: {
    primary:      'rgb(0, 122, 255)',
    background:   'rgb(242, 242, 242)',
    card:         'rgb(255, 255, 255)',
    text:         'rgb(28, 28, 30)',
    border:       'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)'
  }
};

const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    primary:              'rgb(0, 99, 154)',
    onPrimary:            'rgb(255, 255, 255)',
    primaryContainer:     'rgb(206, 229, 255)',
    onPrimaryContainer:   'rgb(0, 29, 50)',
    secondary:            'rgb(81, 96, 111)',
    onSecondary:          'rgb(255, 255, 255)',
    secondaryContainer:   'rgb(213, 228, 247)',
    onSecondaryContainer: 'rgb(14, 29, 42)',
    tertiary:             'rgb(104, 88, 122)',
    onTertiary:           'rgb(255, 255, 255)',
    tertiaryContainer:    'rgb(238, 219, 255)',
    onTertiaryContainer:  'rgb(35, 21, 51)',
    error:                'rgb(186, 26, 26)',
    onError:              'rgb(255, 255, 255)',
    errorContainer:       'rgb(255, 218, 214)',
    onErrorContainer:     'rgb(65, 0, 2)',
    background:           'rgb(252, 252, 255)',
    onBackground:         'rgb(26, 28, 30)',
    surface:              'rgb(252, 252, 255)',
    onSurface:            'rgb(26, 28, 30)',
    surfaceVariant:       'rgb(222, 227, 235)',
    onSurfaceVariant:     'rgb(66, 71, 78)',
    outline:              'rgb(114, 119, 127)',
    outlineVariant:       'rgb(194, 199, 207)',
    shadow:               'rgb(0, 0, 0)',
    scrim:                'rgb(0, 0, 0)',
    inverseSurface:       'rgb(47, 48, 51)',
    inverseOnSurface:     'rgb(240, 240, 244)',
    inversePrimary:       'rgb(150, 204, 255)',
    elevation:            {
      level0: 'transparent',
      level1: 'rgb(239, 244, 250)',
      level2: 'rgb(232, 240, 247)',
      level3: 'rgb(224, 235, 244)',
      level4: 'rgb(222, 234, 243)',
      level5: 'rgb(217, 231, 241)'
    },
    surfaceDisabled:   'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    backdrop:          'rgba(44, 49, 55, 0.4)'
  }
};

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    primary:              'rgb(150, 204, 255)',
    onPrimary:            'rgb(0, 51, 83)',
    primaryContainer:     'rgb(0, 74, 117)',
    onPrimaryContainer:   'rgb(206, 229, 255)',
    secondary:            'rgb(185, 200, 218)',
    onSecondary:          'rgb(35, 50, 64)',
    secondaryContainer:   'rgb(58, 72, 87)',
    onSecondaryContainer: 'rgb(213, 228, 247)',
    tertiary:             'rgb(211, 191, 230)',
    onTertiary:           'rgb(56, 42, 73)',
    tertiaryContainer:    'rgb(79, 64, 97)',
    onTertiaryContainer:  'rgb(238, 219, 255)',
    error:                'rgb(255, 180, 171)',
    onError:              'rgb(105, 0, 5)',
    errorContainer:       'rgb(147, 0, 10)',
    onErrorContainer:     'rgb(255, 180, 171)',
    background:           'rgb(26, 28, 30)',
    onBackground:         'rgb(226, 226, 229)',
    surface:              'rgb(26, 28, 30)',
    onSurface:            'rgb(226, 226, 229)',
    surfaceVariant:       'rgb(66, 71, 78)',
    onSurfaceVariant:     'rgb(194, 199, 207)',
    outline:              'rgb(140, 145, 152)',
    outlineVariant:       'rgb(66, 71, 78)',
    shadow:               'rgb(0, 0, 0)',
    scrim:                'rgb(0, 0, 0)',
    inverseSurface:       'rgb(226, 226, 229)',
    inverseOnSurface:     'rgb(47, 48, 51)',
    inversePrimary:       'rgb(0, 99, 154)',
    elevation:            {
      level0: 'transparent',
      level1: 'rgb(32, 37, 41)',
      level2: 'rgb(36, 42, 48)',
      level3: 'rgb(40, 47, 55)',
      level4: 'rgb(41, 49, 57)',
      level5: 'rgb(43, 53, 62)'
    },
    surfaceDisabled:   'rgba(226, 226, 229, 0.12)',
    onSurfaceDisabled: 'rgba(226, 226, 229, 0.38)',
    backdrop:          'rgba(44, 49, 55, 0.4)'
  }
};

export type AppTheme = typeof customDarkTheme;
export const useAppTheme = () => useTheme<AppTheme>();

const defaultUserObject = {
  id:               0,
  email:            '',
  firstName:        '',
  lastName:         '',
  role:             'Athlete',
  bodyWeight:       0,
  interests:        [],
  favoriteWorkouts: [],
  coordinates:      [0, 0]
};

const UserContext = createContext<{
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  currentUser:    defaultUserObject as unknown as User,
  setCurrentUser: () => {
  }
});
export const useUserContext = () => useContext(UserContext);

function App(): Element {
  const [currentUser, setCurrentUser] = useState<User>(
    defaultUserObject as unknown as User
  );
  const colorScheme = useColorScheme();
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: DefaultTheme
  });
  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme
  });
  const paperTheme =
    colorScheme === 'dark' ? customDarkTheme : customLightTheme;
  const rNavTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={rNavTheme}>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser
          }}>
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
            <Stack.Screen
              name='ChatScreen'
              component={ChatScreen}
            />
          </Stack.Navigator>
        </UserContext.Provider>

      </NavigationContainer>
    </PaperProvider>

  );
}

export default App;
