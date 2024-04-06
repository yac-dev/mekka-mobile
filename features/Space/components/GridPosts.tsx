import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useGetPosts } from '../hooks/useGetPosts';
import { SpaceRootContext } from '../providers/SpaceRootProvider';

type PostsProps = {
  tag: TagType;
};

export const GridPosts: React.FC<PostsProps> = ({ tag }) => {
  const { setCurrentPost } = useContext(SpaceRootContext);
  const { apiResult, requestApi, loadMore } = useGetPosts();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    requestApi({ tagId: tag._id, currentPage });
  }, []);

  console.log('posts -> ', apiResult.data?.posts);

  // const loadMoreItem = () => {
  //   if (hasMoreGridViewPosts) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // ここ、currentPage変えればいけるか多分。

  const renderLoader = () => {
    if (apiResult.status === 'paging') {
      return (
        <View style={{ paddingTop: 30, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  const onPressPostThumbnail = (post: PostType, index: number) => {
    setCurrentPost(post);
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (apiResult.status === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!apiResult.data?.posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts in this tag channel...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        numColumns={3}
        data={apiResult.data.posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={125}
        // refreshControl={<RefreshControl colors={['red']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />}
        // onEndReached={loadMoreItem}
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};
