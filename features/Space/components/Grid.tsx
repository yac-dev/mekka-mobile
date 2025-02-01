import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { PostType, SpaceType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useNavigation } from '@react-navigation/native';
import { SpaceStackNavigatorProps } from '../navigations/SpaceStackNavigator';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, currentTagAtom, currentTagAtomFamily } from '../../../recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsByTagId, queryKeys } from '../../../query';
import { Colors } from '../../../themes';
import { VectorIcon } from '../../../Icons';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { Image as ExpoImage } from 'expo-image';
import { currentTagsTableBySpaceIdsAtom } from '../../../recoil';

const windowWidth = Dimensions.get('window').width;

type GridProps = {
  tag: TagType;
};

//　ここのinfinite queryをtag idごとにやりたいんだが。。。
export const Grid: React.FC<GridProps> = ({ tag }) => {
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const {
    data,
    status: getPostsByTagIdStatus,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.postsByTagId, tag._id],
    queryFn: ({ pageParam = 0 }) => getPostsByTagId({ tagId: tag._id, currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // console.log('lastPage', lastPage);
      // console.log('pages', pages);
      // これでいい感じにdebuggingできるね。
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });
  const scrollViewRef = useRef(null);

  // NOTE: 多分、indexではなくpostでいんじゃないかなー。view post側でpostの_idでloopすればいいだけだから。。。ただ、postの数が多い場合はllopが面倒くさいか。
  const onPressPostThumbnail = (post: PostType, index: number) => {
    homeStackNavigation.navigate({
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

  const onItemLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setItemWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  // ここでloadingをrenderしたいわけでさ。。。そもそもrouteごとに表示したいわけよ。

  if (getPostsByTagIdStatus === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data?.pages.flatMap((page) => page.posts).length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <VectorIcon.MCI
          name='image-multiple-outline'
          size={60}
          color={'rgb(150,150,150)'}
          style={{ marginBottom: 30, marginTop: -100 }}
        />
        <Text style={{ color: 'rgb(150,150,150)', textAlign: 'center', fontSize: 17 }}>
          No posts tagged by{'\n'}
          {tag.name}...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        numColumns={4}
        data={data?.pages.flatMap((page) => page.posts)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={1000}
        onMomentumScrollEnd={() => {
          fetchNextPage();
        }}
        // ListHeaderComponent={<View style={{ height: 70 }} />}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{
          paddingBottom: data?.pages.flatMap((page) => page.posts).length >= 12 ? 95 : 165,
          // paddingTop: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  gridText: {
    color: 'white',
  },
});
