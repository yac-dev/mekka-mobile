import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../themes';
import { primaryBackgroundColor } from '../../../themes/color';
import { Ionicons } from '@expo/vector-icons';
import {
  CreateNewPostStackNavigator,
  CreateNewPostStackParams,
  CreateNewSpaceStackNavigator,
  MyPage,
  SpacesHeader,
  ViewPostStackNavigator,
} from '../..';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { EnterPrivateSpace } from '../../EnterPrivateSpace/pages/EnterPrivateSpace';
import { SpaceInfoStackNavigator } from '../../SpaceInfo/navigations/SpaceInfoStackNavigator';
import { EditProfileStackNavigator } from '../../EditAccount/navigations/EditProfileStackNavigator';
import { DeleteMyAccount } from '../..';
import { PostType, SpaceType } from '../../../types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AppButton, CustomWebView } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { MomentsStackNavigator } from '../../Moments/navigations/MomentsStackNavigator';
import { DiscoverStackNavigator } from '../../Discover/navigations/DiscoverStackNavigator';
import { Home } from '../pages';
import { SpaceStackNavigator } from '../../Space/navigations/SpaceStackNavigator';
import { SpaceStackParams } from '../../Space/navigations/SpaceStackNavigator';
import { AboutApp } from '../..';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { urls } from '../../../settings';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { HomeDrawerNavigator } from './HomeDrawerNavigator';
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';
import { ChangeMyPassword } from '../../ChangeMyPassword';
import { EditAccount } from '../../EditAccount/pages/EditAccount';
import { MyPageStackNavigator, MyPageStackNavigatorParams } from '../../MyPage/navigations/MyPageStackNavigation';
import { Notifications } from '../../Notifications';

type TagScreenTopTabNavigatorParams = {
  GridView: undefined;
  MapView: undefined;
};

type TagScreenStackNavigatorParams = {
  TagScreenTopTabNavigator: NavigatorScreenParams<TagScreenTopTabNavigatorParams>;
  ViewPostStackNavigator: undefined; // いや、これ多分params必要になる。
};

export type SpaceTopTabNavigatorParams = {
  [key: string]: NavigatorScreenParams<TagScreenStackNavigatorParams>;
};

export type SpaceRootStackParams = {
  TagsTopTabNavigator: NavigatorScreenParams<SpaceTopTabNavigatorParams>;
  CreateNewPostStackNavigator: undefined;
  MomentsStackNavigator: undefined;
};

export type MomentsStackParams = {
  Moments: undefined;
};

export type ViewPostStackNavigatorParams = {
  ViewPost: {
    posts: PostType[];
    index: number;
  };
  ViewGridPost: undefined;
  ViewRegionPost: undefined;
  CommentsPage: undefined;
  ReportPost: undefined;
  ReportComment: undefined;
};

export type HomeDrawerNavigatorParams = {
  Home: undefined;
  EditAccount: undefined;
  Settings: undefined;
};

// export type HomeDrawerNavigatorProps = NavigatorScreenParams<HomeDrawerNavigatorParams>;
export type HomeDrawerNavigatorProps = DrawerNavigationProp<HomeDrawerNavigatorParams>;

export type MomentsStackNavigatorProps = NativeStackNavigationProp<MomentsStackParams>;
export type SpaceRootStackNavigatorProp = NativeStackNavigationProp<SpaceRootStackParams>;

// これviewPost共通となるとさ、、、多分ここにViewStackNavigatorを入れた方がいいのかね。。。なんかそんな感じする。
// userのstack navigatorとかもここに入れる感じになるよね。。。
export type HomeStackParams = {
  // Home: NavigatorScreenParams<SpacesDrawerParams>;
  Home: undefined;
  MyPage: undefined;
  SpaceStackNavigator: NavigatorScreenParams<SpaceStackParams>;
  MomentsStackNavigator: NavigatorScreenParams<MomentsStackParams>;
  ViewPostStackNavigator: NavigatorScreenParams<ViewPostStackNavigatorParams>;
  ViewPost: undefined;
  ChangeMyPassword: undefined;
  HomeDrawerNavigator: NavigatorScreenParams<HomeDrawerNavigatorParams>;
  DiscoverStackNavigator: undefined;
  CreateNewSpaceStackNavigator: undefined;
  CreateNewPostStackNavigator: NavigatorScreenParams<CreateNewPostStackParams>;
  EnterPrivateSpace: undefined;
  SpaceDetailStackNavigator: undefined;
  Signup: undefined;
  EditProfileStackNavigator: {
    screen: 'EditProfile';
  };
  EditMyAccount: undefined;
  WriteDescription: undefined;
  LocationPicker: undefined;
  EmojiPicker: undefined;
  CreateTag: undefined;
  CreateNewLocationTag: undefined;
  SpaceInfoStackNavigator: { space: SpaceType };
  DeleteMyAccount: undefined;
  AboutApp: { url: string };
  Notifications: undefined;
};

