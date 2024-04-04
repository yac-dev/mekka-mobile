import React from 'react';
import { View, Text } from 'react-native';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';

type PostsProps = {
  posts: PostType[];
};

export const Posts = ({ posts }) => {
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

  const renderItem = (post, index) => {
    return <ContentThumbnail post={post} index={index} />;
  };

  if (posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <FlashList
          numColumns={3}
          data={posts}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          // refreshControl={<RefreshControl colors={['red']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />}
          removeClippedSubviews
          estimatedItemSize={125}
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
