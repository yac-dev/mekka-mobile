import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Video, { ResizeMode } from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Slider from '@react-native-community/slider';
import { VectorIcon } from '../Icons';
import { AppButton } from './Button';

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  // if (loading) {
  //   return (
  //     <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  return (
    <>
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
      <TouchableOpacity
        onPress={() => togglePlayPause()}
        style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <View style={{ flex: 1 }} />
      </TouchableOpacity>
      <View style={{ position: 'absolute', bottom: 100 }}>
        <View style={styles.controlRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={onSlide}
            minimumTrackTintColor={'white'}
            maximumTrackTintColor={'gray'}
            thumbTintColor={'transparent'}
          />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration - currentTime)}</Text>
        </View>
      </View>
      {/* <AppButton.Icon
        onButtonPress={togglePlayPause}
        customStyle={{
          width: 44,
          height: 44,
          backgroundColor: 'rgb(50,50,50)',
          position: 'absolute',
          bottom: 65,
          alignSelf: 'center',
        }}
        hasShadow={false}
      >
        <VectorIcon.FD name={paused ? 'play' : 'pause'} size={25} color={'white'} />
      </AppButton.Icon> */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Text>Hello</Text>
        </View>
      </Modal>
    </>
  );
});

{
  /* {isSoundButton && (
            <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
              <Image style={styles.controlIcon} source={videoVolume === 0.0 ? images.SOUND_OFF : images.SOUND_ON} />
            </TouchableOpacity>
          )} */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: 'white',
  },
  slider: {
    width: '95%',
  },
  controlRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 0,
  },
});
