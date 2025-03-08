import React from 'react';
import { View, Text, Image, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil/atoms';
import { getPostsByUserId } from '../../../query/queries';
import { queryKeys } from '../../../query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostType } from '../../../types';
import { PostThumbnail } from '../../../components';

const HEADER_HEIGHT = 140;
const TAB_BAR_HEIGHT = 50;

export const Grid = ({ position, syncOffset, firstRef, onMomentumScrollBegin, spaceId }: any) => {
  const [auth] = useRecoilState(authAtom);

  // このpostsByIdがなんかおかしいよね。。。？多分、keyの影響かも。。。？
  const {
    data,
    status: getPostsByUserIdStatus,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.postsByUserId, auth._id],
    queryFn: ({ pageParam = 0 }) => getPostsByUserId({ userId: auth._id, spaceId, currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });

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
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={() => null} />;
  };

  if (getPostsByUserIdStatus === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {!data?.pages.flatMap((page) => page.posts).length ? (
        <Animated.ScrollView
          ref={firstRef}
          scrollEventThrottle={1}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
            useNativeDriver: true,
          })}
          onMomentumScrollEnd={(e) => {
            syncOffset('posts', e.nativeEvent.contentOffset.y);
          }}
          style={{
            flex: 1,
            paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts found...</Text>
        </Animated.ScrollView>
      ) : (
        <Animated.FlatList
          ref={firstRef}
          scrollEventThrottle={1}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
            useNativeDriver: true,
          })}
          onMomentumScrollEnd={(e) => {
            syncOffset('posts', e.nativeEvent.contentOffset.y);
          }}
          numColumns={4}
          data={data?.pages.flatMap((page) => page.posts)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          onEndReached={() => {
            fetchNextPage();
          }}
          // onMomentumScrollEnd={() => {
          //   fetchNextPage();
          // }}
          // scrollEnabled={false}
          // ListHeaderComponent={<Header userId={userId} viewPostsType='grid' customStyle={{}} />}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.7}
          contentContainerStyle={{ paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT, paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
