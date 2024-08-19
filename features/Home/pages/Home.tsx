import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Linking, ScrollView, Alert, Share } from 'react-native';
import { AuthContext } from '../../../providers';
import { MySpacesContext } from '../../../providers';
import { SpaceUpdatesContext } from '../../../providers';
import { HomeStackNavigatorProps } from '../../../navigations';
import { useNavigation } from '@react-navigation/native';
import { useBottomSheet } from '../hooks';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { urls } from '../../../settings';
import * as SecureStore from 'expo-secure-store';
import { VectorIcon } from '../../../Icons';
import { SpaceType } from '../../../types';
import { Colors } from '../../../themes';
import { CurrentSpaceContext } from '../../../providers';
import { LogsTableContext } from '../../../providers';
import { Image as ExpoImage } from 'expo-image';
import { AppButton } from '../../../components';
import { CurrentTagContext } from '../../../providers';
import { useUpdateSpaceCheckedInDate } from '../../../api';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { AuthMenu, AddNewSpaceMenu, SideBar, CurrentSpace } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { momentLogsAtom } from '../../../atoms';
import { useRecoilState } from 'recoil';

const actionButtonContainerWidth = (Dimensions.get('screen').width - 40 - 16) / 3;
const actionButtonWidth = actionButtonContainerWidth * 0.8;

