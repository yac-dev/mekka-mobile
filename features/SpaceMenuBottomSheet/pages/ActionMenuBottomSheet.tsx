import React, { useMemo, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Header from '../components/Header';
import Menus from '../components/Menus';
import Description from '../components/Description';
import ActionButtons from '../components/ActionButtons';
import MediaStats from '../components/MediaStats';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// rgb(35, 35, 35)
const ActionMenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['40%'], []);
  const {
    spaceActionMenuBottomSheetRef,
    currentSpaceAndUserRelationship,
    setCurrentSpaceAndUserRelationship,
    currentSpace,
    setCurrentSpace,
  } = useContext(GlobalContext);
  // const { navigation } = useContext(HomeStackNavContext);
  if (currentSpaceAndUserRelationship && currentSpace) {
    return (
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={spaceActionMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 15,
            }}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <MaterialCommunityIcons name='account-group' color='white' size={25} style={{ marginRight: 15 }} />
              <Text style={{ color: 'white', fontSize: 18 }}>Browse members</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 15,
            }}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <MaterialIcons name='report-problem' color='white' size={25} style={{ marginRight: 15 }} />
              <Text style={{ color: 'white', fontSize: 18 }}>Report this space</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default ActionMenuBottomSheet;
