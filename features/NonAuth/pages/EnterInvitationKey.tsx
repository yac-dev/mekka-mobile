import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';
import { SignupStackNavigatorProp } from '../navigations/SignupStackNavigator';
import { useQuery } from '@tanstack/react-query';
import { getSpaceBySecretKey } from '../../../query/queries';
import { queryKeys } from '../../../query/queryKeys';
import { showMessage } from 'react-native-flash-message';

export const EnterInvitationKey = () => {
  const navigation = useNavigation<SignupStackNavigatorProp>();
  const [secretKey, setSecretKey] = useState('');

  const { data, refetch, isFetching, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.spaceBySecretKey, secretKey],
    queryFn: () => getSpaceBySecretKey({ secretKey }),
    enabled: false,
  });

  const onRequestPress = () => {
    Keyboard.dismiss();
    refetch();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={onRequestPress} disabled={false}>
          <Text
            style={{
              color: secretKey ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Request
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [secretKey]);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate({ name: 'Signup', params: { space: data?.space }, merge: true });
    }
    if (isError) {
      showMessage({ message: 'Invalid invitation key. Please try again.', type: 'danger', duration: 5000 });
    }
  }, [isSuccess, isError]);

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
          Join a space at the same time
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Already got an invitation key from your friend? {'\n'} You can add and start sharing immidiately.
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
      <LoadingSpinner isVisible={isFetching} message='Processing now' />
    </View>
  );
};
