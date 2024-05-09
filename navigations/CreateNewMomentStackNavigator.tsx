import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import AddTags from '../features/CreateNewPost/pages/AddTags';
import AddLocation from '../features/CreateNewPost/pages/AddLocation';
import AddLocationTag from '../features/CreateNewPost/pages/AddLocationTag';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';
import { GlobalContext } from '../contexts/GlobalContext';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import backendAPI from '../apis/backend';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
// import { INITIAL_CREATE_NEW_POST_STATE } from '../App';
import { AuthContext, SnackBarContext } from '../providers';
import { SnackBar, LoadingSpinner, AppButton } from '../components';
import { useLoadingSpinner } from '../hooks/useLoadingSpinner';
import { CurrentSpaceContext } from '../providers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreateNewPostProvider } from '../features/CreateNewPost/contexts';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { CreatedTagType } from '../features/CreateNewPost/contexts';

export type CreateNewMomentStackParams = {
  Entry: undefined;
  SelectContents: undefined;
};

export type CreateNewMomentStackProps = NativeStackNavigationProp<CreateNewMomentStackParams>;

const CreateNewMomentStack = createNativeStackNavigator();
export const CreateNewMomentStackNavigator = () => {
  return (
    <CreateNewMomentStack.Navigator>
      <CreateNewMomentStack.Group>
        <CreateNewMomentStack.Screen
          name='EntryPage'
          component={SelectPostType}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
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
        <CreateNewMomentStack.Screen
          name='NormalPost'
          component={NormalPost}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
          })}
        />
      </CreateNewMomentStack.Group>
    </CreateNewMomentStack.Navigator>
  );
};
