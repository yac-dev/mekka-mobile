import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PostType } from '../../types';
import { Image as ExpoImage } from 'expo-image';

type MapPostThumbnailProps = {
  post: PostType;
  index: number;
  onMapPostThumbnailPress: (post: PostType, index: number) => void;
  isPressDisabled: boolean;
};

export const MapPostThumbnail: React.FC<MapPostThumbnailProps> = ({
  post,
  index,
  onMapPostThumbnailPress,
  isPressDisabled,
}) => {
  return (
    <Marker
      tracksViewChanges={false}
      coordinate={{
        latitude: post.location.coordinates[1],
        longitude: post.location.coordinates[0],
      }}
    >
      <TouchableOpacity
        style={{ width: 54, height: 54, padding: 3, borderRadius: 8, backgroundColor: 'white' }}
        disabled={isPressDisabled}
        onPress={() => onMapPostThumbnailPress(post, index)}
      >
        <View style={{ width: '100%', height: '100%' }}>
          <ExpoImage
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 9,
            }}
            source={{ uri: post.contents[0].type === 'photo' ? post.contents[0].data : post.contents[0].thumbnail }}
            contentFit='cover'
            transition={200}
          />
        </View>
      </TouchableOpacity>
    </Marker>
  );
};
