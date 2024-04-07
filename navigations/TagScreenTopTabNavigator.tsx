import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Platform, Alert, Text, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import { ApiStatusType, PostType, TagType } from '../types';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { GridViewStackNavigator } from './GridViewStackNavigator';
import { MapPosts } from '../features/Space/components/MapPosts';
import { ViewPostsTypeToggleButton } from '../features/Space/components/ViewPostsTypeToggleButtons';
import { useGetPosts } from '../features/Space/hooks/useGetPosts';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import * as Haptics from 'expo-haptics';
import { GridView } from '../features/Space/components/GridView';
import { TagScreenContext } from '../features/Space/providers/TagScreenProvider';

const Tab = createMaterialTopTabNavigator();

const screenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
};

type PostsTopTabNavigatorProps = {
  // posts: PostType[];
  // getPostsApiStatus: ApiStatusType;
};

export const TagScreenTopTabNavigator: React.FC<PostsTopTabNavigatorProps> = () => {
  // const { viewPostsType } = useContext(SpaceRootContext);
  const { viewPostsType } = useContext(TagScreenContext);

  const { apiResult, requestApi } = useGetPosts();
  // const [posts, setPosts] = useState<PostType[]>([]);
  const [mapPosts, setMapPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [location, setLocation] = useState('')
  //  -----------
  const [isRefreshingGridViewPosts, setIsRefreshingGridViewPosts] = useState(false);
  const [isLoadingGridViewPosts, setIsLoadingGridViewPosts] = useState(false);
  const [currentGridViewPostsPage, setCurrentGridViewPostsPage] = useState(0);
  const [hasMoreGridViewPosts, setHasMoreGridViewPosts] = useState(true);
  const [isLoadingMapViewPosts, setIsLoadingMapViewPosts] = useState(false);
  const [mapViewPostsFetchingStatus, setMapViewPostsFetchingStatus] = useState(''); // 'idle', 'loading', 'success', 'error

  const onCreateNewPostButtonPress = () => {
    console.log('create new post');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // navigation?.navigate('CreateNewPostStackNavigator', { spaceAndUserRelationship });
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={() => null}
        screenOptions={screenOptions}
        initialRouteName={viewPostsType === 'grid' ? 'GridView' : 'MapView'}
      >
        <Tab.Screen name='GridView'>{(props) => <GridView />}</Tab.Screen>
        {/* <Tab.Screen name='MapView'>{(props) => <MapPosts tag={tag} {...props} />}</Tab.Screen> */}
        <Tab.Screen name='MapView'>{() => <MapPosts />}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};
