import React, { useContext, useRef, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { PostType, TagType } from '../../../types';
import { MapPostThumbnail } from '../../../components/PostThumbnail/MapPostThumbnail';
import { TagScreenContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { TagScreenStackNavigatorProps } from '../../../navigations';
import { useRecoilValue } from 'recoil';
import { getPostsByTagIdAndRegionResultAtomFamily, currentRegionAtomFamily } from '../atoms';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';

type IRegionView = {
  tag: TagType;
};

export const RegionView: React.FC<IRegionView> = ({ tag }) => {
  const { requestGetPostsByTagIdAndRegion } = useGetPostsByTagIdAndRegion(tag._id);
  const getPostsByTagIdAndRegionResult = useRecoilValue(getPostsByTagIdAndRegionResultAtomFamily(tag._id));
  const currentRegion = useRecoilValue(currentRegionAtomFamily(tag._id));

  const { region, onRegionChangeComplete, setCurrentPost, onCurrentPostIndexChange } = useContext(TagScreenContext);
  const navigation = useNavigation<TagScreenStackNavigatorProps>();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    requestGetPostsByTagIdAndRegion({ tagId: tag._id, region: currentRegion });
  }, []);

  useEffect(() => {
    if (getPostsByTagIdAndRegionResult.status === 'success' && getPostsByTagIdAndRegionResult.data?.posts.length) {
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
    setCurrentPost(post);
    onCurrentPostIndexChange(index);
    navigation.navigate('ViewPostStackNavigator');
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
        initialRegion={region}
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
