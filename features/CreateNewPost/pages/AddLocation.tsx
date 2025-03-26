import React, { useState, useEffect, useRef, useContext } from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { BufferContentType, CreateNewPostContext } from '../contexts';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';
import { CreatePostInputType } from '../types';
import { SpaceStackNavigatorProps } from '../../Space/navigations/SpaceStackNavigator';
import { useCreatePostResult } from '../../../api';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { Image as ImageCompressor, Video as VideoCompressor } from 'react-native-compressor';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';
import Mapbox, { Camera, PointAnnotation, MarkerView } from '@rnmapbox/maps';
import axios from 'axios';
import Config from 'react-native-config';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Colors } from '../../../themes';
import { VectorIcon } from '../../../Icons';

//ちょうど、post機能の再設計しようとも思っててね。。。治そうかこの際。
// postした時のfunction を渡してくるようにしたほうがいいな。
Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);

const AddLocation = () => {
  const { formData, addLocation, removeLocation, setFormData } = useContext(CreateNewPostContext);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { requestCreatePost } = useCreatePostResult(currentSpace);

  const mapRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);
  const [sessionToken, setSessionToken] = useState(uuidv4());
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions(searchQuery);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      setIsLoadingSuggestions(true);
      const response = await axios.get('https://api.mapbox.com/search/searchbox/v1/suggest', {
        params: {
          q: query,
          access_token: Config.MAPBOX_ACCESS_TOKEN,
          session_token: sessionToken,
        },
      });

      console.log('response.data.suggestions -> ', JSON.stringify(response.data.suggestions, null, 2));

      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSearch = async (place) => {
    try {
      setIsLoadingCoordinates(true);
      const response = await axios.get('https://api.mapbox.com/search/searchbox/v1/forward', {
        params: {
          q: place,
          access_token: Config.MAPBOX_ACCESS_TOKEN,
          limit: 1,
        },
      });

      if (response.data.features.length > 0) {
        const { coordinates } = response.data.features[0].geometry;
        setCoordinates(coordinates);
        setSuggestions([]);
        setSearchQuery('');

        cameraRef.current?.setCamera({
          centerCoordinate: coordinates,
          zoomLevel: 5, // Adjust zoom level as needed
          animationDuration: 1000, // Duration of the animation in milliseconds
        });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoadingCoordinates(false);
    }
  };

  const onPostPress = async () => {
    // spaceStackNavigation.navigate({ name: 'Space', params: {}, merge: true });
    homeStackNavigation.navigate('Home');

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

  // useEffect(() => {
  //   createNewPostStackNavigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         activeOpacity={0.5}
  //         // onPress={() => console.log('form data -> ', JSON.stringify(formData, null, 2))}
  //         onPress={() => onPostPress()}
  //         disabled={formData.location.isValidated ? false : true}
  //       >
  //         <Text
  //           style={{
  //             color: formData.location.isValidated ? 'white' : 'rgb(100,100,100)',
  //             fontSize: 20,
  //             fontWeight: 'bold',
  //           }}
  //         >
  //           Post
  //         </Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [formData.location]);

  const onMapPress = (event: MapPressEvent) => {
    event.persist();
    const coordinates: number[] = [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude];
    addLocation(coordinates);
  };

  return (
    // <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
    //   <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
    //     <Text
    //       style={{
    //         color: 'white',
    //         textAlign: 'center',
    //         fontWeight: 'bold',
    //         fontSize: 20,
    //         marginBottom: 10,
    //       }}
    //     >
    //       Add Location (Optional)
    //     </Text>
    //     <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
    //       Tap the place to add location information.{'\n'}
    //       Long press to remove you've chosen.
    //     </Text>
    //   </View>
    //   <MapView
    //     // ref={mapRef}
    //     userInterfaceStyle='dark'
    //     onPress={(event) => onMapPress(event)}
    //     style={{ width: '100%', height: 500 }}
    //     initialRegion={{
    //       latitude: 37.78825,
    //       longitude: -122.4324,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     }}
    //     showsCompass={true}
    //     scrollEnabled={true}
    //     zoomEnabled={true}
    //     pitchEnabled={false}
    //     onLongPress={() => removeLocation()}
    //   >
    //     {formData.location.value ? (
    //       <Marker
    //         tracksViewChanges={false}
    //         coordinate={{
    //           latitude: formData.location.value.coordinates[1],
    //           longitude: formData.location.value.coordinates[0],
    //         }}
    //       >
    // <ExpoImage
    //   style={{ width: 40, height: 40, borderRadius: 10 }}
    //   source={require('../../../assets/forApp/map-pin.png')}
    //   contentFit='cover'
    //   transition={200}
    //   tintColor={'white'}
    // />
    //       </Marker>
    //     ) : null}
    //   </MapView>
    // </View>
    <View style={{ flex: 1 }}>
      <Mapbox.MapView
        // ref={mapRef}
        style={{ flex: 1 }}
        compassEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionPosition={{ bottom: -50, right: -50 }}
        styleURL='mapbox://styles/yabbee/cl93j1d3a000714ntdoue4ucq'
        // onRegionDidChange={(feature) => onRegionChangeComplete(feature)}
        regionDidChangeDebounceTime={100}
        // onMapIdle={onMapIdle}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: coordinates || [-122.4194, 37.7749],
            zoomLevel: 0.5,
            animationMode: 'flyTo',
            animationDuration: 1100,
          }}
        />
        {coordinates && (
          <MarkerView
            id={coordinates[0]}
            coordinate={[coordinates[0], coordinates[1]]}
            allowOverlap={true}
            // allowOverlap={false}で、マーカーが重なった時にマーカーが全部表示されないようになる。結構便利。
          >
            <ExpoImage
              style={{ width: 40, height: 40, borderRadius: 10 }}
              source={require('../../../assets/forApp/map-pin.png')}
              contentFit='cover'
              transition={200}
              tintColor={'white'}
            />
          </MarkerView>
        )}
        {isLoadingCoordinates && (
          <ActivityIndicator size='small' color='white' style={{ position: 'absolute', top: 150, left: 0, right: 0 }} />
        )}
      </Mapbox.MapView>
      <View style={styles.searchBoxContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderBottomLeftRadius: suggestions.length > 0 && searchQuery.length > 0 ? 0 : 10,
            borderBottomRightRadius: suggestions.length > 0 && searchQuery.length > 0 ? 0 : 10,
          }}
        >
          <VectorIcon.II name='search' size={18} color={'rgb(180,180,180)'} />
          <TextInput
            style={styles.input}
            placeholder='Search for a place'
            placeholderTextColor='rgb(180,180,180)'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {isLoadingSuggestions && <ActivityIndicator size='small' color='white' />}
        </View>
        {suggestions.length > 0 && searchQuery.length > 0 && (
          <View
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 10,
            }}
          >
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                  }}
                  onPress={() => handleSearch(item.name)}
                  activeOpacity={0.8}
                >
                  <VectorIcon.MCI
                    name='map-marker-outline'
                    size={18}
                    color={'rgb(180,180,180)'}
                    style={{ marginRight: 10 }}
                  />
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={styles.suggestionName}>{item.name}</Text>
                    {item.full_address && (
                      <Text numberOfLines={1} style={styles.suggestionAddress}>
                        {item.full_address}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    position: 'absolute',
    top: 70,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(50,50,50)',
    color: 'white',
  },
  searchButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionAddress: {
    color: 'rgb(180,180,180)',
    marginTop: 5,
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default AddLocation;
