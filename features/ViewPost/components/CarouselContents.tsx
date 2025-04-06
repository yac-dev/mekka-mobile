import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { ContentType, PostType } from '../../../types';
import { VideoPlayer } from '../../../components';
import { CustomImage } from '../../../components';
import { ResizeMode } from 'react-native-video';
import { useSharedValue } from 'react-native-reanimated';

type CarouselContentsProps = {
  post: PostType;
};

const width = Dimensions.get('window').width;
export const CarouselContents: React.FC<CarouselContentsProps> = ({ post }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const renderItem = ({ item, index }: { item: ContentType; index: number }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {item.type === 'photo' ? (
          <CustomImage source={item.data} contentFit='cover' />
        ) : (
          <VideoPlayer
            ref={videoRef}
            source={{ uri: item.data }}
            resizeMode={ResizeMode.CONTAIN}
            componentStyle={{ width: '100%', height: '100%' }}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'black',
      }}
    >
      {post.contents.length > 1 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          {/* <View style={{ position: 'absolute', top: -10 }}>
            <PaginationLine activeIndex={activeIndex} contents={post.contents} />
          </View> */}
          <Carousel
            autoPlayInterval={2000}
            data={post.contents}
            width={width}
            height={Dimensions.get('window').height}
            loop={false}
            pagingEnabled={true}
            snapEnabled={true}
            style={{
              width: width,
            }}
            mode='parallax'
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 45,
            }}
            onConfigurePanGesture={(g) => {
              'worklet';
              // Disable vertical gestures
              g.activeOffsetY([-999999, 999999]);
              // Enable horizontal gestures with a small threshold
              g.activeOffsetX([-20, 20]);
            }}
            onProgressChange={progress}
            renderItem={renderItem}
          />
          <View style={{ position: 'absolute', bottom: 100 }}>
            <Pagination.Basic
              progress={progress}
              data={post.contents}
              size={8}
              dotStyle={{
                borderRadius: 100,
                backgroundColor: '#262626',
              }}
              activeDotStyle={{
                borderRadius: 100,
                overflow: 'hidden',
                backgroundColor: '#f1f1f1',
              }}
              containerStyle={[
                {
                  gap: 5,
                },
              ]}
              horizontal
              onPress={onPressPagination}
            />
          </View>
        </View>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          {post.contents[0].type === 'photo' ? (
            <CustomImage source={post.contents[0].data} contentFit='cover' />
          ) : (
            <VideoPlayer
              ref={videoRef}
              source={{ uri: post.contents[0].data }}
              resizeMode={ResizeMode.CONTAIN}
              componentStyle={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
      )}
    </View>
  );
};

type PaginationLine = {
  activeIndex: number;
  contents: ContentType[];
};

const PaginationLine: React.FC<PaginationLine> = ({ activeIndex, contents }) => (
  <View style={styles.paginationContainer}>
    {contents.map((_, idx) => (
      <View
        key={idx}
        style={[
          styles.paginationLine,
          { width: `${100 / contents.length}%`, height: 2 },
          activeIndex === idx && styles.activeLine,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  paginationLine: {
    height: '100%',
    backgroundColor: 'grey',
    marginHorizontal: 2,
  },
  activeLine: {
    backgroundColor: 'white',
  },
});
