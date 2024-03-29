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
import ViewPostStackNavigator from './ViewPostStackNavigator';
import { Image as ExpoImage } from 'expo-image';
import { TagRootContext } from '../contexts/TagRootContext';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const TagViewStackNavigator: React.FC = (props) => {
  const { isIpad, spaceAndUserRelationshipsFetchingStatus } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const {
    spaceAndUserRelationship,
    navigation,
    screenLoaded,
    setScreenLoaded,
    createNewPostResult,
    setCreateNewPostResult,
  } = useContext(SpaceRootContext);

  const {
    posts,
    setPosts,
    isRefreshingGridViewPosts,
    setIsRefreshingGridViewPosts,
    isLoadingGridViewPosts,
    setIsLoadingGridViewPosts,
    currentGridViewPostsPage,
    setCurrentGridViewPostsPage,
    hasMoreGridViewPosts,
    setHasMoreGridViewPosts,
  } = useContext(TagRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  // const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [currentPost, setCurrentPost] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(props.createdPost);/

  // console.log(props.screenLoaded);

  // generalになる理由はなんだろう。。。？？
  useEffect(() => {
    if (screenLoaded[props.tagObject.tag._id] && createNewPostResult.isSuccess && createNewPostResult.responseData) {
      // responseDataのaddedTags、もしくはresponseData.createdTagの中にprops.tagObject.tag._idがある場合は
      // って言うのが必要になる。
      setPosts((previous) => {
        const updating = [...previous];
        updating.unshift(createNewPostResult.responseData.post);
        return updating;
      });
      setCreateNewPostResult((previous) => {
        return {
          ...previous,
          isCreating: false,
          isSuccess: false,
          responseData: null,
        };
      });
    }
  }, [createNewPostResult]);

  const getPostsByTagId = async () => {
    setIsLoadingGridViewPosts(true);
    const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}?page=${currentPage}`);
    const { posts } = result.data;

    if (posts.length === 0) {
      // No more items to fetch
      setHasMoreGridViewPosts(false);
    } else {
      setPosts((previous) => [...previous, ...posts]);
      setIsLoadingGridViewPosts(false);
    }
  };

  // const onRefresh = async () => {
  //   setIsRefreshing(true);
  //   setCurrentPage(0);
  //   const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}?page=${currentPage}`);
  //   const { posts } = result.data;
  //   if (posts.length === 0) {
  //     // No more items to fetch
  //     setHasMoreItems(false);
  //   } else {
  //     setPosts(posts);
  //   }
  //   setIsRefreshing(false);
  // };

  useEffect(() => {
    if (spaceAndUserRelationshipsFetchingStatus === 'success' && props.tagsFetchingStatus === 'success') {
      getPostsByTagId();
    }
  }, [currentPage, spaceAndUserRelationshipsFetchingStatus, props.tagsFetchingStatus]);

  // useEffect(() => {
  //   if (props.createdPost) {
  //     setPosts((previous) => [...previous, props.createdPost]);
  //   }
  // }, [props.createdPost]);
  // console.log('loaded screens -> ', screenLoaded);
  // console.log('tag object is this -> ', props.tagObject.tag._id);

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
        getPostsByTagId,
        isRefreshing,
        setIsRefreshing,
        // onRefresh,
      }}
    >
      <View
        style={{ flex: 1 }}
        onLayout={() =>
          setScreenLoaded((previous) => {
            return {
              ...previous,
              [props.tagObject.tag._id]: true,
            };
          })
        }
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
      </View>
    </TagViewContext.Provider>
  );
};

export default TagViewStackNavigator;
