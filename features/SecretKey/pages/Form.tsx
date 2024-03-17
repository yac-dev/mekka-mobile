import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { AuthContext, SnackBarContext } from '../../../providers';
import { SnackBar } from '../../../components';

const Form = (props) => {
  const { auth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const {
    setSpaceAndUserRelationships,
    spaceAndUserRelationships,
    setLoading,
    setUpdatesTable,
    setCurrentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={secretKey.length ? false : true}>
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

  const onDonePress = async () => {
    // ここでsecretKeyを全部大文字にするようにする。
    const payload = {
      userId: auth._id,
      secretKey: secretKey.toUpperCase(),
    };
    setLoading(true);
    const result = await backendAPI.post('/spaces/private', payload);
    const { spaceAndUserRelationship } = result.data;
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    if (!spaceAndUserRelationships.length) {
      setCurrentSpaceAndUserRelationship(spaceAndUserRelationship);
    }
    setUpdatesTable((previous) => {
      return {
        ...previous,
        [spaceAndUserRelationship.space._id]: {},
      };
    });
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Joined private space successfully.', status: 'success', duration: 5000 });
    props.navigation?.navigate('SpacesDrawerNavigator');
  };

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
      {/* <TextInput
        placeholder='e.g) CP3W2LFMD9EIF6RNZL47'
        placeholderTextColor={'rgb(170,170,170)'}
        style={{
          backgroundColor: 'rgb(80,80,80)',
          height: 50,
          padding: 10,
          color: 'white',
          borderRadius: 10,
        }}
        autoCapitalize='characters'
        value={secretKey}
        onChangeText={(text) => setSecretKey(text)}
      /> */}
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
            // backgroundColor: 'rgb(80,80,80)',
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
      <LoadingSpinner />
    </View>
  );
};

export default Form;
