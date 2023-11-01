import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Skeleton from '../../Space/components/Skeleton';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';

const ContentThumbnail = (props) => {
  const { isIpad, createNewPostFormData, setCreateNewPostFormData } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const { setContents } = useContext(CreateNewPostContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <View key={props.index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
      {isLoading && <Skeleton />}
      {props.content.type === 'image' ? (
        <>
          {/* {isLoading && <Skeleton />} */}
          <FastImage
            source={{ uri: props.content.uri }}
            style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            onLoad={handleImageLoad}
          />
        </>
      ) : (
        <>
          {/* {isLoading && <Skeleton />} */}
          <Video
            source={{ uri: props.content.uri }}
            style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            onLoad={handleImageLoad}
          />
        </>
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: -10,
          right: 0,
          backgroundColor: 'red',
          width: 30,
          height: 30,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={
          () =>
            setCreateNewPostFormData((previous) => {
              const updating = [...previous.contents];
              const updated = updating.filter((_, idx) => props.index !== idx);
              return {
                ...previous,
                contents: updated,
              };
            })
          // setContents((previous) => {
          //   const updating = [...previous];
          //   const updated = updating.filter((_, idx) => props.index !== idx);
          //   return updated;
          // })
        }
      >
        <Ionicons name='trash' size={20} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default ContentThumbnail;
