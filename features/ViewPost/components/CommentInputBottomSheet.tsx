import React, { forwardRef, ReactNode } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { VectorIcon } from '../../../Icons/VectorIcons';
import { AppButton } from '../../../components/Button';

type Ref = BottomSheetModal;

type CommentInputBottomSheetRef = {
  header?: ReactNode;
  defaultSnapPointsIndex?: number;
  hasBackdrop?: boolean;
  snapPoints: string[];
  onClose?: () => void;
  onCloseButtonClose: () => void;
  handleComponent?: () => ReactNode;
  enablePanDownToClose?: boolean;
  backgroundColor?: string;
  topRightCorner?: ReactNode;
};

export const CommentInputBottomSheet = forwardRef<Ref, CommentInputBottomSheetRef>(
  (
    {
      snapPoints,
      onClose,
      onCloseButtonClose,
      handleComponent,
      enablePanDownToClose = true,
      backgroundColor = 'rgb(30,30,30)',
    },
    ref
  ) => {
    return (
      <BottomSheet
        ref={ref}
        index={0}
        enableOverDrag={true}
        enablePanDownToClose={enablePanDownToClose}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor }}
        handleIndicatorStyle={{ backgroundColor: 'rgb(100,100,100)' }}
        onClose={onClose}
      >
        <View style={{ flex: 1, backgroundColor: 'rgb(30,30,30)', paddingHorizontal: 10, paddingVertical: 10 }}>
          <TextInput
            placeholder='What are your thoughts?'
            placeholderTextColor={'rgb(170,170,170)'}
            multiline
            style={styles.text}
          />
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgb(30,30,30)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: 'rgb(190,190,190)',
  },
});
