import React from 'react';
import { View } from 'react-native';
import { CustomWebView } from '../../../components';
import { NonAuthStackNavigatorParams } from '../../NonAuth/navigations/NonAuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../navigations/HomeStackNavigator';

type IAboutApp = NativeStackScreenProps<HomeStackParams, 'AboutApp'>;

export const AboutApp: React.FC<IAboutApp> = ({ route }) => {
  const { url } = route.params;

  return <CustomWebView uri={url} />;
};
