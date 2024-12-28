import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserStackNavigatorParams } from '../navigations/UserStackNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { currentTagAtom } from '../../../recoil';
import axios from 'axios';
import Config from 'react-native-config';

import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { VectorIcon } from '../../../Icons';

// tabViewを使って地図を描画したい気持ちでいっぱいなんだが、
// そもそもuser page自体をstackscreenで表示しなければいいのではないかね。。。？discordみたいにさ。
// うん。bottom sheetでまあいけると思う。
// type UserScreenProps = NativeStackScreenProps<UserStackNavigatorParams, 'User'>;
type IUser = {
  userId: string;
};

Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
// ここでuserのpostを引っ張ってくるところまでをまずやりたいね。

export const User: React.FC<IUser> = ({ userId }) => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const onMapIdle = (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    const latitudeDelta = neLat - swLat;
    const longitudeDelta = neLng - swLng;
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
      {/* {renderMarkers()}
      {getPostsByTagIdAndRegionResult.status === 'loading' && (
        <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
          <ActivityIndicator size={'small'} color={'white'} />
        </View>
      )} */}
    </Mapbox.MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
