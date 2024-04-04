import React from 'react';
import { View, Text } from 'react-native';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components';

type PostsProps = {
  posts: PostType[];
};

export const Posts: React.FC<PostsProps> = ({ posts }) => {
  // const renderLoader = () => {
  //   if (hasMoreGridViewPosts) {
  //     return isLoadingGridViewPosts ? (
  //       <View style={{ paddingTop: 30, alignItems: 'center' }}>
  //         <ActivityIndicator />
  //       </View>
  //     ) : null;
  //   } else {
  //     return <View style={{ paddingTop: 30 }}></View>;
  //   }
  // };

  const onPressPostThumbnail = (post: PostType, index: number) => {};

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <FlashList
          numColumns={3}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          estimatedItemSize={125}
          // refreshControl={<RefreshControl colors={['red']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />}
          // onEndReached={loadMoreItem}
          // ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts in this tag channel...</Text>
      </View>
    );
  }
};
