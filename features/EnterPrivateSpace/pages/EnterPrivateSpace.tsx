import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext, MySpacesContext, SnackBarContext } from '../../../providers';
import { SnackBar, LoadingSpinner } from '../../../components';
import { HomeStackNavigatorProps } from '../../../navigations';
import { useNavigation } from '@react-navigation/native';
import { useEnterPrivateSpace } from '../hooks';

export const EnterPrivateSpace = () => {
  const { auth } = useContext(AuthContext);
  const { setMySpaces } = useContext(MySpacesContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { apiResult, requestApi } = useEnterPrivateSpace();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    homeStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => requestApi({ userId: auth._id, secretKey: secretKey.toLocaleUpperCase() })}
          disabled={secretKey.length ? false : true}
        >
          <Text
            style={{
              color: secretKey.length ? 'white' : 'rgb(90,90,90)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [secretKey]);

  useEffect(() => {
    if (apiResult.status === 'success') {
      setMySpaces((previous) => [...previous, apiResult.data?.space]);
      homeStackNavigation.goBack();
    }
  }, [apiResult.status]);

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
          Join private Space
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Already have a private key? Copy and paste it down below.
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
      <SnackBar.Primary />
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now' />
    </View>
  );
};
