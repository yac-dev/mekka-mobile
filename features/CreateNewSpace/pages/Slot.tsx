import React from 'react';
import { View, Text } from 'react-native';

const screenHorizontalPadding = 20;

export const Slot = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          paddingLeft: screenHorizontalPadding,
          paddingRight: screenHorizontalPadding,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Slot
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Specify the time periods during which posts can be made. This allows you to control when content is available
          for posting.
        </Text>
      </View>
    </View>
  );
};
