import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { CurrentSpaceContext } from '../providers';
import { Members } from '../features/Members/pages/Members';
import { AppButton } from '../components';

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

  return (
    <MembersStack.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.5} onPress={handleShare}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                marginRight: 5,
              }}
            >
              Invite
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <MembersStack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='close' size={18} color={'rgb(190,190,190)'} />
            </AppButton.Icon>
          ),
          headerTitle: 'Members',
          headerStyle: {
            backgroundColor: Colors.black,
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
