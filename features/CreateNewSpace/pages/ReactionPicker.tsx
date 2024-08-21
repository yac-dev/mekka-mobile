import React from 'react';
import { View } from 'react-native';
import { ReactionPickerProvider } from '../contexts/ReactionPickerProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateNewSpaceStackParams } from '../navigations/CreateNewSpaceStackNavigator';
import { ReactionCategoryBottomTab, SelectedReaction } from '../components';

type ReactionPickerProps = NativeStackScreenProps<CreateNewSpaceStackParams, 'ReactionPicker'>;

const ReactionPicker: React.FC<ReactionPickerProps> = ({ route }) => {
  return (
    <ReactionPickerProvider>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <SelectedReaction defaultReactionIndex={route.params?.defaultReactionIndex} />
        <ReactionCategoryBottomTab />
      </View>
    </ReactionPickerProvider>
  );
};

export default ReactionPicker;
