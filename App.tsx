import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  AuthProvider,
  SnackBarProvider,
  MySpacesProvider,
  SpaceUpdatesProvider,
  CurrentSpaceProvider,
  CurrentTagProvider,
  AppStateProvider,
  GlobalProvider,
  LogsTableProvider,
} from './providers';
import { PaperProvider } from 'react-native-paper';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Composer } from './providers/Providers';
import { Root } from './features/App/pages/Root';

const App: React.FC = function () {
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
      <Composer
        components={[
          PaperProvider,
          GlobalProvider,
          BottomSheetModalProvider,
          AuthProvider,
          SnackBarProvider,
          MySpacesProvider,
          SpaceUpdatesProvider,
          CurrentSpaceProvider,
          CurrentTagProvider,
          AppStateProvider,
          LogsTableProvider,
        ]}
      >
        <Root />
      </Composer>
    </GestureHandlerRootView>
  );
};

export default App;
