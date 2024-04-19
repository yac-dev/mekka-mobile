import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../themes';

type TextButtonProps = {
  text: string;
  onTextPress: () => void;
  isDisabled?: boolean;
  style?: ViewStyle;
};

export const TextButton: React.FC<TextButtonProps> = ({ text, onTextPress, isDisabled }) => {
  // isDisabledはシンプルにfunctionの値を返せばいい。
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} disabled={isDisabled} onPress={() => onTextPress()}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    borderBottomColor: Colors.white,
  },
  text: {
    color: Colors.white,
  },
});
