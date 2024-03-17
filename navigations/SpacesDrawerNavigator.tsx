import React, { useState, useContext } from 'react';
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
import NoSpaces from '../features/Utils/NoSpaces';
import { Image as ExpoImage } from 'expo-image';
import Dummy2 from '../features/Utils/Dummy2';
import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import backendAPI from '../apis/backend';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../providers';

// というかあれか、そのspaceが開かれたらその時点でdateをupdateする感じか。それとも、そのspaceのroot stack component unmount時にdata updateをする感じかな。これはtag viewも同様で。
//　tapでbadgeは消す。ただ、dateのupdateはそのspace rootのunmount時、tag viewのunmount時にdate updateをする感じか。。。
// あとは、appがcloseした時もcurrentのspaceのdate updateをする感じだね。
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const SpacesDrawerNavigator = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const {
    isIpad,
    spaceAndUserRelationships,
    haveSpaceAndUserRelationshipsBeenFetched,
    setCurrentSpaceAndUserRelationship,
    spaceMenuBottomSheetRef,
    authMenuBottomSheetRef,
    isAuthenticated,
    spaceAndUserRelationshipsFetchingStatus,
    updatesTable,
    setUpdatesTable,
    currentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;

  // これ、spaceRootで実行するのがいいのかも。。。
  // console.logで見てみるか、currentSpaceをlogしてみる的な。。。
  const updateLastCheckedIn = async () => {
    const result = await backendAPI.patch(`/users/${auth._id}/lastcheckedin`, {
      spaceId: currentSpaceAndUserRelationship.space._id,
    });
    // console.log('currens space -> ', currentSpaceAndUserRelationship.space._id);
  };

  const iconWidth = oneGridWidth * 0.65;

  function CustomDrawerContent(props) {
    const { state, descriptors, navigation } = props;
    return (
      <View {...props} style={{ paddingTop: 30 }}>
        {isAuthenticated && spaceAndUserRelationshipsFetchingStatus === 'success' ? (
          <>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 10 }}
              onPress={() => navigation.closeDrawer()}
            >
              <Ionicons name='close-circle' size={30} color='white' />
            </TouchableOpacity>
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
                  onPress={() => {
                    // navigation.navigate('ProfileStackNavigator');
                    navigation.closeDrawer();
                    authMenuBottomSheetRef.current.snapToIndex(0);
                  }}
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
          </>
        ) : (
          <>
            {/* <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'red', marginBottom: 20 }}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Login');
              }}
            >
              <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'red' }}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Signup');
              }}
            >
              <Text>Signup</Text>
            </TouchableOpacity> */}
            <Text style={{ color: 'white', textAlign: 'center', paddingTop: 100 }}>
              Please login or signup at first.
            </Text>
          </>
        )}
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

  if (isAuthenticated) {
    if (spaceAndUserRelationshipsFetchingStatus === 'loading') {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 100 }}>
          <ActivityIndicator />
        </View>
      );
    } else if (spaceAndUserRelationshipsFetchingStatus === 'success') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            drawerStyle: {
              backgroundColor: 'rgb(40,40,40)',
              width: 320,
              // borderTopRightRadius: 20,
              // borderBottomRightRadius: 20,
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
          {spaceAndUserRelationships.length ? (
            spaceAndUserRelationships.map((spaceAndUserRelationship) => (
              <Drawer.Screen
                key={spaceAndUserRelationship._id}
                name={`Space_${spaceAndUserRelationship._id}`}
                initialParams={{ spaceAndUserRelationship }}
                options={({ navigation }) => ({
                  // headerShown: false,
                  headerTitle: spaceAndUserRelationship.space.name,
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
                            navigation.navigate('SpaceInfoStackNavigator', { spaceAndUserRelationship });
                          }}
                        >
                          <ExpoImage
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              marginRight: 10,
                            }}
                            source={{ uri: spaceAndUserRelationship.space.icon }}
                            contentFit='cover'
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  },
                })}
              >
                {({ navigation, route }) => (
                  // <SpaceRootBottomTabNavigator
                  //   spaceAndUserRelationship={spaceAndUserRelationship}
                  //   navigation={navigation}
                  //   route={route}
                  // />
                  <SpaceRootStackNavigator
                    spaceAndUserRelationship={spaceAndUserRelationship}
                    navigation={navigation}
                    route={route}
                  />
                )}
              </Drawer.Screen>
            ))
          ) : (
            <Drawer.Screen
              name={'NoSpaces'}
              component={NoSpaces}
              options={({ navigation }) => ({
                headerTitle: '',
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                },
                // simulatorの場合、これないとheaderのheiightがおかしくなる。。。何で？？？
                headerStyle: {
                  // padding: 20,
                  backgroundColor: 'black',
                },

                headerLeft: () => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        backgroundColor: 'white',
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => navigation.toggleDrawer()}
                    >
                      <Ionicons name='menu' style={{}} size={20} />
                    </TouchableOpacity>
                  );
                },
              })}
            ></Drawer.Screen>
          )}
        </Drawer.Navigator>
      );
    }
  } else {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          drawerStyle: {
            backgroundColor: 'rgb(40,40,40)',
            width: 300,
          },
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
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
        <Drawer.Screen
          name={'WelcomPage'}
          component={WelcomePage}
          options={({ navigation }) => ({
            headerTitle: '',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            // simulatorの場合、これないとheaderのheiightがおかしくなる。。。何で？？？
            headerStyle: {
              // padding: 20,
              backgroundColor: 'black',
            },

            headerLeft: () => {
              return (
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.toggleDrawer()}
                >
                  <Ionicons name='menu' style={{}} size={20} />
                </TouchableOpacity>
              );
            },
          })}
        ></Drawer.Screen>
      </Drawer.Navigator>
    );
  }
};

export default SpacesDrawerNavigator;
