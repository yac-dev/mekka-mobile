import React, { useContext, useRef, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { PostType, TagType } from '../../../types';
import { MapPostThumbnail } from '../../../components/PostThumbnail/MapPostThumbnail';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { getPostsByTagIdAndRegionResultAtomFamily, currentRegionAtomFamily, getPostsByTagIdAtomFamily } from '../atoms';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import { SpaceStackNavigatorProps } from '../../../navigations/SpaceStackNavigator';
import { useRecoilState } from 'recoil';
import * as Haptics from 'expo-haptics';
import { CurrentTagContext } from '../../../providers';
import axios from 'axios';
import Config from 'react-native-config';

import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { VectorIcon } from '../../../Icons';

Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);

type IRegionView = {
  tag: TagType;
};

// reverse geocoding 後で使えそう。。。
async function getCityAndCountry(latitude: number, longitude: number) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${Config.MAPBOX_ACCESS_TOKEN}`
    );

    const features = response.data.features;
    const cityFeature = features.find((f: any) => f.place_type.includes('place'));
    const countryFeature = features.find((f: any) => f.place_type.includes('country'));
    const continentFeature = features.find((f: any) => f.place_type.includes('continent'));

    console.log('cityFeature', cityFeature);
    console.log('countryFeature', countryFeature);
    console.log('continentFeature', continentFeature);

    return {
      city: cityFeature?.text,
      country: countryFeature?.text,
      continent: continentFeature?.text,
    };
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}

export const RegionView: React.FC<IRegionView> = ({ tag }) => {
  const { requestGetPostsByTagIdAndRegion } = useGetPostsByTagIdAndRegion(tag._id);
  const getPostsByTagIdAndRegionResult = useRecoilValue(getPostsByTagIdAndRegionResultAtomFamily(tag._id));
  const [currentRegion, setCurrentRegion] = useRecoilState(currentRegionAtomFamily(tag._id));
  const { currentTag } = useContext(CurrentTagContext);
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const mapRef = useRef<Mapbox.MapView>(null);
  const isFirstRender = useRef(true);
  const [initialFetch, setInitialFetch] = useState<boolean>(false);
  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));

  // const onRegionChangeComplete = (region: Region) => {
  //   setCurrentRegion(region);
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // };
  // initial fetch云々も必要、だるいけど。

  // 結局は、これを使ってユーザーにどう楽しんで欲しいかだよね。「すごく綺麗な公園！」なんて投稿がされたら、それを見たユーザーがこの地図を頼りにいく感じなのかな。。。あくまで補助的な役割なのかな、意味的には。
  const onMapIdle = (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    const latitudeDelta = neLat - swLat;
    const longitudeDelta = neLng - swLng;

    requestGetPostsByTagIdAndRegion({
      tagId: tag._id,
      region: {
        latitude: feature.properties.center[1],
        longitude: feature.properties.center[0],
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
    });
  };

  // 最初は、currentRegionは使わず、locationがあるpostを最大30個程程
  useEffect(() => {
    requestGetPostsByTagIdAndRegion({
      tagId: tag._id,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 100.0922,
        longitudeDelta: 100.0421,
      },
    });
  }, [currentTag]);
  //

  // console.log('getPostsByTagIdResult', getPostsByTagIdResult);

  // useEffect(() => {
  //   if (
  //     getPostsByTagIdAndRegionResult.status === 'success' &&
  //     getPostsByTagIdAndRegionResult.data?.posts.length &&
  //     !initialFetch
  //   ) {
  //     setInitialFetch(true);
  //     const firstPost = getPostsByTagIdAndRegionResult.data?.posts[0];
  //     const newLat = firstPost.location.coordinates[1] - 0.0065;
  //     mapRef.current?.animateToRegion({
  //       latitude: newLat,
  //       longitude: firstPost.location.coordinates[0],
  //       latitudeDelta: 50.0922,
  //       longitudeDelta: 50.0421,
  //     });
  //   }
  // }, [getPostsByTagIdAndRegionResult]);

  const onMapPostThumbnailPress = (post: PostType, index: number) => {
    spaceNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: { posts: getPostsByTagIdAndRegionResult.data?.posts, index: index },
      },
    });
  };

  const renderMarkers = () => {
    if (!getPostsByTagIdAndRegionResult.data?.posts.length) {
      return null;
    }
    const list = getPostsByTagIdAndRegionResult.data?.posts.map((post: PostType, index: number) => {
      if (post.location?.coordinates.length) {
        return (
          <MapPostThumbnail
            key={index}
            post={post}
            index={index}
            onMapPostThumbnailPress={onMapPostThumbnailPress}
            isPressDisabled={false}
          />
        );
      } else {
        return null;
      }
    });
    return <>{list}</>;
  };

  return (
    <Mapbox.MapView
      ref={mapRef}
      style={{ flex: 1 }}
      compassEnabled={false}
      logoEnabled={false}
      scaleBarEnabled={false}
      attributionPosition={{ bottom: -50, right: -50 }}
      styleURL='mapbox://styles/yabbee/cl93j1d3a000714ntdoue4ucq'
      // onRegionDidChange={(feature) => onRegionChangeComplete(feature)}
      regionDidChangeDebounceTime={100}
      onMapIdle={onMapIdle}
    >
      {/* defaultの位置はnew yorkでいい。fetchが */}
      <Camera
        defaultSettings={{
          centerCoordinate: [-122.4324, 37.78825],
          zoomLevel: 0.5,
          animationMode: 'flyTo',
          animationDuration: 1100,
        }}
      />
      {renderMarkers()}
      {getPostsByTagIdAndRegionResult.status === 'loading' && (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      )}
    </Mapbox.MapView>
  );
};

{
  /* <MapView
        userInterfaceStyle='dark'
        ref={mapRef}
        style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        showsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        initialRegion={currentRegion}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {renderMarkers()}
      </MapView>
      {getPostsByTagIdAndRegionResult.status === 'loading' && (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      )} */
}
