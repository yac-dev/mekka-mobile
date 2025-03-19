import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { ActivityIndicator, View, AppState } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackNavigator } from '../../Home/navigations/HomeStackNavigator';
import { useRecoilState } from 'recoil';
import {
  appStateAtom,
  authAtom,
  currentSpaceAtom,
  currentTagAtom,
  logsTableAtom,
  momentLogsAtom,
  mySpacesAtom,
  currentTagAtomFamily,
  currentTagsTableBySpaceIdsAtom,
} from '../../../recoil';
import {
  queryKeys,
  mutationKeys,
  getSpacesByUserId,
  getLogsByUserId,
  updateSpaceCheckedInDate,
  registerPushToken,
} from '../../../query';
import { useQuery, useMutation } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import Config from 'react-native-config';
import { RegisterPushTokenInputType } from '../../../query/types';
import { getFollowingUsersByUserId } from '../../../query/';
import * as SecureStore from 'expo-secure-store';

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  HomeStackNavigator: undefined;
  NonAuthNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

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
  data.token = token;
  data.status = true;
  return data;
};

export const RootStackNavigator = () => {
  const [auth] = useRecoilState(authAtom);
  const [appState, setAppState] = useRecoilState(appStateAtom);
  const [, setMySpaces] = useRecoilState(mySpacesAtom);
  const [, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);
  const [, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [, setCurrentTag] = useRecoilState(currentTagAtom);
  const [, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);

  const updateSpaceCheckedInMutation = useMutation({
    mutationFn: updateSpaceCheckedInDate,
  });

  const {
    isLoading: isGetMySpacesLoading,
    error: isGetMySpacesError,
    refetch: refetchMySpaces,
  } = useQuery({
    queryKey: [queryKeys.mySpaces, auth],
    queryFn: async () => {
      if (!auth) return null;
      const response = await getSpacesByUserId({ userId: auth._id });
      setMySpaces(response.spaces);
      if (response.spaces?.length) {
        setCurrentSpace(response.spaces[0]);
        setCurrentTagsTableBySpaceIds(() => {
          return response.spaces.reduce((acc, space) => {
            acc[space._id] = space.tags[0];
            return acc;
          }, {});
        });
        setCurrentTag(response.spaces[0].tags[0]);
        const firstSpace = response.spaces[0];
        updateSpaceCheckedInMutation.mutate({ spaceId: firstSpace._id, userId: auth._id });
      }
      return response;
    },
    // onSuccessでupdateする方がいいのかな？？
  });

  const {
    isLoading: isGetLogsLoading,
    error: isGetLogsError,
    refetch: refetchLogs,
  } = useQuery({
    queryKey: [queryKeys.logs, auth],
    queryFn: async () => {
      if (!auth) return null;
      const response = await getLogsByUserId({ userId: auth._id });
      setLogsTable(response.logs);
      setMomentLogs(response.momentLogs);
      return response;
    },
  });

  const { data: followingUsers } = useQuery({
    queryKey: [queryKeys.followingUsers, auth._id],
    queryFn: () => getFollowingUsersByUserId({ userId: auth._id }),
  });

  console.log('followingUsers', JSON.stringify(followingUsers, null, 2));

  const { mutate: registerPushTokenMutation } = useMutation({
    mutationKey: [mutationKeys.registerPushToken],
    mutationFn: (input: RegisterPushTokenInputType) => registerPushToken(input),
  });

  useEffect(() => {
    if (auth) {
      const appStateListener = AppState.addEventListener('change', async (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // refetchMySpaces();
          refetchLogs();
          console.log('App has come to the foreground 👀');
        } else if (appState === 'active' && nextAppState === 'inactive') {
          console.log('App has come to the background 💤');
        }
        setAppState(nextAppState);
      });

      return () => {
        appStateListener.remove();
      };
    }
  }, [auth, appState]);

  useEffect(() => {
    if (auth) {
      registerForPushNotificationsAsync().then(async (data) => {
        if (data.status) {
          if (data.token !== auth.pushToken) {
            registerPushTokenMutation({ userId: auth._id, pushToken: data.token });
          }
        } else {
          // setNotificationEnabled(false);
          console.log('not notification enabled');
        }
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      // refetchMySpaces();
      refetchLogs();
    }
  }, [auth]);

  if (isGetMySpacesLoading || isGetLogsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name='HomeStackNavigator'
          component={HomeStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
