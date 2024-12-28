import { Camera } from '@rnmapbox/maps';
import Mapbox from '@rnmapbox/maps';
import React, { useRef } from 'react';
import { View, Text } from 'react-native';

type IPostsByRegion = {
  userId: string;
};

export const PostsByRegion: React.FC<IPostsByRegion> = ({ userId }) => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const onMapIdle = (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    const latitudeDelta = neLat - swLat;
    const longitudeDelta = neLng - swLng;
  };
  return (
    <Mapbox.MapView
      ref={mapRef}
      style={{ flex: 1 }}
      compassEnabled={false}
      logoEnabled={false}
      scaleBarEnabled={false}
      attributionPosition={{ bottom: -50, right: -50 }}
      styleURL='mapbox://styles/yabbee/cl93j1d3a000714ntdoue4ucq'
      // onRegionDidChange={(feature) => onRegionChangeComplete(feature)}
      regionDidChangeDebounceTime={100}
      onMapIdle={onMapIdle}
    >
      {/* defaultの位置はnew yorkでいい。fetchが */}
      <Camera
        defaultSettings={{
          centerCoordinate: [-122.4324, 37.78825],
          zoomLevel: 0.5,
          animationMode: 'flyTo',
          animationDuration: 1100,
        }}
      />
      {/* {renderMarkers()}
      {getPostsByTagIdAndRegionResult.status === 'loading' && (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      )} */}
    </Mapbox.MapView>
  );
};
