import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLoadMe } from '../hooks';
import { AuthContext, MySpacesContext, CurrentSpaceContext } from '../../../providers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeStackNavigator from '../../../navigations/HomeStackNavigator';
import { useGetMySpaces } from '../hooks/useGetMySpaces';
import { LoginStackNavigator } from '../../../navigations';
import { VectorIcon } from '../../../Icons';
import * as SecureStore from 'expo-secure-store';

export const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);

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
    if (loadMeApiResult.status === 'success' && loadMeApiResult.data) {
      setAuth(loadMeApiResult.data);
    }
  }, [loadMeApiResult]);

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

  // authがない場合はwelcome pageを出せば良くて、authが取得できればそのままgetMySpacesのqueryを投げればいい。
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
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='LoginStackNavigator'
            component={LoginStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <VectorIcon.II name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white',
              },
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
