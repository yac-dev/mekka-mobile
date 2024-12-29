import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { PostsByGrid, PostsByRegion } from '.';

type IPosts = {
  userId: string;
  viewPostsType: 'grid' | 'region';
};

export const Posts: React.FC<IPosts> = ({ userId, viewPostsType }) => {
  const pagerViewRef = useRef<PagerView>(null);

  useEffect(() => {
    pagerViewRef.current?.setPageWithoutAnimation(viewPostsType === 'grid' ? 0 : 1);
  }, [viewPostsType]);

  return (
    // <View style={styles.container}>
    <PagerView
      style={styles.pagerView}
      initialPage={viewPostsType === 'grid' ? 0 : 1}
      scrollEnabled={false}
      ref={pagerViewRef}
      // animationEnabled={false}
    >
      <PostsByGrid userId={userId} />
      <PostsByRegion userId={userId} />
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pagerView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
