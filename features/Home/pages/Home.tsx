import { useContext, useEffect, useState } from 'react';
import { View, Linking, StyleSheet, Text, Modal, Share } from 'react-native';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { useNavigation } from '@react-navigation/native';
import { useBottomSheet } from '../hooks';
import { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import {
  AuthMenu,
  AddNewSpaceMenu,
  SideBar,
  CurrentSpace,
  BottomTab,
  SpacesHeader,
  AddNewPostMenu,
} from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoSpaces } from '.';
import { useRecoilState } from 'recoil';
import { mySpacesAtom, authAtom, logsTableAtom, currentSpaceAtom } from '../../../recoil';
import { useMutation, useQuery, useMutationState } from '@tanstack/react-query';
import { queryKeys } from '../../../query/queryKeys';
import { CreatePostInputType } from '../../../query/types';
import { mutationKeys } from '../../../query/mutationKeys';
import { Image as ExpoImage } from 'expo-image';

// 結局、my spacesとかもさ、tan stackで制御できちゃうよな。。。なんで俺recoilでstate管理してるんだろ。。。
// currentSpaceとかはいいんだけど、apiの結果はapp戦隊で持てるからな。。。
export const Home = () => {
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [_, setAuth] = useRecoilState(authAtom);

  const { status: createPostStatus } = useMutation({
    mutationKey: [mutationKeys.createPost, currentSpace._id],
  });
  const { status: createMomentStatus } = useMutation({
    mutationKey: [mutationKeys.createMoment, currentSpace._id],
  });

  const { mutate: createSpaceMutate, status: createSpaceStatus } = useMutation({
    mutationKey: [mutationKeys.createSpace],
  });

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
    addNewPostMenuBottomSheetRef,
    openAddNewPostMenuBottomSheet,
    closeAddNewPostMenuBottomSheet,
  } = useBottomSheet();

  // authがある場合にのみrenderしたいね。

  useEffect(() => {
    homeStackNavigation.setOptions({
      header: () => {
        if (mySpaces?.length) {
          return (
            <SpacesHeader
              openAddNewSpaceMenuBottomSheet={openAddNewSpaceMenuBottomSheet}
              openAuthMenuBottomSheet={openAuthMenuBottomSheet}
            />
          );
        } else {
          return null;
        }
      },
    });
  }, [mySpaces]);

  // homeに関してはここで制御せんとかん。
  useEffect(() => {
    if (createPostStatus === 'pending') {
      showMessage({ type: 'info', message: 'Processing now...' });
    }
    if (createPostStatus === 'success') {
      showMessage({ type: 'success', message: 'Your post has been processed successfully.' });
    }
  }, [createPostStatus]);

  useEffect(() => {
    if (createMomentStatus === 'pending') {
      showMessage({ type: 'info', message: 'Processing now...' });
    }
    if (createMomentStatus === 'success') {
      showMessage({ type: 'success', message: 'Your moment has been processed successfully.' });
    }
  }, [createMomentStatus]);

  //あれだよな。。。シンプルに。post押した後のnavigationだけ変えればいいんだよな。結局今は、、、、recoil使ったりで割と便利ではあるしね。
  // navigatonのものだけfunction をpassして実行するようにするか。
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

  const onAddNewPostPress = () => {
    closeAddNewPostMenuBottomSheet();
    homeStackNavigation.navigate('CreateNewPostStackNavigator', {
      screen: 'NormalPost',
      params: {
        handleNavigation: () => {
          homeStackNavigation.goBack();
        },
      },
    });
  };

  const onAddNewMomentPress = () => {
    closeAddNewPostMenuBottomSheet();
    homeStackNavigation.navigate('CreateNewPostStackNavigator', {
      screen: 'MomentPost',
      params: {
        handleNavigation: () => {
          homeStackNavigation.goBack();
        },
      },
    });
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
        <CurrentSpace openAddNewPostMenuBottomSheet={openAddNewPostMenuBottomSheet} />
      )}

      <AppBottomSheet.Gorhom
        ref={addNewPostMenuBottomSheetRef}
        snapPoints={['40%']}
        header={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.text, { marginRight: 5 }]}>Something to share on</Text>
            <ExpoImage source={{ uri: currentSpace.icon }} style={{ width: 30, height: 30, borderRadius: 20 }} />
            <Text style={[styles.text, { marginLeft: 5 }]}>?</Text>
          </View>
        }
        onCloseButtonClose={closeAddNewPostMenuBottomSheet}
      >
        <AddNewPostMenu onAddNewPostPress={onAddNewPostPress} onAddNewMomentPress={onAddNewMomentPress} />
      </AppBottomSheet.Gorhom>

      <AppBottomSheet.Gorhom
        ref={authMenuBottomSheetRef}
        snapPoints={['60%']}
        header={<Text style={styles.text}>Settings</Text>}
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
        header={<Text style={styles.text}>Add Space</Text>}
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
  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
