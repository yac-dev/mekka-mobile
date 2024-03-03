import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { TextColor } from '../../themes';

type TextButtonProps = {
  text: string;
  onTextPress: () => void;
  style?: ViewStyle;
};

export const TextButton: React.FC<TextButtonProps> = ({ text, onTextPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onTextPress()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: TextColor.primary,
    textAlign: 'center',
  },
});

// namespace使うには、ここでもう定義するしかないよね多分。
