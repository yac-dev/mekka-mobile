import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, Dimensions } from 'react-native';

const width = Dimensions.get('window').width / 4;
export const Skeleton = () => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, { toValue: 1, useNativeDriver: true, duration: 500 }),
        Animated.timing(opacity.current, { toValue: 0.3, useNativeDriver: true, duration: 800 }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={{ width, aspectRatio: 1, padding: 1 }}>
      <Animated.View
        style={{
          opacity: opacity.current,
          backgroundColor: 'gray',
          width: '100%',
          height: '100%',
        }}
      ></Animated.View>
    </View>
  );
};

const momentWidth = 50;

export const MomentSkelton = () => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, { toValue: 1, useNativeDriver: true, duration: 500 }),
        Animated.timing(opacity.current, { toValue: 0.3, useNativeDriver: true, duration: 800 }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={{ width: momentWidth, aspectRatio: 1, marginRight: 10, borderRadius: 14 }}>
      <Animated.View
        style={{
          opacity: opacity.current,
          backgroundColor: 'gray',
          borderRadius: 14,
          width: '100%',
          height: '100%',
        }}
      ></Animated.View>
    </View>
  );
};
