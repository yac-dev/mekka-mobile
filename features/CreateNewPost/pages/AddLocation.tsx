import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { BufferContentType, CreateNewPostContext } from '../contexts';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';
import { CreatePostInputType } from '../types';
import { AuthContext, CurrentSpaceContext } from '../../../providers';
import { SpaceStackNavigatorProps } from '../../Space/navigations/SpaceStackNavigator';
import { useCreatePostResult } from '../../../api';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { Image as ImageCompressor, Video as VideoCompressor } from 'react-native-compressor';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

const AddLocation = () => {
  const { formData, addLocation, removeLocation, setFormData } = useContext(CreateNewPostContext);
  // const { requestCreatePost } = useContext(SpaceRootContext);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { auth } = useContext(AuthContext);
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { requestCreatePost } = useCreatePostResult(currentSpace);

  const onPostPress = async () => {
    spaceStackNavigation.navigate({ name: 'Space', params: {}, merge: true });
    // ここの段階でbufferContentsたちを圧縮したい。
    // const bufferContentsBeforeCompressor = formData.bufferContents.value;
    // const bufferContentsAfterCompressor = [];
    // for (const content of bufferContentsBeforeCompressor) {
    //   if (content.type === 'image/jpg') {
    //     const result = await ImageCompressor.compress(content.uri, {
    //       compressionMethod: 'manual',
    //       quality: 0.7,
    //     });

    //     const compressedObject = {
    //       name: content.name,
    //       uri: result,
    //       type: content.type,
    //     };
    //     bufferContentsAfterCompressor.push(compressedObject);
    //   } else if (content.type === 'video/mp4') {
    //     const result = await VideoCompressor.compress(content.uri, {
    //       compressionMethod: 'auto',
    //       progressDivider: 10,
    //     });
    //     const compressedObject = {
    //       name: content.name,
    //       uri: result,
    //       type: content.type,
    //     };
    //     bufferContentsAfterCompressor.push(compressedObject);
    //   }
    // }
    const compressContent = async (content: BufferContentType) => {
      const { type, uri } = content;
      if (type === 'image/jpg') {
        const result = await ImageCompressor.compress(uri, {
          compressionMethod: 'manual',
          quality: 0.7,
        });
        return { ...content, uri: result };
      } else if (type === 'video/mp4') {
        const result = await VideoCompressor.compress(uri, {
          progressDivider: 20,
          maxSize: 1920,
          compressionMethod: 'manual',
        });
        return { ...content, uri: result };
      }
      return content;
    };

    const bufferContentsAfterCompressor: BufferContentType[] = await Promise.all(
      formData.bufferContents.value.map(compressContent)
    );

    const input: CreatePostInputType = {
      ...formData,
      userId: auth._id,
      spaceId: currentSpace._id,
      reactions: currentSpace.reactions,
      disappearAfter: currentSpace.disappearAfter.toString(),
      bufferContents: {
        value: bufferContentsAfterCompressor,
        isValidated: true, // Adjust this value as needed
      },
    };
    requestCreatePost(input);
  };

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={() => console.log('form data -> ', JSON.stringify(formData, null, 2))}
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
