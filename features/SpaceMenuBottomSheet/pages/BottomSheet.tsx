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
import SpaceMenuTopTabNavigator from '../../../navigations/SpaceMenuTopTabNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// rgb(35, 35, 35)
const SpaceMenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['80%'], []);
  const {
    spaceMenuBottomSheetRef,
    currentSpaceAndUserRelationship,
    setCurrentSpaceAndUserRelationship,
    currentSpace,
    setCurrentSpace,
    spaceActionMenuBottomSheetRef,
  } = useContext(GlobalContext);
  // const { navigation } = useContext(HomeStackNavContext);
  if (currentSpaceAndUserRelationship && currentSpace) {
    return (
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={spaceMenuBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        // onClose={() => onSelectedItemBottomSheetClose()}
      >
        <BottomSheetView style={{ flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
            onPress={() => spaceMenuBottomSheetRef.current.close()}
          >
            <Ionicons name='close' size={20} color='black' />
            <Text>Close</Text>
          </TouchableOpacity>

          <Header />
          {/* <SpaceMenuTopTabNavigator /> */}
          {/* <Description />
          <MediaStats /> */}
          {/* <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 20,
              right: 20,
              borderRadius: 25,
            }}
            onPress={() => {
              spaceActionMenuBottomSheetRef.current.snapToIndex(0);
            }}
          >
            <MaterialCommunityIcons name='widgets' color='black' size={20} />
          </TouchableOpacity> */}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default SpaceMenuBottomSheet;
