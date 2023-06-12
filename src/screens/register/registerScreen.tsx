import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput, View } from 'react-native';
import api from '../../api/api';
import { RegisterScreenNavigation } from '../../navigation/auth-navigation';
import { saveToken } from '../../utils';

export default function RegisterScreen({ navigation: { navigate } }: { navigation: RegisterScreenNavigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName:  '',
      lastName:   '',
      bodyWeight: 0,
      email:      '',
      password:   '',
      role:       'Athlete'
    }
  });

  const onSubmit = async ({ firstName, lastName, bodyWeight, email, password, role }: {
    firstName: string,
    lastName: string,
    bodyWeight: number,
    email: string,
    password: string,
    role: string
  }) => {
    console.log({ firstName, lastName, bodyWeight, email, password, role });

    try {
      const { data } = await api.post('/auth/register', { firstName, lastName, bodyWeight, email, password, role });

      await saveToken(data.token);

      navigate('HomeScreen');
    } catch (e) {
      console.log('Problem signing up: ', e);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='First name'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='firstName'
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Last name'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='lastName'
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Body Weight'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value !== 0 ? value.toString() : ''}
            keyboardType={'numeric'}
          />
        )}
        name='bodyWeight'
      />

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

      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      <Button title='Already have an account?' onPress={() => navigate('LoginScreen')} />
    </View>
  );
}
