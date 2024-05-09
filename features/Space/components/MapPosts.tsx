import React, { useContext } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { PostType } from '../../../types';
import { MapPostThumbnail } from '../../../components/PostThumbnail/MapPostThumbnail';
import { TagScreenContext } from '../providers';

export const MapPosts: React.FC = () => {
  const { mapRef, region, onRegionChangeComplete, getPostsByTagIdAndRegionResult } = useContext(TagScreenContext);

  // TODO: Pressで写真見せるようにする。
  const onMapPostThumbnailPress = () => {
    console.log('map post press');
  };

  const renderMarkers = () => {
    return getPostsByTagIdAndRegionResult.data?.posts.map((post: PostType, index: number) => (
      <MapPostThumbnail
        post={post}
        onMapPostThumbnailPress={onMapPostThumbnailPress}
        isPressDisabled={getPostsByTagIdAndRegionResult.status === 'loading'}
      />
    ));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MapView
        userInterfaceStyle='dark'
        ref={mapRef}
        style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        showsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {renderMarkers()}
      </MapView>
      {getPostsByTagIdAndRegionResult.status === 'loading' && (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      )}
    </View>
  );
};
