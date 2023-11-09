import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from '../../../components/LoadingSpinner';

const DeleteMyAccount = (props) => {
  const {
    authData,
    setLoading,
    setSnackBar,
    setAuthData,
    setIsAuthenticated,
    setSpaceAndUserRelationships,
    setCurrentSpaceAndUserRelationship,
    setCurrentSpace,
    setCurrentTagObject,
  } = useContext(GlobalContext);

  const onDeletePress = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync('secure_token');
    const result = await backendAPI.delete(`/auth/${authData._id}`);
    setAuthData({ _id: '', name: '', email: '', avatar: '' });
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    setCurrentSpaceAndUserRelationship(null);
    setCurrentTagObject(null);
    setCurrentSpace(null);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Successfully deleted your account. Bye bye.',
      duration: 5000,
    });
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 40 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Delete my account
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Are you sure you want to delete your account? Your content will also be deleted forever.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onDeletePress()}
        style={{ padding: 10, borderRadius: 20, backgroundColor: 'white', alignSelf: 'center' }}
      >
        <Text style={{ color: 'black' }}>Delete permanentally</Text>
      </TouchableOpacity>
      <LoadingSpinner />
    </View>
  );
};

export default DeleteMyAccount;
