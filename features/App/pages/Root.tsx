import { useEffect, useContext } from 'react';
import { View, ActivityIndicator, AppState } from 'react-native';
import { useLoadMe } from '../hooks/useLoadMe';
import { AuthContext } from '../../../providers/AuthProvider';
import { MySpacesContext } from '../../../providers/MySpacesProvider';
import { CurrentSpaceContext } from '../../../providers/CurrentSpaceProvider';
import { SpaceUpdatesContext } from '../../../providers/SpaceUpdatesProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetMySpaces } from '../hooks/useGetMySpaces';
import * as SecureStore from 'expo-secure-store';
import { RootStackNavigator } from '../../../navigations/RootStackNavigator';
import { CurrentTagContext } from '../../../providers';
import { GlobalContext } from '../../../providers';
import { useGetLogsByUserId } from '../hooks';
import { LogsTableContext } from '../../../providers';
import { useUpdateSpaceCheckedInDate } from '../../../api';
import { momentLogsAtom } from '../../../atoms';
import { useRecoilState } from 'recoil';

export type RootStackParams = {
  HomeStackNavigator: undefined;
  Signup: undefined;
  ForgotPasswordStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;
// NOTE: 初期読み込み
// 1, loadme
// 2, userId使って自分のspaceとlogを読み込み
export const Root = () => {
  const { appState, onAppStateChange } = useContext(GlobalContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { setMySpaces } = useContext(MySpacesContext);
  const { setCurrentSpace, currentSpace } = useContext(CurrentSpaceContext);
  const { setCurrentTag } = useContext(CurrentTagContext);
  const { setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { setLogsTable } = useContext(LogsTableContext);
  const { apiResult: loadMeApiResult, requestApi: requestLoadMe } = useLoadMe();
  const {
    apiResult: getMySpacesApiResult,
    requestApi: requestGetMySpaces,
    requestRefresh: refreshGetMySpaces,
  } = useGetMySpaces();
  const { apiResult, requestApi } = useUpdateSpaceCheckedInDate();

  const { apiResult: getLogsResult, requestApi: requestGetLogs, requestRefresh } = useGetLogsByUserId();
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);
  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      requestLoadMe({ jwt });
    }
  };
  // そもそもloadme動いてないね。。。
  // そもそもjwtがない場合はここを動かさないもんな。。。
  // ここの制御めんどいかもね。。。

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (loadMeApiResult.status === 'success') {
      setAuth(loadMeApiResult.data);
    }
  }, [loadMeApiResult]);

  useEffect(() => {
    if (auth) {
      requestGetMySpaces({ userId: auth._id });
      requestGetLogs({ userId: auth._id });
    }
  }, [auth]);

  useEffect(() => {
    if (getMySpacesApiResult.status === 'success') {
      setMySpaces(getMySpacesApiResult.data?.mySpaces);
      if (getMySpacesApiResult.data?.mySpaces?.length) {
        setCurrentSpace(getMySpacesApiResult.data.mySpaces[0]);
        setCurrentTag(getMySpacesApiResult.data.mySpaces[0].tags[0]);
        setSpaceUpdates(getMySpacesApiResult.data.updateTable);
        const firstSpace = getMySpacesApiResult.data?.mySpaces[0];
        requestApi({ spaceId: firstSpace._id, userId: auth._id });
      }
      // 最初のspace fetchで最初のspaceのcheckedin の日付だけ更新する。
    }
  }, [getMySpacesApiResult]);

  // 最初でlogとmomentLogsをセットする。
  useEffect(() => {
    if (getLogsResult.status === 'success') {
      setLogsTable(getLogsResult.data?.logs);
      setMomentLogs(getLogsResult.data?.momentLogs);
    }
  }, [getLogsResult.status]);

  useEffect(() => {
    if (auth) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // appが再び開かれたら起こす。
          refreshGetMySpaces({ userId: auth._id });
          requestRefresh({ userId: auth._id });
          // ここもrefreshに直したほうがいいと思う。
          // requestApi({ spaceId: currentSpace._id, userId: auth._id });
          // こんな感じか。。。
          console.log('App has come to the foreground!');
        } else if (appState === 'active' && nextAppState === 'inactive') {
          // appを閉じてbackgroundになる寸前にここを起こす感じ。
          // inactiveになったときに、何かapiを送る。
          // updateSpaceCheckedInDate(); // 一時停止
        }
        console.log('Next AppState is: ', nextAppState);
        onAppStateChange(nextAppState);
      });

      return () => {
        appStateListener.remove();
      };
    }
  }, [auth, appState]);

  if (
    loadMeApiResult.status === 'loading' ||
    getMySpacesApiResult.status === 'loading' ||
    getLogsResult.status === 'loading'
  ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <RootStackNavigator loadMeApiResult={loadMeApiResult} />;
};

// push notificationに関するcallback実行
//  ----- こっから
// const registerForPushNotificationsAsync = async () => {
//   let token;
//   const data = { token: token, status: false };
//   const { status: existingStatus } = await Notifications.getPermissionsAsync(); // これ多分、スマホから情報をとっているのかね。
//   // 初めての場合は、allowにするかdisallowにするか聴いてくる。いずれにしても、それらの選択はスマホ側に伝えられることになる。
//   let finalStatus = existingStatus;
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     // ここは、あくまでpromptを出す部分ね。
//     finalStatus = status;
//   }
//   if (finalStatus !== 'granted') {
//     // alert('Failed to get push token for push notification!');
//     console.log('not gained push token');
//     data.status = false;
//     return data;
//   }
//   token = (await Notifications.getExpoPushTokenAsync({ projectId: Config.EXPO_PROJECT_ID })).data;
//   console.log('this is a token', token);
//   data.token = token;
//   data.status = true;
//   return data;
// };

// useEffect(() => {
//   if (isAuthenticated) {
//     registerForPushNotificationsAsync().then(async (data) => {
//       if (data.status) {
//         setNotificationEnabled(true);
//         if (!authData.pushToken) {
//           const result = await backendAPI.patch(`/auth/${authData._id}/pushToken`, { pushToken: data.token });
//           // const { pushToken } = result.data;
//         }
//       } else {
//         setNotificationEnabled(false);
//       }
//     });
//   }
// }, [isAuthenticated]);
//  --------- ここまでコメントアウト
