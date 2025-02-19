import { Camera } from '@rnmapbox/maps';
import Mapbox from '@rnmapbox/maps';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Header } from './Header';
import { useNavigation } from '@react-navigation/native';
import { UserStackNavigatorProps } from '../navigations';
import { getPostsByUserIdAndRegion } from '../../../query';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../query/queryKeys';
import { currentSpaceAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { PostType } from '../../../types';
import { MapPostThumbnail } from '../../../components';

type IPostsByRegion = {
  userId: string;
};

export const PostsByRegion: React.FC<IPostsByRegion> = ({ userId }) => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const userStackNavigation = useNavigation<UserStackNavigatorProps>();
  const [placeInfo, setPlaceInfo] = useState<string | null>(null);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [currentSpace, _] = useRecoilState(currentSpaceAtom);

  const { data, status: getPostsByUserIdAndRegionStatus } = useQuery({
    queryKey: [queryKeys.postsByUserIdAndRegion, userId],
    queryFn: () => getPostsByUserIdAndRegion({ userId, spaceId: currentSpace._id }),
  });

  const onRegionDidChange = async (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    // Fetch place information using Mapbox Geocoding API
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${neLng},${neLat}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setPlaceInfo(data.features[0].place_name);
      }
    } catch (error) {
      console.error('Error fetching place information:', error);
    }
  };

  const onMapPostThumbnailPress = (post: PostType, index: number) => {
    userStackNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: { posts: data?.posts, index: index },
      },
    });
  };

  const renderMarkers = () => {
    if (!data?.posts.length) {
      return null;
    }
    const list = data.posts.map((post: PostType, index: number) => {
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

  const onMapIdle = (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    const latitudeDelta = neLat - swLat;
    const longitudeDelta = neLng - swLng;
  };

  return (
    <View style={{ flex: 1 }}>
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
        onMapIdle={onRegionDidChange}
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
        {/* ここ, regionViewの時はfloatingで影つけたいな。。。観づらいから */}
        <Header
          userId={userId}
          viewPostsType='region'
          customStyle={
            {
              // position: 'absolute',
              // top: 0,
              // left: 0,
              // right: 0,
            }
          }
        />
        {placeInfo && (
          <View style={{ position: 'absolute', top: 500, alignSelf: 'center' }}>
            <Text style={{ color: 'red' }}>{placeInfo}</Text>
          </View>
        )}

        {renderMarkers()}
        {getPostsByUserIdAndRegionStatus === 'pending' && (
          <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
            <ActivityIndicator size={'small'} color={'white'} />
          </View>
        )}
      </Mapbox.MapView>
    </View>
  );
};
