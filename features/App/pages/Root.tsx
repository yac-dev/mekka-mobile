import { useEffect, useContext } from 'react';
import { View, ActivityIndicator, AppState, Text } from 'react-native';
import { useLoadMe } from '../hooks/useLoadMe';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetMySpaces } from '../hooks/useGetMySpaces';
import * as SecureStore from 'expo-secure-store';
import { RootStackNavigator } from '../navigations/RootStackNavigator';
import { useGetLogsByUserId } from '../hooks';
import { useRecoilState } from 'recoil';
import {
  mySpacesAtom,
  currentSpaceAtom,
  authAtom,
  appStateAtom,
  logsTableAtom,
  currentTagAtom,
  momentLogsAtom,
} from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { queryKeys, getMySpaces, getLogsByUserId, loadMe } from '../../../query';
import { NavigationContainer } from '@react-navigation/native';
import { NonAuthNavigator } from '../../NonAuth';

export type RootStackParams = {
  HomeStackNavigator: undefined;
  Signup: undefined;
  ForgotPasswordStackNavigator: undefined;
};

const NonAuthStack = createNativeStackNavigator<NonAuthStackParams>();

export type NonAuthStackParams = {
  NonAuthNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;
// NOTE: 初期読み込み
// 1, loadme
// 2, userId使って自分のspaceとlogを読み込み
export const Root = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [appState, setAppState] = useRecoilState(appStateAtom);

  const {
    data: loadMeData,
    isLoading: isLoadMeLoading,
    error: isLoadMeError,
    isSuccess: isLoadMeSuccess,
  } = useQuery({
    queryKey: [queryKeys.loadMe],
    queryFn: async () => {
      const jwt = await SecureStore.getItemAsync('secure_token');
      const response = await loadMe({ jwt });
      setAuth(response);
      return response;
    },
  });

  // 多分、functionをarrayに持たせてPromise.allするとかの方向性かなー。。。
  // useEffect(() => {
  //   if (auth) {
  //     const appStateListener = AppState.addEventListener('change', (nextAppState) => {
  //       if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //         refetchMySpaces();
  //         refetchLogs();
  //         console.log('App has come to the foreground 👀');
  //       } else if (appState === 'active' && nextAppState === 'inactive') {
  //         console.log('App has come to the background 💤');
  //       }
  //       setAppState(nextAppState);
  //     });

  //     return () => {
  //       appStateListener.remove();
  //     };
  //   }
  // }, [auth, appState]);

  if (isLoadMeLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isLoadMeSuccess && !auth) {
    return (
      <NavigationContainer>
        <NonAuthStack.Navigator>
          <NonAuthStack.Screen
            name='NonAuthNavigator'
            component={NonAuthNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </NonAuthStack.Navigator>
      </NavigationContainer>
    );
  }

  if (isLoadMeSuccess && auth) {
    return <RootStackNavigator />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <ActivityIndicator />
    </View>
  );
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
