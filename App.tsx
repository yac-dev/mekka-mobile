import React, { useState, useReducer, useEffect, useRef, useCallback } from 'react';
import { View, Platform, StatusBar, TouchableOpacity, ActivityIndicator, AppState } from 'react-native';
import { GlobalContext } from './contexts/GlobalContext';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from './components/LoadingSpinner';
import SnackBar from './components/SnackBar';
// import RootStack from './navigations/RootStack';
import backendAPI from './apis/backend';
import Config from 'react-native-config';
import BottomTab from './navigations/BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStackNavigator from './navigations/HomeStackNavigator';
import NonAuthNavigator from './navigations/NonAuthNavigator';
import * as Notifications from 'expo-notifications';

type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

export const INITIAL_CREATE_NEW_POST_STATE = {
  postType: '',
  contents: [],
  caption: '',
  dummyCreatedTagId: 1,
  addedTags: {},
  tagOptions: [],
  addedLocationTag: null,
  locationTagOptions: [],
  moments: [],
};

const App: React.FC = function () {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthDataFetched, setIsAuthDataFetched] = useState(false);
  const [authData, setAuthData] = useState<AuthDataType>({ _id: '', name: '', email: '', avatar: '' });
  const [isIpad, setIsIpad] = useState<boolean>(Platform.OS === 'ios' && Platform.isPad);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: '', barType: '', duration: null });
  const [spaceAndUserRelationships, setSpaceAndUserRelationships] = useState([]);
  const [spaceAndUserRelationshipsFetchingStatus, setSpaceAndUserRelationshipsFetchingStatus] = useState('idle');
  // ここの設計を今一度考えなおしてみるか。。。
  const [spaceAndUserRelationshipsFetchingState, setSpaceAndUserRelationshipsFetchingState] = useState({});
  const [haveSpaceAndUserRelationshipsBeenFetched, setHaveSpaceAndUserRelationshipsBeenFetched] = useState(false);
  const [currentSpaceAndUserRelationship, setCurrentSpaceAndUserRelationship] = useState(null);
  const [currentSpace, setCurrentSpace] = useState(null); // ここでspaceを持っていた方がいいのかも。。。
  const [currentTagObject, setCurrentTagObject] = useState(null);
  const spaceMenuBottomSheetRef = useRef(null);
  const spaceActionMenuBottomSheetRef = useRef(null);
  const authMenuBottomSheetRef = useRef(null);
  const chooseViewBottomSheetRef = useRef(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [afterJoined, setAfterJoined] = useState(false);
  const [isAfterPosted, setIsAfterPosted] = useState(false);
  const [updatesTable, setUpdatesTable] = useState({});
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  // const [createNewPostFormData, setCreateNewPostFormData] = useState(INITIAL_CREATE_NEW_POST_STATE);
  // const [createNewPostResult, setCreateNewPostResult] = useState({
  //   isCreating: false, // responseが返ってくるまでは、ここをtrueにする。そんでsnakckbarで、"processing now"的なindicatorを出しておく。

  // notifyのon offを切り替えるfunctionな。
  const registerForPushNotificationsAsync = async () => {
    let token;
    const data = { token: token, status: false };
    const { status: existingStatus } = await Notifications.getPermissionsAsync(); // これ多分、スマホから情報をとっているのかね。
    // 初めての場合は、allowにするかdisallowにするか聴いてくる。いずれにしても、それらの選択はスマホ側に伝えられることになる。
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      // ここは、あくまでpromptを出す部分ね。
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      console.log('not gained push token');
      data.status = false;
      return data;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Config.EXPO_PROJECT_ID })).data;
    console.log('this is a token', token);
    data.token = token;
    data.status = true;
    return data;
  };

  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      setAuthData(user);
      setIsAuthDataFetched(true);
      setIsAuthenticated(true);
    } else {
      setIsAuthDataFetched(true);
      setIsAuthenticated(false);
    }
  };

  const getMySpaces = async () => {
    setSpaceAndUserRelationshipsFetchingStatus('loading');
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
    const { spaceAndUserRelationships, updateTable } = result.data;
    setSpaceAndUserRelationships(spaceAndUserRelationships);
    setUpdatesTable(updateTable);
    setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
    setHaveSpaceAndUserRelationshipsBeenFetched(true);
    setSpaceAndUserRelationshipsFetchingStatus('success');
  };

  useEffect(() => {
    loadMe();
  }, []);

  const updateSpaceCheckedInDate = async () => {
    if (currentSpaceAndUserRelationship.space?._id) {
      await backendAPI.patch(`/users/${authData._id}/lastcheckedin`, {
        spaceId: currentSpaceAndUserRelationship.space._id,
      });
    }
  };

  // auth dataがある場合は、これをそもそも起こさない。
  // そもそも、今自分がspaceのなんのtagを見ているか分からない状態で。。。
  useEffect(() => {
    // 最初のrenderで、このsubscription functionが登録される。
    if (isAuthenticated) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // appが再び開かれたらここを起こす。
          // というか、stateを一回resetしたいんだよね。loadするなりなんなりで。。。。
          getMySpaces();
          console.log('App has come to the foreground!');
        } else if (appState === 'active' && nextAppState === 'inactive') {
          // appを閉じてbackgroundになる寸前にここを起こす感じ。
          console.log('Became inactive...');
          // updateSpaceCheckedInDate(); //一回止める
        }
        console.log('Next AppState is: ', nextAppState);
        setAppState(nextAppState); // backgroundになる。
      });
      return () => {
        appStateListener.remove();
      };
    }
  }, [isAuthenticated, appState, currentSpaceAndUserRelationship]);

  useEffect(() => {
    if (isAuthenticated) {
      getMySpaces();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      registerForPushNotificationsAsync().then(async (data) => {
        if (data.status) {
          setNotificationEnabled(true);
          console.log(data.token);
          // if (!auth.data.pushToken) {
          //   const result = await lampostAPI.patch(`/users/${auth.data._id}/pushToken`, { pushToken: data.token });
          //   const { pushToken } = result.data;
          //   setExpoPushToken(data.token);
          //   setAuth((previous) => {
          //     return {
          //       ...previous,
          //       pushToken,
          //     };
          //   });
          // }
        } else {
          setNotificationEnabled(false);
        }
      });
    }
  }, [isAuthenticated]);

  const renderNavigator = () => {
    if (isAuthDataFetched) {
      if (isAuthenticated) {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name='HomwStackNavigator'
              component={HomeStackNavigator}
              options={({ navigation }) => ({
                // headerShown: true,
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        );
      } else {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name='NonAuthNavigator'
              component={NonAuthNavigator}
              options={({ navigation }) => ({
                // headerShown: true,
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        );
      }
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 100 }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        authData,
        setAuthData,
        isAuthenticated,
        setIsAuthenticated,
        isIpad,
        setIsIpad,
        loading,
        setLoading,
        snackBar,
        setSnackBar,
        isAuthDataFetched,
        setIsAuthDataFetched,
        spaceAndUserRelationships,
        setSpaceAndUserRelationships,
        haveSpaceAndUserRelationshipsBeenFetched,
        setHaveSpaceAndUserRelationshipsBeenFetched,
        spaceMenuBottomSheetRef,
        spaceActionMenuBottomSheetRef,
        authMenuBottomSheetRef,
        currentSpaceAndUserRelationship,
        setCurrentSpaceAndUserRelationship,
        currentSpace,
        setCurrentSpace,
        currentTagObject,
        setCurrentTagObject,
        isAfterPosted,
        setIsAfterPosted,
        // createNewPostFormData,
        // setCreateNewPostFormData,
        // createNewPostResult,
        // setCreateNewPostResult,
        spaceAndUserRelationshipsFetchingStatus,
        updatesTable,
        setUpdatesTable,
        notificationEnabled,
        setNotificationEnabled,
      }}
    >
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='HomeStackNavigator'
              component={HomeStackNavigator}
              options={({ navigation }) => ({
                // headerShown: true,
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      <LoadingSpinner />
    </GlobalContext.Provider>
  );
};

export default App;
