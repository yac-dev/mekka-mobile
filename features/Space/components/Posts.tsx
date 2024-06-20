import React, { useEffect, useContext, useState, useRef } from 'react';
import { View, Text, AppState } from 'react-native';
import { GlobalContext } from '../../../providers';
import { CurrentSpaceContext } from '../../../providers';
import { useGetPosts } from '../hooks';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import * as Haptics from 'expo-haptics';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { GridView, RegionView } from '.';
import { MapPosts } from './MapPosts';
import { TagType } from '../../../types';
import { viewPostsTypeAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
// postsに関してはそこまでnestするとも思えないからまあいいかな。。
// tagはrouteでもらってくる想定。
const PostsTab = createMaterialTopTabNavigator();
const screenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
};

type IPosts = {
  tag: TagType;
};

// 次は、gridとmapのnavigationを実装しようか。
// ここら辺のatomも作ろうか。。。
// 結局、apiの結果をcacheしたいから、やっぱ、recoil必要だね。
export const Posts: React.FC<IPosts> = ({ tag }) => {
  const viewPostsType = useRecoilValue(viewPostsTypeAtom);
  const { appState } = useContext(GlobalContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);

  // このscreen loadedをな。。。

  // const onRegionChangeComplete = (region: Region) => {
  //   setRegion(region);
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // };

  const onCurrentPostIndexChange = (index: number) => {
    setCurrentPostIndex(index);
  };

  // useEffect(() => {
  //   requestGetPostsApi({ tagId: tag._id, currentPage: 0 });
  // }, []);

  // 最初のfetchだけ近づけるようにしてーよな。。。

  // useEffect(() => {
  //   requestGetPostsByTagIdAndRegion({ tagId: tag._id, region });
  // }, [region]);

  // useEffect(() => {
  //   const appStateListener = AppState.addEventListener('change', (nextAppState) => {
  //     if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //       console.log('App has come to the foreground!');
  //       requestRefresh({ tagId: tag._id, currentPage: 0 });
  //       console.log('refreshig');
  //     } else if (appState === 'active' && nextAppState === 'inactive') {
  //       // console.log('Became inactive...');
  //     }
  //     // console.log('Next AppState is: ', nextAppState);
  //   });

  //   return () => {
  //     appStateListener.remove();
  //   };
  // }, [appState]);

  // useEffect(() => {
  //   if (
  //     getPostsByTagIdAndRegionResult.status === 'success' &&
  //     getPostsByTagIdAndRegionResult.data?.posts.length &&
  //     !mapPostInitialFetchCompleted
  //   ) {
  //     setMapPostInitialFetchCompleted(true);
  //     const firstPost = getPostsByTagIdAndRegionResult.data?.posts[0];
  //     const newLat = firstPost.location.coordinates[1] - 0.0065;
  //     mapRef.current?.animateToRegion({
  //       latitude: newLat,
  //       longitude: firstPost.location.coordinates[0],
  //       latitudeDelta: 50.0922,
  //       longitudeDelta: 50.0421,
  //       // latitudeDelta: 0.0322,
  //       // longitudeDelta: 0.0221, // これだとだいぶ近いかな。。。
  //     });
  //   }
  // }, [getPostsByTagIdAndRegionResult]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <PostsTab.Navigator
        tabBar={() => null}
        screenOptions={screenOptions}
        initialRouteName={viewPostsType === 'grid' ? 'GridView' : 'MapView'}
      >
        <PostsTab.Screen name='GridView'>{() => <GridView tag={tag} />}</PostsTab.Screen>
        <PostsTab.Screen name='RegionView'>{() => <RegionView tag={tag} />}</PostsTab.Screen>
      </PostsTab.Navigator>
    </View>
  );
};
