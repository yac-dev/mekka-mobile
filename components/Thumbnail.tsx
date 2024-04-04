import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { PostType } from '../types';
import { Image as ExpoImage } from 'expo-image';
import { Video, ResizeMode } from 'expo-av';
import LinearGradient from 'react-native-linear-gradient';
import { Skeleton } from './Skelton';

type ThumbnailProps = {
  post: PostType;
  onPressPost: (post: PostType) => void;
};

const sideLength = Dimensions.get('screen').width;

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

export const Thumbnail: React.FC<ThumbnailProps> = ({ post, onPressPost }) => {
  const [isLoading, setIsLoading] = useState(true); // statelessであるべきだが、これは特別。
  const { hours, minutes } = calculateLeftTime(post.disappearAt);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (isLoading) return <Skeleton />;

  return (
    <TouchableOpacity style={{ width: sideLength, height: sideLength, padding: 1 }} onPress={() => onPressPost(post)}>
      {post.type === 'photo' && (
        <ExpoImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: post.contents[0].data }}
          contentFit='cover'
          onLoad={handleImageLoad}
        />
      )}

      {post.type === 'video' && (
        <Video
          source={{ uri: post.contents[0].data }}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onLoad={handleImageLoad}
          resizeMode={ResizeMode.COVER}
        />
      )}

      {post.type === 'video' && (
        <View>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', right: 0, left: 0, top: 0, height: 30 }}
          />
          <View style={{ position: 'absolute', right: 5, top: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{millisecondsToTime(post.contents[0].duration)}</Text>
          </View>
        </View>
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
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='contain'
              tintColor={'white'}
            />
            <Text style={{ color: 'white' }}>
              {hours && `${hours} h`}
              {minutes && `${minutes} min`}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
