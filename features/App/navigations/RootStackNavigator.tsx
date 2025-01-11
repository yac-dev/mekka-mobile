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
} from '../../../recoil';
import { queryKeys, getMySpaces, getLogsByUserId, updateSpaceCheckedInDate } from '../../../query';
import { useQuery, useMutation } from '@tanstack/react-query';

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  HomeStackNavigator: undefined;
  NonAuthNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

export const RootStackNavigator = () => {
  const [auth] = useRecoilState(authAtom);
  const [appState, setAppState] = useRecoilState(appStateAtom);
  const [, setMySpaces] = useRecoilState(mySpacesAtom);
  const [, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);
  const [, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [, setCurrentTag] = useRecoilState(currentTagAtom);

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
      const response = await getMySpaces({ userId: auth._id });
      setMySpaces(response.mySpaces);
      if (response.mySpaces?.length) {
        setCurrentSpace(response.mySpaces[0]);

        setCurrentTag(response.mySpaces[0].tags[0]);
        const firstSpace = response.mySpaces[0];
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

  useEffect(() => {
    if (auth) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          refetchMySpaces();
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
