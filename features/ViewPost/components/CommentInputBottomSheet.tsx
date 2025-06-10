import React, { forwardRef, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  InputAccessoryView,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { createComment, createReply } from '../../../query/mutations';
import { CreateCommentInputType, CreateReplyInputType, GetCommentsByPostIdOutputType } from '../../../query/types';
import { mutationKeys, queryKeys } from '../../../query';
import { VectorIcon } from '../../../Icons/VectorIcons';

const inputAccessoryViewID = 'COMMENT_INPUT';

interface CommentBottomSheetProps {
  commentInputBottomSheetRef: React.RefObject<BottomSheetModal>;
  textInputRef: React.RefObject<TextInput>;
  currentPost: string;
  snapPoints: string[];
  handleSheetChanges: (index: number) => void;
  handleFocus: () => void;
  replyTo: { name: string; id: string } | null;
  clearReply: () => void;
}

export const CommentInputBottomSheet: React.FC<CommentBottomSheetProps> = forwardRef(
  (
    {
      commentInputBottomSheetRef,
      textInputRef,
      currentPost,
      snapPoints,
      handleSheetChanges,
      handleFocus,
      replyTo,
      clearReply,
    },
    ref
  ) => {
    const [auth] = useRecoilState(authAtom);
    const [commentInput, setCommentInput] = useState('');
    const commentInputRef = useRef<TextInput>(null);

    const queryClient = useQueryClient();
    const { mutate: createCommentMutation, status: createCommentStatus } = useMutation({
      mutationKey: [mutationKeys.createComment],
      mutationFn: (input: CreateCommentInputType) => createComment(input),
      onSuccess: (data) => {
        setCommentInput('');
        commentInputBottomSheetRef.current?.snapToIndex(0);
        clearReply();
        queryClient.setQueryData(
          [queryKeys.commentsByPostId, currentPost],
          (previous: GetCommentsByPostIdOutputType) => {
            const createdComment = {
              content: data.comment.content,
              createdBy: {
                name: auth.name,
                _id: auth._id,
                avatar: auth.avatar,
              },
              createdAt: data.comment.createdAt,
              postId: currentPost,
              _id: data.comment._id,
            };
            return {
              ...previous,
              comments: [createdComment, ...previous.comments],
            };
          }
        );
      },
    });

    const { mutate: createReplyMutation, status: createReplyStatus } = useMutation({
      mutationKey: [mutationKeys.createReply],
      mutationFn: (input: CreateReplyInputType) => createReply(input),
      onSuccess: (data) => {
        setCommentInput('');
        commentInputBottomSheetRef.current?.snapToIndex(0);
        clearReply();
      },
      onError: (error) => {
        console.log(error);
      },
    });

    const onSendPress = () => {
      if (replyTo) {
        createReplyMutation({
          commentId: replyTo.id,
          content: commentInput,
          userId: auth._id,
        });
      } else {
        createCommentMutation({
          content: commentInput,
          postId: currentPost,
          userId: auth._id,
          userName: auth.name,
          ...(replyTo && {
            replyTo: {
              commentId: replyTo.id,
              userName: replyTo.name,
            },
          }),
        });
      }
    };

    const onCancelPress = () => {
      Keyboard.dismiss();
      setCommentInput('');
      commentInputBottomSheetRef.current?.snapToIndex(0);
      clearReply();
    };

    const handleSheetChangesWithClear = (index: number) => {
      handleSheetChanges(index);
      if (index === 0) {
        clearReply();
      }
    };

    return (
      <BottomSheet
        ref={commentInputBottomSheetRef}
        index={0}
        enableOverDrag={true}
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: 'rgb(30,30,30)' }}
        handleIndicatorStyle={{ backgroundColor: 'rgb(100,100,100)' }}
        onClose={() => {}}
        onChange={handleSheetChangesWithClear}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            enableTouchThrough={false}
            appearsOnIndex={1}
            disappearsOnIndex={0}
            style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]}
          />
        )}
      >
        <View style={styles.container}>
          {createCommentStatus === 'pending' ? (
            <View
              style={{
                padding: 15,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size='small' color='white' />
            </View>
          ) : (
            <>
              {replyTo && (
                <View style={styles.replyToContainer}>
                  <Text style={styles.replyToText}>in reply to </Text>
                  <Text style={styles.replyToName}>@{replyTo.name}</Text>
                </View>
              )}
              <TextInput
                ref={textInputRef}
                placeholder='What are your thoughts?'
                placeholderTextColor={'rgb(170,170,170)'}
                multiline
                style={styles.textInput}
                onFocus={handleFocus}
                inputAccessoryViewID={inputAccessoryViewID}
                value={commentInput}
                onChangeText={setCommentInput}
                autoCapitalize='none'
              />
              <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={'rgb(30,30,30)'}>
                <View style={{ borderTopWidth: 0.5, borderTopColor: 'rgb(100,100,100)' }}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View></View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity activeOpacity={0.8} style={{ padding: 15 }} onPress={() => onCancelPress()}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 15,
                        }}
                        onPress={() => onSendPress()}
                        disabled={commentInput.length ? false : true}
                        activeOpacity={0.8}
                      >
                        <Text style={{ color: commentInput.length ? 'white' : 'rgb(130,130,130)', fontWeight: 'bold' }}>
                          Send
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </InputAccessoryView>
            </>
          )}
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(30,30,30)',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textInput: {
    color: 'white',
    fontSize: 17,
  },
  replyToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  replyToText: {
    color: 'rgb(170,170,170)',
    fontSize: 14,
  },
  replyToName: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
