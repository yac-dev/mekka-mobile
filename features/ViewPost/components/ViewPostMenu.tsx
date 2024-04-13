import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';

type ViewPostMenuProps = {
  onReactionPress: () => void;
  onCommentsPress: () => void;
  onAvatarPress: () => void;
  onOtherPress: () => void;
};

export const ViewPostMenu: React.FC<ViewPostMenuProps> = ({
  onReactionPress,
  onCommentsPress,
  onAvatarPress,
  onOtherPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        onPress={onReactionPress}
      >
        <Text style={{ fontSize: 30 }}>😁</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        onPress={onCommentsPress}
      >
        <VectorIcon.MCI name='comment-multiple' size={25} style={{ color: 'white' }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        onPress={onCommentsPress}
      >
        <VectorIcon.MCI name='comment' size={30} style={{ color: 'white' }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
        onPress={onCommentsPress}
      >
        <VectorIcon.MCI name='dots-horizontal' size={30} style={{ color: 'white' }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: 'rgb(50,50,50)',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
