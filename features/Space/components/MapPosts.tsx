import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, { Marker } from 'react-native-maps';
import { Image as ExpoImage } from 'expo-image';
import { TagType } from '../../../types';

type MapPostsProps = {
  tag: TagType;
};

export const MapPosts: React.FC<MapPostsProps> = ({ tag }) => {
  // ここでのapi requestする感じね。
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 100.0922,
    longitudeDelta: 100.0421,
  });

  const renderMarkers = () => {
    if (mapPosts.length) {
      const list = mapPosts.map((post, index) => {
        return (
          <Marker
            key={index}
            tracksViewChanges={false}
            coordinate={{
              latitude: post.location.coordinates[1],
              longitude: post.location.coordinates[0],
            }}
            pinColor='black'
            onPress={() => {
              // onPress();
            }}
          >
            <TouchableOpacity
              style={{ width: 54, height: 54, padding: 3, borderRadius: 8, backgroundColor: 'white' }}
              disabled={mapViewPostsFetchingStatus === 'loading'}
              onPress={() => {
                setCurrentPost(post);
                setCurrentIndex(index);
                props.navigation.navigate({
                  name: 'ViewPostStackNavigator',
                  params: { screen: 'ViewPost', params: { post } },
                });
              }}
            >
              <View style={{ width: '100%', height: '100%' }}>
                {/* videoに関してもやらんといかん。 */}
                <ExpoImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 9,
                  }}
                  source={{ uri: post.contents[0].data }}
                  contentFit='cover'
                  transition={200} // ふつくしい。。。
                />
              </View>
            </TouchableOpacity>
          </Marker>
        );
      });

      return <>{list}</>;
    } else {
      return null;
    }
  };

  // if (haveLocationTagsBeenFetched) {

  // 最終的な戦略としては、今スマホの画面内に収まっている地図の範囲内のデータをとってくる手法だね。多分、airbnbはそんなかんじだと思う。
  // 多分だけど、、、今のregionを基本として、latitudeは+-20, longitudeが+-50、みたいな感じの範囲内でqueryをする。さらにその上で、latitude deltaとlongitude deltaも考慮に入れると。

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
        // mapType={'satellite'}
      >
        {renderMarkers()}
      </MapView>
      {mapViewPostsFetchingStatus === 'loading' ? (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      ) : null}
    </View>
  );
};
