import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from '../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AuthMenuBottomSheet = () => {
  const snapPoints = useMemo(() => ['40%'], []);
  const {
    authData,
    isAuthenticated,
    authMenuBottomSheetRef,
    setAuthData,
    setIsAuthenticated,
    setLoading,
    setSpaceAndUserRelationships,
    setSnackBar,
  } = useContext(GlobalContext);

  const onLogoutPress = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync('secure_token');
    setAuthData({ _id: '', name: '', email: '', avatar: '' });
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Logged out successfully.',
      duration: 5000,
    });
    // props.navigation.navigate('Welcome');
  };

  const onClosePress = () => {
    authMenuBottomSheetRef.current.close();
  };

  if (isAuthenticated) {
    return (
      <GorhomBottomSheet
        index={-1}
        enableOverDrag={true}
        ref={authMenuBottomSheetRef}
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
              // flexDirection: 'row',
              // alignItems: 'center',
              // backgroundColor: 'white',
              // borderRadius: 20,
              // padding: 5,
              alignSelf: 'flex-start',
              marginLeft: 10,
              marginBottom: 20,
            }}
            onPress={() => onClosePress()}
          >
            <Ionicons name='close-circle' color='white' size={30} style={{ marginRight: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => console.log('edit')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <MaterialCommunityIcons name='logout' color='white' size={25} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 18 }}>Edit my account</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color='white' style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => onLogoutPress()}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <MaterialCommunityIcons name='logout' color='white' size={25} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color='white' style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => console.log('delete')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <MaterialCommunityIcons name='logout' color='white' size={25} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 18 }}>Delete my account</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color='white' style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default AuthMenuBottomSheet;
