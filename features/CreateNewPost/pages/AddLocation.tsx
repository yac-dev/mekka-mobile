import React, { useState, useEffect, useRef, useContext } from 'react';
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { BufferContentType, CreateNewPostContext } from '../contexts';
import { Image as ExpoImage } from 'expo-image';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import axios from 'axios';
import Config from 'react-native-config';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Colors } from '../../../themes';
import { VectorIcon } from '../../../Icons';

Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);

const AddLocation = () => {
  const { formData, addLocation, removeLocation, setFormData } = useContext(CreateNewPostContext);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
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
          limit: 10,
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
        addLocation(coordinates);
        setSuggestions([]);
        setSearchQuery('');
        cameraRef.current?.setCamera({
          centerCoordinate: coordinates,
          zoomLevel: 5,
          animationDuration: 400,
        });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoadingCoordinates(false);
    }
  };

  const handleMapPress = (event) => {
    const { geometry } = event;
    const newCoordinates = geometry.coordinates;
    addLocation(newCoordinates);

    cameraRef.current?.setCamera({
      centerCoordinate: newCoordinates,
      zoomLevel: 5,
      animationDuration: 400,
      animationMode: 'flyTo',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView
        style={{ flex: 1 }}
        compassEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionPosition={{ bottom: -50, right: -50 }}
        styleURL='mapbox://styles/yabbee/cl93j1d3a000714ntdoue4ucq'
        onPress={handleMapPress}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate:
              formData.location.value.coordinates.length > 0
                ? formData.location.value.coordinates
                : [-122.4194, 37.7749],
            zoomLevel: 0.5,
            animationMode: 'flyTo',
            animationDuration: 1100,
          }}
        />
        {formData.location.value.coordinates.length > 0 && (
          <MarkerView
            id={formData.location.value.coordinates[0].toString()}
            coordinate={[formData.location.value.coordinates[0], formData.location.value.coordinates[1]]}
            allowOverlap={true}
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
              maxHeight: 200,
            }}
          >
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
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
                  <VectorIcon.II
                    name='location-sharp'
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
