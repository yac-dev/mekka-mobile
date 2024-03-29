import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import * as SecureStore from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SnackBarContext } from '../../../providers';

const Signup = (props) => {
  const { setSnackBar } = useContext(SnackBarContext);
  const { setAuthData, setIsAuthenticated, setLoading } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  // const v = async () => {
  //   await SecureStore.deleteItemAsync('secure_token');
  // };
  // v();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => onSubmitPress()} disabled={isValidated ? false : true}>
          <Text
            style={{
              color: isValidated ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, [isValidated, name, email, password]);

  const onSubmitPress = async () => {
    const payload = {
      name,
      email,
      password,
    };
    setLoading(true);
    try {
      const result = await backendAPI.post('/auth/signup', payload);
      const response = result.data.data;
      setAuthData(response.user);
      setIsAuthenticated(true);
      setLoading(false);
      setSnackBar({ isVisible: true, message: 'Welcome to Mekka', status: 'success', duration: 5000 });
      await SecureStore.setItemAsync('secure_token', response.jwt);
      props.navigation?.navigate('SpacesDrawerNavigator');
    } catch (error) {
      setLoading(false);
      setSnackBar({
        isVisible: true,
        status: 'warning',
        message: 'OOPS. Something went wrong. Please try again.',
        duration: 5000,
      });
    }
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
      <ScrollView style={{ flex: 1 }}>
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
              borderBottomColor: 'rgb(140,140,140)',
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
              <MaterialCommunityIcons name='account' color='white' size={20} />
            </View>
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
              borderBottomColor: 'rgb(140,140,140)',
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
              marginBottom: 30,
              borderBottomWidth: 0.3,
              borderBottomColor: 'rgb(140,140,140)',
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
        </View>
        <LoadingSpinner />
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: 'rgb(150,150,150)' }}>By signing up, you accept and read Mekka's&nbsp;</Text>
          <TouchableOpacity
            style={{ borderBottomWidth: 0.5, borderBottomColor: 'rgb(150, 150,150)' }}
            onPress={() => props.navigation.navigate('EULA')}
          >
            <Text style={{ color: 'rgb(150,150,150)' }}>EULA.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
