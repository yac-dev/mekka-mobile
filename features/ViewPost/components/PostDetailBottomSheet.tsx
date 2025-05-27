import Mapbox, { Camera } from '@rnmapbox/maps';
import { ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { currentPostAtom } from '../../Space/atoms/currentPostAtom';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { ViewPostStackNavigatorProps } from '../navigations';
import { PostType } from '../../../types';

const { width } = Dimensions.get('window');
const avatarWidth = width * 0.15;

type PostDetailBottomSheetProps = {
  currentPost: PostType;
};

export const PostDetailBottomSheet: React.FC<PostDetailBottomSheetProps> = ({ currentPost }) => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef<Camera>(null);
  const viewStackNavigation = useNavigation<ViewPostStackNavigatorProps>();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 12 }}>
        {currentPost.caption.length ? (
          <Text style={{ color: 'white', fontSize: 17, marginBottom: 16 }}>{currentPost.caption}</Text>
        ) : null}
        {/* ここで地図を表示する。 */}
        <View style={{ height: 240 }}>
          <Mapbox.MapView
            ref={mapRef}
            style={{ flex: 1 }}
            compassEnabled={false}
            logoEnabled={false}
            scaleBarEnabled={false}
            scrollEnabled={false}
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
        </View>
      </View>
    </ScrollView>
  );
};
