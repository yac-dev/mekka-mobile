import React from 'react';
import { View } from 'react-native';
import { ReactionPickerProvider } from '../contexts/ReactionPickerProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactionCategoryBottomTab, SelectedReaction } from '../components';
import { ReactionPickerStackParams } from '../navigations';

type ReactionPickerProps = NativeStackScreenProps<ReactionPickerStackParams, 'ReactionPicker'>;

// データ構造的にまあcreateNewStickerのstacknavigatorを入れた方がいんだろうけど。。。どうだろ。。。
const ReactionPicker: React.FC<ReactionPickerProps> = ({ route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SelectedReaction defaultReactionIndex={route.params?.defaultReactionIndex} />
      <ReactionCategoryBottomTab />
    </View>
  );
};

export default ReactionPicker;
