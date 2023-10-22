import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import backendAPI from '../../../apis/backend';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { PostsContext } from '../../../contexts/PostsContext';

const PeopleView = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation, space } = useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPostsByTagId = async () => {
    const result = await backendAPI.get(`/posts/user/${props.user._id}/space/${spaceAndUserRelationship.space._id}`);
    const { posts } = result.data;
    setPosts(posts);
    setHavePostsBeenFetched(true);
  };

  // const onRefresh = async () => {
  //   setIsRefreshing(true);
  //   await getPostsByTagId();
  //   setIsRefreshing(false);
  // };

  useEffect(() => {
    getPostsByTagId();
  }, []);

  const renderItem = useCallback((post) => {
    if (post.content.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => props.navigation.navigate({ name: 'ViewPost', params: { post } })}
        >
          <Video source={{ uri: post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => props.navigation.navigate({ name: 'ViewPost', params: { post } })}
        >
          <FastImage source={{ uri: post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
        </TouchableOpacity>
      );
    }
  }, []);

  // refresh次のindicatorが出ないのは後で直そう。
  if (havePostsBeenFetched) {
    if (posts.length) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <FastImage
                source={{ uri: props.user.avatar }}
                style={{ width: 50, height: 50, marginRight: 10, borderRadius: 25 }}
                // tintColor={'white'}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 5, fontWeight: 'bold' }}>
                  {props.user.name}
                </Text>
                <Text style={{ color: 'rgb(170,170,170)' }}>114 posts</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: 'white',
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Follow</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ paddingTop: 10 }}
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
            You'll see all the posts of this user.
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

export default PeopleView;
