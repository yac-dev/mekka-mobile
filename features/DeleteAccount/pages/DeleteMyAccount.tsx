import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const DeleteMyAccount = () => {
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
      <TouchableOpacity style={{ padding: 10, borderRadius: 20, backgroundColor: 'white', alignSelf: 'center' }}>
        <Text style={{ color: 'black' }}>Delete permanentally</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteMyAccount;
