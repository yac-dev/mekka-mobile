import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { TagScreenContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { TagScreenStackNavigatorProps } from '../../../navigations';
import { getPostsByTagIdAtomFamily } from '../atoms';
// tag Idが必要になるからな。そこの管理もすげーめんどいな。。。
import { useRecoilValue } from 'recoil';
import { useGetPostsByTagId } from '../hooks';

type IGridView = {
  tag: TagType;
};

// tagごとにpostsのcomponentを表示するわけだが、、、

export const GridView: React.FC<IGridView> = ({ tag }) => {
  const navigation = useNavigation<TagScreenStackNavigatorProps>();
  const { requestGetPostsByTagId } = useGetPostsByTagId(tag._id);

  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));

  // const renderLoader = () => {
  //   if (getPostsApiResult.status === 'paging') {
  //     return (
  //       <View style={{ paddingTop: 30, alignItems: 'center' }}>
  //         <ActivityIndicator />
  //       </View>
  //     );
  //   }
  // };

  useEffect(() => {
    if (getPostsByTagIdResult.status !== 'success') {
      requestGetPostsByTagId({ tagId: tag._id, currentPage: 0 });
    }
  }, []);

  const onPressPostThumbnail = (post: PostType, index: number) => {
    // setCurrentPost(post);
    // onCurrentPostIndexChange(index);
    // navigation.navigate('ViewPostStackNavigator');
    console.log('press thumbnail');
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  // これ配列なのかよ。。。そういうdata構造かよ。。。どうしよう。。。
  if (getPostsByTagIdResult.status === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!getPostsByTagIdResult.data.posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts tagged by [tag name]</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        numColumns={3}
        data={getPostsByTagIdResult.data.posts}
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
      {/* {getPostsApiResult.status === 'refreshing' ? (
        <ActivityIndicator
          style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}
          size={'large'}
          color={'white'}
        />
      ) : null} */}
    </View>
  );
};
