import React, { useContext, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';

const ReportBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['60%'], []);
  const { setSnackBar } = useContext(GlobalContext);

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={props.reportBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        <View
          style={{
            marginBottom: 20,
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              props.reportBottomSheetRef.current.close();
            }}
          >
            <Ionicons name='close-circle-sharp' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              console.log('save');

              Alert.alert('User report', 'Are yo sure you want to report this user?', [
                {
                  text: 'Cancel',
                  onPress: () => props.reportBottomSheetRef.current.close(),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    props.reportBottomSheetRef.current.close();
                    setSnackBar({
                      isVisible: true,
                      barType: 'success',
                      message: 'User report request has been sent.',
                      duration: 5000,
                    });
                  },
                },
              ]);
            }}
            activeOpacity={1}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name='report-problem' color={'white'} size={20} style={{ marginRight: 20 }} />
              <View>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Report this user</Text>
              </View>
            </View>
            <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              console.log('save');
              Alert.alert('User block', 'Are yo sure you want to block this user?', [
                {
                  text: 'Cancel',
                  onPress: () => props.reportBottomSheetRef.current.close(),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    props.reportBottomSheetRef.current.close();
                    setSnackBar({
                      isVisible: true,
                      barType: 'success',
                      message: 'Block request has been sent.',
                      duration: 5000,
                    });
                  },
                },
              ]);
            }}
            activeOpacity={1}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Entypo name='block' color={'white'} size={20} style={{ marginRight: 20 }} />
              <View>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Block this user</Text>
              </View>
            </View>
            <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ReportBottomSheet;
