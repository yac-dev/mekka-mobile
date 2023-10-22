import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import backendAPI from '../apis/backend';
import LocationsView from '../features/Space/pages/LocationsView';
import MapView, { Marker } from 'react-native-maps';
import * as Haptics from 'expo-haptics';

const Tab = createMaterialTopTabNavigator();

const LocationsViewTopTabNavigator = () => {
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const {
    locationsViewPostsBottomSheetRef,
    locationsViewPosts,
    setLocationsViewPosts,
    haveLocationsViewPostsBeenFetched,
    setHaveLocationsViewPostsBeenFetched,
    selectedLocationTag,
    setSelectedLocationTag,
    isFetchingLocationsViewPosts,
    setIsFetchingLocationsViewPosts,
  } = useContext(SpaceRootContext);
  const { height, width } = Dimensions.get('window');
  const LATITUDE_DELTA = 100; // zoom levelを後でやろうか。。
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const [locationTags, setLocationTags] = useState([]);
  const [haveLocationTagsBeenFetched, setHaveLocationTagsBeenFetched] = useState(false);
  const mapRef = useRef(null);

  const getLocationTagsBySpaceId = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/locationtags`);
    const { locationTags } = result.data;
    setLocationTags(locationTags);
    // setSelectedLocationTag(locationTags[0]);
    setHaveLocationTagsBeenFetched(true);
  };

  useEffect(() => {
    getLocationTagsBySpaceId();
  }, []);

  const getPostsByLocationTagId = async (locationTag) => {
    setIsFetchingLocationsViewPosts(true);
    const result = await backendAPI.get(
      `/posts/locationtag/${locationTag._id}/space/${spaceAndUserRelationship.space._id}`
    );
    const { posts } = result.data;
    setLocationsViewPosts(posts);
    setSelectedLocationTag(locationTag);
    setIsFetchingLocationsViewPosts(false);
    // setHavePostsBeenFetched(true);
  };

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

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <MapView
        userInterfaceStyle='dark'
        // ref={mapRef}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
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
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            setSelectedLocationTag(route.params?.locationTag);

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            // <TouchableOpacity
            //   key={route.key}
            //   style={{
            //     flexDirection: 'column',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //     marginRight: 10,
            //     // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
            //     padding: 10,
            //     // borderRadius: 20,
            //     // backgroundColor: isFocused ? 'rgb(150, 150,150)' : 'rgb(60,60,60)',
            //     width: 70,
            //     height: 70,
            //     borderBottomWidth: isFocused && 1,
            //     borderBottomColor: isFocused && 'white',
            //   }}
            //   // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
            //   onPress={onPress}
            // >
            //   <FastImage
            //     source={{ uri: route.params?.locationTag.icon }}
            //     style={{ width: 35, height: 35, borderRadius: 8, marginBottom: 5 }}
            //     tintColor={route.params?.locationTag.iconType === 'icon' ? route.params?.locationTag.color : null}
            //   />
            //   <Text numberOfLines={1} style={{ color: 'white', marginBottom: 5 }}>
            //     {route.params?.locationTag.name}
            //   </Text>
            // </TouchableOpacity>
            <Marker
              tracksViewChanges={false}
              coordinate={{
                latitude: route.params?.locationTag.point.coordinates[1],
                longitude: route.params?.locationTag.point.coordinates[0],
              }}
              pinColor='black'
              onPress={() => {
                onPress();
                // locationsViewPostsBottomSheetRef.current.snapToIndex(0);
              }}
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
                  source={{ uri: route.params?.locationTag.icon }}
                  style={{ width: 35, height: 35, borderRadius: 8, marginBottom: 5 }}
                  tintColor={route.params?.locationTag.iconType === 'icon' ? route.params?.locationTag.color : null}
                />
              </TouchableOpacity>
            </Marker>
          );
        })}
      </MapView>
    );
  };

  const renderMarkers = () => {
    if (locationTags.length) {
      const list = locationTags.map((locationTag, index) => {
        return (
          <Marker
            key={index}
            tracksViewChanges={false}
            coordinate={{
              latitude: locationTag.point.coordinates[1],
              longitude: locationTag.point.coordinates[0],
            }}
            pinColor='black'
            onPress={() => {
              // onPress();
              console.log(locationTag._id);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              locationsViewPostsBottomSheetRef.current.snapToIndex(0);
              getPostsByLocationTagId(locationTag);
            }}
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
                source={{ uri: locationTag.icon }}
                style={{ width: 35, height: 35, borderRadius: 8, marginBottom: 5 }}
                tintColor={locationTag.iconType === 'icon' ? locationTag.color : null}
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

  if (haveLocationTagsBeenFetched) {
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
          {renderMarkers()}
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
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default LocationsViewTopTabNavigator;
