import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
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

export type RootStackParams = {
  HomeStackNavigator: undefined;
  LoginStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

export const Root = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { apiResult: loadMeApiResult, requestApi: requestLoadMe } = useLoadMe();
  const { apiResult: getMySpacesApiResult, requestApi: requestGetMySpaces } = useGetMySpaces();

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
      console.log('auth res', loadMeApiResult.data);
      setAuth(loadMeApiResult.data);
      // ここでauthがtruthyになって、先にspaceDrawerがrendersれているんだなおそらく。んで、mySpacesの取得が動く前に先にcomponentのrenderingが起こっちゃっているわけか。。。
      // console.log('has auth and run getmyspaces??', auth);
      // requestGetMySpaces({ userId: loadMeApiResult.data._id });
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
      setSpaceUpdates(getMySpacesApiResult.data.updateTable);
    }
  }, [getMySpacesApiResult]);

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
