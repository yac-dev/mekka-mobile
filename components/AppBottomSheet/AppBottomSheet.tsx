import { forwardRef, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { BackgroundColor } from '../../themes';
import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

type Ref = BottomSheetModal;

type AppBottomSheetRef = {
  title: string;
  defaultSnapPointsIndex: number;
  snapPoints: string[];
  children: ReactNode;
  onClose?: () => void;
};

export const AppBottomSheet = forwardRef<Ref, AppBottomSheetRef>(
  ({ title, defaultSnapPointsIndex = -1, snapPoints, children, onClose }, ref) => {
    return (
      <GorhomBottomSheet
        ref={ref}
        index={defaultSnapPointsIndex}
        enableOverDrag={true}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        backgroundStyle={{ backgroundColor: BackgroundColor.secondary }}
        handleIndicatorStyle={{ backgroundColor: BackgroundColor.white }}
        onClose={onClose}
      >
        {children}
      </GorhomBottomSheet>
    );
  }
);
