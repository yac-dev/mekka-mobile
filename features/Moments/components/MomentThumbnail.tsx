import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { MomentsContext } from '../contexts/MomentsContext';
import Skeleton from './Skeleton';

const MomentThumbnail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isIpad } = useContext(GlobalContext);
  const { setCurrentPost, setCurrentIndex, currentIndex } = useContext(MomentsContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  const handleImageLoad = () => {
    setIsLoading(false);
    console.log('loaded');
  };

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
        <FastImage
          source={require('../../../assets/forApp/ghost.png')}
          style={{ width: 15, height: 15, marginRight: 5 }}
          tintColor={'white'}
        />
        <Text style={{ color: 'white' }}>{`${hours ? `${hours} h` : ''} ${minutes ? `${minutes} min` : ''}`}</Text>
      </View>
    );
  };

  if (props.moment.contents[0].type === 'video') {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        onPress={() => {
          setCurrentPost(props.moment);
          setCurrentIndex(props.index);
          props.navigation.navigate({
            name: 'ViewMomentStackNavigator',
            params: { screen: 'ViewMoment', params: { moment: props.moment } },
          });
        }}
      >
        {isLoading && <Skeleton />}
        <Video
          source={{ uri: props.moment.contents[0].data }}
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        onPress={() => {
          setCurrentPost(props.moment);
          setCurrentIndex(props.index);
          props.navigation.navigate({
            name: 'ViewMomentStackNavigator',
            params: { screen: 'ViewMoment', params: { moment: props.moment } },
          });
        }}
      >
        {isLoading && <Skeleton />}
        <FastImage
          source={{ uri: props.moment.contents[0].data }}
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
          onLoad={handleImageLoad}
        />
        {calculateLeftTime(props.moment.disappearAt)}
      </TouchableOpacity>
    );
  }
};

export default MomentThumbnail;
