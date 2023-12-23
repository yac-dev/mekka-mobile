import React, { useState, useReducer, useEffect, useRef, useCallback } from 'react';
import { View, Platform, StatusBar, TouchableOpacity, ActivityIndicator, AppState } from 'react-native';
import { GlobalContext } from './contexts/GlobalContext';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from './components/LoadingSpinner';
import SnackBar from './components/SnackBar';
// import RootStack from './navigations/RootStack';
import backendAPI from './apis/backend';
import BottomTab from './navigations/BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStackNavigator from './navigations/HomeStackNavigator';
import NonAuthNavigator from './navigations/NonAuthNavigator';
// import { AuthDataType, SnackBarType, INITIAL_AUTH_STATE, INITIAL_SNACK_BAR_STATE }

import { AuthDataType, SnackBarType, INITIAL_AUTH_STATE, INITIAL_SNACK_BAR_STATE } from './App/type';
export const INITIAL_CREATE_NEW_POST_STATE = {
  postType: '',
  contents: [],
  caption: '',
  dummyCreatedTagId: 1,
  addedTags: {},
  tagOptions: [],
  addedLocationTag: null,
  locationTagOptions: [],
  moments: [],
};

const App: React.FC = function () {
  const [authData, setAuthData] = useState<AuthDataType>(INITIAL_AUTH_STATE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthDataFetched, setIsAuthDataFetched] = useState<boolean>(false);
  const [isIpad, setIsIpad] = useState<boolean>(Platform.OS === 'ios' && Platform.isPad);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBarType>(INITIAL_SNACK_BAR_STATE);
  const [spaceAndUserRelationships, setSpaceAndUserRelationships] = useState([]);
  const [spaceAndUserRelationshipsFetchingStatus, setSpaceAndUserRelationshipsFetchingStatus] = useState('idle');
  // ここの設計を今一度考えなおしてみるか。。。
  const [spaceAndUserRelationshipsFetchingState, setSpaceAndUserRelationshipsFetchingState] = useState({});
  const [haveSpaceAndUserRelationshipsBeenFetched, setHaveSpaceAndUserRelationshipsBeenFetched] = useState(false);
  const [currentSpaceAndUserRelationship, setCurrentSpaceAndUserRelationship] = useState(null);
  const [currentSpace, setCurrentSpace] = useState(null); // ここでspaceを持っていた方がいいのかも。。。
  const [currentTagObject, setCurrentTagObject] = useState(null);
  const spaceMenuBottomSheetRef = useRef(null);
  const spaceActionMenuBottomSheetRef = useRef(null);
  const authMenuBottomSheetRef = useRef(null);
  const chooseViewBottomSheetRef = useRef(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [afterJoined, setAfterJoined] = useState(false);
  const [isAfterPosted, setIsAfterPosted] = useState(false);

  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      setAuthData(user);
      setIsAuthDataFetched(true);
      setIsAuthenticated(true);
    } else {
      setIsAuthDataFetched(true);
      setIsAuthenticated(false);
    }
  };

  const getMySpaces = async () => {
    setSpaceAndUserRelationshipsFetchingStatus('loading');
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
    const { spaceAndUserRelationships } = result.data;
    setSpaceAndUserRelationships(spaceAndUserRelationships);
    setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
    setHaveSpaceAndUserRelationshipsBeenFetched(true);
    setSpaceAndUserRelationshipsFetchingStatus('success');
  };

  useEffect(() => {
    loadMe();
  }, []);

  // auth dataがある場合は、これをそもそも起こさない。
  // そもそも、今自分がspaceのなんのtagを見ているか分からない状態で。。。
  useEffect(() => {
    // 最初のrenderで、このsubscription functionが登録される。
    if (isAuthenticated) {
      const appStateListener = AppState.addEventListener('change', (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          // appが再び開かれたらここを起こす。
          // というか、stateを一回resetしたいんだよね。loadするなりなんなりで。。。。
          getMySpaces();
          console.log('App has come to the foreground!');
        } else if (appState === 'active' && nextAppState === 'inactive') {
          // appを閉じてbackgroundになる寸前にここを起こす感じ。
          console.log('Became inactive...');
        }
        console.log('Next AppState is: ', nextAppState);
        setAppState(nextAppState); // backgroundになる。
      });
      return () => {
        appStateListener.remove();
      };
    }
  }, [isAuthenticated, appState]);

  useEffect(() => {
    if (isAuthenticated) {
      getMySpaces();
    }
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        authData,
        setAuthData,
        isAuthenticated,
        setIsAuthenticated,
        isIpad,
        setIsIpad,
        loading,
        setLoading,
        snackBar,
        setSnackBar,
        isAuthDataFetched,
        setIsAuthDataFetched,
        spaceAndUserRelationships,
        setSpaceAndUserRelationships,
        haveSpaceAndUserRelationshipsBeenFetched,
        setHaveSpaceAndUserRelationshipsBeenFetched,
        spaceMenuBottomSheetRef,
        spaceActionMenuBottomSheetRef,
        authMenuBottomSheetRef,
        currentSpaceAndUserRelationship,
        setCurrentSpaceAndUserRelationship,
        currentSpace,
        setCurrentSpace,
        currentTagObject,
        setCurrentTagObject,
        isAfterPosted,
        setIsAfterPosted,
        // createNewPostFormData,
        // setCreateNewPostFormData,
        // createNewPostResult,
        // setCreateNewPostResult,
        spaceAndUserRelationshipsFetchingStatus,
      }}
    >
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='HomeStackNavigator'
              component={HomeStackNavigator}
              options={({ navigation }) => ({
                // headerShown: true,
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      <LoadingSpinner />
    </GlobalContext.Provider>
  );
};

export default App;
