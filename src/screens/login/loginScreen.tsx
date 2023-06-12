import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';
import { useUserContext } from '../../../App';
import api from '../../api/api';
import { LoginScreenNavigation } from '../../navigation/auth-navigation';
import { saveToken } from '../../utils';
import { getUser } from '../../utils/get-user';

export default function LoginScreen({ navigation: { navigate } }: { navigation: LoginScreenNavigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email:    '',
      password: ''
    }
  });

  const { setCurrentUser } = useUserContext();

  const onSubmit = async ({ email, password }: {
    email: string,
    password: string
  }) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });

      await saveToken(data.token);

      await getUser(setCurrentUser);

      navigate('HomeScreen');
    } catch (e) {
      console.log('Problem login: ', e);
    }
  };

  return (
    <View>

      <Controller
        control={control}
        rules={{
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='email'
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            autoCorrect={false}
          />
        )}
        name='password'
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      <Button title="Don't have an account?" onPress={() => navigate('RegisterScreen')} />
    </View>
  );
}
