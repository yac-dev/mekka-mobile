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
};

export const PostThumbnail: React.FC<PostThumbnailProps> = ({ post, index, onPressPostThumbnail }) => {
  const [isLoading, setIsLoading] = useState(true); // statelessであるべきだが、これは特別。
  const { hours, minutes } = calculateLeftTime(post.disappearAt);
  const videoRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

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
          <View style={{ position: 'absolute', right: 5, top: 5 }}>
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
        // <View>
        <VectorIcon.FD
          name='page-multiple'
          size={15}
          color='white'
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        />
      ) : // </View>
      null}
    </TouchableOpacity>
  );
};
