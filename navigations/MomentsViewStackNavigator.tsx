import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import backendAPI from '../apis/backend';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { GlobalContext } from '../contexts/GlobalContext';
import { MomentsContext } from '../features/Moments/contexts/MomentsContext';
import Moments from '../features/Moments/pages/Moments';
import ViewMomentStackNavigator from './ViewMomentStackNavigator';

const MomentsViewStackNavigator: React.FC = (props) => {
  const { isIpad, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [currentPost, setCurrentPost] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [moments, setMoments] = useState([]);
  const [haveMomentosBeenFetched, setHaveMomentosBeenFetched] = useState(false);

  const getMoments = async () => {
    const result = await backendAPI.get(`/moments/${spaceAndUserRelationship.space._id}`);
    const { moments } = result.data;
    console.log('got moments', moments);
    setMoments(moments);
    setHaveMomentosBeenFetched(true);
  };

  useEffect(() => {
    getMoments();
  }, []);

  return (
    <MomentsContext.Provider
      value={{
        moments,
        setMoments,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
        hasMoreItems,
        setHasMoreItems,
        currentPost,
        setCurrentPost,
        currentIndex,
        setCurrentIndex,
      }}
    >
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Moments'
            component={Moments}
            options={({ navigation }) => ({
              headerShown: false,
              // headerLeft: () => (
              //   <TouchableOpacity onPress={() => navigation.goBack()}>
              //     <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              //   </TouchableOpacity>
              // ),
              // headerTitle: '',
              // headerStyle: {
              //   backgroundColor: 'rgb(30, 30, 30)',
              // },
              // headerTitleStyle: {
              //   fontWeight: 'bold',
              //   color: primaryTextColor,
              // },
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='ViewMomentStackNavigator'
            component={ViewMomentStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTransparent: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </MomentsContext.Provider>
  );
};

export default MomentsViewStackNavigator;
