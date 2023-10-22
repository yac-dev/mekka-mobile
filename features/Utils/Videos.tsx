import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import backendAPI from '../../apis/backend';
import { VideoSpaceContext } from '../Space/contexts/VideoSpaceContext';
import VideoPosts from '../components/VideoPosts';
import VideoPost from './VideoPost';

const Videos = (props) => {
  const [space, setSpace] = useState({ name: '' });
  const [posts, setPosts] = useState<PostType[]>([]);
  const [arePostsFetched, setArePostsFetched] = useState<boolean>(false);
  const mediaRefs = useRef([]);

  const array = [1, 2, 3, 4, 5, 6];

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };

  const getPosts = async () => {
    const result = await backendAPI.get(`/posts/space/${props.route?.params?.spaceId}`);
    setPosts(result.data.posts);
    setArePostsFetched(true);
  };

  useEffect(() => {
    getSpace();
    getPosts();
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          if (!profile) {
            setCurrentUserProfileItemInView(element.item.creator);
          }
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  //"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{ backgroundColor: index % 2 ? 'blue' : 'pink', height: Dimensions.get('window').height - 64, flex: 1 }}
      >
        <VideoPost />
      </View>
    );
  };

  return (
    <VideoSpaceContext.Provider value={{ space, setSpace, posts, setPosts, arePostsFetched, setArePostsFetched }}>
      <FlatList
        data={array}
        renderItem={renderItem}
        pagingEnabled={true}
        keyExtractor={(item) => item}
        decelerationRate={'normal'}
      />
    </VideoSpaceContext.Provider>
  );
};

export default Videos;
