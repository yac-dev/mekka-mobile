import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { EmptyView, AppPressable } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
export const NoConnection = () => {
  return (
    <EmptyView
      icon={<VectorIcon.FT name='wifi-off' size={48} color='white' style={{ marginBottom: 30 }} />}
      title='Something went wrongwrong🤨'
      subtitle={`Please check your internet connection and reboot the app.${'\n'}If the issue persists, please DM us.`}
      action={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://x.com/LampostTech')}>
            <ExpoImage
              source={require('../../../assets/forApp/icons8-twitter.png')}
              style={{ width: 50, height: 50, marginRight: 10 }}
              tintColor='white'
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/yosuke-kojima-268044213/')}
          >
            <ExpoImage
              source={require('../../../assets/forApp/icons8-linkedin.png')}
              style={{ width: 50, height: 50 }}
              tintColor='white'
            />
          </TouchableOpacity>
        </View>
      }
    />
  );
};
