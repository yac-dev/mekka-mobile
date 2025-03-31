import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { useRecoilState } from 'recoil';
import { authAtom, currentSpaceAtom, currentTagAtom } from '../../../recoil';
import axios from 'axios';
import Config from 'react-native-config';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createFollowingRelationship,
  deleteFollowingRelationship,
  getPostsByTagId,
  getPostsByUserId,
  getUserById,
  mutationKeys,
  queryKeys,
} from '../../../query';

import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { Posts } from '../components';
import { Image as ExpoImage } from 'expo-image';
import { TabView } from 'react-native-tab-view';
import { DeleteFollowingRelationshipInputType } from '../../../query/types';
import { GetFollowingUsersByUserIdOutputType } from '../../../query/types';
import { CreateFollowingRelationshipInputType, GetUserByIdOutputType } from '../../../query/types';
import { Moments } from '../components/Moments';
import { Activities } from '../components/Activities';
import {} from '../../../query/types';
const HEADER_HEIGHT = 80;
const TAB_BAR_HEIGHT = 50;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

type IUser = {
  userId: string;
};

Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
// ここでuserのpostを引っ張ってくるところまでをまずやりたいね。

export const User: React.FC<IUser> = ({ userId }) => {
  const [auth] = useRecoilState(authAtom);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    // { key: 'moments', title: 'Moments' },
    { key: 'activities', title: 'Activities' },
    // { key: 'about', title: 'About' },　// NOTE: 後々に実装したい。。。
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const queryClient = useQueryClient();
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: [queryKeys.userById, userId],
    queryFn: () => getUserById({ userId }),
  });

  const followingUsersData = queryClient.getQueryData<GetFollowingUsersByUserIdOutputType>([
    queryKeys.followingUsers,
    auth._id,
  ]);

  const { mutate: createFollowingRelationshipMutate, status: createFollowingRelationshipStatus } = useMutation({
    mutationKey: [mutationKeys.createFollowingRelationship],
    mutationFn: (input: CreateFollowingRelationshipInputType) => createFollowingRelationship(input),
    onSuccess: (data) => {
      // これ、なかったらなかったで、作らないといけないよね。。。spaceのkeyを。。。
      queryClient.setQueryData(
        [queryKeys.followingUsers, auth._id],
        (previous: GetFollowingUsersByUserIdOutputType) => {
          if (!previous.followingUsers[currentSpace._id]) {
            previous.followingUsers[currentSpace._id] = [];
          }
          const newFollowingUsers = [
            ...previous.followingUsers[currentSpace._id],
            {
              _id: userData?.user._id,
              name: userData?.user.name,
              email: userData?.user.email,
              avatar: userData?.user.avatar,
            },
          ];
          return {
            ...previous,
            followingUsers: {
              ...previous.followingUsers,
              [currentSpace._id]: newFollowingUsers,
            },
          };
        }
      );
    },
  });

  const { mutate: deleteFollowingRelationshipMutate, status: deleteFollowingRelationshipStatus } = useMutation({
    mutationKey: [mutationKeys.deleteFollowingRelationship],
    mutationFn: (input: DeleteFollowingRelationshipInputType) => deleteFollowingRelationship(input),
    onSuccess: () => {
      queryClient.setQueryData(
        [queryKeys.followingUsers, auth._id],
        (previous: GetFollowingUsersByUserIdOutputType) => {
          const newFollowingUsers = previous.followingUsers[currentSpace._id].filter((user) => user._id !== userId);
          return {
            ...previous,
            followingUsers: {
              ...previous.followingUsers,
              [currentSpace._id]: newFollowingUsers,
            },
          };
        }
      );
    },
  });

  const handleFollowingRelationship = () => {
    if (
      followingUsersData?.followingUsers[currentSpace._id] &&
      followingUsersData?.followingUsers[currentSpace._id].find((user) => user._id === userId)
    ) {
      deleteFollowingRelationshipMutate({
        followerId: auth._id,
        followeeId: userId,
        spaceId: currentSpace._id,
      });
    } else {
      createFollowingRelationshipMutate({
        followerId: auth._id,
        followeeId: userId,
        spaceId: currentSpace._id,
      });
    }
  };

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);

  const firstRef: any = useRef();
  const secondRef: any = useRef();
  const thirdRef: any = useRef();
  const fourthRef: any = useRef();
  const onMomentumScrollBegin = () => {
    isValidTabPress.current = true;
  };

  const syncOffset = (scene: any, y: any) => {
    console.log(scene, y);
    if (scene === 'first') {
      secondRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    if (scene === 'second') {
      firstRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    isValidTabPress.current = false;
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'posts':
        return (
          <Posts
            userId={userId}
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      // case 'moments':
      //   return (
      //     <Moments
      //       userId={userId}
      //       position={position}
      //       syncOffset={syncOffset}
      //       secondRef={secondRef}
      //       onMomentumScrollBegin={onMomentumScrollBegin}
      //     />
      //   );
      case 'activities':
        return (
          <Activities
            thirdRef={thirdRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            position={position}
            syncOffset={syncOffset}
          />
        );
      default:
        return null;
    }
  };
  const renderTab = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: currentIndex === index ? 'white' : null,
        }}
        activeOpacity={0.7}
        onPress={() => setCurrentIndex(index)}
      >
        <Text
          style={{ color: currentIndex === index ? 'white' : 'rgb(100,100,100)', fontSize: 17, fontWeight: 'bold' }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  function renderTabBar(props: any) {
    const translateY = position.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }, { transform: [{ translateY }] }]}
      >
        <View
          style={{
            height: HEADER_HEIGHT,
            paddingHorizontal: 15,
            paddingTop: 15,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: 'rgb(70,70,70)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 50 / 2,
                  marginRight: 20,
                }}
              >
                {userData?.user.avatar ? (
                  <View style={{ width: '100%', height: '100%', borderRadius: 50 / 2 }}>
                    <ExpoImage
                      style={{ width: '100%', height: '100%', borderRadius: 50 / 2 }}
                      source={{ uri: userData?.user.avatar }}
                      contentFit='cover'
                    />
                  </View>
                ) : (
                  <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', fontWeight: 'bold' }}>
                    {userData?.user.name.slice(0, 2).toUpperCase()}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'column', gap: 5 }}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{userData?.user.name}</Text>
              </View>
            </View>
            {currentSpace.isPublic && currentSpace.isFollowAvailable ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {createFollowingRelationshipStatus === 'pending' || deleteFollowingRelationshipStatus === 'pending' ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    style={styles.followButton}
                    activeOpacity={0.7}
                    onPress={() => {
                      handleFollowingRelationship();
                    }}
                  >
                    <Text style={styles.followButtonText}>
                      {followingUsersData?.followingUsers[currentSpace._id] &&
                      followingUsersData?.followingUsers[currentSpace._id].find((user) => user._id === userId)
                        ? 'Following'
                        : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            height: TAB_BAR_HEIGHT,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ height: 35 }}>
            <FlatList
              horizontal
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              data={routes}
              renderItem={renderTab}
              keyExtractor={(item, index) => item.key}
            />
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TabView
        lazy
        swipeEnabled={false}
        navigationState={{ index: currentIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setCurrentIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
});
