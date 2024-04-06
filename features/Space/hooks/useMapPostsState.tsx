import React, { useState, useRef } from 'react';
import MapView, { Region } from 'react-native-maps';

type UseMapPostsStateOutputType = {
  mapRef: React.MutableRefObject<MapView | null>;
  region: Region;
  onRegionChangeComplete: (region: Region) => void;
};

export const useMapPostsState = (): UseMapPostsStateOutputType => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 100.0922,
    longitudeDelta: 100.0421,
  });

  const onRegionChangeComplete = (region: Region) => {
    setRegion(region);
  };

  return {
    mapRef,
    region,
    onRegionChangeComplete,
  };
};
