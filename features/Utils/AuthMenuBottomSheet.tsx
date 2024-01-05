import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Switch } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from '../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AuthMenuBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['60%'], []);
  const iconWidth = Dimensions.get('window').width / 3;

  const {
    authData,
    isAuthenticated,
    authMenuBottomSheetRef,
    setAuthData,
    setIsAuthenticated,
    setLoading,
    setSpaceAndUserRelationships,
    setSnackBar,
    notificationEnabled,
    setNotificationEnabled,
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

  const onEditMyAccountPress = () => {
    authMenuBottomSheetRef.current.close();
    props.navigation.navigate({
      name: 'EditAccountStackNavigator',
      params: {
        screen: 'EditAccount',
      },
    });
  };

  const onDeleteMyAccountPress = () => {
    authMenuBottomSheetRef.current.close();
    props.navigation.navigate({
      name: 'DeleteMyAccount',
    });
  };

  const onNotificationSwitchToggle = () => {
    setNotificationEnabled((previous) => !previous);
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
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
          >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, marginLeft: 20 }}>Settings</Text>
            <TouchableOpacity
              style={{
                // alignSelf: 'flex-end',
                marginRight: 20,
              }}
              onPress={() => onClosePress()}
            >
              <Ionicons name='close-circle' color='white' size={30} style={{ marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => onEditMyAccountPress()}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='account' color='white' size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Edit my info</Text>
                  <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Change your personal information.</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              // onPress={() => onNotificationSwitchToggle()}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='notifications' color='white' size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Notification</Text>
                  <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                    {notificationEnabled ? 'Allowed now.' : 'Disallowed now.'}
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: 'rgb(67, 227, 59)' }}
                thumbColor={notificationEnabled ? 'white' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={onNotificationSwitchToggle}
                value={notificationEnabled}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => onLogoutPress()}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='exit-run' color='white' size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Logout</Text>
                  <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Take a break?</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
              onPress={() => onDeleteMyAccountPress()}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name='delete-alert' color='white' size={20} style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Delete my account</Text>
                  <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>No regreats?</Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: iconWidth,
                aspectRatio: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  width: iconWidth * 0.55,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius: (iconWidth * 0.65) / 2,
                  backgroundColor: 'white',
                }}
                onPress={() => onEditMyAccountPress()}
              >
                <Ionicons name='settings' color='black' size={25} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
            </View> */}
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: iconWidth,
                aspectRatio: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  width: iconWidth * 0.55,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius: (iconWidth * 0.65) / 2,
                  backgroundColor: 'white',
                }}
                onPress={() => {
                  onLogoutPress();
                }}
              >
                <MaterialCommunityIcons name='logout' color='black' size={25} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: iconWidth, aspectRatio: 1 }}>
              <TouchableOpacity
                style={{
                  width: iconWidth * 0.55,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                  borderRadius: (iconWidth * 0.65) / 2,
                  backgroundColor: 'white',
                }}
                onPress={() => {
                  onDeleteMyAccountPress();
                }}
              >
                <MaterialCommunityIcons name='delete-alert' size={25} color='black' style={{}} />
              </TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </View> */}
          </View>
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  } else {
    return null;
  }
};

export default AuthMenuBottomSheet;
