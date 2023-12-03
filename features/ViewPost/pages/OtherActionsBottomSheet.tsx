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
  const snapPoints = useMemo(() => ['30%'], []);
  const { isIpad, setLoading, authData, setSnackBar } = useContext(GlobalContext);
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
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
              }}
              onPress={() => {
                console.log('save this.');
              }}
            >
              <View
                style={{
                  width: 50,
                  aspectRatio: 1,
                  borderRadius: 25,
                  marginBottom: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='bookmark-outline' color={'black'} size={25} />
              </View>
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
              }}
              onPress={() => {
                console.log('edit this');
                otherActionsBottomSheetRef.current.close();
              }}
            >
              <View
                style={{
                  width: 50,
                  aspectRatio: 1,
                  borderRadius: 25,
                  marginBottom: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='file-edit-outline' color={'black'} size={25} />
              </View>
              <Text style={{ color: 'white' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
              }}
              onPress={() => {
                console.log('delete this');
                otherActionsBottomSheetRef.current.close();
              }}
            >
              <View
                style={{
                  width: 50,
                  aspectRatio: 1,
                  borderRadius: 25,
                  marginBottom: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='delete-empty-outline' color={'black'} size={25} />
              </View>
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
              }}
              onPress={() => {
                viewPostStackNavigatorNavigation.navigate('ReportPost');
              }}
            >
              <View
                style={{
                  width: 50,
                  aspectRatio: 1,
                  borderRadius: 25,
                  marginBottom: 10,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='exclamation' color={'black'} size={25} />
              </View>
              <Text style={{ color: 'white' }}>Report</Text>
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
