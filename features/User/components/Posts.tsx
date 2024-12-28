import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { PostsByGrid, PostsByRegion } from '.';

type IPosts = {
  userId: string;
};

export const Posts: React.FC<IPosts> = ({ userId }) => {
  const pagerViewRef = useRef<PagerView>(null);
  return (
    // <View style={styles.container}>
    <PagerView style={styles.pagerView} initialPage={0} scrollEnabled={false} ref={pagerViewRef}>
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
