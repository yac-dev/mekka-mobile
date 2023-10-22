import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';

const Form = (props) => {
  const { authData, setSpaceAndUserRelationships, setLoading, setSnackBar } = useContext(GlobalContext);
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={secretKey.length && secretKey.length === 20 ? false : true}
        >
          <Text
            style={{
              color: secretKey.length && secretKey.length === 20 ? 'white' : 'rgb(70,70,70)',
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
    const payload = {
      userId: authData._id,
      secretKey,
    };
    setLoading(true);
    const result = await backendAPI.post('/spaces/private', payload);
    const { spaceAndUserRelationship } = result.data;
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    setLoading(false);
    setSnackBar({ isVisible: true, message: 'Joined private space successfully.', barType: 'success', duration: 5000 });
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
          Do you have a secret key? Copy it and paste down below to enter private space.
        </Text>
      </View>
      <TextInput
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
      />
      <LoadingSpinner />
    </View>
  );
};

export default Form;
