import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsByUserId, mutationKeys, queryKeys } from '../../../query';
import { FlashList } from '@shopify/flash-list';
import { PostType } from '../../../types';
import { PostThumbnail } from '../../../components/PostThumbnail';
import { authAtom, currentSpaceAtom } from '../../../recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Header } from './Header';
import { useNavigation } from '@react-navigation/native';
import { UserStackNavigatorProps } from '../navigations';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';
import { Image as ExpoImage } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { createFollowingRelationship, deleteFollowingRelationship } from '../../../query/mutations';
import {
  CreateFollowingRelationshipInputType,
  DeleteFollowingRelationshipInputType,
  GetFollowingUsersByUserIdOutputType,
} from '../../../query/types';

type IPostsByGrid = {
  userId: string;
};

const avatarWidth = 62;

export const PostsByGrid: React.FC<IPostsByGrid> = ({ userId }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);
  const userStackNavigation = useNavigation<UserStackNavigatorProps>();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData([queryKeys.userById, userId]);
  const followingUsersData = queryClient.getQueryData([queryKeys.followingUsers, auth._id]);

  console.log('followingUsersData', followingUsersData);

  const {
    data,
    status: getPostsByUserIdStatus,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.postsByUserId, userId],
    queryFn: ({ pageParam = 0 }) => getPostsByUserId({ userId, spaceId: currentSpace._id, currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });

  const { mutate: createFollowingRelationshipMutate, status: createFollowingRelationshipStatus } = useMutation({
    mutationKey: [mutationKeys.createFollowingRelationship],
    mutationFn: (input: CreateFollowingRelationshipInputType) => createFollowingRelationship(input),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [queryKeys.followingUsers, auth._id],
        (previous: GetFollowingUsersByUserIdOutputType) => {
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

  const scrollY = useRef(new Animated.Value(0)).current;

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  // useEffect(() => {
  //   userStackNavigation.setOptions({
  //     header: () => (
  //       <Animated.View style={[{ transform: [{ translateY: translateHeader }] }]}>
  //         <Animated.Text style={[{ opacity: opacityTitle }, , { transform: [{ translateY: translateTitle }] }]}>
  //           Cheap
  //         </Animated.Text>
  //       </Animated.View>
  //     ),
  //   });
  // }, [userStackNavigation, scrollY]);

  const onPressPostThumbnail = (post: PostType, index: number) => {
    userStackNavigation.navigate('ViewPostStackNavigator', {
      screen: 'ViewPost',
      params: { posts: data?.pages.flatMap((page) => page.posts), index: index },
    });
  };

  // next pageがなければもうfetch nextしたくないよね。
  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 40 }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  const handleFollowingRelationship = () => {
    if (followingUsersData.followingUsers[currentSpace._id].find((user) => user._id === userId)) {
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

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (getPostsByUserIdStatus === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 45, backgroundColor: 'transparent' }} />
      <View
        style={{
          paddingBottom: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'rgb(70,70,70)',
                justifyContent: 'center',
                alignItems: 'center',
                width: avatarWidth,
                height: avatarWidth,
                borderRadius: avatarWidth / 2,
                marginRight: 15,
              }}
            >
              {userData?.user.avatar ? (
                <ExpoImage source={userData?.user.avatar} style={styles.avatar} />
              ) : (
                <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                  {userData?.user.name.slice(0, 2).toUpperCase()}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                  // marginBottom: 5,
                }}
              >
                {userData?.user.name}
              </Text>
              {/* NOTE: followingRelのstats実装してからやる。 */}
              {/* {currentSpace.isPublic && currentSpace.isFollowAvailable ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 12, marginRight: 15 }}>Following</Text>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Followers</Text>
                </View>
              ) : null} */}
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
                    {followingUsersData.followingUsers[currentSpace._id].find((user) => user._id === userId)
                      ? 'Following'
                      : 'Follow'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </View>
      </View>
      {!data?.pages.flatMap((page) => page.posts).length ? (
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts found...</Text>
      ) : (
        <FlashList
          numColumns={4}
          data={data?.pages.flatMap((page) => page.posts)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          estimatedItemSize={1000}
          onMomentumScrollEnd={() => {
            fetchNextPage();
          }}
          // scrollEnabled={false}
          // ListHeaderComponent={<Header userId={userId} viewPostsType='grid' customStyle={{}} />}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.7}
          contentContainerStyle={{ paddingBottom: 100 }}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          //   useNativeDriver: true,
          // })}
          // scrollEventThrottle={16}
        />
      )}
    </View>
  );
};

// const Header = () => {
//   return (
//     <View style={styles.container}>
//       <View style={[styles.header]}>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <View style={styles.leftContainer}>
//             <View
//               style={{
//                 backgroundColor: 'rgb(70,70,70)',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: avatarWidth,
//                 height: avatarWidth,
//                 borderRadius: avatarWidth / 2,
//                 marginBottom: 10,
//               }}
//             >
//               {data.user.avatar ? (
//                 <ExpoImage source={data.user.avatar} style={styles.avatar} />
//               ) : (
//                 <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
//                   {data.user.name.slice(0, 2).toUpperCase()}
//                 </Text>
//               )}
//             </View>
//           </View>
//           <View style={styles.rightContainer}>
//             {/* <Text style={styles.name}>{data.user.name}</Text> */}
//             {/* <Text style={styles.uniqueName}>@johndoe</Text> */}
//           </View>
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TouchableOpacity style={styles.followButton} activeOpacity={0.7}>
//             <VectorIcon.II name='person-add' size={15} color='white' style={{ marginRight: 5 }} />
//             <Text style={styles.followButtonText}>Follow</Text>
//           </TouchableOpacity>
//           <AppButton.Icon
//             onButtonPress={() => {}}
//             customStyle={{
//               width: 35,
//               height: 35,
//               backgroundColor: 'rgb(50,50,50)',
//               borderRadius: 100,
//             }}
//             hasShadow={false}
//           >
//             <VectorIcon.MCI name='dots-horizontal' size={15} style={{ color: 'white' }} />
//           </AppButton.Icon>
//         </View>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  leftContainer: {
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
