import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { CreateNewPostContext } from '../contexts';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../Space/providers/SpaceRootProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../../../navigations/CreateNewPostStackNavigator';
import { SpaceRootStackNavigatorProp } from '../../../navigations';
import { CreatePostInputType } from '../types';
import { AuthContext, CurrentSpaceContext } from '../../../providers';
import { SpaceStackNavigatorProps } from '../../../navigations/SpaceStackNavigator';
import { useCreatePostResult } from '../../../api';

const AddLocation = () => {
  const { formData, addLocation, removeLocation } = useContext(CreateNewPostContext);
  // const { requestCreatePost } = useContext(SpaceRootContext);
  const { currentSpace } = useContext(CurrentSpaceContext);
  const { auth } = useContext(AuthContext);
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const { requestCreatePost } = useCreatePostResult(currentSpace);

  const onPostPress = () => {
    spaceStackNavigation.navigate('Space');
    const input: CreatePostInputType = {
      ...formData,
      userId: auth._id,
      spaceId: currentSpace._id,
      reactions: currentSpace.reactions,
      disappearAfter: currentSpace.disappearAfter.toString(),
    };
    requestCreatePost(input);
    // ここでrequestPostの実行を始めて、かつstatusをloadingにすると。
  };

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onPostPress()}
          disabled={formData.location.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.location.isValidated ? 'white' : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.location]);

  const onMapPress = (event: MapPressEvent) => {
    event.persist();
    const coordinates: number[] = [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude];
    addLocation(coordinates);
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={false}
        onLongPress={() => removeLocation()}
      >
        {formData.location.value ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: formData.location.value.coordinates[1],
              longitude: formData.location.value.coordinates[0],
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
