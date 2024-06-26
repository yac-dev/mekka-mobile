import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ContentType, PostType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';

type CarouselContentsProps = {
  post: PostType;
};

const width = Dimensions.get('window').width;
export const CarouselContents: React.FC<CarouselContentsProps> = ({ post }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }: { item: ContentType; index: number }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ExpoImage
            style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
            source={{ uri: item.data }}
            contentFit='cover'
          />
        </View>
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
          <View style={{ position: 'absolute', top: -10 }}>
            <PaginationLine activeIndex={activeIndex} contents={post.contents} />
          </View>
          <Carousel
            loop
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            modeConfig={{
              parallaxScrollingOffset: 70,
              parallaxScrollingScale: 0.85,
              parallaxAdjacentItemScale: 0.7,
            }}
            width={width}
            height={400}
            data={post.contents}
            scrollAnimationDuration={200}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ExpoImage
              style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
              source={{ uri: post.contents[0].data }}
              contentFit='cover'
            />
          </View>
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
