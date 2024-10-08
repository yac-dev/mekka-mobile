import { useContext, useEffect } from 'react';
import { View, Linking, StyleSheet, Text } from 'react-native';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { useNavigation } from '@react-navigation/native';
import { useBottomSheet } from '../hooks';
import { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { AuthMenu, AddNewSpaceMenu, SideBar, CurrentSpace, BottomTab, SpacesHeader } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoSpaces } from '.';
import { useRecoilState } from 'recoil';
import { mySpacesAtom, authAtom, logsTableAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../query/queryKeys';

export const Home = () => {
  const { isFetching: isFetchingMySpaces, isSuccess: isGetMySpacesSuccess } = useQuery({
    queryKey: [queryKeys.mySpaces],
  });
  const { isSuccess: isGetLogsSuccess } = useQuery({
    queryKey: [queryKeys.logs],
  });

  const [, setAuth] = useRecoilState(authAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const {
    authMenuBottomSheetRef,
    openAuthMenuBottomSheet,
    closeAuthMenuBottomSheet,
    addNewSpaceMenuBottomSheetRef,
    openAddNewSpaceMenuBottomSheet,
    closeAddNewSpaceMenuBottomSheet,
  } = useBottomSheet();

  useEffect(() => {
    homeStackNavigation.setOptions({
      header: () => (
        <SpacesHeader
          openAddNewSpaceMenuBottomSheet={openAddNewSpaceMenuBottomSheet}
          openAuthMenuBottomSheet={openAuthMenuBottomSheet}
        />
      ),
      // headerLeft: () => <SpacesHeader />,
      // headerRight: () => (
      //   <AppButton.Icon
      //     onButtonPress={() => console.log('test')}
      //     customStyle={{ width: 30, height: 30, backgroundColor: 'rgb(50,50,50)' }}
      //     hasShadow={false}
      //   >
      //     <VectorIcon.II name='settings-outline' size={18} color={Colors.white} />
      //   </AppButton.Icon>
      // ),
    });
  }, [mySpaces]);

  const onLogoutPress = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    // ここでauthに関してもdefaultに戻さんといかんし、
    setAuth(void 0);
    setMySpaces(void 0);
    setLogsTable(void 0);
    showMessage({ message: 'Logged out successfully.', type: 'success' });
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

  return (
    <View style={styles.container}>
      {!mySpaces?.length ? (
        <NoSpaces openAuthMenuBottomSheet={openAuthMenuBottomSheet} />
      ) : (
        // <View style={{ flexDirection: 'row', height: '100%' }}>
        //   <SideBar
        //     openAddNewSpaceMenuBottomSheet={openAddNewSpaceMenuBottomSheet}
        //     openAuthMenuBottomSheet={openAuthMenuBottomSheet}
        //   />
        //   <CurrentSpace />

        //   <BottomTab
        //     openAddNewSpaceMenuBottomSheet={openAddNewSpaceMenuBottomSheet}
        //     openAuthMenuBottomSheet={openAuthMenuBottomSheet}
        //   />
        // </View>
        <CurrentSpace />
      )}

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // paddingTop: 10,
  },
});
