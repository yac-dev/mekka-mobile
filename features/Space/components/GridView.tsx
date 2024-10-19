import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, SpaceType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useNavigation } from '@react-navigation/native';
import { getPostsByTagIdAtomFamily } from '../atoms';
import { useRecoilValue } from 'recoil';
import { useGetPostsByTagId } from '../hooks';
import { SpaceStackNavigatorProps } from '../navigations/SpaceStackNavigator';
import { tagScreenOpenedAtomFamily } from '../atoms';
import { createPostResultAtomFamily } from '../../../api/atoms';
import { useRecoilState } from 'recoil';
import { showMessage } from 'react-native-flash-message';
import { currentTagAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { getPostsByTagId, queryKeys } from '../../../query';

type IGridView = {
  space: SpaceType;
  tag: TagType;
};

// tagごとにpostsのcomponentを表示するわけだが、、、
// regionPostの方も直さないとはいけないけど、こっちはそこまでやる必要もないか。。。
export const GridView: React.FC<IGridView> = ({ space, tag }) => {
  const [currentTag] = useRecoilState(currentTagAtom);
  const { requestGetPostsByTagId, requestMorePostsByTagId, addCreatedPost } = useGetPostsByTagId(currentTag._id);
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));
  const tagScreenOpened = useRecoilValue(tagScreenOpenedAtomFamily(tag._id));
  const [createPostResult, setCreatePostResult] = useRecoilState(createPostResultAtomFamily(space._id));

  const { data, isLoading: isGetPostsByTagIdLoading } = useQuery({
    queryKey: [queryKeys.postsByTagId, currentTag._id],
    queryFn: () => getPostsByTagId({ tagId: currentTag._id, currentPage: 0 }),
  });

  // useEffect(() => {
  //   if (createPostResult.status === 'loading') {
  //     showMessage({ type: 'info', message: 'Processing now...' });
  //   }
  //   if (createPostResult.status === 'success' && tagScreenOpened && createPostResult.data.addedTags.includes(tag._id)) {
  //     showMessage({ type: 'success', message: 'Your post has been processed successfully.' });
  //     addCreatedPost(createPostResult.data.post);
  //     setCreatePostResult({ status: 'idle', data: undefined });
  //     // 終わった後に初期に戻すくらいかな。。。
  //   }
  // }, [createPostResult, tagScreenOpened]);

  // NOTE: 多分、indexではなくpostでいんじゃないかなー。view post側でpostの_idでloopすればいいだけだから。。。ただ、postの数が多い場合はllopが面倒くさいか。
  const onPressPostThumbnail = (post: PostType, index: number) => {
    spaceNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: { posts: data.posts, index: index },
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

  if (isGetPostsByTagIdLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data?.posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
          No posts tagged by ${currentTag.name}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        numColumns={3}
        data={data?.posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={1000}
        // onEndReached={() => {
        //   getPostsByTagIdResult.data.hasNextPage &&
        //     requestMorePostsByTagId({ tagId: tag._id, currentPage: getPostsByTagIdResult.data.currentPage });
        // }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </View>
  );
};
