import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../../App';
import api from '../../api/api';
import { HomeScreenNavigation } from '../../navigation/auth-navigation';

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  uid: string
};

const styles = StyleSheet.create({
  tinyLogo: {
    width:  50,
    height: 50
  },
  logo: {
    width:  66,
    height: 58,
    flex:   1
  },
  cardPadding: {
    marginVertical:   8,
    marginHorizontal: 16
  }
});

interface ItemCardProps<T> {
  item: T;
  onPress: () => void;
}

const ItemCard = ({
                    item,
                    onPress
                  }: ItemCardProps<User>) => {
  const appTheme = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        className='my-2 mx-5'
        style={[
          styles.cardPadding,
          {
            backgroundColor: appTheme.colors.surfaceVariant
          }
        ]}>
        <Card.Content className='flex-row justify-center items-center h-36'>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png'
            }}
            resizeMode='cover'
          />
          <View className='items-center' style={{ flex: 2 }}>
            <Paragraph
              style={{ color: appTheme.colors.onBackground }}
              className='text-2xl'>
              {item.email}
            </Paragraph>
            <Paragraph style={{ color: appTheme.colors.onSurfaceVariant }}>
              {item.firstName} {item.lastName}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export type Page<T> = {
  count: number,
  rows: T[],
};

export default function HomeScreen({ navigation: { navigate } }: { navigation: HomeScreenNavigation }) {
  const [users, setUsers] = useState<User[]>([]);

  const { currentUser } = useUserContext();

  useEffect(() => {
    // Function to fetch the list of users
    const fetchUsers = async () => {
      try {
        const { data } = await api.get<Page<User>>('/users');

        console.log('Users:', data);

        setUsers(data.rows.filter(user => user.id !== currentUser.id));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const navigateToUser = (user: User) => {
    console.log('Navigate to user:', user);
    navigate('ChatScreen', { user });
  };

  return (
    <View>
      <FlatList data={users} renderItem={({ item: user }) => (
        <ItemCard item={user} onPress={() => navigateToUser(user)} />)} />
    </View>
  );
}
