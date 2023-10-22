import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';

const CreateLocationTag = (props) => {
  const mapRef = useRef(null);

  const [locationTag, setLocationTag] = useState({
    _id: new Date(),
    iconType: 'icon',
    icon: 'https://mekka-dev.s3.us-east-2.amazonaws.com/locationTagIcons/map-pin.png',
    image: '',
    name: '',
    point: {
      type: 'Point',
      coordinates: [],
    },
    color: 'white',
    created: true,
  });

  const onMapPress = (event) => {
    event.persist();
    // console.log(event.nativeEvent.coordinate);
    setLocationTag((previous) => {
      return {
        ...previous,
        point: {
          type: 'Point',
          coordinates: [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude],
        },
      };
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={
            locationTag.name.length && locationTag.name.length <= 40 && locationTag.point.coordinates.length
              ? false
              : true
          }
        >
          <Text
            style={{
              color:
                locationTag.name.length && locationTag.name.length <= 40 && locationTag.point.coordinates.length
                  ? 'white'
                  : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [locationTag]);

  const onDonePress = () => {
    props.navigation.navigate({
      name: 'AddLocationTag',
      params: { createdLocationTag: locationTag },
      merge: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create location tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Type location name, tap the location point down below.
        </Text>
      </View>
      <Text
        style={{
          color: locationTag.name.length <= 40 ? 'rgb(170,170,170)' : 'red',
          alignSelf: 'flex-end',
          marginRight: 10,
          // marginBottom: 10,
        }}
      >
        {locationTag.name.length}/40
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: 'rgb(88, 88, 88)',
          borderBottomWidth: 1,
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 20,
        }}
      >
        <FastImage
          source={require('../../../assets/forApp/map-pin.png')}
          style={{ width: 25, height: 25 }}
          tintColor={'rgb(170,170,170)'}
        />
        <TextInput
          style={{
            // backgroundColor: 'rgb(88, 88, 88)',
            padding: 10,
            // borderRadius: 5,
            fontSize: 17,
            flex: 1,
            color: 'white',
          }}
          placeholder='Location tag name'
          placeholderTextColor={'rgb(170,170,170)'}
          autoCapitalize='none'
          value={locationTag.name}
          onChangeText={(text) =>
            setLocationTag((previous) => {
              return {
                ...previous,
                name: text,
              };
            })
          }
        />
      </View>
      <MapView
        // ref={mapRef}
        userInterfaceStyle='dark'
        onPress={(event) => onMapPress(event)}
        style={{ width: '100%', height: 350, marginBottom: 20 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={false}
      >
        {locationTag.point.coordinates.length ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: locationTag.point.coordinates[1],
              longitude: locationTag.point.coordinates[0],
            }}
          >
            <FastImage
              source={require('../../../assets/forApp/map-pin.png')}
              style={{ width: 40, height: 40, borderRadius: 10 }}
              tintColor={'white'}
            />
          </Marker>
        ) : null}
      </MapView>
    </View>
  );
};

export default CreateLocationTag;
