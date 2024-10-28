import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';
import { SignupStackNavigatorProp } from '../navigations/SignupStackNavigator';

export const EnterInvitationKey = () => {
  const navigation = useNavigation<SignupStackNavigatorProp>();
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => console.log('submit')} disabled={false}>
          <Text
            style={{
              color:
                // formData.name.isValidated && formData.email.isValidated && formData.password.isValidated
                //   ? 'white'
                //   : 'rgb(117,117, 117)',
                'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Request
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Enter invitation key
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Already got an invitation key from your friend? {'\n'} You can join a space at the same time.
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
        <TextInput
          placeholder='e.g.) CP3W2LFMD9EIF6RNZL47'
          placeholderTextColor={'rgb(170,170,170)'}
          style={{
            height: 50,
            padding: 10,
            flex: 1,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            color: 'white',
          }}
          autoCapitalize='characters'
          value={secretKey}
          onChangeText={(text) => setSecretKey(text)}
        />
      </View>
      {/* <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now' /> */}
    </View>
  );
};
