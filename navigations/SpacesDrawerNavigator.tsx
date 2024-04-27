import React, { useState, useContext, useEffect, useRef } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions, Linking } from 'react-native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconParameterBackgroundColorTable, iconColorTable } from '../themes/color';
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import { Image as ExpoImage } from 'expo-image';
import Dummy2 from '../features/Utils/Dummy2';
// import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import { SpaceRootStackNavigator } from './SpaceRootStackNavigator';
import backendAPI from '../apis/backend';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext, MySpacesContext, SpaceUpdatesContext } from '../providers';
import * as SecureStore from 'expo-secure-store';
import { useGetMySpaces } from '../features';
import { NoSpaces } from '../features';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { AppBottomSheet } from '../components/AppBottomSheet';
import { useBottomSheet } from '../features/Home/hooks/useBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigatorProps } from '../features/App/pages/Root';
import { AuthMenu, AddNewSpaceMenu } from '../features';
import { EditProfileStackNavigatorProps, HomeStackNavigatorProps } from '.';
import { CustomDrawer } from '../features';
import { SpaceRootProvider } from '../features/Space/providers/SpaceRootProvider';
import { CurrentSpaceContext } from '../providers';
import { SpaceType, TagType } from '../types';
import { TagScreenStackNavigator } from '.';
import { TagScreenProvider } from '../features';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SpaceRootStackParams } from './SpaceRootStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';

export type SpacesDrawerParams = {
  [key: string]: NavigatorScreenParams<SpaceRootStackParams>;
};

export type SpacesDrawerStackNavigatorProps = DrawerNavigationProp<SpacesDrawerParams>;
const Drawer = createDrawerNavigator();
// というかあれか、そのspaceが開かれたらその時点でdateをupdateする感じか。それとも、そのspaceのroot stack component unmount時にdata updateをする感じかな。これはtag viewも同様で。
//　tapでbadgeは消す。ただ、dateのupdateはそのspace rootのunmount時、tag viewのunmount時にdate updateをする感じか。。。
// あとは、appがcloseした時もcurrentのspaceのdate updateをする感じだね。