export const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { logsTable, setLogsTable } = useContext(LogsTableContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { requestApi } = useUpdateSpaceCheckedInDate();
  const {
    authMenuBottomSheetRef,
    openAuthMenuBottomSheet,
    closeAuthMenuBottomSheet,
    addNewSpaceMenuBottomSheetRef,
    openAddNewSpaceMenuBottomSheet,
    closeAddNewSpaceMenuBottomSheet,
  } = useBottomSheet();

  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);

  const onLogoutPress = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    // ここでauthに関してもdefaultに戻さんといかんし、
    setAuth(void 0);
    setMySpaces(void 0);
    setSpaceUpdates(void 0);
    showMessage({ message: 'Logged out successfully.', type: 'success' });
  };

  const onClosePress = () => {
    closeAuthMenuBottomSheet();
  };

  const onEditMyAccountPress = () => {
    closeAuthMenuBottomSheet();
    homeStackNavigation.navigate('EditProfileStackNavigator', { screen: 'EditProfile' });
    // homeStackNavigation.navigate({ name: 'EditAccountStackNavigator', params: { screen: 'EditAccount' } });
    // ここなんで上の形式だとだめなんだろう？params入れられるかな。。。
    // props.navigation.navigate({ name: 'EditAccountStackNavigator', params: { screen: 'EditAccount' } });
  };

  const onNotificationSettingPress = () => {
    Linking.openSettings();
  };

  const onDeleteMyAccountPress = () => {
    closeAuthMenuBottomSheet();
    homeStackNavigation.navigate('DeleteMyAccount');
  };

  const onCreateNewSpacePress = () => {
    closeAddNewSpaceMenuBottomSheet();
    homeStackNavigation.navigate('CreateNewSpaceStackNavigator');
  };

  const onEnterPrivateKeyPress = () => {
    closeAddNewSpaceMenuBottomSheet();
    homeStackNavigation.navigate('EnterPrivateSpace');
  };

  const onDiscoverPress = () => {
    closeAddNewSpaceMenuBottomSheet();
    homeStackNavigation.navigate('DiscoverStackNavigator');
  };

  const openLink = async (url: string) => {
    await Linking.openURL(url);
  };

  const onRollsPress = () => {
    Alert.alert('Not available now', 'The Rolls feature will be available in the next update.', [
      { text: 'Got it', onPress: () => null },
    ]);
  };

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} m`;
    } else if (remainingMinutes === 0) {
      return `${hours} h`;
    } else {
      return `${hours} h ${remainingMinutes} m`;
    }
  }

  const handleInvite = async () => {
    Share.share({
      title: 'Share Mekka',
      message: `Access here to download Mekka: https://apps.apple.com/us/app/mekka/id6472717148${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

  if (!mySpaces?.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ paddingTop: 30, alignItems: 'flex-end', paddingRight: 10 }}>
          <AppButton.Icon
            onButtonPress={() => openAuthMenuBottomSheet(0)}
            customStyle={{
              width: 45,
              aspectRatio: 1,
              backgroundColor: 'rgb(50,50,50)',
            }}
            hasShadow={false}
          >
            <VectorIcon.MCI name='account' size={20} color={Colors.white} />
          </AppButton.Icon>
        </View>
        <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>
            You haven't joined any spaces now
          </Text>
          <Text style={{ color: 'white', textAlign: 'center' }}>Let's get started down below.</Text>
          <View style={{ marginTop: 50, gap: 8, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: actionButtonContainerWidth,
                aspectRatio: 1,
                padding: 10,
              }}
              // onPress={() => console.log('hello')}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  width: actionButtonWidth,
                  aspectRatio: 1,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  homeStackNavigation.navigate('CreateNewSpaceStackNavigator');
                }}
                // ここのnavigationがおかしいね。enterprivateも。discoverは大丈夫そう。
                // あとは、spaceが無からアリになった時用な。
              >
                <VectorIcon.MCI name='rocket-launch' color={Colors.white} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => homeStackNavigation.navigate('AboutApp', { url: urls.howToCreateNewSpace })}
              >
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    Create new
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: 0.3,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                      marginRight: 5,
                    }}
                  >
                    space
                  </Text>
                  {/* <VectorIcon.OI name='link-external' size={15} color='white' /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View
              // activeOpacity={0.5}
              style={{
                width: actionButtonContainerWidth,
                aspectRatio: 1,
                padding: 10,
              }}
              // onPress={() => console.log('hello')}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  width: actionButtonWidth,
                  aspectRatio: 1,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.7}
                onPress={() => homeStackNavigation.navigate('AboutApp', { url: urls.howToCreateNewSpace })}
              >
                <VectorIcon.II name='key' color={Colors.white} size={40} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLink(urls.howToCreateNewSpace)}>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    Join private
                  </Text>
                </View>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    space
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              // activeOpacity={0.5}
              style={{
                width: actionButtonContainerWidth,
                aspectRatio: 1,
                padding: 10,
              }}
              // onPress={() => console.log('hello')}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  width: actionButtonWidth,
                  aspectRatio: 1,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.7}
                onPress={() => homeStackNavigation.navigate('DiscoverStackNavigator')}
              >
                <VectorIcon.MCI name='compass' color={Colors.white} size={40} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => homeStackNavigation.navigate('AboutApp', { url: urls.howToCreateNewSpace })}
              >
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    Discover new
                  </Text>
                </View>
                <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                    }}
                  >
                    space
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <AppBottomSheet.Gorhom
          ref={authMenuBottomSheetRef}
          snapPoints={['60%']}
          title='Settings'
          onCloseButtonClose={closeAuthMenuBottomSheet}
        >
          <AuthMenu
            onEditMyAccountPress={onEditMyAccountPress}
            onNotificationSettingPress={onNotificationSettingPress}
            onLogoutPress={onLogoutPress}
            onDeleteMyAccountPress={onDeleteMyAccountPress}
          />
        </AppBottomSheet.Gorhom>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <SideBar
            openAddNewSpaceMenuBottomSheet={openAddNewSpaceMenuBottomSheet}
            openAuthMenuBottomSheet={openAuthMenuBottomSheet}
          />
          <CurrentSpace />
        </View>
        <AppBottomSheet.Gorhom
          ref={authMenuBottomSheetRef}
          snapPoints={['60%']}
          title='Settings'
          onCloseButtonClose={closeAuthMenuBottomSheet}
        >
          <AuthMenu
            onEditMyAccountPress={onEditMyAccountPress}
            onNotificationSettingPress={onNotificationSettingPress}
            onLogoutPress={onLogoutPress}
            onDeleteMyAccountPress={onDeleteMyAccountPress}
          />
        </AppBottomSheet.Gorhom>
        <AppBottomSheet.Gorhom
          ref={addNewSpaceMenuBottomSheetRef}
          snapPoints={['50%']}
          title='Add Space'
          onCloseButtonClose={closeAddNewSpaceMenuBottomSheet}
        >
          <AddNewSpaceMenu
            onCreateNewSpacePress={onCreateNewSpacePress}
            onEnterPrivateKeyPress={onEnterPrivateKeyPress}
            onDiscoverPress={onDiscoverPress}
          />
        </AppBottomSheet.Gorhom>
      </View>
    </SafeAreaView>
  );
};

// bottom sheetは外に出しておいた方がいいね。・
// <AppBottomSheet.Gorhom
//           ref={authMenuBottomSheetRef}
//           snapPoints={['60%']}
//           title='Settings'
//           onCloseButtonClose={closeAuthMenuBottomSheet}
//         >
//           <AuthMenu
//             onEditMyAccountPress={onEditMyAccountPress}
//             onNotificationSettingPress={onNotificationSettingPress}
//             onLogoutPress={onLogoutPress}
//             onDeleteMyAccountPress={onDeleteMyAccountPress}
//           />
//         </AppBottomSheet.Gorhom>
{
  /* <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, marginBottom: 3 }}>
                {currentSpace.isPublic ? 'Public' : 'Private'}
              </Text>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 13 }}>Ads free</Text> */
}

{
  /* <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
<AppButton.Icon
  onButtonPress={() => console.log('move to Log page')}
  customStyle={{
    width: 42,
    height: 42,
    backgroundColor: 'rgb(50,50,50)',
    marginBottom: 3,
  }}
  hasShadow={false}
>
  <VectorIcon.FT name='activity' size={20} color={'white'} />
</AppButton.Icon>
<Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Log</Text>
</View> */
}

type IStatBox = {
  title: string;
  icon: React.ReactNode;
  value: string;
  hasNext: boolean;
};

const StatBox: React.FC<IStatBox> = ({ title, icon, value, hasNext }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 150,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {icon}
          <Text style={{ color: 'rgb(150,150,150)' }}>{title}</Text>
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{value}</Text>
      </View>
      {hasNext && (
        <View
          style={{
            height: 25,
            width: 1,
            backgroundColor: 'rgb(150,150,150)',
          }}
        />
      )}
    </View>
  );
};
