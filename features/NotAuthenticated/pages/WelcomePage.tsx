import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const WelcomePage = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 50, paddingBottom: 20 }}>
        <FastImage
          source={require('../../../assets/mekka-logo.png')}
          style={{ width: 120, height: 120, alignSelf: 'center' }}
        />
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Welcome to Mekka
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          To get started, please login or signup at first.
        </Text>
      </View>
      <Text>Welcome to Mekka. Please signup or login to proceed.</Text>
      <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            // marginBottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            width: 120,
            height: 40,
            marginRight: 20,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons name='login' color='black' size={25} style={{ marginRight: 10 }} />
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Login</Text>
          </View>
          {/* <MaterialCommunityIcons name='chevron-right' size={25} color='black' /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Signup')}
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            width: 120,
            height: 40,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Ionicons name='create-outline' color='black' size={25} style={{ marginRight: 10 }} />
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Signup</Text>
          </View>
          {/* <MaterialCommunityIcons name='chevron-right' size={25} color='white' /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
