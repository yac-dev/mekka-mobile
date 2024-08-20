import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, SpaceType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useNavigation } from '@react-navigation/native';
import { getPostsByTagIdAtomFamily } from '../atoms';
import { useRecoilValue } from 'recoil';
import { useGetPostsByTagId } from '../hooks';
import { SpaceStackNavigatorProps } from '../../../navigations/SpaceStackNavigator';
import { tagScreenOpenedAtomFamily } from '../atoms';
import { createPostResultAtomFamily } from '../../../api/atoms';
import { useRecoilState } from 'recoil';
import { showMessage } from 'react-native-flash-message';
import { CurrentTagContext } from '../../../providers';

type IGridView = {
  space: SpaceType;
  tag: TagType;
};

// tagごとにpostsのcomponentを表示するわけだが、、、

export const GridView: React.FC<IGridView> = ({ space, tag }) => {
  const { currentTag } = useContext(CurrentTagContext);
  const { requestGetPostsByTagId, requestMorePostsByTagId, addCreatedPost } = useGetPostsByTagId(currentTag._id);
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));
  const tagScreenOpened = useRecoilValue(tagScreenOpenedAtomFamily(tag._id));
  const [createPostResult, setCreatePostResult] = useRecoilState(createPostResultAtomFamily(space._id));

  useEffect(() => {
    // if (getPostsByTagIdResult.status === 'idle') {
    requestGetPostsByTagId({ tagId: tag._id, currentPage: 0 });
    // }
  }, [currentTag]);

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
      params: {
        screen: 'ViewPost',
        params: { posts: getPostsByTagIdResult.data.posts, index: index },
      },
    });
  };

  const renderFooter = () => {
    if (getPostsByTagIdResult.status === 'paging') {
      return <ActivityIndicator />;
    }
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (getPostsByTagIdResult.status === 'loading' && !getPostsByTagIdResult.data?.posts.length) {
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
        estimatedItemSize={1000}
        onEndReached={() => {
          getPostsByTagIdResult.data.hasNextPage &&
            requestMorePostsByTagId({ tagId: tag._id, currentPage: getPostsByTagIdResult.data.currentPage });
        }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
};
