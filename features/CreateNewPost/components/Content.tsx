import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Skeleton from '../../Space/components/Skeleton';
import { Video, ResizeMode } from 'expo-av';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import * as VideoThumbnail from 'expo-video-thumbnails';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ContentThumbnail = (props) => {
  const { isIpad, createNewPostFormData } = useContext(GlobalContext);
  const { setCreateNewPostFormData } = useContext(SpaceRootContext);
  const [isLoading, setIsLoading] = useState(true);
  const { setContents } = useContext(CreateNewPostContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const [videoThumbnail, setVideoThumbnail] = useState('');

  const generateThumbnail = async (videoUrl) => {
    try {
      const { uri } = await VideoThumbnail.getThumbnailAsync(videoUrl, {
        time: 1000,
      });
      console.log('generated');
      setVideoThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  // useEffect(() => {
  //   if (props.content.type === 'video') {
  //     generateThumbnail(props.content.uri);
  //   }
  // }, []);
  // console.log(props.content);

  return (
    <View key={props.index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 1 }}>
      {/* {isLoading && <Skeleton />} */}
      {props.content.type === 'photo' ? (
        <>
          {/* {isLoading && <Skeleton />} */}
          <ExpoImage
            style={{ width: '100%', height: '100%', marginRight: 10 }}
            source={{ uri: props.content.uri }}
            contentFit='cover'
            // tintColor={'white'}
            // onLoad={handleImageLoad}
            transition={100}
          />
        </>
      ) : (
        <>
          {/* {isLoading && <Skeleton />} */}
          <Video
            source={{ uri: props.content.uri }}
            style={{ width: '100%', height: '100%', marginRight: 10 }}
            onLoad={handleImageLoad}
            resizeMode={ResizeMode.COVER}
          />
          {/* <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            source={{ uri: videoThumbnail }}
            placeholder={blurhash}
            contentFit='cover'
            transition={1000}
            // tintColor={'white'}
            onLoad={handleImageLoad}
          /> */}
        </>
      )}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: -5,
          right: -5,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
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
          <Ionicons name='close' size={20} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContentThumbnail;
