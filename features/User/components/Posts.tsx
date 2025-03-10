import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import { PostsByGrid, PostsByRegion, ViewPostsTypeToggleButton } from '.';
import { getUserById } from '../../../query';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../query';

type IPosts = {
  userId: string;
  position: any;
  syncOffset: any;
  firstRef: any;
  onMomentumScrollBegin: () => void;
};

export const Posts: React.FC<IPosts> = ({ userId, position, syncOffset, firstRef, onMomentumScrollBegin }) => {
  const [viewPostsType, setViewPostsType] = useState<'grid' | 'region'>('grid');
  const { data, status } = useQuery({
    queryKey: [queryKeys.userById, userId],
    queryFn: () => getUserById({ userId }),
  });

  const onPostsTypeChangePress = (postsType: 'grid' | 'region') => {
    setViewPostsType(postsType);
  };
  const pagerViewRef = useRef<PagerView>(null);

  useEffect(() => {
    pagerViewRef.current?.setPageWithoutAnimation(viewPostsType === 'grid' ? 0 : 1);
  }, [viewPostsType]);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={viewPostsType === 'grid' ? 0 : 1}
        scrollEnabled={false}
        ref={pagerViewRef}
        // animationEnabled={false}
      >
        <PostsByGrid
          userId={userId}
          position={position}
          syncOffset={syncOffset}
          firstRef={firstRef}
          onMomentumScrollBegin={onMomentumScrollBegin}
        />
        <PostsByRegion
          userId={userId}
          position={position}
          syncOffset={syncOffset}
          firstRef={firstRef}
          onMomentumScrollBegin={onMomentumScrollBegin}
        />
      </PagerView>
      <ViewPostsTypeToggleButton
        viewPostsType={viewPostsType}
        onPostsTypeChangePress={onPostsTypeChangePress}
        position={position}
        firstRef={firstRef}
        onMomentumScrollBegin={onMomentumScrollBegin}
      />
    </View>
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
