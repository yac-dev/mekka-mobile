import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { HomeContext } from '../contexts/HomeContext';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import { icons } from '../../../utils/icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import AuthButtons from '../components/AuthButtons';
import Button from '../../../components/Button/Button';
import Spaces from '../components/Spaces';
import backendAPI from '../../../apis/backend';
import MenuButtons from '../components/MenuButtons';

type RouterProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
};

type SpaceType = {
  _id: string;
  name: string;
  icon: string;
  isPublic: boolean;
};

type SpaceAndMeRelationshipType = {
  _id: string;
  space: SpaceType;
  user: string;
  createdAt: Date;
};

// homeは、authされている状態、されていない状態でrenderを分けなきゃいけない。
// authなら、自分が参加しているlibraryを全部renderするし、authじゃないならlogin or signupを表示する感じ。
const MySpaces: React.FC<RouterProps> = (props) => {
  const { authData, isIpad, isAuthenticated, setSpaceAndUserRelationships, setSnackBar } = useContext(GlobalContext);
  const [spaceAndMeRelationships, setSpaceAndMeRelationships] = useState<SpaceAndMeRelationshipType[]>([]);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7;
  const iconWidth = oneGridWidth * 0.7;

  useEffect(() => {
    if (props.route?.params?.createdSpace) {
      setSpaceAndUserRelationships((previous) => [...previous, props.route?.params?.createdSpace]);
    }
  }, [props.route?.params?.createdSpace]);

  // const getMySpaces = async () => {
  //   const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
  //   const { spaceAndUserRelationships } = result.data;
  //   setSpaceAndMeRelationships(spaceAndUserRelationships);
  // };

  // // ここのauthDataの部分だね。ダメなのは。
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getMySpaces();
  //   }
  // }, [isAuthenticated]);

  if (isAuthenticated) {
    return (
      <HomeContext.Provider
        value={{
          // spaceAndMeRelationships, setSpaceAndMeRelationships,
          navigation: props.navigation,
        }}
      >
        <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, paddingTop: 20 }}>
          <Spaces />
        </View>
      </HomeContext.Provider>
    );
  } else {
    return (
      <View
        style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: primaryTextColor, fontSize: 18 }}>Sign in to experience full functions😎</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button buttonLabel='Login' buttonColor='blue' onButtonPress={() => props.navigation.navigate('Login')} />
          <Button buttonLabel='Signup' buttonColor='blue' onButtonPress={() => props.navigation.navigate('Signup')} />
        </View>
      </View>
    );
  }
};

export default MySpaces;
