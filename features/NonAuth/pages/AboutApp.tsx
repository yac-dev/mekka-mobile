import React from 'react';
import { View } from 'react-native';
import { CustomWebView } from '../../../components';
import { NonAuthStackNavigatorParams } from '../navigations/NonAuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type IAboutApp = NativeStackScreenProps<NonAuthStackNavigatorParams, 'AboutApp'>;

export const AboutApp: React.FC<IAboutApp> = ({ route }) => {
  const { url } = route.params;

  return <CustomWebView uri={url} />;
};
