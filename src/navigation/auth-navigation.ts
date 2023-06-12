import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined
};

export type LoginScreenNavigation = StackNavigationProp<AuthStackParamList, 'LoginScreen'>;
export type RegisterScreenNavigation = StackNavigationProp<AuthStackParamList, 'RegisterScreen'>;
