import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Linking, ScrollView, Alert } from 'react-native';
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
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 30 }}>
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
              marginBottom: 10,
            }}
            onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
          >
            <ExpoImage
              style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
              source={{ uri: currentSpace.icon }}
              contentFit='cover'
            />
            <View style={{}}>
              <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>
                {currentSpace.name}
              </Text>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, marginBottom: 3 }}>
                {currentSpace.isPublic ? 'Public' : 'Private'}
              </Text>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 13 }}>Ads free</Text>
            </View>
          </TouchableOpacity>
          <View
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
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <AppButton.Icon
                onButtonPress={() =>
                  // homeStackNavigation.navigate('SpacesDrawerNavigator', {
                  //   screen: `Moments_${currentSpace._id}`,
                  //   // ここに変化がない限り、toggleしない。実際、確かにここより下はdrawerのnavigatorに登録しているわけではないからね。。。ここをどう克服するか。というか、仕組みが少しわかってきた。
                  //   // 逆にでは、そうなら
                  //   // params: {
                  //   //   screen: 'TagsTopTabNavigator',
                  //   //   params: {
                  //   //     screen: `Tag_${tag._id}`,
                  //   //     params: {
                  //   //       screen: 'GridView',
                  //   //     },
                  //   //   },
                  //   // },
                  // })
                  console.log('heloo')
                }
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
          </View>
          <ScrollView>
            {currentSpace.tags.map((tag, index) => {
              const isFocused = currentTag?._id === tag._id;
              const tagLogs = currentSpace && logsTable[currentSpace._id] && logsTable[currentSpace._id][tag._id];
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={{
                    paddingVertical: 5,
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
                    // drawer側のnavigationをしたい場合には、↓を動かしたいんだよね。。。これでも一応動いてはいるがバグの温床になりそう。。。
                    // あれか。。。currentSpaceの方はただtoggleをすればいいだけかな。。。
                    // homeStackNavigation.navigate('SpaceRootStackNavigator', {
                    //   screen: 'TagsTopTabNavigator',
                    //   params: {
                    //     screen: `Tag_${tag._id}`,
                    //   },
                    // });
                    // ここnestedにspaceに行くようにすればいいか。そのspaceにidを渡せばいいだけだわ。
                    homeStackNavigation.navigate('SpaceStackNavigator', {
                      screen: 'Space',
                      params: { space: currentSpace },
                    });

                    // if (currentSpace._id !== tag._id) {
                    //   homeStackNavigation.navigate('SpaceRootStackNavigator', {
                    //     screen: 'TagsTopTabNavigator',
                    //     params: {
                    //       screen: `Tag_${currentTag._id}`,
                    //     },
                    //   });
                    // } else {
                    //   // navigation.toggleDrawer();
                    // }

                    // console.log('current space', currentSpace._id);
                    // navigation.navigate(`Space_${currentSpace._id}`);
                  }}
                  onLongPress={() => console.log('tag long pressed')}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                      paddingLeft: 5,
                      paddingRight: 10,
                      // backgroundColor: isFocused ? 'rgb(40,40,40)' : 'transparent',
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
                        tintColor={isFocused ? 'white' : 'rgb(150,150,150)'}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{ color: isFocused ? 'white' : 'rgb(150,150,150)', fontSize: 15 }}
                        >
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
