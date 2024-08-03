import React, { useCallback, useState } from 'react';
import { Image, ImageSourcePropType, View, Dimensions } from 'react-native';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { ActivityIndicator } from 'react-native';

type ImageViewerProps = ExpoImageProps & {
  source: string;
  ratio?: number;
};

const deviceWidth = Dimensions.get('window').width;

export const CustomImage: React.FC<ImageViewerProps> = ({ source }) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const onLayout = useCallback((event) => {
    Image.getSize(source, (w, h) => {
      const scale = deviceWidth / w;
      const imageWidth = w * scale;
      const imageHeight = h * scale;
      setWidth(imageWidth);
      setHeight(imageHeight);
    });
  }, []);

  return (
    <View onLayout={onLayout}>
      {width === 0 && height === 0 ? (
        <ActivityIndicator />
      ) : (
        <ExpoImage source={source} style={{ width, height }} contentFit='cover' />
      )}
    </View>
  );
};
