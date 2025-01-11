import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { Icons } from '../../../Icons/images';
import { Colors } from '../../../themes';

export const ViewMenuFAB = () => {
  const firstValue = useSharedValue(30);
  const secondValue = useSharedValue(30);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() => (isOpen.value ? withTiming(1) : withTiming(0)));

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 200,
    };
    if (isOpen.value) {
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
    }
    isOpen.value = !isOpen.value;
  };

  const firstIcon = useAnimatedStyle(() => {
    const scale = interpolate(firstValue.value, [30, 80], [0, 1], Extrapolation.CLAMP);

    return {
      bottom: firstValue.value,
      transform: [{ scale: scale }],
    };
  });

  const secondIcon = useAnimatedStyle(() => {
    const scale = interpolate(secondValue.value, [30, 110], [0, 1], Extrapolation.CLAMP);

    return {
      bottom: secondValue.value,
      transform: [{ scale: scale }],
    };
  });

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, secondIcon]}>
        <View style={styles.iconContainer}>
          <VectorIcon.MCI name='dots-grid' color='white' size={25} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.contentContainer, firstIcon]}>
        <View style={styles.iconContainer}>
          <ExpoImage
            style={{ width: 25, height: 25 }}
            source={Icons.globe}
            contentFit='contain'
            tintColor={Colors.white}
          />
        </View>
      </Animated.View>
      <Pressable
        style={styles.contentContainer}
        onPress={() => {
          handlePress();
        }}
      >
        <Animated.View style={[styles.iconContainer, plusIcon]}>
          <VectorIcon.MCI name='dots-grid' color='white' size={25} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#0F56B3',
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 50,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
