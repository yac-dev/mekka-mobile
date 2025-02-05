import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getUserById, queryKeys } from '../../../query';
import { Image as ExpoImage } from 'expo-image';
import PagerView from 'react-native-pager-view';
import { PostsByGrid } from './PostsByGrid';
import { PostsByRegion } from './PostsByRegion';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';

type IHeader = {
  userId: string;
  viewPostsType: 'grid' | 'region';
  customStyle?: StyleProp<ViewStyle>;
};

const avatarWidth = 42;

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
    <View style={styles.container}>
      <View style={[styles.header, customStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.leftContainer}>
            <View
              style={{
                backgroundColor: 'rgb(70,70,70)',
                justifyContent: 'center',
                alignItems: 'center',
                width: avatarWidth,
                height: avatarWidth,
                borderRadius: avatarWidth / 2,
                marginBottom: 10,
              }}
            >
              {data.user.avatar ? (
                <ExpoImage source={data.user.avatar} style={styles.avatar} />
              ) : (
                <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                  {data.user.name.charAt(0)}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.name}>{data.user.name}</Text>
            {/* <Text style={styles.uniqueName}>@johndoe</Text> */}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.followButton} activeOpacity={0.7}>
            <VectorIcon.II name='person-add' size={15} color='white' style={{ marginRight: 5 }} />
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
          <AppButton.Icon
            onButtonPress={() => {}}
            customStyle={{
              width: 35,
              height: 35,
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 100,
            }}
            hasShadow={false}
          >
            <VectorIcon.MCI name='dots-horizontal' size={15} style={{ color: 'white' }} />
          </AppButton.Icon>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 10,
  },
  leftContainer: {
    width: 42,
    height: 42,
    borderRadius: 50,
    marginRight: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {},
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  uniqueName: {
    fontSize: 14,
    color: 'rgb(150,150,150)',
  },
  followButton: {
    backgroundColor: 'rgb(50,50,50)',
    padding: 10,
    borderRadius: 100,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagerView: {
    flex: 1,
    height: 2000,
    width: '100%',
  },
});
