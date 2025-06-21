import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetSpacesState } from '../hooks';
import { SpaceType } from '../../../types';
import { VectorIcon } from '../../../Icons';
import { useNavigation } from '@react-navigation/native';
import { DiscoverStackNavigatorProp } from '../navigations/DiscoverStackNavigator';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSpaces } from '../../../query';
import { queryKeys } from '../../../query';
import { FlashList } from '@shopify/flash-list';

const Discover: React.FC = () => {
  const discoverStackNavigation = useNavigation<DiscoverStackNavigatorProp>();
  // const { apiResult, requestApi } = useGetSpacesState();

  const {
    data,
    status: getSpacesStatus,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching: isRefetchingPostsByTagId,
  } = useInfiniteQuery({
    queryKey: [queryKeys.getSpaces],
    queryFn: ({ pageParam = 0 }) => getSpaces({ currentPage: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // console.log('lastPage', lastPage);
      // console.log('pages', pages);
      // これでいい感じにdebuggingできるね。
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });

  const onSpacePress = (space: SpaceType) => {
    discoverStackNavigation.navigate('SpaceDetailStackNavigator', { _id: space._id });
  };

  // spaceのtypeがphotoの場合は、必要なものが media type photoとmoment、
  // spaceのtypeがvideoの場合は、必要なものがvideo,
  const renderItem = ({ item }: { item: SpaceType }) => {
    const renderLabels = (space: SpaceType) => {
      if (space.contentType === 'photo') {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white' }}>Photo</Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
              <Text style={{ color: 'white' }}>23h59m</Text>
            </View>
          </View>
        );
      } else if (space.contentType === 'video') {
        return (
          <ScrollView horizontal>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Video</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>23h59m</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>2m30s</Text>
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>Photo</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>Video</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>23h59m</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>2m30s</Text>
              </View>
            </View>
          </ScrollView>
        );
      }
    };
    // ここをreusableにしたいよね。どうするか。

    return (
      <TouchableOpacity style={styles.itemInnerContainer} activeOpacity={0.7} onPress={() => onSpacePress(item)}>
        <ExpoImage style={styles.spaceIcon} source={{ uri: item.icon }} contentFit='cover' />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.spaceName}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
          {renderLabels(item)}
          {/* ここにlabelを表示していく。 */}
          {/* <VectorIcon.II name='image' size={13} color={'black'} style={{ marginRight: 3 }} />
                <VectorIcon.OI name='video' size={13} color={'black'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 40 }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  if (getSpacesStatus === 'pending') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data?.pages.flatMap((page) => page.spaces).length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ExpoImage
          style={{
            width: 60,
            aspectRatio: 1,
            marginBottom: 10,
          }}
          source={require('../../../assets/forApp/photo-video.png')}
          contentFit='cover'
          tintColor={'rgb(150,150,150)'}
        />
        <Text style={{ color: 'rgb(150,150,150)', textAlign: 'center', fontSize: 17 }}>No Public Spaces found....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        numColumns={4}
        data={data?.pages.flatMap((page) => page.spaces)}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={1000}
        onMomentumScrollEnd={() => {
          fetchNextPage();
        }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.7}
      />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  spaceName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  spaceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  description: {
    color: 'rgb(170,170,170)',
    width: 150,
    marginBottom: 10,
  },
});
