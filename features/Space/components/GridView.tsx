import React, { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { TagScreenContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { TagScreenStackNavigatorProps } from '../../../navigations';

type GridViewProps = {};

export const GridView: React.FC<GridViewProps> = () => {
  const navigation = useNavigation<TagScreenStackNavigatorProps>();
  const { getPostsApiResult, setCurrentPost, onCurrentPostIndexChange, tag, addCreatedPost } =
    useContext(TagScreenContext);

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
      {getPostsApiResult.status === 'refreshing' ? (
        <ActivityIndicator
          style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}
          size={'large'}
          color={'white'}
        />
      ) : null}
    </View>
  );
};
