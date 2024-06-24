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
import { AuthMenu, AddNewSpaceMenu } from '../components';

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
      <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 100, paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>
          You haven't joined any spaces now.
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
            <TouchableOpacity activeOpacity={0.5} onPress={() => openLink(urls.howToCreateNewSpace)}>
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
              activeOpacity={0.5}
              onPress={() => homeStackNavigation.navigate('EnterPrivateSpace')}
            >
              <VectorIcon.II name='key' color={Colors.white} size={40} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => openLink(urls.howToCreateNewSpace)}>
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
              activeOpacity={0.5}
              onPress={() => homeStackNavigation.navigate('DiscoverStackNavigator')}
            >
              <VectorIcon.MCI name='compass' color={Colors.white} size={40} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => openLink(urls.howToCreateNewSpace)}>
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
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <View
          style={{
            flex: 2,
            paddingTop: 25,

            borderRightWidth: 0.3,
            borderRightColor: 'rgb(70,70,70)',
            height: '100%',
            // paddingHorizontal: 5,
            // backgroundColor: 'red',
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                // width: 90,
                // height: 90,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  width: 45,
                  aspectRatio: 1,
                  borderRadius: 25,
                  backgroundColor: 'rgb(50,50,50)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // homeStackNavigation.navigate('CreateNewSpaceStackNavigator');
                  openAddNewSpaceMenuBottomSheet(0);
                }}
              >
                <VectorIcon.MCI name='plus' color={Colors.white} size={25} />
              </TouchableOpacity>
              {/* <Text style={{ color: 'white' }}>Add space</Text> */}
            </View>
            {/* space tapで、spaceAndUserRelationshipのlastCheckedInでupdateしような。 */}
            {mySpaces.map((space: SpaceType) => {
              const isFocused = currentSpace._id === space._id;
              const totalLogs =
                logsTable[space._id] &&
                Object.values(logsTable[space._id]).reduce((accumlator, logs) => accumlator + logs, 0);

              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={space._id}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // width: 90,
                    // height: 90,
                    // borderRadius: 8,
                    // backgroundColor: isFocused ? 'rgb(50,50,50)' : null,
                    paddingVertical: 10,
                    // borderBottomColor: isFocused ? 'white' : null,
                    // borderBottomWidth: isFocused ? 1 : null,
                    borderRightWidth: isFocused ? 1 : 0,
                    borderRightColor: 'white',
                  }}
                  onPress={() => {
                    setCurrentSpace(space);
                    requestApi({ spaceId: space._id, userId: auth._id });
                    // spaceのicon tapでlastCheckedinを更新していく。
                  }}
                >
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View
                      style={{ width: 45, aspectRatio: 1, borderRadius: 22.5, borderColor: 'white', borderWidth: 0.3 }}
                    >
                      <ExpoImage
                        style={{ width: '100%', height: '100%', borderRadius: 22.5 }}
                        source={{ uri: space.icon }}
                        contentFit='contain'
                      />
                      <View></View>
                      {totalLogs ? (
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 8,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: 'red',
                            }}
                          >
                            <Text style={{ color: 'white', fontSize: 12 }}>{totalLogs}</Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                    {/* <Text numberOfLines={1} style={{ color: 'white', fontSize: 15 }}>
                    {space.name}
                  </Text> */}
                  </View>
                  {/* {sum ? (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>{sum}</Text>
                </View>
              ) : null} */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {/* 基本、自分のpost向けのcommentやreactionの通知をここで出すようにしたい。 */}
            {/* <AppButton.Icon
              onButtonPress={() => openAuthMenuBottomSheet(0)}
              customStyle={{
                width: 45,
                aspectRatio: 1,
                backgroundColor: 'rgb(50,50,50)',
                position: 'absolute',
                bottom: 60,
              }}
              hasShadow={false}
            >
              <VectorIcon.II name='notifications-sharp' size={20} color={Colors.white} />
            </AppButton.Icon> */}
            <AppButton.Icon
              onButtonPress={() => openAuthMenuBottomSheet(0)}
              customStyle={{
                width: 45,
                aspectRatio: 1,
                backgroundColor: 'rgb(50,50,50)',
                position: 'absolute',
                bottom: 10,
              }}
              hasShadow={false}
            >
              <VectorIcon.MCI name='account' size={20} color={Colors.white} />
            </AppButton.Icon>
          </View>
        </View>
        <View style={{ flex: 9, paddingTop: 15 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 10,
              alignItems: 'center',
            }}
            onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
          >
            <ExpoImage
              style={{ width: 55, height: 55, borderRadius: 40, marginRight: 20 }}
              source={{ uri: currentSpace.icon }}
              contentFit='cover'
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20, marginRight: 20 }}>
                {currentSpace.name}
              </Text>
              <AppButton.Icon
                onButtonPress={() => handleInvite()}
                customStyle={{
                  width: 26,
                  height: 26,
                  backgroundColor: 'rgb(50,50,50)',
                }}
                hasShadow={false}
              >
                <VectorIcon.MCI name='human-greeting-variant' size={15} color={'white'} />
              </AppButton.Icon>
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 5,
              alignSelf: 'center',
              marginBottom: 15,
            }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <AppButton.Icon
                onButtonPress={() => console.log('heloo')}
                customStyle={{
                  width: 42,
                  height: 42,
                  backgroundColor: 'rgb(50,50,50)',
                  marginBottom: 3,
                }}
                hasShadow={false}
              >
                <ExpoImage
                  style={{ width: 20, aspectRatio: 1 }}
                  source={require('../../../assets/forApp/ghost.png')}
                  contentFit='cover'
                  tintColor={'white'}
                />
              </AppButton.Icon>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Moments</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <AppButton.Icon
                onButtonPress={() => onRollsPress()}
                customStyle={{
                  width: 42,
                  height: 42,
                  backgroundColor: 'rgb(50,50,50)',
                  marginBottom: 3,
                }}
                hasShadow={false}
              >
                <ExpoImage
                  style={{ width: 20, aspectRatio: 1 }}
                  source={require('../../../assets/forApp/film-roll.png')}
                  contentFit='cover'
                  tintColor={'white'}
                />
              </AppButton.Icon>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Rolls</Text>
            </View>
          </View> */}
          <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
            <ScrollView horizontal contentContainerStyle={{ paddingRight: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StatBox
                  title='Status'
                  icon={<VectorIcon.MI name='public' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />}
                  value={currentSpace.isPublic ? 'Public' : 'Private'}
                  hasNext
                />
                <StatBox
                  title='Content'
                  icon={<VectorIcon.II name='camera' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />}
                  value={
                    currentSpace.contentType === 'photo'
                      ? 'Photos'
                      : currentSpace.contentType === 'video'
                      ? 'Videos'
                      : `Photos/Videos`
                  }
                  hasNext
                />
                {currentSpace.videoLength && (
                  <StatBox
                    title='Video length'
                    icon={
                      <VectorIcon.II
                        name='play-circle'
                        color={'rgb(150,150,150)'}
                        size={15}
                        style={{ marginRight: 5 }}
                      />
                    }
                    value={`${currentSpace.videoLength}s`}
                    hasNext
                  />
                )}

                <StatBox
                  title='Moments'
                  icon={
                    <ExpoImage
                      style={{ width: 15, height: 15, marginRight: 5 }}
                      source={require('../../../assets/forApp/ghost.png')}
                      contentFit='contain'
                      tintColor={'rgb(150,150,150)'}
                    />
                  }
                  value={convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
                  hasNext
                />
                <StatBox
                  title='Reactions'
                  icon={
                    <VectorIcon.MCI name='thumb-up' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />
                  }
                  value={String(currentSpace.reactions.length)}
                  hasNext
                />
                <StatBox
                  title='Ads'
                  icon={
                    <VectorIcon.FD name='megaphone' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />
                  }
                  value={'Free'}
                  hasNext={false}
                />
              </View>
            </ScrollView>
          </View>
          <View style={{ width: '90%', backgroundColor: 'rgb(80,80,80)', height: 0.3, alignSelf: 'center' }}></View>
          <ScrollView>
            <View style={{ paddingLeft: 15, paddingTop: 10 }}>
              <Text style={{ color: 'rgb(150,150,150)' }}>Features</Text>
            </View>
            <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 8,
                  paddingLeft: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => homeStackNavigation.navigate('MomentsStackNavigator')}
              >
                <ExpoImage
                  style={{
                    width: 20,
                    aspectRatio: 1,
                    marginRight: 10,
                  }}
                  source={require('../../../assets/forApp/ghost.png')}
                  contentFit='cover'
                  tintColor={'rgb(150,150,150)'}
                />
                <View>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 15 }}>Moments</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 10,
                  paddingLeft: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => onRollsPress()}
              >
                <ExpoImage
                  style={{ width: 20, aspectRatio: 1, marginRight: 10 }}
                  source={require('../../../assets/forApp/film-roll.png')}
                  contentFit='cover'
                  tintColor={'rgb(150,150,150)'}
                />
                <View>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 15 }}>Rolls</Text>
                </View>
              </TouchableOpacity>
              <View style={{ width: '90%', backgroundColor: 'rgb(80,80,80)', height: 0.5, alignSelf: 'center' }}></View>
            </View>
            <View style={{ paddingLeft: 15, paddingTop: 10 }}>
              <Text style={{ color: 'rgb(150,150,150)', marginBottom: 5 }}>Channels</Text>
            </View>
            {currentSpace.tags.map((tag, index) => {
              const isFocused = currentTag?._id === tag._id;
              const tagLogs = currentSpace && logsTable[currentSpace._id] && logsTable[currentSpace._id][tag._id];
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={{
                    paddingVertical: 8,
                    paddingLeft: 10,
                    paddingRight: 5,
                    // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                  }}
                  onPress={() => {
                    // currentTagのを読み込んでくる必要がある。

                    setCurrentTag(tag);
                    setLogsTable((previous) => {
                      return {
                        ...previous,
                        [currentSpace._id]: {
                          ...previous[currentSpace._id],
                          [tag._id]: 0,
                        },
                      };
                    });
                    homeStackNavigation.navigate('SpaceStackNavigator', {
                      screen: 'Space',
                      params: { space: currentSpace },
                    });
                  }}
                  onLongPress={() => console.log('tag long pressed')}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // paddingVertical: 8,
                      paddingLeft: 5,
                      paddingRight: 10,
                      borderRadius: 8,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <ExpoImage
                        style={{
                          width: 20,
                          aspectRatio: 1,
                          marginRight: 10,
                        }}
                        source={{ uri: tag.icon?.url }}
                        contentFit='cover'
                        tintColor={tagLogs ? 'white' : 'rgb(150,150,150)'}
                      />
                      <View>
                        <Text numberOfLines={1} style={{ color: tagLogs ? 'white' : 'rgb(150,150,150)', fontSize: 15 }}>
                          {tag.name}
                        </Text>
                      </View>
                    </View>
                    {tagLogs ? (
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'red',
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 12 }}>{tagLogs}</Text>
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