export const SpacesDrawerNavigator = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const addNewSpaceBottomSheetRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<RootStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const {
    authMenuBottomSheetRef,
    openAuthMenuBottomSheet,
    closeAuthMenuBottomSheet,
    addNewSpaceMenuBottomSheetRef,
    openAddNewSpaceMenuBottomSheet,
    closeAddNewSpaceMenuBottomSheet,
  } = useBottomSheet();
  const oneGridWidth = Dimensions.get('window').width / 4;

  // getMySpacesをやってないよね。。。ここをなまず直さないといけないな。。。
  // useEffect(() => {
  //   if (auth) {
  //     console.log('running getMySpaces');
  //     requestGetMySpaces({ userId: auth._id });
  //   }
  // }, [auth]);

  // useEffect(() => {
  //   if (getMySpacesApiResult.status === 'success') {
  //     setMySpaces(getMySpacesApiResult.data.spaces);
  //     setSpaceUpdates(getMySpacesApiResult.data.updateTable);
  //   }
  // }, [getMySpacesApiResult.status]);

  // const updateLastCheckedIn = async () => {
  //   const result = await backendAPI.patch(`/users/${auth._id}/lastcheckedin`, {
  //     spaceId: currentSpaceAndUserRelationship.space._id,
  //   });
  // };

  // function CustomDrawerContent(props) {
  //   const { state, descriptors, navigation } = props;

  //   const onCloseDrawerPress = () => {
  //     navigation.closeDrawer();
  //   };

  //   const onAuthCaretDownPress = () => {
  //     navigation.closeDrawer();
  //     openAuthMenuBottomSheetToIndex(0);
  //   };

  //   return (
  //     <View {...props} style={{ paddingTop: 30 }}>
  //       <AppButton.Icon
  //         onPressButton={onCloseDrawerPress}
  //         style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 10 }}
  //       >
  //         <VectorIcon.II name='close-circle' size={30} color='white' />
  //       </AppButton.Icon>
  //       <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
  //         <ExpoImage
  //           style={{ width: 35, height: 35, marginBottom: 10 }}
  //           source={{ uri: auth.avatar }}
  //           contentFit='cover'
  //         />
  //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //           <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginRight: 10 }}>{auth.name}</Text>
  //           <TouchableOpacity
  //             style={{
  //               width: 20,
  //               height: 20,
  //               borderRadius: 10,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               backgroundColor: 'white',
  //             }}
  //             onPress={onAuthCaretDownPress}
  //           >
  //             <MaterialCommunityIcons name='chevron-down' size={20} color='black' />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           borderBottomWidth: 0.3,
  //           borderBottomColor: 'rgb(150,150,150)',
  //           padding: 10,
  //           marginBottom: 10,
  //         }}
  //       >
  //         <TouchableOpacity
  //           style={{
  //             flexDirection: 'column',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             width: 80,
  //             height: 80,
  //           }}
  //           onPress={() => {
  //             navigation.navigate('CreateNewSpaceStackNavigator');
  //             navigation.closeDrawer();
  //           }}
  //         >
  //           <View
  //             style={{
  //               width: 50,
  //               aspectRatio: 1,
  //               borderRadius: 25,
  //               marginBottom: 10,
  //               backgroundColor: 'white',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <MaterialCommunityIcons name='plus' color={'black'} size={25} />
  //           </View>
  //           <Text style={{ color: 'white' }}>Create</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{
  //             flexDirection: 'column',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             width: 80,
  //             height: 80,
  //           }}
  //           onPress={() => {
  //             navigation.navigate('Discover');
  //           }}
  //         >
  //           <View
  //             style={{
  //               width: 50,
  //               aspectRatio: 1,
  //               borderRadius: 25,
  //               marginBottom: 10,
  //               backgroundColor: 'white',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <MaterialCommunityIcons name='compass-outline' color={'black'} size={25} />
  //           </View>
  //           <Text style={{ color: 'white' }}>Discover</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{
  //             flexDirection: 'column',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             width: 80,
  //             height: 80,
  //           }}
  //           onPress={() => {
  //             navigation.navigate('SecretKeyForm');
  //             navigation.closeDrawer();
  //           }}
  //         >
  //           <View
  //             style={{
  //               width: 50,
  //               aspectRatio: 1,
  //               borderRadius: 25,
  //               marginBottom: 10,
  //               backgroundColor: 'white',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <Ionicons name='key' color={'black'} size={25} />
  //           </View>
  //           <Text style={{ color: 'white' }}>Private key</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <ScrollView>
  //         {state.routes.map((route, index) => {
  //           const spaceUpdatesArray =
  //             updatesTable[route.params?.spaceAndUserRelationship.space._id] &&
  //             Object.values(updatesTable[route.params?.spaceAndUserRelationship.space._id]);
  //           const sum = spaceUpdatesArray && spaceUpdatesArray.reduce((partialSum, a) => partialSum + a, 0);
  //           const { options } = descriptors[route.key];
  //           const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

  //           const isFocused = state.index === index;

  //           const onPress = () => {
  //             const event = navigation.emit({
  //               type: 'tabPress',
  //               target: route.key,
  //               canPreventDefault: true,
  //             });
  //             // ここでspaceのdate updateか。
  //             updateLastCheckedIn(); //一時停止。
  //             setCurrentSpaceAndUserRelationship(route.params?.spaceAndUserRelationship);

  //             if (!isFocused && !event.defaultPrevented) {
  //               navigation.navigate(route.name);
  //             }
  //           };

  //           return (
  //             <TouchableOpacity
  //               key={route.key}
  //               style={{
  //                 padding: 5,
  //               }}
  //               onPress={onPress}
  //             >
  //               <View
  //                 style={{
  //                   flexDirection: 'row',
  //                   alignItems: 'center',
  //                   padding: 10,
  //                   backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
  //                   borderRadius: 10,
  //                   justifyContent: 'space-between',
  //                 }}
  //               >
  //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //                   <ExpoImage
  //                     style={{ width: 40, aspectRatio: 1, borderRadius: 10, marginRight: 15 }}
  //                     source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
  //                     contentFit='cover'
  //                   />
  //                   <View>
  //                     <Text numberOfLines={1} style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>
  //                       {route.params?.spaceAndUserRelationship.space.name}
  //                     </Text>
  //                     <Text style={{ color: 'rgb(150,150,150))', fontSize: 13 }}>
  //                       {route.params?.spaceAndUserRelationship.space.isPublic ? 'Public' : 'Private'}
  //                     </Text>
  //                   </View>
  //                 </View>
  //                 {sum ? (
  //                   <View
  //                     style={{
  //                       width: 24,
  //                       height: 24,
  //                       borderRadius: 12,
  //                       backgroundColor: 'red',
  //                       justifyContent: 'center',
  //                       alignItems: 'center',
  //                     }}
  //                   >
  //                     <Text style={{ color: 'white' }}>{sum}</Text>
  //                   </View>
  //                 ) : null}
  //               </View>
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </ScrollView>
  //     </View>
  //   );
  // }

  // const calcurateSumUpdates = () => {
  //   let sum = 0;
  //   for (let key in updatesTable) {
  //     const objectKeySum = Object.values(updatesTable[key]).reduce((a, b) => a + b, 0);
  //     sum += objectKeySum;
  //   }
  //   return sum;
  // };

  const onLogoutPress = async () => {
    // setLoading(true);
    await SecureStore.deleteItemAsync('secure_token');
    // setAuthData({ _id: '', name: '', email: '', avatar: '' });
    // setIsAuthenticated(false);
    // setSpaceAndUserRelationships([]);
    // setLoading(false);
    // setSnackBar({
    //   isVisible: true,
    //   status: 'success',
    //   message: 'Logged out successfully.',
    //   duration: 5000,
    // });
    // props.navigation.navigate('Welcome');
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
    // props.navigation.navigate({
    //   name: 'DeleteMyAccount',
    // });
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
    homeStackNavigation.navigate('Discover');
  };

  // if (getMySpacesApiResult.status === 'loading') {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 100 }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  // if (getMySpacesApiResult.status === 'success' && !mySpaces.length) {
  //   return <NoSpaces navigation={props.navigation} />;
  // }

  // if (getMySpacesApiResult.status === 'error') {
  //   return <View style={{ flex: 1, backgroundColor: 'black' }}></View>;
  // }

  const calcurateSumUpdates = () => {
    let sum: number = 0;
    for (let key in spaceUpdates) {
      const values: number[] = Object.values(spaceUpdates[key]).map((v) => Number(v));
      const objectKeySum: number = values.reduce((a: number, b: number) => a + b, 0);
      sum += objectKeySum;
      // 元のコード　↑でどうだろね。わからん。
      // const objectKeySum: number = Object.values(spaceUpdates[key]).reduce((a: number, b: number) => a + b, 0);
      // sum += objectKeySum;
    }
    return sum;
  };

  if (auth && mySpaces) {
    return (
      <>
        <Drawer.Navigator
          defaultStatus='open'
          drawerContent={(props) => (
            <CustomDrawer
              {...props}
              openAuthMenuBottomSheet={openAuthMenuBottomSheet}
              closeAuthMenuBottomSheet={closeAuthMenuBottomSheet}
              openAddNewSpaceMenuBottomSheet={openAddNewSpaceMenuBottomSheet}
              closeAddNewSpaceMenuBottomSheet={closeAddNewSpaceMenuBottomSheet}
            />
          )}
          screenOptions={({ navigation }) => ({
            headerShown: false,
            swipeEnabled: true,
            drawerType: 'back',
            drawerStyle: {
              backgroundColor: 'black',
              borderRightColor: 'rgb(40,40,40)',
              borderRightWidth: 1,
              width: Dimensions.get('screen').width * 0.9,
            },
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopWidth: 0,
              width: 'auto',
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'black',
              borderBottomWidth: 0,
              borderBottomColor: 'black',
              height: 80,
            },
            tabBarLabel: 'Home',
          })}
        >
          {!mySpaces.length ? (
            <Drawer.Screen
              name={`NoSpaces`}
              options={({ navigation }) => ({
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  // padding: 20,
                },
                // simulatorの場合、これないとheaderのheiightがおかしくなる。。。何で？？？
                headerStyle: {
                  // padding: 20,
                  backgroundColor: 'black',
                },
                title: '',

                headerLeft: () => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        width: 50,
                        height: 50,
                        // backgroundColor: 'blue',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => navigation.toggleDrawer()}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: 'white',
                          // marginLeft: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Ionicons name='list' style={{}} size={20} />
                      </View>
                    </TouchableOpacity>
                  );
                },
              })}
            >
              {({ navigation, route }) => <NoSpaces navigation={navigation} />}
            </Drawer.Screen>
          ) : (
            // ここに登録しているnavigationに変化がない限り、drawerをtoggleしてくれない感じ。。。。
            mySpaces.map((space: SpaceType) => (
              <Drawer.Screen
                key={space._id}
                name={`Space_${space._id}`}
                initialParams={{ space }}
                options={({ navigation }) => ({
                  headerTitle: space.name,
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    // padding: 20,
                  },
                  // simulatorの場合、これないとheaderのheiightがおかしくなる。。。何で？？？
                  headerStyle: {
                    // padding: 20,
                    backgroundColor: 'black',
                  },

                  headerLeft: () => {
                    return (
                      <AppButton.Icon
                        onButtonPress={() => navigation.toggleDrawer()}
                        customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)', marginLeft: 10 }}
                        hasShadow={false}
                      >
                        <VectorIcon.MCI name='arrow-left' size={18} color={'rgb(190,190,190)'} />
                        {calcurateSumUpdates() ? (
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: 'red',
                              position: 'absolute',
                              top: -3,
                              right: -3,
                            }}
                          >
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                              }}
                            ></View>
                          </View>
                        ) : null}
                      </AppButton.Icon>
                    );
                  },
                })}
              >
                {({ navigation, route }) => (
                  // <TagScreenProvider tag={tag}>
                  //   <TagScreenStackNavigator />
                  // </TagScreenProvider>
                  <SpaceRootProvider space={space}>
                    <SpaceRootStackNavigator />
                  </SpaceRootProvider>
                )}
              </Drawer.Screen>
            ))
          )}
        </Drawer.Navigator>
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
      </>
    );
  } else {
    return null;
  }
};
