import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { PostType } from '../../types';
import { Image as ExpoImage } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import LinearGradient from 'react-native-linear-gradient';
import { Skeleton } from '../Skelton';
import { Icons } from '../../assets/iconImages';
import { VideoPlayer } from '../VideoPlayer';
import { VectorIcon } from '../../Icons';
import { Times } from '../../utils';

const sideLength = Dimensions.get('screen').width / 4;

const calculateLeftTime = (disappearAt: string) => {
  const now: Date = new Date();
  const last: Date = new Date(disappearAt);
  const timeLeftMs: number = last.getTime() - now.getTime(); // Get time difference in milliseconds
  const hours: number = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutes: number = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes,
  };
};

const millisecondsToTime = (milliseconds: number) => {
  // Convert milliseconds to seconds
  var seconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format the result
  var formattedTime = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

  return formattedTime;
};

type PostThumbnailProps = {
  post: PostType;
  index: number;
  onPressPostThumbnail: (post: PostType, index: number) => void;
  hasViewedByCurrentUser?: boolean;
};

export const PostThumbnail: React.FC<PostThumbnailProps> = ({
  post,
  index,
  onPressPostThumbnail,
  hasViewedByCurrentUser,
}) => {
  const [isLoading, setIsLoading] = useState(true); // statelessであるべきだが、これは特別。
  const { hours, minutes } = calculateLeftTime(post.disappearAt);
  const videoRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  console.log('post.createdAt', post.createdAt);
  console.log('currentSpace.lastCheckedIn');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: sideLength, height: sideLength, padding: 1 }}
      onPress={() => onPressPostThumbnail(post, index)}
    >
      {/* skeltonここじゃないと,そもそもhandleLoadingされない。 */}
      {isLoading && <Skeleton />}
      {/* {post.contents[0].type === 'photo' && (
        <ExpoImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: post.contents[0].data }}
          contentFit='cover'
          onLoad={handleImageLoad}
        />
      )} */}

      <ExpoImage
        style={{ width: '100%', height: '100%' }}
        source={{ uri: post.contents[0].type === 'photo' ? post.contents[0].data : post.contents[0].thumbnail }}
        contentFit='cover'
        onLoad={handleImageLoad}
      />
      {post.contents[0].type === 'video' && (
        <>
          <View style={{ position: 'absolute', right: 5, bottom: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{millisecondsToTime(post.contents[0].duration)}</Text>
          </View>
        </>
      )}
      {post.type === 'moment' && (
        <View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
          />
          <View
            style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5, alignSelf: 'center' }}
          >
            <ExpoImage
              style={{ width: 15, height: 15, marginRight: 5 }}
              source={Icons.ghost}
              contentFit='contain'
              tintColor={'white'}
            />
            <Text style={{ color: 'white' }}>
              {hours > 0 && `${hours} hs`}&nbsp;
              {minutes > 0 && `${minutes} ms`}
            </Text>
          </View>
        </View>
      )}
      {post.contents.length > 1 ? (
        <View
          style={{
            position: 'absolute',
            right: 3,
            top: 3,
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 100,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VectorIcon.MCI name='image-multiple' size={12} color='white' />
        </View>
      ) : null}
      {/* {!hasViewedByCurrentUser && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: 'red',
            borderRadius: 100,
            width: 20,
            height: 20,
          }}
        />
      )} */}
    </TouchableOpacity>
  );
};
