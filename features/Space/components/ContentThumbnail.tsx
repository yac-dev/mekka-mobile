import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { TagViewContext } from '../contexts/TagViewContext';
import Skeleton from './Skeleton';

const ContentThumbnail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isIpad } = useContext(GlobalContext);
  const { setCurrentPost, setCurrentIndex, currentIndex } = useContext(TagViewContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  const handleImageLoad = () => {
    setIsLoading(false);
    console.log('loaded');
  };

  if (props.post.contents[0].type === 'video') {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        onPress={() => {
          setCurrentPost(props.post);
          setCurrentIndex(props.index);
          props.navigation.navigate({
            name: 'ViewPostStackNavigator',
            params: { screen: 'ViewPost', params: { post: props.post } },
          });
        }}
      >
        {isLoading && <Skeleton />}
        <Video
          source={{ uri: props.post.contents[0].data }}
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        onPress={() => {
          setCurrentPost(props.post);
          setCurrentIndex(props.index);
          props.navigation.navigate({
            name: 'ViewPostStackNavigator',
            params: { screen: 'ViewPost', params: { post: props.post } },
          });
        }}
      >
        {isLoading && <Skeleton />}
        <FastImage
          source={{ uri: props.post.contents[0].data }}
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          onLoad={handleImageLoad}
        />
      </TouchableOpacity>
    );
  }
};

export default ContentThumbnail;
