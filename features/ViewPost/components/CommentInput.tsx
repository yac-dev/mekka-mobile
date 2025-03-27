import React, { useContext, useState, useEffect, forwardRef, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  InputAccessoryView,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';
import { useCreateCommentState } from '../../../api';
import { LoadingSpinner } from '../../../components';
import FlashMessage from 'react-native-flash-message';
import { PostType } from '../../../types';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '../../../query/mutations';
import { CreateCommentInputType, GetCommentsByPostIdOutputType } from '../../../query/types';
import { mutationKeys, queryKeys } from '../../../query';

type ICommentinput = {
  currentPost: string;
};

// ここでref消費しないし、いちいちforwardRefいらないね多分。
const inputAccessoryViewID = 'COMMENT_INPUT';

export const CommentInput = forwardRef((props: ICommentinput, ref) => {
  const { currentPost } = props;
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
      queryClient.setQueryData([queryKeys.commentsByPostId, currentPost], (previous: GetCommentsByPostIdOutputType) => {
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
      });
    },
  });

  // const [currentSpace] = useRecoilState(currentSpaceAtom);

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
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgb(100,100,100)',
        backgroundColor: 'black',
      }}
    >
      {createCommentStatus === 'pending' ? (
        <View
          style={{
            padding: 15,
            width: '100%',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size='small' color='white' />
        </View>
      ) : (
        <>
          <TextInput
            // multiline={true}
            placeholder={'What are your thoughts?'}
            placeholderTextColor={'rgb(170,170,170)'}
            inputAccessoryViewID={inputAccessoryViewID}
            style={{
              padding: 15,
              width: '100%',
              color: 'white',
              fontSize: 17,
              backgroundColor: 'rgb(30,30,30)',
              borderRadius: 5,
            }}
            ref={commentInputRef}
            value={commentInput}
            onChangeText={setCommentInput}
            autoCapitalize='none'
          />
          <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={'rgb(30,30,30)'}>
            <View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View></View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ padding: 15 }} onPress={() => onCancelPress()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: 15 }}
                    onPress={() => onSendPress()}
                    disabled={commentInput.length ? false : true}
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
  );
});

const styles = StyleSheet.create({
  commentIsNotAvailable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
