import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Video, { ResizeMode } from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Slider from '@react-native-community/slider';

interface IVideoPlayer {
  source: any; // Adjust the type according to what `source` should be, e.g., string, object, etc.
  componentStyle?: object; // Optional prop, use appropriate type
  resizeMode?: ResizeMode; // Optional prop
  isSoundButton?: boolean;
}

export const VideoPlayer = forwardRef(({ source, componentStyle, resizeMode, isSoundButton }: IVideoPlayer, ref) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoPlayer = useRef(null);
  const [loading, setLoading] = useState(true);
  const [videoVolume, setVideoVolume] = useState(1.0);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (currentTime !== 0) setPaused(false);
    },
    pause: () => {
      setPaused(true);
    },
    stop: () => {
      setPaused(true);
      videoPlayer.current.seek(0);
      setCurrentTime(0);
    },
    seek: (time) => {
      videoPlayer.current.seek(time);
      setCurrentTime(time);
    },
  }));

  const togglePlayPause = () => setPaused(!paused);

  const onProgress = (data) => setCurrentTime(data.currentTime);

  const onEnd = () => {
    setPaused(true);
    setTimeout(() => {
      videoPlayer.current.seek(0);
    }, 200);
    setCurrentTime(0);
  };

  const onLoad = (data) => {
    setLoading(false);
    setDuration(data.duration);
  };

  const onSlide = (value) => {
    videoPlayer.current.seek(value);
    setCurrentTime(value);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onBuffer = ({ isBuffering }) => setLoading(isBuffering);

  const toggleMute = () => setVideoVolume(videoVolume === 0.0 ? 1.0 : 0.0);

  return (
    <View style={styles.container}>
      <Video
        ref={videoPlayer}
        source={source}
        style={componentStyle}
        paused={paused}
        onProgress={onProgress}
        onEnd={onEnd}
        onLoad={onLoad}
        onBuffer={onBuffer}
        volume={videoVolume}
        resizeMode={resizeMode}
        repeat={false}
        fullscreen={true}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 30000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
      />
      {loading && (
        // <Spinner color={colors.WHITE} style={styles.loader} visible={true} size="large" type="Circle" />
        <View>
          <Text style={{ color: 'red' }}>Loading</Text>
        </View>
      )}
      <LinearGradient
        colors={['#00000000', '#000000']}
        // style={styles.controls}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={togglePlayPause}>
            {/* <Image style={styles.controlIcon} source={paused ? images.PLAY : images.PAUSE} /> */}
            {paused ? <Text style={{ color: 'red' }}>Play</Text> : <Text style={{ color: 'red' }}>Pause</Text>}
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={onSlide}
            minimumTrackTintColor={'white'}
            maximumTrackTintColor={'gray'}
            thumbTintColor={'red'}
          />
          {/* {isSoundButton && (
            <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
              <Image style={styles.controlIcon} source={videoVolume === 0.0 ? images.SOUND_OFF : images.SOUND_ON} />
            </TouchableOpacity>
          )} */}
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
  },
  slider: {
    width: '100%',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
