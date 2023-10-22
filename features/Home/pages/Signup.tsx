import React, { useState, useReducer, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { primaryBackgroundColor, inputBackgroundColor } from '../../../themes/color';
import { primaryTextColor, placeholderTextColor } from '../../../themes/text';
import backendAPI from '../../../apis/backend';

type signupStateType = {
  name: string;
  email: string;
  password: string;
};

// 行が長くなると、最初の一つ目にもunion operatorがつくのね。
type sugnupActionType =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string };

const signupReducer = (state: signupStateType, action: sugnupActionType) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const Signup: React.FC = () => {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  const [state, dispatch] = useReducer(signupReducer, { name: '', email: '', password: '' });

  // これも、typeというかinterfaceであるべきかね。。。
  type UserData = {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };

  // loadingとsnakcbarもなきゃか。ts、面倒くせーな。。。tsで作るとかやったことないからな。mern stackでtypescriptなもんとかないかね。。。
  const onSignupPress = async () => {
    const result = await backendAPI.post('/auth/signup', state);
    const { user, jwt } = result.data;
    globalDispatch({ type: 'SIGNUP', payload: { authData: user, jwt } });
    await SecureStore.setItemAsync('secure_token', jwt);
  };

  // ここのtextinputは別でcoponentを作りましょう。
  return (
    <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 10 }}>
      <TextInput
        placeholder='Username'
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => {
          dispatch({ type: 'SET_NAME', payload: text });
        }}
        value={state.name}
        style={{
          color: primaryTextColor,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder='Email'
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => {
          dispatch({ type: 'SET_EMAIL', payload: text });
        }}
        value={state.email}
        style={{
          color: primaryTextColor,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => {
          dispatch({ type: 'SET_PASSWORD', payload: text });
        }}
        value={state.password}
        style={{
          color: primaryTextColor,
          backgroundColor: inputBackgroundColor,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity
        style={{ backgroundColor: 'blue', borderRadius: 5, padding: 10 }}
        onPress={() => onSignupPress()}
      >
        <Text style={{ color: 'white' }}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
