import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconParameterBackgroundColorTable, iconColorTable } from '../themes/color';
import FastImage from 'react-native-fast-image';
const Drawer = createDrawerNavigator();
import SpaceRootBottomTabNavigator from './SpaceRootBottomTabNavigator';
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import NoSpaces from '../features/Utils/NoSpaces';

const SpacesDrawerNavigator = (props) => {
  const {
    isIpad,
    spaceAndUserRelationships,
    haveSpaceAndUserRelationshipsBeenFetched,
    setCurrentSpaceAndUserRelationship,
    spaceMenuBottomSheetRef,
    authMenuBottomSheetRef,
    authData,
    isAuthenticated,
  } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const iconWidth = oneGridWidth * 0.65;

  function CustomDrawerContent(props) {
    const { state, descriptors, navigation } = props;
    return (
      <DrawerContentScrollView {...props} style={{ paddingTop: 10 }}>
        {isAuthenticated ? (
          <>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 10 }}
              onPress={() => navigation.closeDrawer()}
            >
              <Ionicons name='close-circle' size={30} color='white' />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
              <FastImage source={{ uri: authData.avatar }} style={{ width: 35, height: 35, marginBottom: 10 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginRight: 10 }}>
                  {authData.name}
                </Text>
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
                  <MaterialCommunityIcons name='compass' color={'black'} size={25} />
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
                <Text style={{ color: 'white' }}>Enter key</Text>
              </TouchableOpacity>
            </View>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

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
                    }}
                  >
                    <FastImage
                      style={{ width: 40, aspectRatio: 1, borderRadius: 10, marginRight: 15 }}
                      source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text numberOfLines={1} style={{ color: 'white', fontSize: 17 }}>
                      {route.params?.spaceAndUserRelationship.space.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
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
      </DrawerContentScrollView>
    );
  }

  if (isAuthenticated) {
    if (!haveSpaceAndUserRelationshipsBeenFetched) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 100 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
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
                  headerRight: () => {
                    return (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <TouchableOpacity
                          onPress={() => {
                            props.navigation?.navigate('CreateNewPostStackNavigator', {
                              screen: 'SelectPostType',
                              // params: {
                              //   space: currentSpace,
                              //   spaceAndUserRelationship: currentSpaceAndUserRelationship,
                              // }, // なんで、spaceUserRelが必要？？いらなくね。。。
                              merge: true,
                            });
                          }}
                          // style={{
                          //   backgroundColor: 'white',
                          //   width: 36,
                          //   height: 36,
                          //   borderRadius: 18,
                          //   // position: 'absolute',
                          //   justifyContent: 'center',
                          //   alignItems: 'center',
                          //   marginRight: 10,
                          // }}
                        >
                          <MaterialCommunityIcons name='plus' color='black' size={20} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => {
                            // spaceMenuBottomSheetRef.current.snapToIndex(0);
                            navigation.navigate('SpaceInfoStackNavigator', { spaceAndUserRelationship });
                          }}
                        >
                          <FastImage
                            source={{ uri: spaceAndUserRelationship.space.icon }}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              marginRight: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  },
                })}
              >
                {({ navigation, route }) => (
                  <SpaceRootBottomTabNavigator
                    spaceAndUserRelationship={spaceAndUserRelationship}
                    navigation={navigation}
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
