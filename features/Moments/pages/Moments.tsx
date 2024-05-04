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
import { useNavigation } from '@react-navigation/native';
import { MomentsStackNavigatorProps } from '../../../navigations';
import * as Haptics from 'expo-haptics';
import { useCreatePost } from '../../CreateNewPost/hooks';
import { SpaceRootContext } from '../../Space/providers/SpaceRootProvider';

const ItemWidth = Dimensions.get('window').width / 3;

// moment postも、今後要件変わるかもしれないし、これをまんま使うのはなんか嫌だな。
// まあ、早く終わらせたい意味では使い回すのもいんだけどね。。。
export const Moments = () => {
  const momentsStackNavigation = useNavigation<MomentsStackNavigatorProps>();
  const { apiResult, requestApi, addCreatedMoment } = useGetMomentPosts();
  const { createMomentResult, requestCreateMoment } = useContext(SpaceRootContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  // propsで来てたら、useGetMomentsPosts使う感じだよな。。。
  // ていうか、apiだけではないことを考えるとさ、命名を変えた方がいいよな。。。シンプルにusePostsでいいよな。。。
  useEffect(() => {
    if (createMomentResult.status === 'success') {
      addCreatedMoment(createMomentResult.data?.post);
    }
  }, [createMomentResult.status]);

  // useEffect(() => {
  //   if(createMomentResult.status === 'success'){
  //     // ここで、
  //   }
  // },[createMomentResult.status])

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  }

  // うん、やっぱあれだわ、spaceRootの中に無かったからな。。。。ここがめんどいところだな。。。
  const onCreateMomentPress = () => {
    momentsStackNavigation.navigate('CreateNewPostStackNavigator', { screen: 'MomentPost' });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

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
        <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: 50 }}>
          {/* <ExpoImage
            source={require('../../../assets/forApp/ghost-disappointed.png')}
            style={{ width: 25, height: 25, marginRight: 20 }}
            tintColor='white'
          /> */}
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: 50,
              marginBottom: 20,
              fontWeight: 'bold',
              fontSize: 23,
            }}
          >
            No moments now...
          </Text>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Every moment posts in {currentSpace.name}
            {'\n'}will disappear in{' '}
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
            </Text>
            .
          </Text>
        </View>
      )}
      <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
        onButtonPress={() => onCreateMomentPress()}
        isPressDisabled={createMomentResult.status === 'loading' ? true : false}
        hasShadow
      >
        {createMomentResult.status === 'loading' ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <VectorIcon.II name='add' size={32} color={'white'} />
        )}
      </AppButton.Icon>
    </View>
  );
};
