import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryTextColor } from '../themes/text';
import { Ionicons } from '@expo/vector-icons';
import TagView from '../features/Space/pages/TagView';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import backendAPI from '../apis/backend';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { GlobalContext } from '../contexts/GlobalContext';
import { TagViewContext } from '../features/Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import ViewPostStackNavigator from './ViewPostStackNavigator';

const TagViewStackNavigator: React.FC = (props) => {
  const { isIpad, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation } = useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [currentPost, setCurrentPost] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const getPostsByTagId = async () => {
    setIsLoading(true);
    const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}?page=${currentPage}`);
    const { posts } = result.data;

    if (posts.length === 0) {
      // No more items to fetch
      setHasMoreItems(false);
    } else {
      setPosts((previous) => [...previous, ...posts]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostsByTagId();
  }, [currentPage]);

  return (
    <TagViewContext.Provider
      value={{
        posts,
        setPosts,
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
            name='TagView'
            component={TagView}
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
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTransparent: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: primaryTextColor,
              },
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </TagViewContext.Provider>
  );
};

export default TagViewStackNavigator;
