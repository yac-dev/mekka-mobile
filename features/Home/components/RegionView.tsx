import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Dimensions,
  Platform,
} from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { useRecoilState } from 'recoil';
import {
  currentSpaceAtom,
  logsTableAtom,
  momentLogsAtom,
  mySpacesAtom,
  currentTagAtomFamily,
  currentTagsTableBySpaceIdsAtom,
} from '../../../recoil';
import { SpaceType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations/HomeStackNavigator';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export const RegionView = () => {
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [logsTable, setLogsTable] = useRecoilState(logsTableAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const mapRef = useRef<Mapbox.MapView>(null);
  const scrollViewRef = useRef(null);

  // region viewの場合は、gridみたいなspaceごとにcomponent分けているわけでないからな。。。

  useEffect(() => {
    // setCurrentTagBySpaceId(curr)
    console.log('currentSpace', currentSpace);
  }, [currentSpace]);

  useEffect(() => {
    scrollToCenter();
  }, [currentTagsTableBySpaceIds, itemWidths, currentSpace.tags.length]);

  const onSpacePress = (item: SpaceType, index: number) => {
    setCurrentSpace(item);
  };

  const renderItem = ({ item, index }: { item: SpaceType; index: number }) => {
    const isFocused = currentSpace._id === item._id;
    const momentLogsCount = momentLogs[item._id] || 0;
    const logs =
      logsTable[item._id] && Object.values(logsTable[item._id]).reduce((accumlator, logs) => accumlator + logs, 0);
    logsTable[item._id] && Object.values(logsTable[item._id]).reduce((accumlator, logs) => accumlator + logs, 0);

    const totalLogs = logs + momentLogsCount;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={item._id}
        style={{
          marginRight: 8,
          borderBottomWidth: isFocused ? 2 : 0,
          borderBottomColor: 'white',
          paddingVertical: 10,
        }}
        onPress={() => onSpacePress(item, index)}
      >
        <View
          style={{
            width: 30,
            aspectRatio: 1,
            borderRadius: 22.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 22.5 }}
            source={{ uri: item.icon }}
            contentFit='contain'
          />
          {totalLogs ? (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 12,
                backgroundColor: 'black',
                position: 'absolute',
                top: -5,
                right: -5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                }}
              >
                <Text style={{ color: 'white', fontSize: 10 }}>{totalLogs}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const onItemLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setItemWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const scrollToCenter = () => {
    if (!currentTagsTableBySpaceIds) return;
    const currentIndex = currentSpace.tags.findIndex(
      (tag) => tag._id === currentTagsTableBySpaceIds[currentSpace._id]._id
    );
    if (currentIndex !== 0 && currentIndex !== 1 && itemWidths.length === currentSpace.tags.length) {
      const itemWidth = itemWidths[currentIndex];
      const offset =
        itemWidths.slice(0, currentIndex).reduce((sum, width) => sum + width, 0) - (windowWidth / 2 - itemWidth / 2);
      scrollViewRef.current?.scrollToOffset({
        offset: Math.max(0, offset) + 20,
        animated: true,
      });
    }
  };

  const onTabPress = (tab) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTagsTableBySpaceIds((prev) => {
      return {
        ...prev,
        [currentSpace._id]: tab,
      };
    });
  };

  const renderTab = ({ item, index }) => {
    const isFocused = currentTagsTableBySpaceIds[currentSpace._id]._id === item._id;
    return (
      <View onLayout={(event) => onItemLayout(event, index)}>
        <TouchableOpacity
          // key={route.key}
          activeOpacity={0.7}
          onPress={() => onTabPress(item)}
          onLongPress={() => console.log('hello')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: isFocused ? Colors.iconColors[item.color] : 'rgb(70,70,70)',
              borderRadius: 130,
              // ...Platform.select({
              //   ios: {
              //     shadowColor: 'black',
              //     shadowOffset: { width: 6, height: 6 },
              //     shadowOpacity: 1,
              //     shadowRadius: 8,
              //   },
              //   android: {
              //     elevation: 5,
              //   },
              // }),
            }}
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={{ uri: item.icon?.url }}
              tintColor={'white'}
            />
            <Text numberOfLines={1} style={{ color: 'white', fontSize: 13 }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.spacesContainer}>
        <FlatList
          data={mySpaces}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: 32,
                  aspectRatio: 1,
                  borderRadius: 25,
                  backgroundColor: 'rgb(50,50,50)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // openAddNewSpaceMenuBottomSheet(0);
                  console.log('home');
                }}
              >
                <VectorIcon.II name='home' color={Colors.white} size={18} />
                <View
                  style={{
                    backgroundColor: 'black',
                    width: 18,
                    height: 18,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: -4,
                    right: -5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                    }}
                  >
                    <VectorIcon.II name='add' size={11} color={'black'} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

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
        // onMapIdle={onMapIdle}
      >
        <View
          style={{
            flexDirection: 'column',
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}
              onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
              activeOpacity={0.7}
            >
              <View style={{ marginRight: 5 }}>
                <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 27 }}>{currentSpace.name}</Text>
              </View>
              <VectorIcon.MI name='chevron-right' size={23} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={currentSpace?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 6, paddingTop: 6 }}
          />
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  spacesContainer: {
    backgroundColor: 'black',
    // flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: 'rgb(40,40,40)',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgb(100,100,100)',

    // borderBottomWidth: 0.3,
    // borderBottomColor: 'white',
  },
});

