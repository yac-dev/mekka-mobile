import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import backendAPI from '../../../apis/backend';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { PostsContext } from '../../../contexts/PostsContext';
import { TagViewContext } from '../contexts/TagViewContext';
import ContentThumbnail from '../components/ContentThumbnail';

const TagView = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const { posts, setPosts, hasMoreItems, setCurrentPage, currentPage, isLoading, setCurrentPost } =
    useContext(TagViewContext);
  const mediaRefs = useRef([]);
  // const { isIpad, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  // const { spaceAndUserRelationship, navigation } = useContext(SpaceRootContext);
  // // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  // const [posts, setPosts] = useState([]);
  // const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [hasMoreItems, setHasMoreItems] = useState(true);

  // const onRefresh = async () => {
  //   setIsRefreshing(true);
  //   await getPostsByTagId();
  //   setIsRefreshing(false);
  // };

  const loadMoreItem = () => {
    if (hasMoreItems) {
      setCurrentPage(currentPage + 1);
    }
  };
  const renderLoader = () => {
    if (hasMoreItems) {
      return isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : null;
    } else {
      return null;
    }
  };

  const renderItem = useCallback((post, index) => {
    return <ContentThumbnail post={post} index={index} navigation={props.navigation} />;
    // if (post.contents[0].type === 'video') {
    //   return (
    //     <TouchableOpacity
    //       style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
    //       onPress={() => {
    //         setCurrentPost(post);
    //         props.navigation.navigate({
    //           name: 'ViewPostStackNavigator',
    //           params: { screen: 'ViewPost', params: { post } },
    //         });
    //       }}
    //     >
    //       <Video source={{ uri: post.contents[0].data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
    //     </TouchableOpacity>
    //   );
    // } else {
    //   return (
    //     <TouchableOpacity
    //       style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
    //       onPress={() => {
    //         setCurrentPost(post);
    //         props.navigation.navigate({
    //           name: 'ViewPostStackNavigator',
    //           params: { screen: 'ViewPost', params: { post } },
    //         });
    //       }}
    //     >
    //       <FastImage
    //         source={{ uri: post.contents[0].data }}
    //         style={{ width: '100%', height: '100%', borderRadius: 5 }}
    //       />
    //     </TouchableOpacity>
    //   );
    // }
  }, []);

  if (posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <FlatList
          style={{ paddingTop: 10 }}
          numColumns={3}
          data={posts}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          // refreshControl={
          //   <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
          // }
          onEndReached={loadMoreItem}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
        />
        {/* ここにnavigatorを入れるのもいいかもね。。。 */}
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>No posts in this tag channel...</Text>
      </View>
    );
  }
};

export default TagView;
