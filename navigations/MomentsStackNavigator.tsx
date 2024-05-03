import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SpaceInfo } from '../features/SpaceInfo/pages/SpaceInfo';
import { Colors } from '../themes/colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackNavigatorProps, HomeStackParams } from './HomeStackNavigator';
import { Moments } from '../features/Moments/pages/Moments';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import { CreateNewPostStackParams } from './CreateNewPostStackNavigator';

type MomentsStackParams = {
  Moments: undefined;
  ViewPostStackNavigator: undefined;
  CreateNewPostStackNavigator: NativeStackScreenProps<CreateNewPostStackParams>;
};
export type MomentsStackNavigatorProps = NativeStackNavigationProp<MomentsStackParams>;
const MomentsStack = createNativeStackNavigator();

// : React.FC<NativeStackScreenProps<HomeStackParams, 'SpaceInfoStackNavigator'>>

export const MomentsStackNavigator = () => {
  return (
    // ここ、providerが必要だな。。。createのapi statusをcontextで持たせよう。
    <MomentsStack.Navigator>
      <MomentsStack.Group>
        <MomentsStack.Screen
          name='Moments'
          component={Moments}
          options={({ navigation }) => ({
            // headerShown: false,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitle: 'Moments',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: Colors.white,
            },
          })}
        />
        <MomentsStack.Screen
          name='ViewPostStackNavigator'
          component={ViewPostStackNavigator}
          options={({ navigation }) => ({
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
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
      </MomentsStack.Group>
      <MomentsStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <MomentsStack.Screen
          name='CreateNewPostStackNavigator'
          component={CreateNewPostStackNavigator}
          options={({ navigation }) => ({
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
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
      </MomentsStack.Group>
    </MomentsStack.Navigator>
  );
};
