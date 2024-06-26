import React from 'react';
import { View, Text } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';

type AddNewSpaceMenuProps = {
  onCreateNewSpacePress: () => void;
  onEnterPrivateKeyPress: () => void;
  onDiscoverPress: () => void;
};

export const AddNewSpaceMenu: React.FC<AddNewSpaceMenuProps> = ({
  onCreateNewSpacePress,
  onEnterPrivateKeyPress,
  onDiscoverPress,
}) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <AppButton.Cell
        title='Create New'
        subTitle='Open your own space from here'
        onButtonPress={onCreateNewSpacePress}
        customStyle={{ marginBottom: 10 }}
      >
        <VectorIcon.MCI name='rocket-launch' color={Colors.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
      <AppButton.Cell
        title='Enter private key'
        subTitle='Got invitation keys?'
        onButtonPress={onEnterPrivateKeyPress}
        customStyle={{ marginBottom: 10 }}
      >
        <VectorIcon.II name='key' color={Colors.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
      <AppButton.Cell
        title='Discover New'
        subTitle='Jump into public space'
        onButtonPress={onDiscoverPress}
        customStyle={{ marginBottom: 10 }}
      >
        <VectorIcon.MCI name='compass' color={Colors.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
    </View>
  );
};
