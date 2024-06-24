import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, SpaceType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { TagScreenContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { TagScreenStackNavigatorProps } from '../../../navigations';
import { getPostsByTagIdAtomFamily } from '../atoms';
// tag Idが必要になるからな。そこの管理もすげーめんどいな。。。
import { useRecoilValue } from 'recoil';
import { useGetPostsByTagId } from '../hooks';
import { HomeStackNavigatorProps } from '../../../navigations';
import { SpaceStackNavigatorProps } from '../../../navigations/SpaceStackNavigator';
import { tagScreenOpenedAtomFamily } from '../atoms';
import { createPostResultAtomFamily } from '../../../api/atoms';
import { useRecoilState } from 'recoil';
import { showMessage } from 'react-native-flash-message';

type IGridView = {
  space: SpaceType;
  tag: TagType;
};

// tagごとにpostsのcomponentを表示するわけだが、、、

export const GridView: React.FC<IGridView> = ({ space, tag }) => {
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const { requestGetPostsByTagId, addCreatedPost } = useGetPostsByTagId(tag._id);
  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));
  const tagScreenOpened = useRecoilValue(tagScreenOpenedAtomFamily(tag._id));
  const [createPostResult, setCreatePostResult] = useRecoilState(createPostResultAtomFamily(space._id));

  useEffect(() => {
    if (!tagScreenOpened) {
      requestGetPostsByTagId({ tagId: tag._id, currentPage: 0 });
    }
    if (tagScreenOpened) {
      console.log('already opend this tag screen');
      // NOTE: refreshを実装する。
    }
  }, [tagScreenOpened]);

  // そっか、毎回ここで足しちゃっているよね。。。これが問題になっている。

  useEffect(() => {
    if (createPostResult.status === 'loading') {
      showMessage({ type: 'info', message: 'Processing now...' });
    }
    if (createPostResult.status === 'success' && tagScreenOpened && createPostResult.data.addedTags.includes(tag._id)) {
      showMessage({ type: 'success', message: 'Your post has been processed successfully.' });
      addCreatedPost(createPostResult.data.post);
      setCreatePostResult({ status: 'idle', data: undefined });
      // 終わった後に初期に戻すくらいかな。。。
    }
  }, [createPostResult, tagScreenOpened]);

  // NOTE: 多分、indexではなくpostでいんじゃないかなー。view post側でpostの_idでloopすればいいだけだから。。。ただ、postの数が多い場合はllopが面倒くさいか。
  const onPressPostThumbnail = (post: PostType, index: number) => {
    spaceNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: { screen: 'ViewGridPost', params: { tag, currentPostIndex: index } },
    });
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (getPostsByTagIdResult.status === 'loading' && !getPostsByTagIdResult.data.posts.length) {
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
        contentContainerStyle={{ paddingBottom: 70 }}
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
