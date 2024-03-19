import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useLoadMe } from '../hooks';
import { AuthContext, MySpacesContext, CurrentSpaceContext } from '../../../providers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeStackNavigator from '../../../navigations/HomeStackNavigator';
import { useGetMySpaces } from '../hooks/useGetMySpaces';

export const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);

  const { apiResult: authApiResult, requestApi: requestLoadMe } = useLoadMe();
  const { apiResult: getMySpacesApiResult, requestApi: requestGetMySpaces } = useGetMySpaces();

  // 1, loadmeをまずする
  useEffect(() => {
    requestLoadMe();
  }, []);
  console.log('auth api res', authApiResult);

  // 2, loadmeが終わったら、そのuserId使って自分のspaceとspaceUpdatesTableをfetch
  // jwtがなければ、当然data voidでその場合はgetMySpacesを使わない。
  useEffect(() => {
    if (authApiResult.status === 'success' && authApiResult.data) {
      setAuth(authApiResult.data);
      requestGetMySpaces({ userId: authApiResult.data._id });
    }
  }, [authApiResult]);

  useEffect(() => {
    if (getMySpacesApiResult.status === 'success') {
      setMySpaces(getMySpacesApiResult.data.spaces);
      setCurrentSpace(getMySpacesApiResult.data.spaces[0]);
    }
  }, [getMySpacesApiResult.status]);

  // ここも、loadmeが終わってない限りrenderしないようにするか。。。ちょうどいいタイミングだし。。。
  //
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeStackNavigator'
          component={HomeStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
