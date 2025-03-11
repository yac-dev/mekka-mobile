import React, { useRef, useState } from 'react';
import { View, Text, Animated, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { PostType } from '../../../types';
import { getPostsByUserId } from '../../../query/queries/getPostsByUserId';
import { queryKeys } from '../../../query/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { authAtom } from '../../../recoil/atoms';
import { useRecoilState } from 'recoil';
import { MomentSkelton } from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import { Image as ExpoImage } from 'expo-image';

const HEADER_HEIGHT = 80;
const TAB_BAR_HEIGHT = 50;

export const MomentGrid = ({ position, syncOffset, secondRef, onMomentumScrollBegin, spaceId }: any) => {
  const [auth] = useRecoilState(authAtom);

  const {
    data,
    status: getMomentPostsByUserIdStatus,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.postsByUserId, spaceId, 'moment'],
    queryFn: ({ pageParam = 0 }) =>
      getPostsByUserId({ userId: auth._id, spaceId, currentPage: pageParam, postType: 'moment' }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? lastPage.currentPage : undefined;
    },
  });

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} mins`;
    }
  };

  const onPostThumbnailPress = (moment: PostType, index: number) => {
    null;
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <MomentThumbnail post={item} index={index} onPressPostThumbnail={onPostThumbnailPress} />;
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

  if (getMomentPostsByUserIdStatus === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {!data?.pages.flatMap((page) => page.posts).length ? (
        <Animated.ScrollView
          ref={secondRef}
          scrollEventThrottle={1}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
            useNativeDriver: true,
          })}
          onMomentumScrollEnd={(e) => {
            syncOffset('posts', e.nativeEvent.contentOffset.y);
          }}
          style={{
            flex: 1,
            paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts found...</Text>
        </Animated.ScrollView>
      ) : (
        <Animated.FlatList
          ref={secondRef}
          scrollEventThrottle={1}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
            useNativeDriver: true,
          })}
          onMomentumScrollEnd={(e) => {
            syncOffset('moments', e.nativeEvent.contentOffset.y);
          }}
          numColumns={4}
          data={data?.pages.flatMap((page) => page.posts)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          onEndReached={() => {
            fetchNextPage();
          }}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.7}
          contentContainerStyle={{ paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT, paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

const momentWidth = Dimensions.get('window').width / 4;

const calculateLeftTime = (disappearAt: string) => {
  const now: Date = new Date();
  const last: Date = new Date(disappearAt);
  const timeLeftMs: number = last.getTime() - now.getTime(); // Get time difference in milliseconds
  const hours: number = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutes: number = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes,
  };
};

const millisecondsToTime = (milliseconds: number) => {
  // Convert milliseconds to seconds
  var seconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format the result
  var formattedTime = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

  return formattedTime;
};

type MomentThumbnailProps = {
  post: PostType;
  index: number;
  onPressPostThumbnail: (post: PostType, index: number) => void;
};

const MomentThumbnail: React.FC<MomentThumbnailProps> = ({ post, index, onPressPostThumbnail }) => {
  const [isLoading, setIsLoading] = useState(true); // statelessであるべきだが、これは特別。
  const { hours, minutes } = calculateLeftTime(post.disappearAt);
  const videoRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: momentWidth,
        height: momentWidth,
        borderRadius: 18,
      }}
      onPress={() => onPressPostThumbnail(post, index)}
    >
      {/* skeltonここじゃないと,そもそもhandleLoadingされない。 */}
      {isLoading && <MomentSkelton />}
      {/* {post.contents[0].type === 'photo' && (
        <ExpoImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: post.contents[0].data }}
          contentFit='cover'
          onLoad={handleImageLoad}
        />
      )} */}

      <ExpoImage
        style={{
          width: momentWidth * 0.95,
          height: momentWidth * 0.95,
          borderRadius: 18,
        }}
        source={{ uri: post.contents[0].type === 'photo' ? post.contents[0].data : post.contents[0].thumbnail }}
        contentFit='cover'
        onLoad={handleImageLoad}
      />
      {post.contents[0].type === 'video' && (
        <>
          <View style={{ position: 'absolute', right: 5, top: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{millisecondsToTime(post.contents[0].duration)}</Text>
          </View>
        </>
      )}
      <LinearGradient
        style={{
          // zIndex: 1000,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 40,
        }}
        colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
      >
        <View style={{ paddingLeft: 15, position: 'absolute', bottom: 5 }}>
          <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{hours > 0 && `${hours}h`}</Text>
          <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{minutes > 0 && `${minutes}m`}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
