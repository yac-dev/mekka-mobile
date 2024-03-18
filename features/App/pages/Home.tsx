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

  // 2, loadmeが終わったら、そのuserId使って自分のspaceとspaceUpdatesTableをfetch
  useEffect(() => {
    if (authApiResult.status === 'success') {
      setAuth(authApiResult.data);
      requestGetMySpaces({ userId: authApiResult.data._id });
    }
  }, [authApiResult]);

  useEffect(() => {
    if (getMySpacesApiResult.status === 'success') {
      setMySpaces(getMySpacesApiResult.data.spaceAndUserRelationships);
      setCurrentSpace(getMySpacesApiResult.data.spaceAndUserRelationships[0]);
    }
  }, [getMySpacesApiResult.status]);

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
