import Mapbox, { Camera } from '@rnmapbox/maps';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { currentPostAtom } from '../../Space/atoms/currentPostAtom';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { ViewPostStackNavigatorProps } from '../navigations';
import { PostType } from '../../../types';
import { Colors } from '../../../themes/colors';

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
        <View style={{ height: 240, marginBottom: 16 }}>
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
        {/* ここでtagsを表示する。 */}
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginBottom: 8 }}>Tags</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {currentPost.tags.map((tag) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                padding: 5,
                paddingHorizontal: 12,
                backgroundColor: Colors.iconColors[tag.color],
                borderRadius: 130,
                ...Platform.select({
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: { width: 1, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 1,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
              }}
            >
              <ExpoImage
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={{ uri: tag.icon?.url }}
                tintColor={'white'}
              />
              <Text numberOfLines={1} style={{ color: 'white', fontSize: 11 }}>
                {tag.name}
              </Text>
              {tag.type.length === 1 && tag.type[0] === 'photo' ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -7,
                    right: -8,
                    backgroundColor: 'black',
                    borderRadius: 10,
                    width: 22,
                    height: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'rgb(50,50,50)',
                      width: 18,
                      height: 18,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ExpoImage
                      style={{ width: 14, height: 14 }}
                      source={require('../../../assets/forApp/photo.png')}
                      contentFit='contain'
                      tintColor='white'
                    />
                  </View>
                </View>
              ) : null}
              {tag.type.length === 1 && tag.type[0] === 'video' ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -7,
                    right: -8,
                    backgroundColor: 'black',
                    borderRadius: 10,
                    width: 22,
                    height: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'rgb(50,50,50)',
                      width: 18,
                      height: 18,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ExpoImage
                      style={{ width: 14, height: 14 }}
                      source={require('../../../assets/forApp/video.png')}
                      contentFit='contain'
                      tintColor='white'
                    />
                  </View>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
