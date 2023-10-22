import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import backendAPI from '../../../apis/backend';
import FastImage from 'react-native-fast-image';
import { iconColorTable } from '../../../themes/color';
import { Feather } from '@expo/vector-icons';

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [haveCommentsBeenFetched, setHaveCommentsBeenFetched] = useState(false);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const getComments = async () => {
    const result = await backendAPI.get(`/comments/post/${props.route.params.post._id}`);
    const { comments } = result.data;
    setComments(comments);
    setHaveCommentsBeenFetched(true);
  };

  useEffect(() => {
    getComments();
  }, []);

  const renderComment = (comment) => {
    if (comment.createdBy) {
      return (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FastImage
                source={{ uri: comment.createdBy.avatar }}
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 20,
                  backgroundColor: iconColorTable['blue1'],
                  borderRadius: 5,
                }}
                tintColor={'white'}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white', marginBottom: 8 }}>{comment.createdBy.name}</Text>
                {renderDate(comment.createdAt)}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Feather name='more-horizontal' size={20} color='white' />
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'white', fontSize: 17 }}>{comment.content}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderComments = () => {
    if (comments.length) {
      return (
        <FlatList
          data={comments}
          renderItem={({ item }) => renderComment(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      );
    } else {
      return <Text style={{ marginTop: 50, textAlign: 'center', color: 'white' }}>There are no comments yet.</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      {haveCommentsBeenFetched ? renderComments() : <ActivityIndicator />}
    </View>
  );
};

export default Comments;
