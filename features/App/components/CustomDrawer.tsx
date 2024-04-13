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

// このnavigationって、Homeのnavigationを受け継ぎ同時にSpacesDrawerのscreenに対するdrawerのnavigationも持っているのか。。。
// まあここはよくわからん。。。
export const CustomDrawer = ({ state, descriptors, navigation }) => {
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { auth } = useContext(AuthContext);
  const { mySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { spaceUpdates } = useContext(SpaceUpdatesContext);
  const { setCurrentTag } = useContext(CurrentTagContext);

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

  useEffect(() => {
    console.log('current space changed', currentSpace);
  }, [currentSpace]);

  const onSpacePress = (space: SpaceType) => {
    setCurrentSpace(space);
  };

  const onSpaceLongPress = (space: SpaceType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    homeStackNavigation.navigate('SpaceInfoStackNavigator', { space });
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(70,70,70)',
          height: 35,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', marginLeft: 10, fontSize: 23 }}>Mekka</Text>
        <AppButton.Icon
          onButtonPress={() => navigation.closeDrawer()}
          customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)', marginRight: 10 }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='account' size={18} color={'rgb(190,190,190)'} />
        </AppButton.Icon>
      </View>
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <View
          style={{
            flex: 2,
            paddingTop: 10,
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
                  navigation.navigate('CreateNewSpaceStackNavigator');
                  navigation.closeDrawer();
                }}
              >
                <VectorIcon.MCI name='plus' color={'rgb(190,190,190)'} size={25} />
              </TouchableOpacity>
              {/* <Text style={{ color: 'white' }}>Add space</Text> */}
            </View>
            {mySpaces.map((space: SpaceType, index: number) => {
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
                    onSpacePress(space);
                  }}
                  onLongPress={() => onSpaceLongPress(space)}
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
        </View>
        {/* <View
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
            <VectorIcon.MCI name='plus' color={'black'} size={25} />
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
            <VectorIcon.MCI name='compass-outline' color={'black'} size={25} />
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
              marginBottom: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VectorIcon.II name='key' color={'black'} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Private key</Text>
        </TouchableOpacity>
      </View> */}
        <View style={{ flex: 9, padding: 5 }}>
          <View style={{ width: '100%', height: 150, marginBottom: 10, padding: 5 }}>
            <ExpoImage
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
              source={{ uri: currentSpace.icon }}
              contentFit='cover'
            />
            {/* これ、下に影入れた方がいいな。 */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 }}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                position: 'absolute',
                bottom: 10,
                left: 20,
                // textShadowColor: 'rgba(0, 0, 0, 0.9)',
                // textShadowOffset: { width: -3, height: 3 },
                // textShadowRadius: 10,
                // 文字影は分からん。。。今は。。。
              }}
            >
              {currentSpace.name}
            </Text>
            <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    marginRight: 10,
                    ...Platform.select({
                      ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 5, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                      },
                      android: {
                        elevation: 5,
                      },
                    }),
                  }}
                >
                  <VectorIcon.MCI name='exclamation' color='black' size={20} />
                </TouchableOpacity> */}
                <AppButton.Icon
                  onButtonPress={() => navigation.closeDrawer()}
                  customStyle={{ width: 25, height: 25, backgroundColor: 'rgb(50,50,50)', marginRight: 10 }}
                  hasShadow={false}
                >
                  <VectorIcon.MCI name='account-group' size={13} color={'rgb(190,190,190)'} />
                </AppButton.Icon>
                <AppButton.Icon
                  onButtonPress={() => navigation.closeDrawer()}
                  customStyle={{ width: 25, height: 25, backgroundColor: 'rgb(50,50,50)', marginRight: 10 }}
                  hasShadow={false}
                >
                  <VectorIcon.MCI name='exclamation' size={13} color={'rgb(190,190,190)'} />
                </AppButton.Icon>
              </View>
            </View>
          </View>

          {/* <ScrollView horizontal style={{ marginBottom: 10 }}>
            <AppButton.Icon
              onButtonPress={() => navigation.closeDrawer()}
              customStyle={{ width: 50, height: 50, backgroundColor: 'rgb(50,50,50)', marginRight: 10 }}
              hasShadow={false}
            >
              <VectorIcon.MCI name='account-group' size={18} color={'rgb(190,190,190)'} />
            </AppButton.Icon>
            <AppButton.Icon
              onButtonPress={() => navigation.closeDrawer()}
              customStyle={{ width: 50, height: 50, backgroundColor: 'rgb(50,50,50)', marginRight: 10 }}
              hasShadow={false}
            >
              <VectorIcon.II name='close' size={18} color={'rgb(190,190,190)'} />
            </AppButton.Icon>
            <AppButton.Icon
              onButtonPress={() => navigation.closeDrawer()}
              customStyle={{ width: 50, height: 50, backgroundColor: 'rgb(50,50,50)', marginRight: 10 }}
              hasShadow={false}
            >
              <VectorIcon.II name='close' size={18} color={'rgb(190,190,190)'} />
            </AppButton.Icon>
          </ScrollView> */}

          <ScrollView>
            {state.routes.map((route, index: number) => {
              // const spaceUpdatesArray =
              //   spaceUpdates[route.params?.space._id] && Object.values(spaceUpdates[route.params?.space._id]);
              // const sum =
              //   spaceUpdatesArray && spaceUpdatesArray.reduce((partialSum: number, a: number) => partialSum + a, 0);
              // const { options } = descriptors[route.key];
              // const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                // ここでspaceのdate updateか。
                // updateLastCheckedIn(); //一時停止。
                setCurrentTag(route.params?.tag);

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  activeOpacity={0.5}
                  style={{
                    paddingVertical: 5,
                    // paddingHorizontal: 10,
                    // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                  }}
                  onPress={onPress}
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
                        style={{ width: 20, aspectRatio: 1, marginRight: 10 }}
                        source={{ uri: route.params?.tag.icon?.url }}
                        contentFit='cover'
                        tintColor={isFocused ? 'white' : 'rgb(150,150,150)'}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{ color: isFocused ? 'white' : 'rgb(150,150,150)', fontSize: 15 }}
                        >
                          {route.params?.tag.name}
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
