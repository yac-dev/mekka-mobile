import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, { Marker } from 'react-native-maps';
import * as Haptics from 'expo-haptics';
import { Image as ExpoImage } from 'expo-image';
import { MapViewStackContext } from '../context';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Tab = createMaterialTopTabNavigator();

const Map = () => {
  const { posts, setPosts, mapRef, region, setRegion, onRegionChangeComplete, fetchingStatus } =
    useContext(MapViewStackContext);
  // const { height, width } = Dimensions.get('window');
  // const LATITUDE_DELTA = 100; // zoom levelを後でやろうか。。
  // const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  // const mapRef = useRef(null);
  // const [region, setRegion] = useState({
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 1.0922,
  //   longitudeDelta: 1.0421,
  // });

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   getPostsByLocationTagId();
  // }, []);

  // 近寄りすぎ。もっと遠くていい。
  // useEffect(() => {
  //   if (selectedLocationTag) {
  //     const newLat = selectedLocationTag.point.coordinates[1] - 0.0065;
  //     mapRef.current.animateToRegion({
  //       latitude: newLat,
  //       longitude: selectedLocationTag.point.coordinates[0],
  //       latitudeDelta: 0.0322,
  //       longitudeDelta: 0.0221,
  //     });
  //   }
  // }, [selectedLocationTag]);

  const renderMarkers = () => {
    if (posts.length) {
      const list = posts.map((post, index) => {
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
              style={{ width: 45, height: 45 }}
              // onPress={() => locationsViewPostsBottomSheetRef.current.snapToIndex(1)}
            >
              <ExpoImage
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                }}
                source={{ uri: post.contents[0].data }}
                contentFit='contain'
                transition={500} // ふつくしい。。。
              />
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
      {fetchingStatus === 'loading' ? (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      ) : null}
    </View>
  );
};

export default Map;
