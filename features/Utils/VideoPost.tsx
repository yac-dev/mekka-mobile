import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { Video } from 'expo-av';

const VideoPost = () => {
  const videoRef = useRef(null);

  const play = async () => {
    if (!videoRef.current) {
      return;
    } else {
      const status = await videoRef.current.getStatusAsync();
      if (status?.isPlaying) {
        return;
      }
      try {
        await videoRef.current.playAsync();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const stop = async () => {
    if (!videoRef.current) {
      return;
    }

    // if video is already stopped return
    const status = await videoRef.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await videoRef.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (videoRef.current == null) {
      return;
    }

    // if video is already stopped return
    try {
      await videoRef.current.unloadAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Video
      source={{ uri: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4' }}
      style={{ flex: 1 }}
      resizeMode='cover'
      shouldPlay={true}
    />
  );
};

export default VideoPost;
