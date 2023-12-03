import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Video, ResizeMode } from 'expo-av';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { TagViewContext } from '../contexts/TagViewContext';
import Skeleton from './Skeleton';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ContentThumbnail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isIpad } = useContext(GlobalContext);
  const { setCurrentPost, setCurrentIndex, currentIndex } = useContext(TagViewContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const millisecondsToTime = (milliseconds) => {
    // Convert milliseconds to seconds
    var seconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Format the result
    var formattedTime = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

    return formattedTime;
  };

  if (props.post.contents[0].type === 'video') {
    return (
      <TouchableOpacity
        style={{
          width: oneAssetWidth,
          height: oneAssetWidth,
          padding: 2,
        }}
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
          style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
          onLoad={handleImageLoad}
          resizeMode={ResizeMode.COVER}
        />
        {props.post.contents[0].duration && (
          <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {millisecondsToTime(props.post.contents[0].duration)}
            </Text>
          </View>
        )}
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
        <ExpoImage
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          source={{ uri: props.post.contents[0].data }}
          // placeholder={blurhash}
          contentFit='cover'
          // transition={1000}
          onLoad={handleImageLoad}
        />
      </TouchableOpacity>
    );
  }
};

export default ContentThumbnail;
