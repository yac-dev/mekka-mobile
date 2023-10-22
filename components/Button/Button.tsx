import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { primaryTextColor } from '../../themes/text';

interface ButtonProps {
  buttonLabel: string;
  buttonColor: string; // buttonの種類で分けたいよね。まあ大体
  onButtonPress: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: props.buttonColor, borderRadius: 7, padding: 10 }}
      onPress={() => props.onButtonPress()}
    >
      <Text style={{ color: primaryTextColor }}>{props.buttonLabel}</Text>
    </TouchableOpacity>
  );
};

export default Button;
