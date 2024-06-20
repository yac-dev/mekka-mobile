import React, { useEffect, useContext, useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, AppState, StyleSheet } from 'react-native';
import { GlobalContext } from '../../../providers';
import { CurrentSpaceContext } from '../../../providers';
import { useGetPosts } from '../hooks';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import * as Haptics from 'expo-haptics';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { GridView, RegionView } from '.';
import { MapPosts } from './MapPosts';
import { SpaceType, TagType } from '../../../types';
import { viewPostsTypeAtomFamily } from '../atoms';
import { useRecoilValue } from 'recoil';
import PagerView from 'react-native-pager-view';
// postsに関してはそこまでnestするとも思えないからまあいいかな。。
// tagはrouteでもらってくる想定。
const PostsTab = createMaterialTopTabNavigator();
const screenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
};

type IPosts = {
  space: SpaceType;
  tag: TagType;
};

type TabType = {
  key: string;
  title: string;
};

const tabs: TabType[] = [
  { key: 'gridView', title: 'GridView' },
  { key: 'regionView', title: 'RegionView' },
];

// 次は、gridとmapのnavigationを実装しようか。
// ここら辺のatomも作ろうか。。。
// 結局、apiの結果をcacheしたいから、やっぱ、recoil必要だね。
export const Posts: React.FC<IPosts> = ({ space, tag }) => {
  const viewPostsType = useRecoilValue(viewPostsTypeAtomFamily(space._id));
  const pagerViewRef = useRef<PagerView>(null);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
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
  //  viewPostのtypeが変わったらjumpすればいいのかね。多分、pagerViewを使った方がいい絶対。

  useEffect(() => {
    pagerViewRef.current?.setPage(viewPostsType === 'grid' ? 0 : 1);
  }, [viewPostsType]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <PagerView
        style={styles.pagerView}
        initialPage={viewPostsType === 'grid' ? 0 : 1}
        scrollEnabled={false}
        ref={pagerViewRef}
      >
        <GridView tag={tag} />
        <RegionView tag={tag} />
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
