import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsByUserId, queryKeys } from '../../../query';
import { FlashList } from '@shopify/flash-list';
import { PostType } from '../../../types';
import { PostThumbnail } from '../../../components/PostThumbnail';
import { currentSpaceAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { Header } from './Header';
import { useNavigation } from '@react-navigation/native';
import { UserStackNavigatorProps } from '../navigations';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';
import { Image as ExpoImage } from 'expo-image';
import { useQueryClient } from '@tanstack/react-query';

type IPostsByGrid = {
  userId: string;
};

const avatarWidth = 62;

export const PostsByGrid: React.FC<IPostsByGrid> = ({ userId }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const userStackNavigation = useNavigation<UserStackNavigatorProps>();
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

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData([queryKeys.userById, userId]);

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
      <View style={{ height: 65, backgroundColor: 'transparent' }} />
      <View
        style={{
          paddingBottom: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
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
                  marginBottom: 5,
                }}
              >
                {userData?.user.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'rgb(150,150,150)', fontSize: 12, marginRight: 15 }}>Following</Text>
                <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Followers</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.7}>
              <VectorIcon.II name='person-add' size={15} color='white' style={{ marginRight: 5 }} />
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
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
