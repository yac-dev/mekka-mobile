import React, { useMemo, useContext, useState, useEffect } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// rgb(35, 35, 35)
const OtherActionsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { isIpad, setLoading,  setSnackBar } = useContext(GlobalContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  const {
    otherActionsBottomSheetRef,
    viewPostStackNavigatorNavigation,
    isOtherOptionsBottomSheetOpen,
    setIsOtherOptionsBottomSheetOpen,
  } = useContext(ViewPostContext);
  const { currentIndex, posts } = useContext(TagViewContext);
  // const { commentInputBottomSheetRef, textInputRef, post, navigation } = useContext(ViewPostContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  // setIsOtherOptionsBottomSheetOpen
  useEffect(() => {
    if (isOtherOptionsBottomSheetOpen) {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [isOtherOptionsBottomSheetOpen]);

  if (isOtherOptionsBottomSheetOpen) {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={otherActionsBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        onClose={() => setIsOtherOptionsBottomSheetOpen(false)}
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
                otherActionsBottomSheetRef.current.close();
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
                otherActionsBottomSheetRef.current.close();
              }}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='image-edit' color={'white'} size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Edit</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => {
                console.log('save');
                otherActionsBottomSheetRef.current.close();
              }}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='bookmark' color={'white'} size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Save</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => {
                console.log('save');
                otherActionsBottomSheetRef.current.close();
              }}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='delete-empty' color={'white'} size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Delete</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => {
                console.log('save');
                otherActionsBottomSheetRef.current.close();
              }}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='exclamation' color={'white'} size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Report</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default OtherActionsBottomSheet;
