import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import MapView, { Marker } from 'react-native-maps';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const AddLocation = (props) => {
  const { createNewPostFormData, setCreateNewPostFormData } = useContext(SpaceRootContext);
  const mapRef = useRef(null);
  const onMapPress = (event) => {
    event.persist();
    console.log(event.nativeEvent.coordinate);
    setCreateNewPostFormData((previous) => {
      return {
        ...previous,
        location: {
          type: 'Point',
          coordinates: [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude],
        },
      };
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
          Add Location (Optional)
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Tap the place to add location information.{'\n'}
          Long press to remove you've chosen.
        </Text>
      </View>
      <MapView
        // ref={mapRef}
        userInterfaceStyle='dark'
        onPress={(event) => onMapPress(event)}
        style={{ width: '100%', height: 500 }}
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
        onLongPress={() => {
          setCreateNewPostFormData((previous) => {
            return {
              ...previous,
              location: null,
            };
          });
        }}
      >
        {createNewPostFormData.location ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: createNewPostFormData.location.coordinates[1],
              longitude: createNewPostFormData.location.coordinates[0],
            }}
          >
            <ExpoImage
              style={{ width: 40, height: 40, borderRadius: 10 }}
              source={require('../../../assets/forApp/map-pin.png')}
              contentFit='cover'
              transition={200}
              tintColor={'white'}
            />
          </Marker>
        ) : null}
      </MapView>
    </View>
  );
};

export default AddLocation;
