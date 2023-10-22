import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DiscoverContext } from '../contexts/DiscoverContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryButtonColor } from '../../../themes/color';

interface CreateNewMekkaButtonProps {
  onButtonPress: () => void;
}

const CreateNewButton: React.FC<CreateNewMekkaButtonProps> = (props) => {
  const { navigation } = useContext(DiscoverContext);

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
      onPress={() => navigation.navigate('CreateNewSpace')}
    >
      <MaterialCommunityIcons name='plus' size={25} color='white' />
    </TouchableOpacity>
  );
};

export default CreateNewButton;
