import React, { useState, useEffect, useContext, useMemo, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { Video } from 'expo-av';
import backendAPI from '../../../apis/backend';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const LocationsView = (props) => {
  const { isIpad, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const snapPoints = useMemo(() => ['60%', '80%'], []);
  const locationsViewPostsBottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const { height, width } = Dimensions.get('window');
  const LATITUDE = props.locationTag.point.coordinates[1]; // これ、bottom sheetでかくれないようにしなきゃ。
  const LONGITUDE = props.locationTag.point.coordinates[0];
  const LATITUDE_DELTA = 100; // zoom levelを後でやろうか。。。
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const { spaceAndUserRelationship, navigation, space } = useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const getPostsByLocationTagId = async () => {
  //   const result = await backendAPI.get(`/posts/locationtag/${props.locationTag._id}/space/${space._id}`);
  //   const { posts } = result.data;
  //   setPosts(posts);
  //   setHavePostsBeenFetched(true);
  // };

  // useEffect(() => {
  //   getPostsByLocationTagId();
  // }, []);

  // useEffect(() => {
  //   const newLat = props.selectedLocationTag.point.coordinates[1] - 0.0065;
  //   mapRef.current.animateToRegion({
  //     latitude: newLat,
  //     longitude: props.selectedLocationTag.point.coordinates[0],
  //     latitudeDelta: 0.0322,
  //     longitudeDelta: 0.0221,
  //   });
  // }, []);

  const renderItem = useCallback((post) => {
    if (post.content.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => props.navigation.navigate({ name: 'ViewPost', params: { post } })}
        >
          <Video source={{ uri: post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => props.navigation.navigate({ name: 'ViewPost', params: { post } })}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: post.content.data }}
            placeholder={blurhash}
            contentFit='contain'
            transition={1000}
          />
        </TouchableOpacity>
      );
    }
  }, []);

  const renderPosts = () => {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={locationsViewPostsBottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => locationsViewPostsBottomSheetRef.current.close()}
            style={{ marginBottom: 10, marginLeft: 10 }}
          >
            <Ionicons name='close-circle' size={30} color='white' />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{ width: 50, height: 50, marginRight: 15, borderRadius: 10 }}
                source={{ uri: props.locationTag.icon }}
                placeholder={blurhash}
                contentFit='contain'
                transition={1000}
                tintColor={props.locationTag.iconType === 'icon' ? props.locationTag.color : null}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 5, fontWeight: 'bold' }}>
                  {props.locationTag.name}
                </Text>
                <Text style={{ color: 'rgb(170,170,170)' }}>{props.locationTag.count}posts</Text>
              </View>
            </View>
            {authData._id === props.locationTag.createdBy ? (
              <TouchableOpacity
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: 'white',
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {havePostsBeenFetched ? (
            <FlatList
              numColumns={3}
              data={posts}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item._id}
              // refreshControl={
              //   <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
              // }
            />
          ) : (
            <ActivityIndicator />
          )}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  };

  // selectedLocationTag

  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <Text style={{ color: 'red' }}>Hello</Text>
    </View>
  );
};

export default LocationsView;
