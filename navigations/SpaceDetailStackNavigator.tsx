import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../components';
import { primaryBackgroundColor } from '../themes/color';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../themes';
import { VectorIcon } from '../Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../providers';
import { MySpacesContext } from '../providers';
import { useGetSpaceByIdState } from '../features/Discover/hooks/useGetSpaceByIdState';

export type SpaceDetailStackNavigatorScreens = {
  SpaceDetail: { _id: string };
};

export type SpaceDetailStackNavigatorProp = NativeStackNavigationProp<SpaceDetailStackNavigatorScreens>;

const SpaceDetailStack = createNativeStackNavigator<SpaceDetailStackNavigatorScreens>();

type SpaceDetailStackNavigatorProps = NativeStackScreenProps<SpaceDetailStackNavigatorScreens, 'SpaceDetail'>;

export const SpaceDetailStackNavigator: React.FC<SpaceDetailStackNavigatorProps> = ({ route }) => {
  const { requestApi: requestGetSpaceById } = useGetSpaceByIdState();

  useEffect(() => {
    requestGetSpaceById({ _id: route.params?._id });
  }, []);

  return (
    <SpaceDetailStack.Navigator>
      <SpaceDetailStack.Screen
        name='SpaceDetail'
        component={SpaceDetail}
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
      />
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
