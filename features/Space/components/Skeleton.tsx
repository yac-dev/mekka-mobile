import React, { useRef, useEffect, useContext } from 'react';
import { Animated, View, Text, Dimensions } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Skeleton = () => {
  const opacity = useRef(new Animated.Value(0.3));
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, { toValue: 1, useNativeDriver: true, duration: 500 }),
        Animated.timing(opacity.current, { toValue: 0.3, useNativeDriver: true, duration: 800 }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View
      style={{
        width: oneAssetWidth,
        aspectRatio: 1,

        padding: 1,
      }}
    >
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

export default Skeleton;
