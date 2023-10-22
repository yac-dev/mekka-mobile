import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryButtonColor } from '../../../themes/color';

interface CreateNewMekkaButtonProps {
  onButtonPress: () => void;
}

const CreateNewButton: React.FC<CreateNewMekkaButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryButtonColor,
      }}
      onPress={() => props.onButtonPress()}
    >
      <MaterialCommunityIcons name='plus' size={25} color='white' />
    </TouchableOpacity>
  );
};

export default CreateNewButton;
