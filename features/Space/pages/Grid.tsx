import React, { useState, useRef, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import ChooseViewBottomSheet from './ChooseViewBottomSheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ViewPostsRootContext } from '../../SpaceMenuBottomSheet/contexts/ViewPostsRootContext';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Grid = (props) => {
  const [tabView, setTabView] = useState('Grid');
  const chooseViewBottomSheetRef = useRef(null);
  const { isIpad } = useContext(GlobalContext);
  const { posts, havePostsBeenFetched } = useContext(ViewPostsRootContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

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

  // refresh次のindicatorが出ないのは後で直そう。
  if (havePostsBeenFetched) {
    if (posts.length) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList
            style={{ paddingTop: 10 }}
            numColumns={3}
            data={posts}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id}
            // refreshControl={
            //   <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
            // }
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts in this tag channel...</Text>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default Grid;
