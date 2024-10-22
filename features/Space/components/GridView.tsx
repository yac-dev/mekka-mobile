import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { PostType, SpaceType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useNavigation } from '@react-navigation/native';
import { SpaceStackNavigatorProps } from '../navigations/SpaceStackNavigator';
import { useRecoilState } from 'recoil';
import { currentTagAtom } from '../../../recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsByTagId, queryKeys } from '../../../query';

type IGridView = {
  space: SpaceType;
  tag: TagType;
};

export const GridView: React.FC<IGridView> = ({ space, tag }) => {
  const [currentTag] = useRecoilState(currentTagAtom);
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const {
    data,
    status: getPostsByTagIdStatus,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.postsByTagId, currentTag._id],
    queryFn: ({ pageParam = 0 }) => getPostsByTagId({ tagId: currentTag._id, currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // console.log('lastPage', lastPage);
      // console.log('pages', pages);
      // これでいい感じにdebuggingできるね。
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });

  // NOTE: 多分、indexではなくpostでいんじゃないかなー。view post側でpostの_idでloopすればいいだけだから。。。ただ、postの数が多い場合はllopが面倒くさいか。
  const onPressPostThumbnail = (post: PostType, index: number) => {
    spaceNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: { posts: data?.pages.flatMap((page) => page.posts), index: index },
      },
    });
  };

  // next pageがなければもうfetch nextしたくないよね。
  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 40 }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPressPostThumbnail} />;
  };

  if (getPostsByTagIdStatus === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data?.pages.flatMap((page) => page.posts).length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts tagged by {currentTag.name}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        numColumns={3}
        data={data?.pages.flatMap((page) => page.posts)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={1000}
        onMomentumScrollEnd={() => {
          // console.log('hasNextPage?', hasNextPage);
          fetchNextPage();
        }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};
