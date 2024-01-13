import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryTextColor } from '../themes/text';
import { Ionicons } from '@expo/vector-icons';
import TagView from '../features/Space/pages/TagView';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import backendAPI from '../apis/backend';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { GlobalContext } from '../contexts/GlobalContext';
import { TagViewContext } from '../features/Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import ViewPostStackNavigator from './ViewPostStackNavigator';
import { Image as ExpoImage } from 'expo-image';
import Map from '../features/MapView/pages/Map';
import { MapViewStackContext } from '../features/MapView/context';
import { TagRootContext } from '../contexts/TagRootContext';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const MapViewStackNavigator: React.FC = (props) => {
  const { setMapPosts, setCurrentPost, setCurrentIndex, mapViewPostsFetchingStatus, setMapViewPostsFetchingStatus } =
    useContext(TagRootContext);
  const [fetchingStatus, setFetchingStatus] = useState('idle');
  const [posts, setPosts] = useState([]);
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 100.0922,
    longitudeDelta: 100.0421,
  });
  const [fetchingPosts, setFetchingPosts] = useState({
    status: 'idle', // 'idle', 'loading', 'success', 'error'かな。
    data: [],
    error: '',
  });

  const getPostsByTagIdAndRegion = async () => {
    setMapViewPostsFetchingStatus('loading');
    const result = await backendAPI.post(`/posts/tag/${props.tagObject.tag._id}/region`, { region });
    const { posts } = result.data;
    setMapPosts(posts);
    setMapViewPostsFetchingStatus('success');
  };
  console.log('fetching state -> ', fetchingStatus);
  console.log('posts -> ', posts);

  // props.tagObject.tag._idを使ってqueryをしていくと。
  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      getPostsByTagIdAndRegion();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [region]);

  // const LATITUDE_DELTA = 100; // zoom levelを後でやろうか。。
  // const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  return (
    <MapViewStackContext.Provider
      value={{
        posts,
        setPosts,
        mapRef,
        region,
        setRegion,
        onRegionChangeComplete,
        fetchingStatus,
        setCurrentPost,
        setCurrentIndex,
      }}
    >
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Map'
            component={Map}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTransparent: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: primaryTextColor,
              },
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </MapViewStackContext.Provider>
  );
};

export default MapViewStackNavigator;
