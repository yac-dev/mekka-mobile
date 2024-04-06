import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Alert, Text, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { PostType, TagType } from '../types';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { CurrentTagContext } from '../providers/CurrentTagProvider';
import { useNavigation } from '@react-navigation/native';
import { SpaceRootStackNavigatorProp } from './SpaceRootStackNavigator';
import { GridPosts } from '../features/Space/components/GridPosts';
import { MapPosts } from '../features/Space/components/MapPosts';
import { ViewPostsTypeToggleButton } from '../features/Space/components/ViewPostsTypeToggleButtons';
import { useGetPosts } from '../features/Space/hooks/useGetPosts';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
// import TagViewStackNavigator from './TagViewStackNavigator';
// import MavViewStackNavigator from './MapViewStackNavigator';
import * as Haptics from 'expo-haptics';
import { Icons } from '../Icons/images';
// import { TagRootContext } from '../contexts/TagRootContext';
// import { GlobalContext } from '../contexts/GlobalContext';
// import { SpaceRootContext } from '../features';
// import { CurrentTagContext } from '../providers';

const Tab = createMaterialTopTabNavigator();

const screenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: false,
};

type PostsTopTabNavigatorProps = {
  tag: TagType;
};

export const PostsTopTabNavigator: React.FC<PostsTopTabNavigatorProps> = ({ tag }) => {
  const { viewPostsType } = useContext(SpaceRootContext);
  const { currentTag } = useContext(CurrentTagContext);

  const { apiResult, requestApi } = useGetPosts();
  const [posts, setPosts] = useState<PostType[]>([]);
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
        <Tab.Screen name='GridView'>{(props) => <GridPosts tag={tag} {...props} />}</Tab.Screen>
        <Tab.Screen name='MapView'>{(props) => <MapPosts tag={tag} {...props} />}</Tab.Screen>
      </Tab.Navigator>
      <AppButton.Icon
        addedStyle={{ position: 'absolute', bottom: 50, right: 20 }}
        onButtonPress={onCreateNewPostButtonPress}
        isPressDisabled={false} // createのstatusをここに足す感じだな。
        hasShadow
      >
        <VectorIcon.II name='add' size={32} color={'black'} />
        {/* {createNewPostResult.isCreating ? (
          <ActivityIndicator size={'small'} />
          ) : (
          <Ionicons name='add' size={32} color={'black'} />
        )} */}
      </AppButton.Icon>
      <ViewPostsTypeToggleButton />
    </View>
  );
};
