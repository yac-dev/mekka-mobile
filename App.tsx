import React, { useState, useReducer, useEffect, useRef, useCallback } from 'react';
import { View, Platform, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
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

type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

const App: React.FC = function () {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthDataFetched, setIsAuthDataFetched] = useState(false);
  const [authData, setAuthData] = useState<AuthDataType>({ _id: '', name: '', email: '', avatar: '' });
  const [isIpad, setIsIpad] = useState<boolean>(Platform.OS === 'ios' && Platform.isPad);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: '', barType: '', duration: null });
  const [spaceAndUserRelationships, setSpaceAndUserRelationships] = useState([]);
  const [haveSpaceAndUserRelationshipsBeenFetched, setHaveSpaceAndUserRelationshipsBeenFetched] = useState(false);
  const [currentSpaceAndUserRelationship, setCurrentSpaceAndUserRelationship] = useState(null);
  const [currentSpace, setCurrentSpace] = useState(null); // ここでspaceを持っていた方がいいのかも。。。
  const [currentTagObject, setCurrentTagObject] = useState(null);
  const spaceMenuBottomSheetRef = useRef(null);
  const spaceActionMenuBottomSheetRef = useRef(null);
  const authMenuBottomSheetRef = useRef(null);
  const chooseViewBottomSheetRef = useRef(null);
  const [afterJoined, setAfterJoined] = useState(false);
  // console.log(currentTagObject);
  // console.log(currentSpaceAndUserRelationship);

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
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
    const { spaceAndUserRelationships } = result.data;
    setSpaceAndUserRelationships(spaceAndUserRelationships);
    setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
    setHaveSpaceAndUserRelationshipsBeenFetched(true);
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getMySpaces();
    }
  }, [isAuthenticated]);

  const renderNavigator = () => {
    if (isAuthDataFetched) {
      if (isAuthenticated) {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name='HomwStackNavigator'
              component={HomeStackNavigator}
              options={({ navigation }) => ({
                // headerShown: true,
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        );
      } else {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name='NonAuthNavigator'
              component={NonAuthNavigator}
              options={({ navigation }) => ({
                // headerShown: true,
                headerShown: false,
              })}
            />
          </Stack.Navigator>
        );
      }
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 100 }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

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
      }}
    >
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='HomwStackNavigator'
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
