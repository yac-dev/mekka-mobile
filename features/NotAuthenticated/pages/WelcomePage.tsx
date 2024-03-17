import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

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
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => props.navigation.navigate('LoginStackNavigator')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='login' color='white' size={25} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Login</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-down' color='white' size={25} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => props.navigation.navigate('Signup')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='rocket-launch' color='white' size={25} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Sign up</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-down' color='white' size={25} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
