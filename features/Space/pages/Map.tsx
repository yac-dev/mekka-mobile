import React, { useCallback, useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostsRootContext } from '../../SpaceMenuBottomSheet/contexts/ViewPostsRootContext';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import SVG from 'react-native-svg';

const Map = (props) => {
  const { posts, havePostsBeenFetched } = useContext(ViewPostsRootContext);
  // const LATITUDE = posts[0].point.coordinates[1]; // これ、bottom sheetでかくれないようにしなきゃ。
  // const LONGITUDE = posts[0].point.coordinates[0];
  const LATITUDE = 40.73061; // これ、bottom sheetでかくれないようにしなきゃ。
  const LONGITUDE = -73.935242;
  const LATITUDE_DELTA = 100; // zoom levelを後でやろうか。。。
  const { height, width } = Dimensions.get('window');
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const mapRef = useRef(null);

  const renderItem = useCallback((post) => {
    if (post.location.coordinates.length) {
      return (
        <Marker
          tracksViewChanges={false}
          coordinate={{
            latitude: post.location.coordinates[1],
            longitude: post.location.coordinates[0],
          }}
          pinColor='black'
          // onPress={() => {
          //   locationsViewPostsBottomSheetRef.current.snapToIndex(0);
          // }}
        >
          <TouchableOpacity
            style={{ width: 45, height: 45 }}
            // onPress={() => locationsViewPostsBottomSheetRef.current.snapToIndex(1)}
          >
            {/* <FastImage
              // onLoad={() => setInitialRender(false)}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              source={{
                uri: post.content.data,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
          </TouchableOpacity>
        </Marker>
      );
    }
  }, []);

  const renderPostsByMarker = () => {
    if (havePostsBeenFetched) {
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
              // onPress={() => {
              //   locationsViewPostsBottomSheetRef.current.snapToIndex(0);
              // }}
            >
              <TouchableOpacity
                style={{ width: 45, height: 45 }}
                // onPress={() => locationsViewPostsBottomSheetRef.current.snapToIndex(1)}
              >
                <FastImage
                  // onLoad={() => setInitialRender(false)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: post.content.data,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </Marker>
          );
        });

        return <>{list}</>;
      } else {
        return null;
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <MapView
        userInterfaceStyle='dark'
        ref={mapRef}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        showsUserLocation={true}
        // customMapStyle={mapStyle}
        // // showsMyLocationButton={true}
        // followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // mapType={'satellite'}
      >
        {renderPostsByMarker()}
        {/* <Marker
          tracksViewChanges={false}
          coordinate={{
            latitude: props.selectedLocationTag.point.coordinates[1],
            longitude: props.selectedLocationTag.point.coordinates[0],
          }}
          pinColor='black'
          // onPress={() => {
          //   locationsViewPostsBottomSheetRef.current.snapToIndex(0);
          // }}
        >
          <TouchableOpacity
            style={{ width: 45, height: 45 }}
            // onPress={() => locationsViewPostsBottomSheetRef.current.snapToIndex(1)}
          >
            <FastImage
              // onLoad={() => setInitialRender(false)}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              source={{
                uri: props.selectedLocationTag.icon,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={props.selectedLocationTag.iconType === 'icon' ? props.selectedLocationTag.color : null}
            />
          </TouchableOpacity>
        </Marker> */}
      </MapView>
    </View>
  );
};

export default Map;
