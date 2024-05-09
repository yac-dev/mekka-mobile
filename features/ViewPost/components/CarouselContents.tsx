import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ContentType, PostType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';

type CarouselContentsProps = {
  post: PostType;
};

export const CarouselContents: React.FC<CarouselContentsProps> = ({ post }) => {
  const width = Dimensions.get('window').width;

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
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
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
          mode='parallax'
          data={post.contents}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
