import { StackNavigationProp } from '@react-navigation/stack';
import { User } from '../screens/home';

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ChatScreen: { user: User };
};

export type LoginScreenNavigation = StackNavigationProp<AuthStackParamList, 'LoginScreen'>;
export type RegisterScreenNavigation = StackNavigationProp<AuthStackParamList, 'RegisterScreen'>;
export type HomeScreenNavigation = StackNavigationProp<AuthStackParamList, 'HomeScreen'>;
