import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import backendAPI from '../../../apis/backend';
import { Video } from 'expo-av';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { PostsContext } from '../../../contexts/PostsContext';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Grid = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation } = useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPostsByTagId = async () => {
    const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}`);
    const { posts } = result.data;
    setPosts(posts);
    // setSelectedTag(tags[0]);
    setHavePostsBeenFetched(true);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getPostsByTagId();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getPostsByTagId();
  }, []);

  const renderItem = useCallback((post) => {
    if (post.content.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => navigation.navigate({ name: 'ViewPost', params: { post } })}
        >
          <Video source={{ uri: post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => navigation.navigate({ name: 'ViewPost', params: { post } })}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: post.content.data }}
            placeholder={blurhash}
            contentFit='contain'
            transition={1000}
          />
        </TouchableOpacity>
      );
    }
  }, []);

  // refresh次のindicatorが出ないのは後で直そう。
  if (havePostsBeenFetched) {
    if (posts.length) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList
            numColumns={3}
            data={posts}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
            }
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>
            You'll see all the posts tagged with this.
          </Text>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default Grid;
