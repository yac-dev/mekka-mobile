import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SnackBar from '../../../components/SnackBar';

const Login = (props) => {
  const { setAuthData, setIsAuthenticated, setLoading, setSnackBar } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => onDonePress()} disabled={isValidated ? false : true}>
          <Text
            style={{
              color: isValidated ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Continue
          </Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, [isValidated, email, password]);

  useEffect(() => {
    if (email.length && password.length) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [email, password]);

  const onDonePress = async () => {
    const payload = {
      email,
      password,
    };
    setLoading(true);
    try {
      console.log(payload);
      const result = await backendAPI.post('/auth/login', payload);
      const { user, jwt } = result.data;
      setAuthData(user);
      setIsAuthenticated(true);
      setLoading(false);
      setSnackBar({ isVisible: true, message: 'Logged in successfully.', barType: 'success', duration: 5000 });
      await SecureStore.setItemAsync('secure_token', jwt);
      props.navigation?.navigate('SpacesDrawerNavigator');
    } catch (error) {
      setLoading(false);
      setSnackBar({
        isVisible: true,
        message: 'OOPS. Something went wrong. Please try again.',
        barType: 'error',
        duration: 5000,
      });
    }
    // ここで、secureeをさらにsetする感じか。
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Login
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Already signed up? Please fill out your email, password and then tap Continue.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(170,170,170)',
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgb(80,80,80)',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <MaterialCommunityIcons name='email' color='white' size={20} />
        </View>
        <TextInput
          placeholder='Email'
          placeholderTextColor={'rgb(170,170,170)'}
          style={{
            // backgroundColor: 'rgb(80,80,80)',
            height: 50,
            padding: 10,
            flex: 1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            color: 'white',
          }}
          autoCapitalize='none'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 50,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(170,170,170)',
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgb(80,80,80)',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <MaterialCommunityIcons name='key' color='white' size={20} />
        </View>
        <TextInput
          placeholder='Password'
          placeholderTextColor={'rgb(170,170,170)'}
          style={{
            // backgroundColor: 'rgb(80,80,80)',
            height: 50,
            padding: 10,
            flex: 1,

            color: 'white',
          }}
          secureTextEntry={isPasswordHidden}
          autoCapitalize='none'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordHidden((previous) => !previous)}>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'rgb(80,80,80)',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Ionicons name={`${isPasswordHidden ? 'eye' : 'eye-off'}`} color='white' size={20} />
          </View>
        </TouchableOpacity>
      </View>
      {/* ここの実装後でね。。。。 */}
      {/* <Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>Or continue with...</Text>
      <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 35,
              alignItems: 'center',
              width: 70,
              height: 70,
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='login' color='black' size={30} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Google</Text>
        </View>
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Signup')}
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 35,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='rocket-launch' color='black' size={30} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Apple</Text>
        </View>
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Signup')}
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 35,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='rocket-launch' color='black' size={30} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Facebook</Text>
        </View>
      </View> */}
      <LoadingSpinner />
      <SnackBar />
    </View>
  );
};

export default Login;
