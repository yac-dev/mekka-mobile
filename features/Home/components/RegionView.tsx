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
  ActivityIndicator,
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
import { PostType, SpaceType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { useNavigation } from '@react-navigation/native';
import { HomeDrawerNavigatorProps, HomeStackNavigatorProps } from '../navigations/HomeStackNavigator';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { queryKeys, getPostsByTagIdAndRegion } from '../../../query';
import { AppButton, MapPostThumbnail } from '../../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moments } from './Moments';
import * as Haptics from 'expo-haptics';
import { Icons } from '../../../Icons/images';

const windowWidth = Dimensions.get('window').width;

type RegionViewProps = {
  openAuthMenuBottomSheet: (index: number) => void;
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  openChooseViewBottomSheet: (index: number) => void;
  openAddNewPostMenuBottomSheet: (index: number) => void;
  currentViewIndex: number;
};

// mapからgridに切り替えると、currentTagが切り替わってない感じ。。。多分何かおかしい。
export const RegionView: React.FC<RegionViewProps> = ({
  openAuthMenuBottomSheet,
  openAddNewSpaceMenuBottomSheet,
  openChooseViewBottomSheet,
  openAddNewPostMenuBottomSheet,
  currentViewIndex,
}) => {
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [logsTable, setLogsTable] = useRecoilState(logsTableAtom);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 100.0922,
    longitudeDelta: 100.0421,
  });

  const homeDrawerNavigation = useNavigation<HomeDrawerNavigatorProps>();

  const {
    data: postsByTagIdAndRegionData,
    status: postsByTagIdAndRegionStatus,
    refetch: refetchPostsByTagIdAndRegion,
  } = useQuery({
    queryKey: [queryKeys.postsByTagIdAndRegion, currentTagsTableBySpaceIds[currentSpace._id]._id, currentRegion],
    queryFn: () =>
      getPostsByTagIdAndRegion({
        tagId: currentTagsTableBySpaceIds[currentSpace._id]._id,
        region: currentRegion,
      }),
  });

  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const mapRef = useRef<Mapbox.MapView>(null);
  const scrollViewRef = useRef(null);

  const onMapIdle = (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    const latitudeDelta = neLat - swLat;
    const longitudeDelta = neLng - swLng;

    // getPostsByTagIdAndRegion({
    //   tagId: currentTagsTableBySpaceIds[currentSpace._id]._id,
    //   region: {
    //     latitude: feature.properties.center[1],
    //     longitude: feature.properties.center[0],
    //     latitudeDelta: latitudeDelta,
    //     longitudeDelta: longitudeDelta,
    //   },
    // });
    setCurrentRegion({
      latitude: feature.properties.center[1],
      longitude: feature.properties.center[0],
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
  };

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
        offset: Math.max(0, offset),
        animated: true,
      });
    }
  };

  const onTabPress = (tab) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
              backgroundColor: isFocused ? Colors.iconColors[item.color] : 'rgb(30,30,30)',
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
              tintColor={isFocused ? 'white' : 'rgb(170,170,170)'}
            />
            <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(170,170,170)', fontSize: 11 }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onMapPostThumbnailPress = (post: PostType, index: number) => {
    homeStackNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: { posts: postsByTagIdAndRegionData?.posts, index: index },
      },
    });
  };

  const renderMarkers = () => {
    if (!postsByTagIdAndRegionData?.posts.length) {
      return null;
    }
    const list = postsByTagIdAndRegionData?.posts.map((post: PostType, index: number) => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.spacesContainer}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
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
              homeDrawerNavigation.toggleDrawer();
            }}
          >
            <VectorIcon.II name='menu' color={Colors.white} size={18} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={mySpaces}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* <AppButton.Icon
          onButtonPress={() => openAuthMenuBottomSheet(0)}
          customStyle={{ width: 30, height: 30, backgroundColor: 'rgb(50,50,50)' }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='account' size={20} color={Colors.white} />
        </AppButton.Icon> */}
      </View>

      {/* <View style={{ backgroundColor: 'black', paddingTop: 10, paddingBottom: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}
              onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
              activeOpacity={0.7}
            >
              <View style={{ marginRight: 8 }}>
                <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 25 }}>{currentSpace.name}</Text>
              </View>
              <VectorIcon.MCI name='chevron-right' size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      {/* defaultの位置はnew yorkでいい。fetchが */}
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
        <View style={{ height: 60 }}>
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: 12,
              paddingTop: 8,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ flexDirection: 'column' }}
                onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 25, marginBottom: 4 }}>
                    {currentSpace.name}
                  </Text>

                  <VectorIcon.MCI name='chevron-right' size={22} color={Colors.white} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', marginRight: 8 }}>
                    {currentSpace.totalMembers} members
                  </Text>
                  {!currentSpace.isPublic ? (
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Private</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    width: 38,
                    height: 38,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...Platform.select({
                      ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 5, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                      },
                      android: {
                        elevation: 5,
                      },
                    }),
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    openAddNewPostMenuBottomSheet(0);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  }}
                >
                  <VectorIcon.MCI name='plus' size={25} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    width: 38,
                    height: 38,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...Platform.select({
                      ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 5, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                      },
                      android: {
                        elevation: 5,
                      },
                    }),
                  }}
                  onPress={() => {
                    homeStackNavigation.navigate('MomentsStackNavigator');
                  }}
                >
                  <ExpoImage
                    style={{ width: 20, height: 20 }}
                    source={require('../../../assets/forApp/ghost.png')}
                    contentFit='contain'
                    tintColor={Colors.white}
                  />
                  {momentLogs[currentSpace._id] ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: -3,
                        right: -5,
                        width: 16,
                        height: 16,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 10 }}>{momentLogs[currentSpace._id]}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...Platform.select({
                      ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 5, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                      },
                      android: {
                        elevation: 5,
                      },
                    }),
                  }}
                  onPress={() => {
                    openChooseViewBottomSheet(0);
                  }}
                >
                  {currentViewIndex === 0 ? (
                    <VectorIcon.FI name='nav-icon-grid' size={15} color={'white'} />
                  ) : (
                    <ExpoImage
                      style={{ width: 20, height: 20 }}
                      source={Icons.globe}
                      contentFit='contain'
                      tintColor={Colors.white}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Camera
          defaultSettings={{
            centerCoordinate: [-122.4324, 37.78825],
            zoomLevel: 0.5,
            animationMode: 'flyTo',
            animationDuration: 1100,
          }}
        />
        {renderMarkers()}
        {postsByTagIdAndRegionStatus === 'pending' && (
          <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
            <ActivityIndicator size={'small'} color={'white'} />
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            // left: 0,
            // right: 0,
            // zIndex: 1000,
            height: 55,
            // backgroundColor: 'black',
            backgroundColor: 'transparent',
            paddingVertical: 8,
            // borderTopWidth: 0.3,
            // borderTopColor: 'rgb(100,100,100)',
            width: '100%',
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={currentSpace?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
      </Mapbox.MapView>
    </SafeAreaView>
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
