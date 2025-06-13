import React, { useMemo, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCommentsByPostId } from '../../../query/queries';
import { currentPostAtom } from '../../Space/atoms/currentPostAtom';
import { useRecoilState } from 'recoil';
import { CommentType, ReplyType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { Image as ExpoImage } from 'expo-image';
import { queryKeys } from '../../../query/queryKeys';
import { ViewPostStackNavigatorParams, ViewPostStackNavigatorProps } from '../navigations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView } from 'react-native';
import { AppButton } from '../../../components/Button';
import { VectorIcon } from '../../../Icons/VectorIcons';
import { useNavigation } from '@react-navigation/native';
import { CommentInput } from '../components/CommentInput';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CommentInputBottomSheet } from '../components/CommentInputBottomSheet';
import { CommentsStackNavigatorParams, CommentsStackNavigatorProps } from '../../../navigations';
import { Comment } from '../components/Comment';

type ICommentsPage = NativeStackScreenProps<CommentsStackNavigatorParams, 'Comments'>;

const inputAccessoryViewID = 'COMMENT_INPUT';

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
  // return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? 's' : ''} ago`;
  return 'Just Now';
}

export const CommentsPage: React.FC<{ postId: string }> = ({ postId }) => {
  const viewPostStackNavigation = useNavigation<ViewPostStackNavigatorProps>();
  const commentsStackNavigation = useNavigation<CommentsStackNavigatorProps>();
  const commentInputBottomSheetRef = useRef<BottomSheetModal>(null);
  const textInputRef = useRef<TextInput>(null);
  const [replyTo, setReplyTo] = useState<{ recieverId: string; recieverName: string; commentId: string } | null>(null);

  const snapPoints = useMemo(() => ['15%', '80%', '100%'], []);

  const { data, status } = useQuery({
    queryKey: [queryKeys.commentsByPostId, postId],
    queryFn: () => getCommentsByPostId({ postId }),
    staleTime: 0,
    gcTime: 0,
  });

  const handleFocus = () => {
    commentInputBottomSheetRef.current?.snapToIndex(1);
  };

  const handleSheetChanges = (index: number) => {
    if (index === 0) {
      Keyboard.dismiss();
    } else if (index === 1) {
      textInputRef.current?.focus();
    }
  };

  const clearReply = () => {
    setReplyTo(null);
  };

  // ここ、commentのreplyとreplyに対するreplyでfunction分けないといけないね。
  const handleReplyToComment = (comment: CommentType) => {
    if (comment.createdBy) {
      setReplyTo({ recieverId: comment.createdBy._id, recieverName: comment.createdBy.name, commentId: comment._id });
      commentInputBottomSheetRef.current?.snapToIndex(1);
    }
  };

  const handleReplyToReply = (reply: ReplyType, commentId: string) => {
    if (reply.createdBy) {
      setReplyTo({ recieverId: reply.createdBy._id, recieverName: reply.createdBy.name, commentId: commentId });
      commentInputBottomSheetRef.current?.snapToIndex(1);
    }
  };

  if (status === 'pending') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <FlashList
        data={data?.comments}
        renderItem={({ item }) => (
          <Comment comment={item} onReplyToComment={handleReplyToComment} onReplyToReply={handleReplyToReply} />
        )}
        keyExtractor={(_, index) => `${index}`}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
            <VectorIcon.II name='chatbubbles-sharp' size={50} color={'white'} style={{ marginBottom: 16 }} />
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Be the first to comment</Text>
          </View>
        }
        estimatedItemSize={100}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <CommentInputBottomSheet
        commentInputBottomSheetRef={commentInputBottomSheetRef}
        textInputRef={textInputRef}
        currentPost={postId}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        handleFocus={handleFocus}
        replyTo={replyTo}
        clearReply={clearReply}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
});
