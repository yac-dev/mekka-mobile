import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { CurrentSpaceContext } from '../providers';
import { Members } from '../features/Members/pages/Members';

const MembersStack = createNativeStackNavigator();

export const MembersStackNavigator = () => {
  const { currentSpace } = useContext(CurrentSpaceContext);

  const handleShare = async () => {
    Share.share({
      title: 'Share Mekka',
      message: `Access here to download Mekka: https://apps.apple.com/us/app/mekka/id6472717148${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

  // inviteを太文字にしよう。
  return (
    <MembersStack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleShare}>
            <Text>Invite</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <MembersStack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <VectorIcon.II name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'rgb(30, 30, 30)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.white,
          },
        })}
      />
    </MembersStack.Navigator>
  );
};