// import React, { useContext, useRef, useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { PostType, TagType } from '../../../types';
// import { MapPostThumbnail } from '../../../components/PostThumbnail/MapPostThumbnail';
// import { useNavigation } from '@react-navigation/native';
// import { useRecoilValue } from 'recoil';
// // import { getPostsByTagIdAndRegionResultAtomFamily, currentRegionAtomFamily, getPostsByTagIdAtomFamily } from '../atoms';
// // import { useGetPostsByTagIdAndRegion } from '../hooks/useGetPostsByTagIdAndRegion';
// // import { SpaceStackNavigatorProps } from '../navigations/SpaceStackNavigator';
// import { useRecoilState } from 'recoil';
// import { currentTagAtom } from '../../../recoil';
// import axios from 'axios';
// import Config from 'react-native-config';

// import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
// import { VectorIcon } from '../../../Icons';

// Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);

// type IRegionView = {
//   tag: TagType;
// };

// // reverse geocoding 後で使えそう。。。
// async function getCityAndCountry(latitude: number, longitude: number) {
//   try {
//     const response = await axios.get(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${Config.MAPBOX_ACCESS_TOKEN}`
//     );

//     const features = response.data.features;
//     const cityFeature = features.find((f: any) => f.place_type.includes('place'));
//     const countryFeature = features.find((f: any) => f.place_type.includes('country'));
//     const continentFeature = features.find((f: any) => f.place_type.includes('continent'));

//     console.log('cityFeature', cityFeature);
//     console.log('countryFeature', countryFeature);
//     console.log('continentFeature', continentFeature);

//     return {
//       city: cityFeature?.text,
//       country: countryFeature?.text,
//       continent: continentFeature?.text,
//     };
//   } catch (error) {
//     console.error('Error fetching location data:', error);
//     return null;
//   }
// }

// export const RegionView: React.FC<IRegionView> = ({ tag }) => {
//   // const { requestGetPostsByTagIdAndRegion } = useGetPostsByTagIdAndRegion(tag._id);
//   // const getPostsByTagIdAndRegionResult = useRecoilValue(getPostsByTagIdAndRegionResultAtomFamily(tag._id));
//   // const [currentRegion, setCurrentRegion] = useRecoilState(currentRegionAtomFamily(tag._id));
//   // const [currentTag] = useRecoilState(currentTagAtom);
//   // const spaceNavigation = useNavigation<SpaceStackNavigatorProps>();
//   const mapRef = useRef<Mapbox.MapView>(null);
//   // const isFirstRender = useRef(true);
//   // const [initialFetch, setInitialFetch] = useState<boolean>(false);
//   // const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));

//   // const onRegionChangeComplete = (region: Region) => {
//   //   setCurrentRegion(region);
//   //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//   // };
//   // initial fetch云々も必要、だるいけど。

//   // 結局は、これを使ってユーザーにどう楽しんで欲しいかだよね。「すごく綺麗な公園！」なんて投稿がされたら、それを見たユーザーがこの地図を頼りにいく感じなのかな。。。あくまで補助的な役割なのかな、意味的には。
//   const onMapIdle = (feature: Mapbox.MapState) => {
//     const { bounds } = feature.properties;
//     const [neLng, neLat] = bounds.ne;
//     const [swLng, swLat] = bounds.sw;

