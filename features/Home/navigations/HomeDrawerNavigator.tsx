import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { EditAccount } from '../../EditAccount';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { HomeDrawerNavigatorParams, HomeStackNavigatorProps } from './HomeStackNavigator';
import { HomeDrawerNavigatorProps } from './HomeStackNavigator';
import { Home } from '../../Home/pages';
import { authAtom, logsTableAtom, mySpacesAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { AppButton } from '../../../components';
import { MaterialIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';

const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>();

// これpropsないとあかんな。

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const [auth, setAuth] = useRecoilState(authAtom);
  const [, setMySpaces] = useRecoilState(mySpacesAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  const onNotificationSettingPress = () => {
    navigation.closeDrawer();
    Linking.openSettings();
  };

  const onChangeMyPasswordPress = () => {
    navigation.closeDrawer();
    homeStackNavigation.navigate('ChangeMyPassword');
  };

  const onLogoutPress = async () => {
    navigation.closeDrawer();
    await SecureStore.deleteItemAsync('secure_token');
    setAuth(void 0);
    setMySpaces(void 0);
    setLogsTable(void 0);
    showMessage({ message: 'Logged out successfully.', type: 'success' });
  };

  const onReportBugPress = () => {
    navigation.closeDrawer();
    Linking.openURL('https://x.com/yac_prod');
  };

  console.log('auth data is this', auth);

  return (
    // <DrawerContentScrollView>
    <View
      style={{
        flex: 1,
        // backgroundColor: 'rgb(50,50,50)',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingTop: 30,
        // paddingHorizontal: 10,
      }}
    >
      <View style={{ alignSelf: 'flex-end', marginRight: 15 }}>
        <AppButton.Icon
          onButtonPress={() => navigation.closeDrawer()}
          customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
          hasShadow={false}
        >
          <VectorIcon.II name='close' size={18} color={Colors.white} />
        </AppButton.Icon>
      </View>
      <TouchableOpacity
        style={{
          marginBottom: 30,
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}
        activeOpacity={0.7}
        onPress={() => {
          navigation.closeDrawer();
          homeStackNavigation.navigate('MyPageStackNavigator');
        }}
      >
        <View
          style={{
            backgroundColor: 'rgb(70,70,70)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            borderRadius: 80 / 2,
            marginRight: 20,
          }}
        >
          {auth.avatar ? (
            <View style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}>
              <ExpoImage
                style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}
                source={{ uri: auth.avatar }}
                contentFit='cover'
              />
            </View>
          ) : (
            <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
              {auth.name.slice(0, 2).toUpperCase()}
            </Text>
          )}
        </View>
        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>{auth.name}</Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, fontWeight: 'bold', paddingHorizontal: 15 }}>
            Account
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              navigation.closeDrawer();
              homeStackNavigation.navigate('EditMyAccount');
            }}
          >
            <VectorIcon.MCI name='account' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>Edit My Account</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Edit your account information</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={onNotificationSettingPress}
          >
            <VectorIcon.MI name='notifications-on' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>Notification</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Stay up to date?</Text>
            </View>
          </TouchableOpacity>
          {/* NOTE: todo */}
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={onNotificationSettingPress}
          >
            <VectorIcon.MCI name='bookmark-multiple' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>My Library</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Your saved, liked posts</Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={onChangeMyPasswordPress}
          >
            <VectorIcon.MCI name='key-change' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>
                Change My Password
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Secure your credential</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        {/* <View style={{ height: 0.3, backgroundColor: 'rgb(100,100,100)', marginHorizontal: 15 }}></View> */}
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, fontWeight: 'bold', paddingHorizontal: 15 }}>
            Space
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              navigation.closeDrawer();
              homeStackNavigation.navigate('CreateNewSpaceStackNavigator');
            }}
          >
            <VectorIcon.MCI name='rocket-launch' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>
                Create New Space
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Open your own space from here</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              navigation.closeDrawer();
              homeStackNavigation.navigate('EnterPrivateSpace');
            }}
          >
            <VectorIcon.MI name='lock-open' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>
                Enter Private Space
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Got a invitation code?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              navigation.closeDrawer();
              homeStackNavigation.navigate('DiscoverStackNavigator');
            }}
          >
            <VectorIcon.MCI name='compass' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>
                Discover New Space
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Dive into public spaces</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, fontWeight: 'bold', paddingHorizontal: 15 }}>
            More
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              navigation.closeDrawer();
              homeStackNavigation.navigate('AboutApp');
            }}
          >
            <VectorIcon.II name='information-circle-outline' size={20} color={'white'} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>Blog</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Read our articles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={onReportBugPress}
          >
            <VectorIcon.II name='bug' size={20} color={'white'} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>Report Bug</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>DM here if you find any bugs</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
            onPress={onLogoutPress}
          >
            <VectorIcon.MCI name='sleep' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>Logout</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>Take a break?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            navigation.closeDrawer();
            homeStackNavigation.navigate('AboutApp');
          }}
        >
          <VectorIcon.II
            name='information-circle-outline'
            size={20}
            color={'rgb(150,150,150)'}
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: 'rgb(150,150,150)', fontSize: 15, fontWeight: 'bold' }}>Blog</Text>
        </TouchableOpacity>
      </View> */}
    </View>
    // </DrawerContentScrollView>
  );
};

export const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        // swipeEnabled: true,
        drawerType: 'slide',
        drawerPosition: 'left',
        drawerStyle: {
          backgroundColor: 'black',
          borderRightColor: 'rgb(50,50,50)',
          borderRightWidth: 1,
          width: Dimensions.get('screen').width * 0.85,
        },
        // tabBarStyle: {
        //   backgroundColor: 'black',
        //   borderTopWidth: 0,
        //   width: 'auto',
        // },
        // tabBarLabelStyle: {
        //   fontSize: 12,
        // },
        // headerTintColor: 'white',
        // headerStyle: {
        //   backgroundColor: 'black',
        //   borderBottomWidth: 0,
        //   borderBottomColor: 'black',
        //   height: 80,
        // },
        // tabBarLabel: 'Home',
      })}
      // defaultStatus='open'
    >
      <Drawer.Screen name='Home' component={Home} />
    </Drawer.Navigator>
  );
};

const DummyComponent = () => {
  return <View style={{ flex: 1, backgroundColor: 'red' }} />;
};
