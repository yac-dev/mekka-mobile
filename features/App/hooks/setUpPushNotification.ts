import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';
import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
import { registerPushToken } from '../../../query/mutations';
import { isPushNotificationEnabledAtom } from '../../../recoil';

export const setUpPushNotification = () => {
  const [auth] = useRecoilState(authAtom);
  const [, setIsPushNotificationEnabled] = useRecoilState(isPushNotificationEnabledAtom);

  const registerPushTokenMutation = useMutation({
    mutationFn: registerPushToken,
  });

  const registerForPushNotificationsAsync = async () => {
    let token: string;
    const data = { token, status: false };
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('not gained push token');
      data.status = false;
      return data;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Config.EXPO_PROJECT_ID })).data;
    data.token = token;
    data.status = true;
    return data;
  };

  useEffect(() => {
    if (auth) {
      registerForPushNotificationsAsync().then(async (data) => {
        if (data.status) {
          setIsPushNotificationEnabled(true);
          if (!auth.pushToken) {
            await registerPushTokenMutation.mutateAsync({ userId: auth._id, pushToken: data.token });
          }
        } else {
          setIsPushNotificationEnabled(false);
        }
      });
    }
  }, [auth]);
};
