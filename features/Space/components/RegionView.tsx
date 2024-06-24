import React, { useContext, useRef, useEffect, useState } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { PostType, TagType } from '../../../types';
import { MapPostThumbnail } from '../../../components/PostThumbnail/MapPostThumbnail';
import { TagScreenContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { TagScreenStackNavigatorProps } from '../../../navigations';
import { useRecoilValue } from 'recoil';
import { getPostsByTagIdAndRegionResultAtomFamily, currentRegionAtomFamily } from '../atoms';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import { SpaceStackNavigatorProps } from '../../../navigations/SpaceStackNavigator';
import { useRecoilState } from 'recoil';
import * as Haptics from 'expo-haptics';

type IRegionView = {
  tag: TagType;
};

export const RegionView: React.FC<IRegionView> = ({ tag }) => {
  const { requestGetPostsByTagIdAndRegion } = useGetPostsByTagIdAndRegion(tag._id);
  const getPostsByTagIdAndRegionResult = useRecoilValue(getPostsByTagIdAndRegionResultAtomFamily(tag._id));
  const [currentRegion, setCurrentRegion] = useRecoilState(currentRegionAtomFamily(tag._id));
  const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
  const mapRef = useRef<MapView>(null);
  const isFirstRender = useRef(true);
  const [initialFetch, setInitialFetch] = useState<boolean>(false);

  const onRegionChangeComplete = (region: Region) => {
    setCurrentRegion(region);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // firstRenderの時だけ
  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return;
    // }
    requestGetPostsByTagIdAndRegion({ tagId: tag._id, region: currentRegion });
  }, []);
  // current region変わるたびに、requestを送る。

  useEffect(() => {
    requestGetPostsByTagIdAndRegion({ tagId: tag._id, region: currentRegion });
  }, [currentRegion]);

  //1,  map postがあれば0に近づけるのね。

  useEffect(() => {
    if (
      getPostsByTagIdAndRegionResult.status === 'success' &&
      getPostsByTagIdAndRegionResult.data?.posts.length &&
      !initialFetch
    ) {
      setInitialFetch(true);
      const firstPost = getPostsByTagIdAndRegionResult.data?.posts[0];
      const newLat = firstPost.location.coordinates[1] - 0.0065;
      mapRef.current?.animateToRegion({
        latitude: newLat,
        longitude: firstPost.location.coordinates[0],
        latitudeDelta: 50.0922,
        longitudeDelta: 50.0421,
      });
    }
  }, [getPostsByTagIdAndRegionResult]);

  const onMapPostThumbnailPress = (post: PostType, index: number) => {
    spaceNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: { screen: 'ViewRegionPost', params: { tag, currentPostIndex: index } },
    });
  };

  const renderMarkers = () => {
    return getPostsByTagIdAndRegionResult.data?.posts.map((post: PostType, index: number) => (
      <MapPostThumbnail
        post={post}
        index={index}
        onMapPostThumbnailPress={onMapPostThumbnailPress}
        isPressDisabled={getPostsByTagIdAndRegionResult.status === 'loading'}
      />
    ));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MapView
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
      )}
    </View>
  );
};
