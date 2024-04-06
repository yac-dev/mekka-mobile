import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image as ExpoImage } from 'expo-image';
import { PostType, TagType } from '../../../types';
import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
import { useMapPostsState } from '../hooks/useMapPostsState';
// import { MapPostThumbnail } from '../../../components/PostThumbnail';

type MapPostsProps = {
  tag: TagType;
};

export const MapPosts: React.FC<MapPostsProps> = ({ tag }) => {
  const { apiResult, requestApi } = useGetPostsByTagIdAndRegion();
  const { mapRef, region, onRegionChangeComplete } = useMapPostsState();

  const renderMarkers = () => {
    return (
      <View>
        {apiResult.data?.posts.map((post: PostType, index: number) => (
          <Marker
            key={index}
            tracksViewChanges={false}
            coordinate={{
              latitude: post.location.coordinates[1],
              longitude: post.location.coordinates[0],
            }}
          >
            <TouchableOpacity
              style={{ width: 54, height: 54, padding: 3, borderRadius: 8, backgroundColor: 'white' }}
              disabled={apiResult.status === 'loading'}
              onPress={() => {
                // NOTE: currenPostの選択
                // setCurrentPost(post);
                // setCurrentIndex(index);
                // props.navigation.navigate({
                //   name: 'ViewPostStackNavigator',
                //   params: { screen: 'ViewPost', params: { post } },
                // });
              }}
            >
              <View style={{ width: '100%', height: '100%' }}>
                {/* NOTE: videoに関してもやらんといかん。 */}
                <ExpoImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 9,
                  }}
                  source={{ uri: post.contents[0].data }}
                  contentFit='cover'
                  transition={200} // このanimationかなりいい。
                />
              </View>
            </TouchableOpacity>
          </Marker>
        ))}
      </View>
    );
  };

  // if (haveLocationTagsBeenFetched) {

  // 最終的な戦略としては、今スマホの画面内に収まっている地図の範囲内のデータをとってくる手法だね。多分、airbnbはそんなかんじだと思う。
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
      {apiResult.status === 'loading' ? (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      ) : null}
    </View>
  );
};