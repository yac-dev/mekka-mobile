import React, { useContext, useCallback, useEffect } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MomentsContext } from '../contexts/MomentsContext';
import MomentThumbnail from '../components/MomentThumbnail';
import { AppButton, PostThumbnail } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useGetMomentPosts } from '../hooks/useGetMomentPosts';
import { CurrentSpaceContext } from '../../../providers';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { Image as ExpoImage } from 'expo-image';

const ItemWidth = Dimensions.get('window').width / 3;

export const Moments = () => {
  const { apiResult, requestApi } = useGetMomentPosts();
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  console.log('res', apiResult);

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
      {/* {!apiResult.data?.posts.length && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, alignSelf: 'center' }}>
          <ExpoImage
            source={require('../../../assets/forApp/ghost-disappointed.png')}
            style={{ width: 25, height: 25, marginRight: 20 }}
            tintColor='white'
          />
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>No Moments now...</Text>
        </View>
      )} でたーこいつ */}
      {apiResult.data?.posts.length ? (
        <FlashList
          numColumns={3}
          data={apiResult.data?.posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          estimatedItemSize={ItemWidth}
          // refreshControl={<RefreshControl colors={['red']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />}
          // onEndReached={loadMoreItem}
          // ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, alignSelf: 'center' }}>
          <ExpoImage
            source={require('../../../assets/forApp/ghost-disappointed.png')}
            style={{ width: 25, height: 25, marginRight: 20 }}
            tintColor='white'
          />
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>No Moments now...</Text>
        </View>
      )}
      {/* <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
        onButtonPress={() => console.log('post moments')}
        isPressDisabled={false} // createのstatusをここに足す感じだな。
        hasShadow
      >
        <VectorIcon.II name='add' size={32} color={'white'} />
      </AppButton.Icon> */}
    </View>
  );
};
