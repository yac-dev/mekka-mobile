import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Alert, Text, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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

const viewTypeObject = {
  grid: <MaterialCommunityIcons name='dots-grid' color='black' size={22} />,
  map: (
    <ExpoImage
      style={{ width: 22, height: 22 }}
      source={require('../assets/forApp/globe.png')}
      contentFit='contain'
      transition={1000}
      tintColor={'white'}
    />
  ),
  people: <MaterialCommunityIcons name='account-multiple' color='black' size={22} />,
};

type PostsTopTabNavigatorProps = {
  tag: TagType;
};

export const PostsTopTabNavigator: React.FC<PostsTopTabNavigatorProps> = ({ tag }) => {
  const navigation = useNavigation<SpaceRootStackNavigatorProp>();
  const { viewPostsType, setViewPostsType } = useContext(SpaceRootContext);
  const { currentTag } = useContext(CurrentTagContext);
  console.log('current tag -> ', currentTag);

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
        // toptab navigatorで表示させるが、tabはrenderしない。
        tabBar={() => null}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
          animationEnabled: false,
          height: 0,
          backgroundColor: 'transparent',
        })}
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
      <View
        style={{
          borderRadius: 30,
          backgroundColor: 'rgb(50,50,50)',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            marginRight: 15,
            padding: 5,
            backgroundColor: viewPostsType === 'grid' ? 'rgb(80,80,80)' : null,
            borderRadius: viewPostsType === 'grid' ? 12 : 0,
          }}
          onPress={() => {
            setViewPostsType('grid');
            navigation.navigate('SpaceBottomTabNavigator', {
              screen: 'TagsTopTabNavigator',
              params: { screen: `Tag_${currentTag._id}`, params: { screen: 'GridView' } },
            });
            // navigation.navigate('TagViewStackNavigator');
            // currentTagObject
            //         name: `SpaceTab_${tab.tag._id}`,
            // params: { screen: viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator' },
            // 'TagViewStackNavigator'
            // navigation.navigate({
            //   name: `SpaceTab_${currentTagObject.tag._id}`,
            //   params: { screen: 'TagViewStackNavigator' },
            // });
          }}
        >
          <MaterialCommunityIcons name='dots-grid' color='white' size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 7,
            backgroundColor: viewPostsType === 'map' ? 'rgb(80,80,80)' : null,
            borderRadius: viewPostsType === 'map' ? 12 : 0,
          }}
          // 'MavViewStackNavigator'
          onPress={() => {
            setViewPostsType('map');
            navigation.navigate('SpaceBottomTabNavigator', {
              screen: 'TagsTopTabNavigator',
              params: { screen: `Tag_${currentTag._id}`, params: { screen: 'MapView' } },
            });
            // navigation.navigate('MavViewStackNavigator');
            // navigation.navigate({
            //   name: `SpaceTab_${currentTagObject.tag._id}`,
            //   params: { screen: 'MavViewStackNavigator' },
            // });
          }}
        >
          <ExpoImage style={{ width: 25, height: 25 }} source={Icons.globe} contentFit='contain' tintColor={'white'} />
        </TouchableOpacity>
      </View>
    </View>
    // </TagRootContext.Provider>
  );
};
