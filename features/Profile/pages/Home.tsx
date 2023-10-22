import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Home = (props) => {
  const { setAuthData, setIsAuthenticated, setSnackBar, setSpaceAndUserRelationships } = useContext(GlobalContext);

  const logout = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuthData({ _id: '', name: '', email: '', avatar: '' });
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    // setSnackBar({
    //   isVisible: true,
    //   barType: 'success',
    //   message: 'Logged out successfully.',
    //   duration: 5000,
    // });
    props.navigation.navigate('Welcome');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => logout()}>
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ color: 'white' }}>Delete my accolunt</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
