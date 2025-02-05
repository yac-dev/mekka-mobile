import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import SpaceDetail from '../pages/SpaceDetail';
import { Colors } from '../../../themes';
import { VectorIcon } from '../../../Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { queryKeys } from '../../../query/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getSpaceById } from '../../../query/queries';

export type SpaceDetailStackNavigatorScreens = {
  SpaceDetail: { _id: string };
};

export type SpaceDetailStackNavigatorProp = NativeStackNavigationProp<SpaceDetailStackNavigatorScreens>;

const SpaceDetailStack = createNativeStackNavigator<SpaceDetailStackNavigatorScreens>();

type SpaceDetailStackNavigatorProps = NativeStackScreenProps<SpaceDetailStackNavigatorScreens, 'SpaceDetail'>;

export const SpaceDetailStackNavigator: React.FC<SpaceDetailStackNavigatorProps> = ({ route }) => {
  return (
    <SpaceDetailStack.Navigator>
      <SpaceDetailStack.Screen
        name='SpaceDetail'
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
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      >
        {(props) => <SpaceDetail {...props} spaceId={route.params?._id} />}
      </SpaceDetailStack.Screen>
      {/* <SpaceDetailStack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
          headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      /> */}
    </SpaceDetailStack.Navigator>
  );
};
