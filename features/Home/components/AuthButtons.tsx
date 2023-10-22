import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../../components/Button/Button';

const AuthButtons = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Button buttonLabel='Login' buttonColor='blue' onButtonPress={() => console.log('login')} />
      <Button buttonLabel='Signup' buttonColor='blue' onButtonPress={() => console.log('login')} />
    </View>
  );
};

export default AuthButtons;
