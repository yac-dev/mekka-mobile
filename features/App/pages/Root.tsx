import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackNavigator } from '../navigations/RootStackNavigator';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { queryKeys, loadMe } from '../../../query';
import { NavigationContainer } from '@react-navigation/native';
import { NonAuthNavigator } from '../../NonAuth';
import { NoConnection } from '../components';
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
export const Root = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  const {
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

  if (isLoadMeError) {
    return <NoConnection />;
  }

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
