import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

interface IconProps {
  iconName: string;
  iconSize: number;
}

// このicon部分、面倒臭いな。。。
const MCI: React.FC<IconProps> = (props) => {
  return <MaterialCommunityIcons name={props.iconName as any} size={props.iconSize} />;
};

export default MCI;
