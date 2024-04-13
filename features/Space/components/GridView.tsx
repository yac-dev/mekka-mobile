import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useGetPosts } from '../hooks/useGetPosts';
import { SpaceRootContext } from '../providers/SpaceRootProvider';
import { ApiStatusType } from '../../../types';
import { TagScreenContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { TagScreenStackNavigatorProps } from '../../../navigations';

type GridViewProps = {};

export const GridView: React.FC<GridViewProps> = () => {
  // const { setCurrentPost } = useContext(SpaceRootContext);
  const navigation = useNavigation<TagScreenStackNavigatorProps>();
  const { getPostsApiResult, setCurrentPost, onCurrentPostIndexChange } = useContext(TagScreenContext);
  // const { apiResult, requestApi, loadMore } = useGetPosts();
  // const [currentPage, setCurrentPage] = useState<number>(0);

  // useEffect(() => {
  //   requestApi({ tagId: tag._id, currentPage });
  // }, []);

  // const loadMoreItem = () => {
  //   if (hasMoreGridViewPosts) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // ここ、currentPage変えればいけるか多分。
  // loadmoreも上から持ってくるとする。

  const renderLoader = () => {
    if (getPostsApiResult.status === 'paging') {
      return (
        <View style={{ paddingTop: 30, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  const onPressPostThumbnail = (post: PostType, index: number) => {
    setCurrentPost(post);
    onCurrentPostIndexChange(index);
    navigation.navigate('ViewPostStackNavigator');
    // setCurrentPost(post);
    // ここだとどうだろ、、
    // ここでnavigationだな。。。
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (getPostsApiResult.status === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!getPostsApiResult.data?.posts.length) {
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
        data={getPostsApiResult.data?.posts}
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
};
