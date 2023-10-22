import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import * as SecureStore from 'expo-secure-store';

const Login: React.FC = (props) => {
  const { setAuthData, setIsAuthenticated } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // done buttonをここでおく。
  const onDonePress = async () => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    const result = await backendAPI.post('/auth/login', payload);
    const { user, jwt } = result.data;
    setAuthData(user);
    setIsAuthenticated(true);
    await SecureStore.setItemAsync('secure_token', jwt);
    props.navigation?.navigate('SpacesDrawerNavigator');
    // ここで、secureeをさらにsetする感じか。
  };

  useEffect(() => {
    props.navigation?.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={email.length && password.length ? false : true}>
          <Text
            style={{
              color: email.length && password.length ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [email, password]);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(35, 35, 35)', padding: 10 }}>
      <Text style={{ color: 'white' }}>Email</Text>
      <TextInput
        placeholder='email'
        placeholderTextColor={'yellow'}
        value={email}
        style={{ borderRadius: 8, padding: 10, color: 'white' }}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={{ color: 'white' }}>Password</Text>
      <TextInput
        placeholder='password'
        placeholderTextColor={'yellow'}
        value={password}
        style={{ borderRadius: 8, padding: 10, color: 'white' }}
        onChangeText={(text) => setPassword(text)}
      />
    </View>
  );
};

export default Login;
