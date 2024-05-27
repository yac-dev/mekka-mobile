import { useContext } from 'react';
import { TouchableOpacity, View, Dimensions, Linking, Text } from 'react-native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootStackNavigator } from './SpaceRootStackNavigator';
import { AuthContext, MySpacesContext, SnackBarContext, SpaceUpdatesContext } from '../providers';
import * as SecureStore from 'expo-secure-store';
import { NoSpaces } from '../features';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { AppBottomSheet } from '../components/AppBottomSheet';
import { useBottomSheet } from '../features/Home/hooks/useBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { AuthMenu, AddNewSpaceMenu } from '../features';
import { HomeStackNavigatorProps, MomentsStackNavigator } from '.';
import { CustomDrawer } from '../features';
import { SpaceRootProvider } from '../features/Space/providers/SpaceRootProvider';
import { SpaceType } from '../types';
import { SpaceRootStackParams } from './SpaceRootStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MomentsProvider } from '../features/Space/providers/MomentsProvider';
import { Colors } from '../themes';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useEffect } from 'react';

export type SpacesDrawerParams = {
  [key: string]: NavigatorScreenParams<SpaceRootStackParams>;
};

export type SpacesDrawerStackNavigatorProps = DrawerNavigationProp<SpacesDrawerParams>;
const Drawer = createDrawerNavigator();
const actionButtonContainerWidth = (Dimensions.get('screen').width - 40 - 16) / 3;
const actionButtonWidth = actionButtonContainerWidth * 0.8;

export const SpacesDrawerNavigator = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const {
    authMenuBottomSheetRef,
    openAuthMenuBottomSheet,
    closeAuthMenuBottomSheet,
    addNewSpaceMenuBottomSheetRef,
    openAddNewSpaceMenuBottomSheet,
    closeAddNewSpaceMenuBottomSheet,
  } = useBottomSheet();

  // authMenuのmodalを出す様にする。
  useEffect(() => {
    // ここでheaderRightにauthにかんするiconを出しておく。
    homeStackNavigation.setOptions({
      headerShown: auth && mySpaces?.length ? false : true,
      headerRight: () => (
        <AppButton.Icon
          onButtonPress={() => openAuthMenuBottomSheet(0)}
          customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='account' size={18} color={Colors.white} />
        </AppButton.Icon>
      ),
    });
  }, [auth, mySpaces]);

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

  // そもそも、mySpacesはないからこっちはrenderingされないはずだが。。。
  if (auth && mySpaces?.length) {
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
              borderRightColor: 'rgb(100,100,100)',
              borderRightWidth: 1,
              width: Dimensions.get('screen').width * 0.87,
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
            mySpaces.map((space: SpaceType) => (
              <>
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
                        </AppButton.Icon>
                      );
                    },
                  })}
                >
                  {({ navigation, route }) => (
                    <SpaceRootProvider defaultSpace={space}>
                      <SpaceRootStackNavigator />
                    </SpaceRootProvider>
                  )}
                </Drawer.Screen>
                <Drawer.Screen
                  key={space._id}
                  name={`Moments_${space._id}`}
                  initialParams={{ space }}
                  options={({ navigation }) => ({
                    headerTitle: space.name,
                    headerTitleStyle: {
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: 'white',
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
                        </AppButton.Icon>
                      );
                    },
                  })}
                >
                  {({ navigation, route }) => (
                    <MomentsProvider defaultSpace={space}>
                      <MomentsStackNavigator />
                    </MomentsProvider>
                  )}
                </Drawer.Screen>
              </>
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
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Create new space
            </Text>
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
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Join private space
            </Text>
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
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              Discover new space
            </Text>
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
      </View>
    );
  }
};
