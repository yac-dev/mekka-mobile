import { forwardRef, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../themes';
import { VectorIcon } from '../../Icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

type Ref = BottomSheetModal;

type GorhomBottomSheetRef = {
  title: string;
  defaultSnapPointsIndex?: number;
  snapPoints: string[];
  children: ReactNode;
  onClose?: () => void;
  onCloseButtonClose: () => void;
};

export const GorhomBottomSheet = forwardRef<Ref, GorhomBottomSheetRef>(
  ({ title, defaultSnapPointsIndex = -1, snapPoints, children, onClose, onCloseButtonClose }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={defaultSnapPointsIndex}
        enableOverDrag={true}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        backgroundStyle={{ backgroundColor: Colors.black90 }}
        handleIndicatorStyle={{ backgroundColor: Colors.white }}
        onClose={onClose}
        handleComponent={() => {
          return (
            <View style={styles.container}>
              <Text style={styles.text}>{title}</Text>
              <TouchableOpacity onPress={onCloseButtonClose}>
                <VectorIcon.II name='close-circle-sharp' size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          );
        }}
      >
        {children}
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.black,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(80,80,80)',
    // marginBottom: 20,
  },
  text: {
    fontSize: 23,
    color: Colors.white,
  },
});
