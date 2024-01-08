import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Video, ResizeMode } from 'expo-av';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { TagViewContext } from '../contexts/TagViewContext';
import Skeleton from './Skeleton';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import LinearGradient from 'react-native-linear-gradient';

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

  // {calculateLeftTime(props.moment.disappearAt)}
  const calculateLeftTime = (disappearAt) => {
    const now = new Date();
    const last = new Date(disappearAt);
    const timeLeftMs = last - now;
    const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5, alignSelf: 'center' }}
      >
        <ExpoImage
          style={{ width: 15, height: 15, marginRight: 5 }}
          source={require('../../../assets/forApp/ghost.png')}
          contentFit='contain'
          tintColor={'white'}
        />
        <Text style={{ color: 'white' }}>{`${hours ? `${hours} h` : ''} ${minutes ? `${minutes} min` : ''}`}</Text>
      </View>
    );
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
          padding: 1,
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
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onLoad={handleImageLoad}
          resizeMode={ResizeMode.COVER}
        />
        {props.post.contents[0].duration && (
          <View style={{ position: 'absolute', right: 10, top: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {millisecondsToTime(props.post.contents[0].duration)}
            </Text>
          </View>
        )}
        {props.post.type === 'moment' ? (
          <>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
            />
            {calculateLeftTime(props.post.disappearAt)}
          </>
        ) : null}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 1 }}
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
          style={{ width: '100%', height: '100%' }}
          source={{ uri: props.post.contents[0].data }}
          // placeholder={blurhash}
          contentFit='cover'
          // transition={1000}
          onLoad={handleImageLoad}
        />
        {props.post.type === 'moment' ? (
          <>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
            />
            {calculateLeftTime(props.post.disappearAt)}
          </>
        ) : null}
      </TouchableOpacity>
    );
  }
};

export default ContentThumbnail;
