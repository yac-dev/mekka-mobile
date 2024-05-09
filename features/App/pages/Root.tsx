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

export type RootStackParams = {
  HomeStackNavigator: undefined;
  LoginStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

export const Root = () => {
  const { appState, onAppStateChange } = useContext(GlobalContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { setMySpaces } = useContext(MySpacesContext);
  const { setCurrentSpace } = useContext(CurrentSpaceContext);
  const { setCurrentTag } = useContext(CurrentTagContext);
  const { setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { setLogsTable } = useContext(LogsTableContext);
  const { apiResult: loadMeApiResult, requestApi: requestLoadMe } = useLoadMe();
  const {
    apiResult: getMySpacesApiResult,
    requestApi: requestGetMySpaces,
    requestRefresh: refreshGetMySpaces,
  } = useGetMySpaces();

  const { apiResult: getLogsResult, requestApi: requestGetLogs } = useGetLogsByUserId();
  // 1, loadmeをまずする
  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      requestLoadMe({ jwt });
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  // 2, loadmeが終わったら、そのuserId使って自分のspaceとspaceUpdatesTableをfetch
  // jwtがなければ、当然data voidでその場合はgetMySpacesを使わない。
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
      setMySpaces(getMySpacesApiResult.data.mySpaces);
      setCurrentSpace(getMySpacesApiResult.data.mySpaces[0]);
      setCurrentTag(getMySpacesApiResult.data.mySpaces[0].tags[0]);
      setSpaceUpdates(getMySpacesApiResult.data.updateTable);
    }
  }, [getMySpacesApiResult]);

  useEffect(() => {
    if (getLogsResult.status === 'success') {
      setLogsTable(getLogsResult.data?.logs);
    }
  }, [getLogsResult.status]);

  useEffect(() => {
    if (auth) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // appが再び開かれたら起こす。
          refreshGetMySpaces({ userId: auth._id });
          requestGetLogs({ userId: auth._id });
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

  if (loadMeApiResult.status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <RootStackNavigator />;
};
