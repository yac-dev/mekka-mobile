import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { CommentType, ReplyType } from '../../../types';
import { AppButton } from '../../../components/Button';
import { VectorIcon } from '../../../Icons/VectorIcons';
import { useNavigation } from '@react-navigation/native';
import { ViewPostStackNavigatorProps } from '../navigations';
import { CommentsStackNavigatorProps } from '../../../navigations';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRepliesByCommentId } from '../../../query/queries/getRepliesByCommentId';
import { queryKeys, mutationKeys } from '../../../query';

type CommentProps = {
  comment: CommentType;
  onReply: (comment: CommentType) => void;
};

function timeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) {
    return `${Math.floor(interval)} year${Math.floor(interval) > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 2592000; // months
  if (interval > 1) {
    return `${Math.floor(interval)} month${Math.floor(interval) > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 86400; // days
  if (interval > 1) {
    return `${Math.floor(interval)} day${Math.floor(interval) > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 3600; // hours
  if (interval > 1) {
    return `${Math.floor(interval)} hour${Math.floor(interval) > 1 ? 's' : ''} ago`;
  }
  interval = seconds / 60; // minutes
  if (interval > 1) {
    return `${Math.floor(interval)} minute${Math.floor(interval) > 1 ? 's' : ''} ago`;
  }
  return 'Just Now';
}

export const Comment: React.FC<CommentProps> = ({ comment, onReply }) => {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const viewPostStackNavigation = useNavigation<ViewPostStackNavigatorProps>();
  const commentsStackNavigation = useNavigation<CommentsStackNavigatorProps>();
  const queryClient = useQueryClient();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { data: repliesData, status: repliesStatus } = useQuery({
    queryKey: [queryKeys.repliesByCommentId, comment._id],
    queryFn: () => getRepliesByCommentId({ commentId: comment._id }),
    enabled: isRepliesOpen,
  });

  // Animate replies container when data is loaded
  React.useEffect(() => {
    if (repliesStatus === 'success' && isRepliesOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [repliesStatus, isRepliesOpen]);

  // Subscribe to new replies
  React.useEffect(() => {
    const subscription = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === 'updated' && event.query.queryKey[0] === mutationKeys.createReply) {
        const newReply = event.query.state.data;
        if (newReply && isRepliesOpen) {
          // Update the replies list in the cache
          queryClient.setQueryData([queryKeys.repliesByCommentId, comment._id], (oldData: any) => {
            if (!oldData) return { replies: [newReply] };
            return {
              ...oldData,
              replies: [...oldData.replies, newReply],
            };
          });
        }
      }
    });

    return () => {
      if (typeof subscription === 'function') {
        subscription();
      }
    };
  }, [queryClient, comment._id, isRepliesOpen]);

  if (!comment.createdBy) {
    return null;
  }

  const renderReply = (reply: ReplyType) => {
    if (!reply.createdBy) return null;

    return (
      <View style={styles.replyContainer} key={reply._id}>
        <View style={styles.replyHeader}>
          <View style={styles.replyUserInfo}>
            <TouchableOpacity
              onPress={() => viewPostStackNavigation.navigate('UserStackNavigator', { userId: reply.createdBy._id })}
              style={styles.replyAvatarContainer}
            >
              {reply.createdBy.avatar ? (
                <ExpoImage source={reply.createdBy.avatar} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarText}>{reply.createdBy.name.slice(0, 2).toUpperCase()}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.replyUserDetails}>
              <Text style={styles.replyUserName}>{reply.createdBy.name}</Text>
              <Text style={styles.replyTime}>{timeSince(new Date(reply.createdAt))}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.replyContent}>{reply.content}</Text>
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity
              onPress={() => viewPostStackNavigation.navigate('UserStackNavigator', { userId: comment.createdBy._id })}
              style={styles.avatarContainer}
            >
              {comment.createdBy.avatar ? (
                <ExpoImage source={comment.createdBy.avatar} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarText}>{comment.createdBy.name.slice(0, 2).toUpperCase()}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{comment.createdBy.name}</Text>
              <Text style={styles.timeText}>{timeSince(new Date(comment.createdAt))}</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <AppButton.Icon
              onButtonPress={() => viewPostStackNavigation.navigate('ReportComment')}
              customStyle={styles.moreButton}
              hasShadow={false}
            >
              <VectorIcon.FT name='more-horizontal' size={13} color={'white'} />
            </AppButton.Icon>
          </View>
        </View>
        <Text style={styles.commentContent}>{comment.content}</Text>
        <View style={styles.commentFooter}>
          <TouchableOpacity style={styles.replyButton} onPress={() => onReply(comment)} activeOpacity={0.7}>
            <VectorIcon.MCI name='reply' size={13} color={'rgb(150,150,150)'} style={styles.replyIcon} />
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => setIsRepliesOpen(!isRepliesOpen)}
            activeOpacity={0.7}
          >
            <VectorIcon.II name={'chatbubble-outline'} size={13} color={'rgb(150,150,150)'} style={styles.replyIcon} />
            <Text style={styles.replyText}>
              {isRepliesOpen ? 'Hide replies' : `View all (${repliesData?.replies.length || comment.replyCount})`}
            </Text>
            <VectorIcon.II
              name={isRepliesOpen ? 'chevron-up' : 'chevron-down'}
              size={13}
              color={'rgb(150,150,150)'}
              style={styles.replyIcon}
            />
          </TouchableOpacity>
        </View>
        {isRepliesOpen && (
          <Animated.View style={[styles.repliesContainer, { opacity: fadeAnim }]}>
            {repliesStatus === 'pending' ? (
              <ActivityIndicator style={styles.loadingIndicator} />
            ) : (
              repliesData?.replies.map(renderReply)
            )}
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(100,100,100)',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: 'rgb(70,70,70)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    marginRight: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timeText: {
    color: 'rgb(150,150,150)',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    width: 25,
    height: 25,
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 15,
  },
  commentContent: {
    color: 'white',
    fontSize: 17,
    marginBottom: 8,
    marginLeft: 50,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    marginRight: 4,
  },
  replyText: {
    color: 'rgb(150,150,150)',
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 4,
  },
  repliesContainer: {
    marginLeft: 50,
    marginTop: 14,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  replyContainer: {
    marginBottom: 10,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  replyUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyAvatarContainer: {
    backgroundColor: 'rgb(70,70,70)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 10,
  },
  replyUserDetails: {
    flexDirection: 'column',
  },
  replyUserName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  replyTime: {
    color: 'rgb(150,150,150)',
    fontSize: 11,
    fontWeight: 'bold',
  },
  replyContent: {
    color: 'white',
    fontSize: 15,
    marginLeft: 35,
  },
});
