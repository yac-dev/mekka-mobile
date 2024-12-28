import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
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

type IPostsByGrid = {
  userId: string;
};

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

  if (!data?.pages.flatMap((page) => page.posts).length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts tagged by </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        numColumns={3}
        data={data?.pages.flatMap((page) => page.posts)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={1000}
        onMomentumScrollEnd={() => {
          fetchNextPage();
        }}
        // scrollEnabled={false}
        ListHeaderComponent={
          <Header
            userId={userId}
            viewPostsType='grid'
            customStyle={{ backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 30, marginBottom: 20 }}
          />
        }
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