export type HomeStackNavigatorProps = NativeStackNavigationProp<HomeStackParams>;
export type SpaceStackNavigatorProps = NativeStackNavigationProp<SpaceStackParams>;

const HomeStack = createNativeStackNavigator<HomeStackParams>();

// あと、ここにbottom sheetを入れるようにしたいね。ここpassするのもめんどうだし、recoilを使うのいいかも。
export const HomeStackNavigator: React.FC = (props) => {
  const appBlogWebviewBottomSheetRef = useRef<BottomSheetModal>(null);
  const webViewRef = useRef<WebView>(null);
  const [isBackable, setIsBackable] = useState(false);
  const [isForwardable, setIsForwardable] = useState(false);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setIsBackable(navState.canGoBack);
    setIsForwardable(navState.canGoForward);
  };

  const onBackPress = () => {
    webViewRef.current?.goBack();
  };

  const onForwardPress = () => {
    webViewRef.current?.goForward();
  };

  const openAppBlogWebviewBottomSheet = (index: number) => {
    appBlogWebviewBottomSheetRef.current?.snapToIndex(index);
  };

  const closeAppBlogWebviewBottomSheet = () => {
    appBlogWebviewBottomSheetRef.current?.close();
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeStack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: 'black',
          },
        })}
      >
        {/* customのdrawerを入れないといけないな。。。 */}
        <HomeStack.Group>
          <HomeStack.Screen name='HomeDrawerNavigator' component={HomeDrawerNavigator} />
          <HomeStack.Screen
            name='Home'
            options={({ navigation }) => ({
              headerShown: false,
            })}
          >
            {(props) => <Home {...props} openAppBlogWebviewBottomSheet={openAppBlogWebviewBottomSheet} />}
          </HomeStack.Screen>
          <HomeStack.Screen
            name='SpaceStackNavigator'
            component={SpaceStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
          {/* ここに、spaceRootStackを入れる感じか。home component内で、SpaceRootStackへnavigationするようにしたいよね。そういう流れだ。 */}
          <HomeStack.Screen
            name='AboutApp'
            component={AboutApp}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
            })}
          />
          <HomeStack.Screen
            name='DiscoverStackNavigator'
            component={DiscoverStackNavigator}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: 'Discover',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='MomentsStackNavigator'
            component={MomentsStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: 'Moments',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='ChangeMyPassword'
            component={ChangeMyPassword}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: 'Change My Password',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='MyPage'
            component={MyPage}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='EditMyAccount'
            component={EditAccount}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='Notifications'
            component={Notifications}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: 'Notifications',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='DeleteMyAccount'
            component={DeleteMyAccount}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          {/* <HomeStack.Screen name='HomeDrawerNavigator' component={HomeDrawerNavigator} /> */}
        </HomeStack.Group>

        <HomeStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <HomeStack.Screen
            name='CreateNewSpaceStackNavigator'
            component={CreateNewSpaceStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: primaryBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
          <HomeStack.Screen
            name='CreateNewPostStackNavigator'
            component={CreateNewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
          <HomeStack.Screen
            name='EnterPrivateSpace'
            component={EnterPrivateSpace}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='close' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: primaryBackgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
          <HomeStack.Screen
            name='SpaceInfoStackNavigator'
            component={SpaceInfoStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
              headerTitle: 'SPInfo',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
        </HomeStack.Group>
        {/* <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
          <HomeStack.Screen
            name='Notifications'
            component={Notifications}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </HomeStack.Group> */}
        {/* <HomeStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: true }}>
          <HomeStack.Screen
            name='EditProfileStackNavigator'
            component={EditProfileStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
          <HomeStack.Screen
            name='DeleteMyAccount'
            component={DeleteMyAccount}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
        </HomeStack.Group> */}
        <HomeStack.Group screenOptions={{ presentation: 'fullScreenModal', animation: 'fade', animationDuration: 200 }}>
          <HomeStack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </HomeStack.Group>
      </HomeStack.Navigator>
      <AppBottomSheet.Gorhom
        ref={appBlogWebviewBottomSheetRef}
        snapPoints={['30%', '80%', '100%']}
        header={<Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>About app</Text>}
        onCloseButtonClose={closeAppBlogWebviewBottomSheet}
        hasBackdrop={false}
      >
        <CustomWebView
          ref={webViewRef}
          uri={urls.howToCreateNewSpace}
          onBackPress={onBackPress}
          onForwardPress={onForwardPress}
          isBackable={isBackable}
          isForwardable={isForwardable}
          onNavigationStateChange={onNavigationStateChange}
        />
        {/* webview内でのpage遷移必要だよな。。。 */}
      </AppBottomSheet.Gorhom>
    </View>
  );
};
