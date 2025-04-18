import React, { forwardRef, useRef, useState } from 'react';
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
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '../../../query/mutations';
import { CreateCommentInputType, GetCommentsByPostIdOutputType } from '../../../query/types';
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
}

export const CommentInputBottomSheet: React.FC<CommentBottomSheetProps> = forwardRef(
  ({ commentInputBottomSheetRef, textInputRef, currentPost, snapPoints, handleSheetChanges, handleFocus }, ref) => {
    const [auth] = useRecoilState(authAtom);
    const [commentInput, setCommentInput] = useState('');
    const commentInputRef = useRef<TextInput>(null);

    const queryClient = useQueryClient();
    const { mutate: createCommentMutation, status: createCommentStatus } = useMutation({
      mutationKey: [mutationKeys.createComment],
      mutationFn: (input: CreateCommentInputType) => createComment(input),
      // onMutate: () => refs.flashMessageRef.current?.showMessage({ message: 'Processing now...', type: 'success' }),
      onSuccess: (data) => {
        // refs.flashMessageRef.current?.showMessage({
        //   type: 'success',
        //   message: 'Your comment has been sent.',
        // });
        setCommentInput('');
        commentInputBottomSheetRef.current?.snapToIndex(0);
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

    const onSendPress = () => {
      createCommentMutation({
        content: commentInput,
        postId: currentPost,
        userId: auth._id,
        userName: auth.name,
      });
    };

    const onCancelPress = () => {
      Keyboard.dismiss();
      setCommentInput('');
      commentInputBottomSheetRef.current?.snapToIndex(0);
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
        onChange={handleSheetChanges}
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
});
