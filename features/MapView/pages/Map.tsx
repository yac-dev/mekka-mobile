import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MapView, { Marker } from 'react-native-maps';
import * as Haptics from 'expo-haptics';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Tab = createMaterialTopTabNavigator();

const Map = () => {
  const { height, width } = Dimensions.get('window');
  const LATITUDE_DELTA = 100; // zoom levelを後でやろうか。。
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const mapRef = useRef(null);

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

  // const renderMarkers = () => {
  //   if (locationTags.length) {
  //     const list = locationTags.map((locationTag, index) => {
  //       return (
  //         <Marker
  //           key={index}
  //           tracksViewChanges={false}
  //           coordinate={{
  //             latitude: locationTag.point.coordinates[1],
  //             longitude: locationTag.point.coordinates[0],
  //           }}
  //           pinColor='black'
  //           onPress={() => {
  //             // onPress();
  //             console.log(locationTag._id);
  //             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //             locationsViewPostsBottomSheetRef.current.snapToIndex(0);
  //             getPostsByLocationTagId(locationTag);
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{ width: 45, height: 45 }}
  //             // onPress={() => locationsViewPostsBottomSheetRef.current.snapToIndex(1)}
  //           >
  //             <ExpoImage
  //               style={{
  //                 width: '100%',
  //                 height: '100%',
  //                 borderRadius: 10,
  //               }}
  //               source={{ uri: locationTag.icon }}
  //               style={{ width: 35, height: 35, borderRadius: 8, marginBottom: 5 }}
  //               placeholder={blurhash}
  //               contentFit='contain'
  //               transition={1000}
  //               tintColor={locationTag.iconType === 'icon' ? locationTag.color : null}
  //             />
  //           </TouchableOpacity>
  //         </Marker>
  //       );
  //     });

  //     return <>{list}</>;
  //   } else {
  //     return null;
  //   }
  // };

  // if (haveLocationTagsBeenFetched) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <MapView
        userInterfaceStyle='dark'
        ref={mapRef}
        style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        showsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        // onPress={(event) => setMeetupLocation(event)}
        // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
        // これ、今のuserの場所にしたほうがいいわな。開発中は、ずっとsanfransisco中心に進めていたけど。。
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // mapType={'satellite'}
      >
        {/* {renderMarkers()} */}
        {/* <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={({ route }) => ({
            lazy: true,
            swipeEnabled: false,
          })}
        >
          {locationTags.map((locationTag, index) => (
            <Tab.Screen
              key={index}
              name={`LocationTag-${locationTag._id}`}
              // options={{ title: tagObject.tag.name }} // Set the tab title to the space name
              initialParams={{ locationTag }}
            >
              {({ navigation, route }) => (
                <LocationsView
                  navigation={navigation}
                  locationTag={locationTag}
                  selectedLocationTag={selectedLocationTag}
                />
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator> */}
      </MapView>
    </View>
  );
  // } else {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: 'black' }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
};

export default Map;
