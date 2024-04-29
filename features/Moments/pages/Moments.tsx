import React, { useContext, useCallback, useEffect } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { AppButton, PostThumbnail } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useGetMomentPosts } from '../hooks/useGetMomentPosts';
import { CurrentSpaceContext } from '../../../providers';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';

export const Moments = () => {
  const { apiResult, requestApi } = useGetMomentPosts();
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id, date: new Date() });
  }, []);

  // const loadMoreItem = () => {
  //   if (hasMoreItems) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const renderLoader = () => {
  //   if (hasMoreItems) {
  //     return isLoading ? (
  //       <View>
  //         <ActivityIndicator />
  //       </View>
  //     ) : null;
  //   } else {
  //     return null;
  //   }
  // };

  const onPostThumbnailPress = () => {};

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPostThumbnailPress} />;
  };

  if (apiResult.status === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 20, color: 'white' }}>Moments</Text>
      {!apiResult.data?.posts.length && (
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No Moments</Text>
      )}
      {apiResult.data?.posts.length && (
        <FlashList
          numColumns={3}
          data={apiResult.data?.posts}
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
      )}
      <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
        onButtonPress={() => console.log('post moments')}
        isPressDisabled={false} // createのstatusをここに足す感じだな。
        hasShadow
      >
        <VectorIcon.II name='add' size={32} color={'white'} />
        {/* {createNewPostResult.isCreating ? (
          <ActivityIndicator size={'small'} />
          ) : (
          <Ionicons name='add' size={32} color={'black'} />
        )} */}
      </AppButton.Icon>
    </View>
  );
};
