import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconParameterBackgroundColorTable, iconColorTable } from '../themes/color';
const Drawer = createDrawerNavigator();
import SpaceRootBottomTabNavigator from './SpaceRootBottomTabNavigator';
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import { Image as ExpoImage } from 'expo-image';
import Dummy2 from '../features/Utils/Dummy2';
import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import backendAPI from '../apis/backend';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext, MySpacesContext, SpaceUpdatesContext } from '../providers';
import { useGetMySpaces } from '../features';
import { NoSpaces } from '../features';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { AppBottomSheet } from '../components/AppBottomSheet';
import { useBottomSheet } from '../hooks';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigatorProps } from '../features';
// というかあれか、そのspaceが開かれたらその時点でdateをupdateする感じか。それとも、そのspaceのroot stack component unmount時にdata updateをする感じかな。これはtag viewも同様で。
//　tapでbadgeは消す。ただ、dateのupdateはそのspace rootのunmount時、tag viewのunmount時にdate updateをする感じか。。。
// あとは、appがcloseした時もcurrentのspaceのdate updateをする感じだね。

export const SpacesDrawerNavigator = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { apiResult: getMySpacesApiResult, requestApi: requestGetMySpaces } = useGetMySpaces();
  const navigation = useNavigation<RootStackNavigatorProps>();
  const {
    ref: authMenuBottomSheetRef,
    openModalToIndex: openAuthMenuBottomSheetToIndex,
    closeModal: closeAuthMenuBottomSheet,
  } = useBottomSheet();
  const {
    // spaceAndUserRelationships,
    haveSpaceAndUserRelationshipsBeenFetched,
    setCurrentSpaceAndUserRelationship,
    spaceMenuBottomSheetRef,
    // authMenuBottomSheetRef,
    isAuthenticated,
    spaceAndUserRelationshipsFetchingStatus,
    updatesTable,
    setUpdatesTable,
    currentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
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

  const updateLastCheckedIn = async () => {
    const result = await backendAPI.patch(`/users/${auth._id}/lastcheckedin`, {
      spaceId: currentSpaceAndUserRelationship.space._id,
    });
  };

  function CustomDrawerContent(props) {
    const { state, descriptors, navigation } = props;

    const onCloseDrawerPress = () => {
      navigation.closeDrawer();
    };

    const onAuthCaretDownPress = () => {
      navigation.closeDrawer();
      openAuthMenuBottomSheetToIndex(0);
    };

    return (
      <View {...props} style={{ paddingTop: 30 }}>
        <AppButton.Icon
          onPressButton={onCloseDrawerPress}
          style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 10 }}
        >
          <VectorIcon.II name='close-circle' size={30} color='white' />
        </AppButton.Icon>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <ExpoImage
            style={{ width: 35, height: 35, marginBottom: 10 }}
            source={{ uri: auth.avatar }}
            contentFit='cover'
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginRight: 10 }}>{auth.name}</Text>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}
              onPress={onAuthCaretDownPress}
            >
              <MaterialCommunityIcons name='chevron-down' size={20} color='black' />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderBottomColor: 'rgb(150,150,150)',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
            }}
            onPress={() => {
              navigation.navigate('CreateNewSpaceStackNavigator');
              navigation.closeDrawer();
            }}
          >
            <View
              style={{
                width: 50,
                aspectRatio: 1,
                borderRadius: 25,
                marginBottom: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='plus' color={'black'} size={25} />
            </View>
            <Text style={{ color: 'white' }}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
            }}
            onPress={() => {
              navigation.navigate('Discover');
              // navigation.closeDrawer();
            }}
          >
            <View
              style={{
                width: 50,
                aspectRatio: 1,
                borderRadius: 25,
                marginBottom: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='compass-outline' color={'black'} size={25} />
            </View>
            <Text style={{ color: 'white' }}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
            }}
            onPress={() => {
              navigation.navigate('SecretKeyForm');
              navigation.closeDrawer();
            }}
          >
            <View
              style={{
                width: 50,
                aspectRatio: 1,
                borderRadius: 25,
                // marginRight: 15,
                marginBottom: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name='key' color={'black'} size={25} />
            </View>
            <Text style={{ color: 'white' }}>Private key</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {state.routes.map((route, index) => {
            const spaceUpdatesArray =
              updatesTable[route.params?.spaceAndUserRelationship.space._id] &&
              Object.values(updatesTable[route.params?.spaceAndUserRelationship.space._id]);
            const sum = spaceUpdatesArray && spaceUpdatesArray.reduce((partialSum, a) => partialSum + a, 0);
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              // ここでspaceのdate updateか。
              updateLastCheckedIn(); //一時停止。
              setCurrentSpaceAndUserRelationship(route.params?.spaceAndUserRelationship);

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  padding: 5,
                  // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                }}
                onPress={onPress}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                    borderRadius: 10,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ExpoImage
                      style={{ width: 40, aspectRatio: 1, borderRadius: 10, marginRight: 15 }}
                      source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                      contentFit='cover'
                    />
                    <View>
                      <Text numberOfLines={1} style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>
                        {route.params?.spaceAndUserRelationship.space.name}
                      </Text>
                      <Text style={{ color: 'rgb(150,150,150))', fontSize: 13 }}>
                        {route.params?.spaceAndUserRelationship.space.isPublic ? 'Public' : 'Private'}
                      </Text>
                    </View>
                  </View>
                  {sum ? (
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
                  ) : null}
                  {/* <Text>{Object.values(updatesTable[route.params?.spaceAndUserRelationship.space])}</Text> */}
                  {/* <Text>
                        {Object.values(updatesTable[route.params?.spaceAndUserRelationship.space._id])}
                      </Text> */}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* ↓これあると、screenのtabもrenderするようになる。 */}
        {/* <DrawerItemList {...props} /> */}
      </View>
    );
  }

  const calcurateSumUpdates = () => {
    // Object.values(updatesTable)
    let sum = 0;
    for (let key in updatesTable) {
      const objectKeySum = Object.values(updatesTable[key]).reduce((a, b) => a + b, 0);
      sum += objectKeySum;
    }
    return sum;
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

  if (auth && mySpaces) {
    return (
      <>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            drawerStyle: {
              backgroundColor: 'rgb(40,40,40)',
              width: 320,
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
            mySpaces.map((space) => (
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
                        </View>
                      </TouchableOpacity>
                    );
                  },
                  headerRight: () => {
                    return (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('SpaceInfoStackNavigator', { space });
                          }}
                        >
                          <ExpoImage
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              marginRight: 10,
                            }}
                            source={{ uri: space.icon }}
                            contentFit='cover'
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  },
                })}
              >
                {({ navigation, route }) => (
                  // <SpaceRootStackNavigator
                  //   space={space}
                  //   navigation={navigation}
                  //   route={route}
                  // />
                  // 一旦、SpaceRootのrenderしないようにする。
                  <View>
                    <Text>Hello world</Text>
                  </View>
                )}
              </Drawer.Screen>
            ))
          )}
        </Drawer.Navigator>
        <AppBottomSheet.Gorhom ref={authMenuBottomSheetRef} snapPoints={['60%']} title='r' defaultSnapPointsIndex={-1}>
          <View>
            <Text>Hello!!!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('LoginStackNavigator')}>
            <Text>Go to edit</Text>
          </TouchableOpacity>
        </AppBottomSheet.Gorhom>
      </>
    );
  } else {
    return null;
  }
};
