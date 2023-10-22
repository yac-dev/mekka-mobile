import React from 'react';
import { TouchableOpacity } from 'react-native';

// これ、iconをそれぞれで作っておいた方がいいのかね。。。
interface IconButtonProps {
  // icon:
  IconType: string;
  iconName: string;
  iconColor: string;
  buttonColor: string;
  onButtonPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  return <TouchableOpacity style={{ backgroundColor: props.buttonColor }}></TouchableOpacity>;
};

export default IconButton;
