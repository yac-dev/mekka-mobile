import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { PostType, TagType } from '../../../types';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import { useMapPostsState } from '../hooks/useMapPostsState';
import { MapPostThumbnail } from '../../../components/PostThumbnail/MapPostThumbnail';
import { TagScreenContext } from '../providers';

type MapPostsProps = {
  // tag: TagType;
};

export const MapPosts: React.FC<MapPostsProps> = () => {
  const { mapRef, region, onRegionChangeComplete, getPostsByTagIdAndRegionResult, mapPostInitialFetchCompleted } =
    useContext(TagScreenContext);
  // const { apiResult, requestApi } = useGetPostsByTagIdAndRegion();
  // const { mapRef, region, onRegionChangeComplete } = useMapPostsState();

  // useEffect(() => {
  //   requestApi({ tagId: tag._id, region });
  // }, [region]);

  const onMapPostThumbnailPress = () => {
    console.log('map post press');
    // NOTE: currenPostの選択
    // setCurrentPost(post);
    // setCurrentIndex(index);
    // props.navigation.navigate({
    //   name: 'ViewPostStackNavigator',
    //   params: { screen: 'ViewPost', params: { post } },
    // });
  };

  const renderMarkers = () => {
    return getPostsByTagIdAndRegionResult.data?.posts.map((post: PostType, index: number) => (
      <MapPostThumbnail
        post={post}
        onMapPostThumbnailPress={onMapPostThumbnailPress}
        isPressDisabled={getPostsByTagIdAndRegionResult.status === 'loading'}
      />
    ));
  };

  // 最終的な戦略としては、今スマホの画面内に収まっている地図の範囲内のデータをとってくる手法。airbnbみたいに。
  // 多分だけど、、、今のregionを基本として、latitudeは+-20, longitudeが+-50、みたいな感じの範囲内でqueryをする。さらにその上で、latitude deltaとlongitude deltaも考慮に入れると。

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
