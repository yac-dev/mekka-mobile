import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Platform, Alert } from 'react-native';
import { AppButton } from '../../../components/Button';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import {
  AuthContext,
  CurrentSpaceContext,
  CurrentTagContext,
  SpaceUpdatesContext,
  LogsTableContext,
} from '../../../providers';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { MySpacesContext } from '../../../providers';
import { SpaceType } from '../../../types';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../../../navigations';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../themes';
import { SpaceRootStackNavigatorProp } from '../../../navigations/SpaceRootStackNavigator';
import { useUpdateSpaceCheckedInDate } from '../../../api';

// このnavigationって、Homeのnavigationを受け継ぎ同時にSpacesDrawerのscreenに対するdrawerのnavigationも持っているのか。。。
// まあここはよくわからん。。。
type CustomDrawerProps = {
  openAuthMenuBottomSheet: (index: number) => void;
  closeAuthMenuBottomSheet: () => void;
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  closeAddNewSpaceMenuBottomSheet: () => void;
};

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  state,
  descriptors,
  navigation,
  openAuthMenuBottomSheet,
  closeAuthMenuBottomSheet,
  openAddNewSpaceMenuBottomSheet,
  closeAddNewSpaceMenuBottomSheet,
}) => {
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const spaceRootStackNavigation = useNavigation<SpaceRootStackNavigatorProp>();
  const { auth } = useContext(AuthContext);
  const { logsTable, setLogsTable } = useContext(LogsTableContext);
  const { mySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { spaceUpdates } = useContext(SpaceUpdatesContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { requestApi } = useUpdateSpaceCheckedInDate();

  // const updateLastCheckedIn = async () => {
  //   const result = await backendAPI.patch(`/users/${auth._id}/lastcheckedin`, {
  //     spaceId: currentSpaceAndUserRelationship.space._id,
  //   });
  // };

  // const calcurateSumUpdates = () => {
  //   let sum: number = 0;
  //   for (let key in spaceUpdates) {
  //     const values: number[] = Object.values(spaceUpdates[key]).map((v) => Number(v));
  //     const objectKeySum: number = values.reduce((a: number, b: number) => a + b, 0);
  //     sum += objectKeySum;
  //     // 元のコード　↑でどうだろね。わからん。
  //     // const objectKeySum: number = Object.values(spaceUpdates[key]).reduce((a: number, b: number) => a + b, 0);
  //     // sum += objectKeySum;
  //   }
  //   return sum;
  // };

  const onCloseDrawerPress = () => {
    navigation.closeDrawer();
  };

  const onAuthCaretDownPress = () => {
    navigation.closeDrawer();
    // openAuthMenuBottomSheetToIndex(0);
  };

  const renderSpace = ({ item, index }: { item: SpaceType; index: number }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const onSpacePress = (space: SpaceType) => {
    setCurrentSpace(space);
  };

  const onSpaceLongPress = (space: SpaceType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    homeStackNavigation.navigate('SpaceInfoStackNavigator', { space });
  };

  const onRollsPress = () => {
    Alert.alert('Not available now', 'The Rolls feature will be available in the next update.', [
      { text: 'Got it', onPress: () => null },
    ]);
  };

  return (
    <View style={{ paddingTop: 30 }}>
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
            onPress={() => spaceRootStackNavigation.navigate('SpaceInfoStackNavigator')}
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
            {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <AppButton.Icon
                onButtonPress={() => homeStackNavigation.navigate('MembersStackNavigator')}
                customStyle={{
                  width: 42,
                  height: 42,
                  backgroundColor: 'rgb(50,50,50)',
                  marginBottom: 3,
                }}
                hasShadow={false}
              >
                <VectorIcon.MCI name='account-group' size={20} color={Colors.white} />
              </AppButton.Icon>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>For You</Text>
            </View> */}
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
                  homeStackNavigation.navigate('SpacesDrawerNavigator', {
                    screen: `Moments_${currentSpace._id}`,
                    // ここに変化がない限り、toggleしない。実際、確かにここより下はdrawerのnavigatorに登録しているわけではないからね。。。ここをどう克服するか。というか、仕組みが少しわかってきた。
                    // 逆にでは、そうなら
                    // params: {
                    //   screen: 'TagsTopTabNavigator',
                    //   params: {
                    //     screen: `Tag_${tag._id}`,
                    //     params: {
                    //       screen: 'GridView',
                    //     },
                    //   },
                    // },
                  })
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

                    if (currentSpace._id !== tag._id) {
                      homeStackNavigation.navigate('SpacesDrawerNavigator', {
                        screen: `Space_${currentSpace._id}`,
                        // ここに変化がない限り、toggleしない。実際、確かにここより下はdrawerのnavigatorに登録しているわけではないからね。。。ここをどう克服するか。というか、仕組みが少しわかってきた。
                        // 逆にでは、そうなら
                        // params: {
                        //   screen: 'TagsTopTabNavigator',
                        //   params: {
                        //     screen: `Tag_${tag._id}`,
                        //     params: {
                        //       screen: 'GridView',
                        //     },
                        //   },
                        // },
                      });
                    } else {
                      navigation.toggleDrawer();
                    }

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
      {/* <DrawerItemList {...props} /> screenのtabもrenderするようになる。 */}
    </View>
  );
};

// {state.routes.map((route, index: number) => {
//   // const spaceUpdatesArray =
//   //   spaceUpdates[route.params?.space._id] && Object.values(spaceUpdates[route.params?.space._id]);
//   // const sum =
//   //   spaceUpdatesArray && spaceUpdatesArray.reduce((partialSum: number, a: number) => partialSum + a, 0);
//   // const { options } = descriptors[route.key];
//   // const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

//   const isFocused = state.index === index;

//   const onPress = () => {
//     const event = navigation.emit({
//       type: 'tabPress',
//       target: route.key,
//       canPreventDefault: true,
//     });
//     // ここでspaceのdate updateか。
//     // updateLastCheckedIn(); //一時停止。
//     // setCurrentSpace(route.params?.space);

//     if (!isFocused && !event.defaultPrevented) {
//       navigation.navigate(route.name);
//     }
//   };

// return (
// <TouchableOpacity
//   style={{
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // width: 90,
//     // height: 90,
//     borderRadius: 8,
//     backgroundColor: isFocused ? 'rgb(50,50,50)' : null,
//     paddingVertical: 10,
//     // borderBottomColor: isFocused ? 'white' : null,
//     // borderBottomWidth: isFocused ? 1 : null,
//   }}
//   onPress={() => {
//     // onSpacePress(route.params?.space);
//     onPress();
//   }}
//   onLongPress={() => onSpaceLongPress(route.params?.space)}
// >
//   <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//     <View>
//       <ExpoImage
//         style={{ width: 45, aspectRatio: 1, borderRadius: 25 }}
//         source={{ uri: route.params?.space.icon }}
//         contentFit='contain'
//       />
//       <View
//         style={{
//           width: 24,
//           height: 24,
//           borderRadius: 12,
//           backgroundColor: isFocused ? 'rgb(50,50,50)' : 'black',
//           position: 'absolute',
//           top: -5,
//           right: -5,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <View
//           style={{
//             width: 16,
//             height: 16,
//             borderRadius: 8,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'red',
//           }}
//         >
//           <Text style={{ color: 'white', fontSize: 12 }}>12</Text>
//         </View>
//       </View>
//     </View>
//     {/* <Text numberOfLines={1} style={{ color: 'white', fontSize: 15 }}>
//       {space.name}
//     </Text> */}
//   </View>
//   {/* {sum ? (
//   <View
//     style={{
//       width: 24,
//       height: 24,
//       borderRadius: 12,
//       backgroundColor: 'red',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}
//   >
//     <Text style={{ color: 'white' }}>{sum}</Text>
//   </View>
// ) : null} */}
// </TouchableOpacity>
//     // <TouchableOpacity
//     //   key={route.key}
//     //   activeOpacity={0.5}
//     //   style={{
//     //     paddingVertical: 5,
//     //     paddingHorizontal: 5,
//     //     // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
//     //   }}
//     //   onPress={onPress}
//     //   onLongPress={() => console.log('tag long pressed')}
//     // >
//     //   <View
//     //     style={{
//     //       flexDirection: 'row',
//     //       alignItems: 'center',
//     //       paddingVertical: 2,
//     //       paddingLeft: 5,
//     //       paddingRight: 10,
//     //       // backgroundColor: isFocused ? 'rgb(40,40,40)' : 'transparent',
//     //       borderRadius: 8,
//     //       justifyContent: 'space-between',
//     //     }}
//     //   >
//     //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//     //       <ExpoImage
//     //         style={{ width: 20, aspectRatio: 1, marginRight: 10 }}
//     //         source={{ uri: route.params?.tag.icon?.url }}
//     //         contentFit='cover'
//     //         tintColor={isFocused ? 'white' : 'rgb(150,150,150)'}
//     //       />
//     //       <View>
//     //         <Text
//     //           numberOfLines={1}
//     //           style={{ color: isFocused ? 'white' : 'rgb(150,150,150)', fontSize: 15 }}
//     //         >
//     //           {route.params?.tag.name}
//     //         </Text>
//     //         {/* <Text style={{ color: 'rgb(150,150,150))', fontSize: 13 }}>
//     //       {route.params?.spa.isPublic ? 'Public' : 'Private'}
//     //     </Text> */}
//     //       </View>
//     //     </View>
//     //     {/* {sum ? (
//     //   <View
//     //     style={{
//     //       width: 24,
//     //       height: 24,
//     //       borderRadius: 12,
//     //       backgroundColor: 'red',
//     //       justifyContent: 'center',
//     //       alignItems: 'center',
//     //     }}
//     //   >
//     //     <Text style={{ color: 'white' }}>{sum}</Text>
//     //   </View>
//     // ) : null} */}
//     //   </View>
//     // </TouchableOpacity>
//   );
// })}
