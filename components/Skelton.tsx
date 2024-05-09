import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, Dimensions } from 'react-native';

const width = Dimensions.get('window').width / 3;
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
