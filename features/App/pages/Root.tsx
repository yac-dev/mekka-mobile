import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, AppState } from 'react-native';
import { useLoadMe } from '../hooks/useLoadMe';
import { AuthContext } from '../../../providers/AuthProvider';
import { MySpacesContext } from '../../../providers/MySpacesProvider';
import { CurrentSpaceContext } from '../../../providers/CurrentSpaceProvider';
import { SpaceUpdatesContext } from '../../../providers/SpaceUpdatesProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGetMySpaces } from '../hooks/useGetMySpaces';
import * as SecureStore from 'expo-secure-store';
import { RootStackNavigator } from '../../../navigations/RootStackNavigator';
import { CurrentTagContext } from '../../../providers';
import { GlobalContext } from '../../../providers';

export type RootStackParams = {
  HomeStackNavigator: undefined;
  LoginStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

export const Root = () => {
  const { appState, onAppStateChange } = useContext(GlobalContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { apiResult: loadMeApiResult, requestApi: requestLoadMe } = useLoadMe();
  const {
    apiResult: getMySpacesApiResult,
    requestApi: requestGetMySpaces,
    requestRefresh: refreshGetMySpaces,
  } = useGetMySpaces();

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
    if (auth) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // appが再び開かれたら起こす。
          // getMySpaces();
          // getMySpacesFromInactive();
          refreshGetMySpaces({ userId: auth._id });
          console.log('App has come to the foreground!');
        } else if (appState === 'active' && nextAppState === 'inactive') {
          // appを閉じてbackgroundになる寸前にここを起こす感じ。
          console.log('Became inactive...');
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

  // useEffect(() => {
  //   if (getMySpacesApiResult.status === 'success') {
  //     setMySpaces(getMySpacesApiResult.data.spaces);
  //     setCurrentSpace(getMySpacesApiResult.data.spaces[0]);
  //   }
  // }, [getMySpacesApiResult.status]);

  // ここも、loadmeが終わってない限りrenderしないようにするか。。。ちょうどいいタイミングだし。。。
  //

  // if((authApiResult.status === 'success' && !authApiResult.data) || (authApiResult.status === 'success' && getMySpacesApiResult.status === 'success'))
  if (loadMeApiResult.status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  // まずこの上でfetchをしているわけだが、、、

  // authがない場合はwelcome pageを出せば良くて、authが取得できればそのままgetMySpacesのqueryを投げればいい。
  return <RootStackNavigator />;
};
