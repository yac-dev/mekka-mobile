import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import SnackBar from '../../../components/SnackBar';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const WelcomePage = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 50, paddingBottom: 20 }}>
        <ExpoImage
          style={{ width: 120, height: 120, alignSelf: 'center' }}
          source={require('../../../assets/appLogos/mekka_logo.png')}
          contentFit='contain'
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
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 35,
              alignItems: 'center',
              width: 70,
              height: 70,
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='login' color='black' size={30} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
        </View>
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Signup')}
            style={{
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 35,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name='rocket-launch' color='black' size={30} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Signup</Text>
        </View>
      </View>
      <SnackBar />
    </SafeAreaView>
  );
};

export default WelcomePage;
