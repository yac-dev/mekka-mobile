import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getUserById, queryKeys } from '../../../query';
import { Image as ExpoImage } from 'expo-image';
import PagerView from 'react-native-pager-view';
import { PostsByGrid } from './PostsByGrid';
import { PostsByRegion } from './PostsByRegion';

type IHeader = {
  userId: string;
  viewPostsType: 'grid' | 'region';
  customStyle?: StyleProp<ViewStyle>;
};

export const Header: React.FC<IHeader> = ({ userId, viewPostsType, customStyle }) => {
  const { data, status } = useQuery({
    queryKey: [queryKeys.userById, userId],
    queryFn: () => getUserById({ userId }),
  });

  // const pagerViewRef = useRef<PagerView>(null);

  // useEffect(() => {
  //   pagerViewRef.current?.setPage(viewPostsType === 'grid' ? 0 : 1);
  // }, [viewPostsType]);

  if (status === 'pending') {
    return <ActivityIndicator size='large' color='white' />;
  }

  return (
    <View style={[customStyle]}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <ExpoImage source={data.user.avatar} style={styles.avatar} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{data.user.name}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <PagerView
        style={styles.pagerView}
        initialPage={viewPostsType === 'grid' ? 0 : 1}
        scrollEnabled={false}
        ref={pagerViewRef}
      >
        <PostsByGrid userId={userId} />
        <PostsByRegion userId={userId} />
      </PagerView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 30,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  followButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  followButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagerView: {
    flex: 1,
    height: 2000,
    width: '100%',
  },
});
