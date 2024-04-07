import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../themes';
import { useGetPosts } from '../features';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { TagScreenTopTabNavigator } from './TagScreenTopTabNavigator';
import { TagType } from '../types';
import { TagScreenProvider } from '../features';

const TagScreenStack = createNativeStackNavigator();

type TagScreenStackNavigatorProps = {};

export const TagScreenStackNavigator: React.FC<TagScreenStackNavigatorProps> = () => {
  const { apiResult: getPostsApiResult, requestApi: requestGetPosts } = useGetPosts();
  // useEffect(() => {
  //   if (screenLoaded[props.tagObject.tag._id] && createNewPostResult.isSuccess && createNewPostResult.responseData) {
  //     // responseDataのaddedTags、もしくはresponseData.createdTagの中にprops.tagObject.tag._idがある場合は
  //     // って言うのが必要になる。
  //     setPosts((previous) => {
  //       const updating = [...previous];
  //       updating.unshift(createNewPostResult.responseData.post);
  //       return updating;
  //     });
  //     setCreateNewPostResult((previous) => {
  //       return {
  //         ...previous,
  //         isCreating: false,
  //         isSuccess: false,
  //         responseData: null,
  //       };
  //     });
  //   }
  // }, [createNewPostResult]);

  return (
    <View
      style={{ flex: 1 }}
      // onLayout={() =>
      //   setScreenLoaded((previous) => {
      //     return {
      //       ...previous,
      //       [props.tagObject.tag._id]: true,
      //     };
      //   })
      // }
    >
      <TagScreenStack.Navigator>
        <TagScreenStack.Group>
          <TagScreenStack.Screen
            name='TagScreenTopTabNavigator'
            options={({ navigation }) => ({
              headerShown: false,
              // headerLeft: () => (
              //   <TouchableOpacity onPress={() => navigation.goBack()}>
              //     <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              //   </TouchableOpacity>
              // ),
              // headerTitle: '',
              // headerStyle: {
              //   backgroundColor: 'rgb(30, 30, 30)',
              // },
              // headerTitleStyle: {
              //   fontWeight: 'bold',
              //   color: primaryTextColor,
              // },
            })}
          >
            {() => <TagScreenTopTabNavigator />}
          </TagScreenStack.Screen>
        </TagScreenStack.Group>
        <TagScreenStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <TagScreenStack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTransparent: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </TagScreenStack.Group>
      </TagScreenStack.Navigator>
    </View>
  );
};
