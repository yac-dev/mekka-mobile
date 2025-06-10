import React, { useMemo, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCommentsByPostId } from '../../../query/queries';
import { currentPostAtom } from '../../Space/atoms/currentPostAtom';
import { useRecoilState } from 'recoil';
import { CommentType } from '../../../types';
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
  const [replyTo, setReplyTo] = useState<{ name: string; id: string } | null>(null);

  const snapPoints = useMemo(() => ['15%', '75%', '100%'], []);

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

  const handleReply = (comment: CommentType) => {
    if (comment.createdBy) {
      setReplyTo({ name: comment.createdBy.name, id: comment._id });
      commentInputBottomSheetRef.current?.snapToIndex(1);
    }
  };

  const renderComment = ({ item }: { item: CommentType }) => {
    if (item.createdBy) {
      return (
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'column',
              paddingTop: 15,
              paddingBottom: 15,
              borderBottomWidth: 0.5,
              borderBottomColor: 'rgb(100,100,100)',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => viewPostStackNavigation.navigate('UserStackNavigator', { userId: item.createdBy._id })}
                  style={{
                    backgroundColor: 'rgb(70,70,70)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 35,
                    height: 35,
                    borderRadius: 35 / 2,
                    marginRight: 15,
                  }}
                >
                  {item.createdBy.avatar ? (
                    <ExpoImage source={item.createdBy.avatar} style={styles.avatar} />
                  ) : (
                    <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                      {item.createdBy.name.slice(0, 2).toUpperCase()}
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                    {item.createdBy.name}
                  </Text>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 12, fontWeight: 'bold' }}>
                    {timeSince(new Date(item.createdAt))}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppButton.Icon
                  onButtonPress={() => handleReply(item)}
                  customStyle={{
                    width: 25,
                    height: 25,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 15,
                    marginRight: 8,
                  }}
                  hasShadow={false}
                >
                  <VectorIcon.MCI name='reply' size={13} color={'white'} />
                </AppButton.Icon>
                <AppButton.Icon
                  onButtonPress={() => viewPostStackNavigation.navigate('ReportComment')}
                  customStyle={{
                    width: 25,
                    height: 25,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 15,
                  }}
                  hasShadow={false}
                >
                  <VectorIcon.FT name='more-horizontal' size={13} color={'white'} />
                </AppButton.Icon>
              </View>
            </View>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 8 }}>{item.content}</Text>
            <TouchableOpacity
              onPress={() => {
                commentsStackNavigation.navigate('Replies', { commentId: item._id });
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, fontWeight: 'bold' }}>View all replies</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
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
        renderItem={renderComment}
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
