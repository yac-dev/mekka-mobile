import React, { useMemo, useContext, useCallback } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';

// rgb(35, 35, 35)
const LocationsViewPostsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['60%'], []);
  const {
    spaceMenuBottomSheetRef,
    currentSpaceAndUserRelationship,
    setCurrentSpaceAndUserRelationship,
    currentSpace,
    setCurrentSpace,
    isIpad,
    authData,
  } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const {
    locationsViewPostsBottomSheetRef,
    locationsViewPosts,
    haveLocationsViewPostsBeenFetched,
    setHaveLocationsViewPostsBeenFetched,
    selectedLocationTag,
    setSelectedLocationTag,
    isFetchingLocationsViewPosts,
    setIsFetchingLocationsViewPosts,
  } = useContext(SpaceRootContext);

  // const renderItem = useCallback((item) => {
  //   return (
  //     <FastImage
  //                 // onLoad={() => setInitialRender(false)}
  //                 style={{
  //                   width: '100%',
  //                   height: '100%',
  //                   borderRadius: 10,
  //                 }}
  //                 source={{ uri: route.params?.locationTag.icon }}
  //                 style={{ width: 35, height: 35, borderRadius: 8, marginBottom: 5 }}
  //                 tintColor={route.params?.locationTag.iconType === 'icon' ? route.params?.locationTag.color : null}
  //               />
  //   )
  // },[])
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
          <FastImage source={{ uri: post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
        </TouchableOpacity>
      );
    }
  }, []);

  const renderPosts = () => {
    if (isFetchingLocationsViewPosts) {
      return <ActivityIndicator />;
    } else {
      if (locationsViewPosts.length) {
        return (
          <FlatList
            data={locationsViewPosts}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id}
            style={{ marginTop: 10 }}
          />
        );
      } else {
        return <Text style={{ color: 'white', marginTop: 20, textAlign: 'center' }}>There are no posts yet.</Text>;
      }
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={locationsViewPostsBottomSheetRef}
      snapPoints={snapPoints}
      // backdropComponent={(backdropProps) => (
      //   <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      // )}
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
        {selectedLocationTag ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{ uri: selectedLocationTag.icon }}
                style={{ width: 45, height: 45, marginRight: 15, borderRadius: 10 }}
                tintColor={selectedLocationTag.iconType === 'icon' ? selectedLocationTag.color : null}
              />
              <Text style={{ color: 'white', fontSize: 20 }}>{selectedLocationTag.name}</Text>
            </View>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'white', borderRadius: 20, marginRight: 10 }}>
              <Text style={{ color: 'black' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {renderPosts()}
        {/* {locationsViewPosts.length ? <FlatList data={locationsViewPosts} renderItem={renderItem} keyExtractor={(item) => item._id} /> : null } */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default LocationsViewPostsBottomSheet;