//     const latitudeDelta = neLat - swLat;
//     const longitudeDelta = neLng - swLng;

//     // requestGetPostsByTagIdAndRegion({
//     //   tagId: tag._id,
//     //   region: {
//     //     latitude: feature.properties.center[1],
//     //     longitude: feature.properties.center[0],
//     //     latitudeDelta: latitudeDelta,
//     //     longitudeDelta: longitudeDelta,
//     //   },
//     // });
//   };

//   // 最初は、currentRegionは使わず、locationがあるpostを最大30個程程
//   // useEffect(() => {
//   //   requestGetPostsByTagIdAndRegion({
//   //     tagId: tag._id,
//   //     region: {
//   //       latitude: 37.78825,
//   //       longitude: -122.4324,
//   //       latitudeDelta: 100.0922,
//   //       longitudeDelta: 100.0421,
//   //     },
//   //   });
//   // }, [currentTag]);
//   //

//   // console.log('getPostsByTagIdResult', getPostsByTagIdResult);

//   // useEffect(() => {
//   //   if (
//   //     getPostsByTagIdAndRegionResult.status === 'success' &&
//   //     getPostsByTagIdAndRegionResult.data?.posts.length &&
//   //     !initialFetch
//   //   ) {
//   //     setInitialFetch(true);
//   //     const firstPost = getPostsByTagIdAndRegionResult.data?.posts[0];
//   //     const newLat = firstPost.location.coordinates[1] - 0.0065;
//   //     mapRef.current?.animateToRegion({
//   //       latitude: newLat,
//   //       longitude: firstPost.location.coordinates[0],
//   //       latitudeDelta: 50.0922,
//   //       longitudeDelta: 50.0421,
//   //     });
//   //   }
//   // }, [getPostsByTagIdAndRegionResult]);

//   // const onMapPostThumbnailPress = (post: PostType, index: number) => {
//   //   spaceNavigation.navigate({
//   //     name: 'ViewPostStackNavigator',
//   //     params: {
//   //       screen: 'ViewPost',
//   //       params: { posts: getPostsByTagIdAndRegionResult.data?.posts, index: index },
//   //     },
//   //   });
//   // };

//   // const renderMarkers = () => {
//   //   if (!getPostsByTagIdAndRegionResult.data?.posts.length) {
//   //     return null;
//   //   }
//   //   const list = getPostsByTagIdAndRegionResult.data?.posts.map((post: PostType, index: number) => {
//   //     if (post.location?.coordinates.length) {
//   //       return (
//   //         <MapPostThumbnail
//   //           key={index}
//   //           post={post}
//   //           index={index}
//   //           onMapPostThumbnailPress={onMapPostThumbnailPress}
//   //           isPressDisabled={false}
//   //         />
//   //       );
//   //     } else {
//   //       return null;
//   //     }
//   //   });
//   //   return <>{list}</>;
//   // };

//   return (
//     <Mapbox.MapView
//       ref={mapRef}
//       style={{ flex: 1 }}
//       compassEnabled={false}
//       logoEnabled={false}
//       scaleBarEnabled={false}
//       attributionPosition={{ bottom: -50, right: -50 }}
//       styleURL='mapbox://styles/yabbee/cl93j1d3a000714ntdoue4ucq'
//       // onRegionDidChange={(feature) => onRegionChangeComplete(feature)}
//       regionDidChangeDebounceTime={100}
//       onMapIdle={onMapIdle}
//     >
//       {/* defaultの位置はnew yorkでいい。fetchが */}
//       <Camera
//         defaultSettings={{
//           centerCoordinate: [-122.4324, 37.78825],
//           zoomLevel: 0.5,
//           animationMode: 'flyTo',
//           animationDuration: 1100,
//         }}
//       />
//       {/* {renderMarkers()}
//       {getPostsByTagIdAndRegionResult.status === 'loading' && (
//         <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
//           <ActivityIndicator size={'small'} color={'white'} />
//         </View>
//       )} */}
//     </Mapbox.MapView>
//   );
// };
