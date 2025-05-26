import Mapbox, { Camera } from '@rnmapbox/maps';
import React, { useRef } from 'react';

export const PostDetailBottomSheet = () => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef<Camera>(null);

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
      // onMapIdle={onMapIdle}
    >
      <Camera
        ref={cameraRef}
        defaultSettings={{
          // centerCoordinate: currentRegion ? [currentRegion.longitude, currentRegion.latitude] : [-122.4324, 37.78825],
          zoomLevel: 0.2,
          animationMode: 'flyTo',
          animationDuration: 1100,
        }}
      />
    </Mapbox.MapView>
  );
};
