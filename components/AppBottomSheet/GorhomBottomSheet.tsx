import { forwardRef, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../themes';
import { VectorIcon } from '../../Icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { AppButton } from '../Button';

type Ref = BottomSheetModal;

type GorhomBottomSheetRef = {
  title?: string;
  defaultSnapPointsIndex?: number;
  hasBackdrop?: boolean;
  snapPoints: string[];
  children: ReactNode;
  onClose?: () => void;
  onCloseButtonClose: () => void;
  handleComponent?: () => ReactNode;
  enablePanDownToClose?: boolean;
};

export const GorhomBottomSheet = forwardRef<Ref, GorhomBottomSheetRef>(
  (
    {
      title,
      defaultSnapPointsIndex = -1,
      hasBackdrop = true,
      snapPoints,
      children,
      onClose,
      onCloseButtonClose,
      handleComponent,
      enablePanDownToClose = true,
    },
    ref
  ) => {
    return (
      <BottomSheet
        ref={ref}
        index={defaultSnapPointsIndex}
        enableOverDrag={true}
        enablePanDownToClose={enablePanDownToClose}
        snapPoints={snapPoints}
        backdropComponent={(props) =>
          hasBackdrop ? (
            <BottomSheetBackdrop
              {...props}
              opacity={0.5}
              enableTouchThrough={false}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]}
            />
          ) : null
        }
        backgroundStyle={{ backgroundColor: Colors.black }}
        handleIndicatorStyle={{ backgroundColor: Colors.white }}
        onClose={onClose}
        handleComponent={
          handleComponent
            ? handleComponent
            : () => {
                return (
                  <View style={styles.container}>
                    <Text style={styles.text}>{title}</Text>
                    <AppButton.Icon
                      onButtonPress={onCloseButtonClose}
                      customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                      hasShadow={false}
                    >
                      <VectorIcon.II name='close' size={18} color={'rgb(190,190,190)'} />
                    </AppButton.Icon>
                  </View>
                );
              }
        }
      >
        {children}
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 23,
    color: Colors.white,
  },
});
