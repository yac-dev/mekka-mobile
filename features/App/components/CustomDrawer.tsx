import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Platform } from 'react-native';
import { AppButton } from '../../../components/Button';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { AuthContext, CurrentSpaceContext, CurrentTagContext, SpaceUpdatesContext } from '../../../providers';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { MySpacesContext } from '../../../providers';
import { SpaceType } from '../../../types';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../../../navigations';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../themes';

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
  const { auth } = useContext(AuthContext);
  const { mySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { spaceUpdates } = useContext(SpaceUpdatesContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);

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

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <View
          style={{
            flex: 2,
            paddingTop: 10,
            paddingHorizontal: 5,
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
                <VectorIcon.MCI name='plus' color={'rgb(190,190,190)'} size={25} />
              </TouchableOpacity>
              {/* <Text style={{ color: 'white' }}>Add space</Text> */}
            </View>
            {mySpaces.map((space: SpaceType) => {
              const isFocused = currentSpace._id === space._id;
              return (
                <TouchableOpacity
                  key={space._id}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // width: 90,
                    // height: 90,
                    borderRadius: 8,
                    backgroundColor: isFocused ? 'rgb(50,50,50)' : null,
                    paddingVertical: 10,
                    // borderBottomColor: isFocused ? 'white' : null,
                    // borderBottomWidth: isFocused ? 1 : null,
                  }}
                  onPress={() => {
                    // onSpacePress(route.params?.space);
                    setCurrentSpace(space);
                  }}
                >
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View>
                      <ExpoImage
                        style={{ width: 45, aspectRatio: 1, borderRadius: 25 }}
                        source={{ uri: space.icon }}
                        contentFit='contain'
                      />
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: isFocused ? 'rgb(50,50,50)' : 'black',
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
                          <Text style={{ color: 'white', fontSize: 12 }}>12</Text>
                        </View>
                      </View>
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
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
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
              <VectorIcon.MCI name='account' size={20} color={'rgb(190,190,190)'} />
            </AppButton.Icon>
          </View>
        </View>
        <View style={{ flex: 9 }}>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 15 }}>
            <ExpoImage
              style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
              source={{ uri: currentSpace.icon }}
              contentFit='cover'
            />
            <View style={{}}>
              <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>
                {currentSpace.name}
              </Text>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <VectorIcon.II name='images' size={13} color='rgb(150,150,150)' style={{ marginRight: 10 }} />
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 13 }}>{currentSpace.contentType}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <VectorIcon.II
                    name='play-circle-sharp'
                    size={13}
                    color={'rgb(150,150,150)'}
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 13 }}>{currentSpace.videoLength} seconds</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ExpoImage
                    style={{ width: 13, height: 13, marginRight: 10 }}
                    source={require('../../../assets/forApp/ghost.png')}
                    contentFit='contain'
                    tintColor={'rgb(150,150,150)'}
                  />
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 13 }}>{currentSpace.videoLength} seconds</Text>
                </View>
              </View>
            </View>
          </View>
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
                onButtonPress={() => navigation.closeDrawer()}
                customStyle={{
                  width: 42,
                  height: 42,
                  backgroundColor: 'rgb(50,50,50)',
                  marginBottom: 3,
                }}
                hasShadow={false}
              >
                <VectorIcon.MCI name='account-group' size={20} color={'rgb(190,190,190)'} />
              </AppButton.Icon>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Members</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <AppButton.Icon
                onButtonPress={() => navigation.closeDrawer()}
                customStyle={{
                  width: 42,
                  height: 42,
                  backgroundColor: 'rgb(50,50,50)',
                  marginBottom: 3,
                }}
                hasShadow={false}
              >
                <VectorIcon.FT name='activity' size={20} color={'rgb(190,190,190)'} />
              </AppButton.Icon>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Activities</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
              <AppButton.Icon
                onButtonPress={() => navigation.closeDrawer()}
                customStyle={{
                  width: 42,
                  height: 42,
                  backgroundColor: 'rgb(50,50,50)',
                  marginBottom: 3,
                }}
                hasShadow={false}
              >
                <VectorIcon.II name='search' size={20} color={'rgb(190,190,190)'} />
              </AppButton.Icon>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Search</Text>
            </View>
          </View>
          <ScrollView>
            {currentSpace.tags.map((tag, index) => {
              const isFocused = currentTag?._id === tag._id;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                  }}
                  onPress={() => {
                    // currentTagのを読み込んでくる必要がある。
                    navigation.toggleDrawer();
                    setCurrentTag(tag);
                    // drawer側のnavigationをしたい場合には、↓を動かしたいんだよね。。。これでも一応動いてはいるがバグの温床になりそう。。。
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

                    // console.log('current space', currentSpace._id);
                    // navigation.navigate(`Space_${currentSpace._id}`);
                  }}
                  onLongPress={() => console.log('tag long pressed')}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 2,
                      paddingLeft: 5,
                      paddingRight: 10,
                      // backgroundColor: isFocused ? 'rgb(40,40,40)' : 'transparent',
                      borderRadius: 8,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <ExpoImage
                        style={{ width: 20, aspectRatio: 1, marginRight: 10 }}
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
                        {/* <Text style={{ color: 'rgb(150,150,150))', fontSize: 13 }}>
                    {route.params?.spa.isPublic ? 'Public' : 'Private'}
                  </Text> */}
                      </View>
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
