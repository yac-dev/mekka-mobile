import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SnackBarContext } from '../../../providers';
import { SnackBar, LoadingSpinner } from '../../../components';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { useNavigation } from '@react-navigation/native';
import { useEnterPrivateSpace } from '../hooks';
import { CurrentTagContext } from '../../../providers';
import { LogsTableContext } from '../../../providers';
import { showMessage } from 'react-native-flash-message';
import { useRecoilState } from 'recoil';
import { mySpacesAtom, currentSpaceAtom } from '../../../recoil';
import { authAtom } from '../../../recoil';

export const EnterPrivateSpace = () => {
  const [auth] = useRecoilState(authAtom);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const { setSnackBar } = useContext(SnackBarContext);
  const [, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { setLogsTable } = useContext(LogsTableContext);
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
      // 0からのjoin
      setMySpaces((previous) => [...previous, apiResult.data?.space]);
      if (!mySpaces?.length) {
        setCurrentSpace(apiResult.data?.space);
        setCurrentTag(apiResult.data?.space.tags[0]);
        setLogsTable((previous) => {
          return {
            ...previous,
            [apiResult.data?.space._id]: {
              [apiResult.data?.space.tags[0]._id]: 0,
            },
          };
        });
      }
      homeStackNavigation.goBack();
      showMessage({ message: 'Joined a private space.', type: 'success' });
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
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now' />
    </View>
  );
};
