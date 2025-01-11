import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, LayoutChangeEvent, Dimensions } from 'react-native';
import { PostType, SpaceType, TagType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components/PostThumbnail/PostThumbnail';
import { useNavigation } from '@react-navigation/native';
import { SpaceStackNavigatorProps } from '../navigations/SpaceStackNavigator';
import { useRecoilState } from 'recoil';
import { currentTagAtom, currentTagAtomFamily } from '../../../recoil';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsByTagId, queryKeys } from '../../../query';
import { Colors } from '../../../themes';
import { VectorIcon } from '../../../Icons';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { Image as ExpoImage } from 'expo-image';
import { currentTagsTableBySpaceIdsAtom } from '../../../recoil';
type IGridView = {
  space: SpaceType;
};

const windowWidth = Dimensions.get('window').width;
export const GridView: React.FC<IGridView> = ({ space }) => {
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const {
    data,
    status: getPostsByTagIdStatus,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.postsByTagId, currentTagsTableBySpaceIds[space._id]._id],
    queryFn: ({ pageParam = 0 }) =>
      getPostsByTagId({ tagId: currentTagsTableBySpaceIds[space._id]._id, currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // console.log('lastPage', lastPage);
      // console.log('pages', pages);
      // これでいい感じにdebuggingできるね。
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });
  const scrollViewRef = useRef(null);

  console.log('currentTagsTableBySpaceIds', currentTagsTableBySpaceIds);

  const scrollToCenter = () => {
    const currentIndex = space.tags.findIndex((tag) => tag._id === currentTag._id);
    if (currentIndex !== 0 && currentIndex !== 1 && itemWidths.length === space.tags.length) {
      const itemWidth = itemWidths[currentIndex];
      const offset =
        itemWidths.slice(0, currentIndex).reduce((sum, width) => sum + width, 0) - (windowWidth / 2 - itemWidth / 2);
      scrollViewRef.current?.scrollToOffset({
        offset: Math.max(0, offset),
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToCenter();
  }, [currentTag, itemWidths, space.tags.length]);

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

  const onTabPress = (tab) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTag(tab);
  };

  const renderTab = ({ item, index }) => {
    const isFocused = currentTagsTableBySpaceIds[space._id]._id === item._id;
    return (
      <View onLayout={(event) => onItemLayout(event, index)}>
        <TouchableOpacity
          // key={route.key}
          activeOpacity={0.7}
          onPress={() => onTabPress(item)}
          onLongPress={() => console.log('hello')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              backgroundColor: isFocused ? Colors.iconColors[item.color] : undefined,
              borderRadius: 130,
            }}
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={{ uri: item.icon?.url }}
              tintColor={isFocused ? 'white' : 'rgb(100,100,100)'}
            />
            <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(100,100,100)', fontSize: 13 }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
          fetchNextPage();
        }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.7}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

{
  /* <AppButton.Icon
            onButtonPress={() => spaceStackNavigation.goBack()}
            customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)', marginHorizontal: 10 }}
            hasShadow={false}
          >
            <VectorIcon.MCI name='arrow-left' size={18} color={'rgb(190,190,190)'} />
          </AppButton.Icon> */
}
