import React from 'react';
import { Animated, Text } from 'react-native';

const HEADER_HEIGHT = 80;
const TAB_BAR_HEIGHT = 40;

export const Activities = ({ thirdRef, onMomentumScrollBegin, position, syncOffset }) => {
  return (
    <Animated.ScrollView
      ref={thirdRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
        useNativeDriver: true,
      })}
      onMomentumScrollEnd={(e) => {
        syncOffset('posts', e.nativeEvent.contentOffset.y);
      }}
      style={{
        flex: 1,
        paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT,
      }}
    >
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>Activities will be shown here...</Text>
    </Animated.ScrollView>
  );
};
