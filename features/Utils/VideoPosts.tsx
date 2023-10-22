import React from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import VideoPost from './VideoPost';

const VideoPosts = () => {
  const array = [1, 2, 3, 4, 5, 6];

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
    <View>
      <FlatList
        data={array}
        renderItem={renderItem}
        pagingEnabled={true}
        keyExtractor={(item) => item}
        decelerationRate={'normal'}
      />
    </View>
  );
};

export default VideoPosts;
