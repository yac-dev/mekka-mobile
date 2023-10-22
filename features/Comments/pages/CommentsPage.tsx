import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import backendAPI from '../../../apis/backend';

const CommentsPage = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCommentsByPostId = async () => {
    const result = await backendAPI.get(`/posts/${props.route.params.postId}/comments`);
    const { comments } = result.data;
    setComments(comments);
    setIsLoading(false);
  };
  console.log(comments);

  useEffect(() => {
    getCommentsByPostId();
  }, []);

  const renderComment = useCallback((item) => {
    return (
      <View style={{ padding: 15 }}>
        <Text style={{ color: 'white' }}>{item.content}</Text>
      </View>
    );
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      {comments.length ? (
        <FlatList
          data={comments}
          renderItem={({ item }) => renderComment(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      ) : (
        <Text style={{ color: 'white', marginTop: 50, textAlign: 'center' }}>
          You'll see all the comments of this post.
        </Text>
      )}
    </View>
  );
};

export default CommentsPage;
