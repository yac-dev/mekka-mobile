import React, { useMemo, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import backendAPI from '../../../apis/backend';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

// rgb(35, 35, 35)
const OtherActionsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['20%'], []);
  const { isIpad, setLoading, authData, setSnackBar } = useContext(GlobalContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  const { otherActionsBottomSheetRef, viewPostStackNavigatorNavigation } = useContext(ViewPostContext);
  const { currentIndex, posts } = useContext(TagViewContext);
  // const { commentInputBottomSheetRef, textInputRef, post, navigation } = useContext(ViewPostContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={otherActionsBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: 'white',
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}
          >
            <Text>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 70,
              height: 70,
              backgroundColor: 'white',
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default OtherActionsBottomSheet;
