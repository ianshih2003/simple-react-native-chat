import React from 'react';
import api from '../api/api';
import { User } from '../screens/home';

export async function getUser(setCurrentUser: React.Dispatch<React.SetStateAction<User>>) {
  const { data } = await api.post('/users/me');
  setCurrentUser(data as User);
}
