import React from 'react';
import { View, Text } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';

type AddNewPostMenuProps = {
  onCreateNewPostPress: () => void;
  onEnterPrivateKeyPress: () => void;
};

export const AddNewPostMenu: React.FC<AddNewPostMenuProps> = ({ onCreateNewPostPress, onEnterPrivateKeyPress }) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <AppButton.Cell
        title='Add New Post'
        subTitle='Open your own space from here'
        onButtonPress={onCreateNewPostPress}
        customStyle={{ marginBottom: 10 }}
      >
        <VectorIcon.MCI name='rocket-launch' color={Colors.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
      <AppButton.Cell
        title='Add New Moment'
        subTitle='Got invitation keys?'
        onButtonPress={onEnterPrivateKeyPress}
        customStyle={{ marginBottom: 10 }}
      >
        <VectorIcon.II name='key' color={Colors.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
    </View>
  );
};
