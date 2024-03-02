import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextColor } from '../../themes';

type TextButtonProps = {
  text: string;
  onTextPress: () => void;
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
  },
});

// namespace使うには、ここでもう定義するしかないよね多分。
