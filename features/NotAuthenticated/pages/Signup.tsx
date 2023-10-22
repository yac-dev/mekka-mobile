import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Signup = (props) => {
  const { setAuthData, setIsAuthenticated, setLoading, setSnackBar } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onSubmitPress = async () => {
    const payload = {
      name,
      email,
      password,
    };
    setLoading(true);
    const result = await backendAPI.post('/auth/signup', payload);
    const { user, jwt } = result.data;
    setAuthData(user);
    setIsAuthenticated(true);
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Welcome to Mekka', barType: 'success', duration: 5000 });
    await SecureStore.setItemAsync('secure_token', jwt);
    props.navigation?.navigate('SpacesDrawerNavigator');
  };

  useEffect(() => {
    if (name.length && email.length && password.length) {
      if (password.length >= 10) {
        setIsValidated(true);
      } else {
        setIsValidated(false);
      }
    } else {
      setIsValidated(false);
    }
  }, [name, email, password]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
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
          Signup
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          To get started, please provide your name, email and password, then press Submit.
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
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
            <MaterialCommunityIcons name='account' color='white' size={20} />
          </TouchableOpacity>
          <TextInput
            placeholder='Name'
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
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
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
          </TouchableOpacity>
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
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
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
          </TouchableOpacity>
          <TextInput
            placeholder='Password at least 10 characters'
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
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'rgb(80,80,80)',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onPress={() => setIsPasswordHidden((previous) => !previous)}
          >
            <Ionicons name={`${isPasswordHidden ? 'eye' : 'eye-off'}`} color='white' size={20} />
          </TouchableOpacity>
        </View>
        {/* <TextInput
        placeholder='Password'
        placeholderTextColor={'rgb(170,170,170)'}
        style={{
          backgroundColor: 'rgb(80,80,80)',
          height: 50,
          padding: 10,
          borderRadius: 10,
          color: 'white',
          marginBottom: 30,
        }}
        secureTextEntry={isPasswordHidden}
        autoCapitalize='none'
        value={password}
        onChangeText={(text) => setPassword(text)}
      /> */}
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: isValidated ? 'white' : 'rgb(170,170,170)',
            borderRadius: 10,
          }}
          onPress={() => onSubmitPress()}
          disabled={isValidated ? false : true}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            {isValidated ? (
              <MaterialCommunityIcons name='check' size={25} color='black' style={{ marginRight: 10 }} />
            ) : (
              <Foundation name='prohibited' size={25} color='black' style={{ marginRight: 10 }} />
            )}

            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <LoadingSpinner />
    </View>
  );
};

export default Signup;
