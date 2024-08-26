import React, { useContext, useState, useEffect, forwardRef } from 'react';
import { View, Text, TouchableOpacity, InputAccessoryView, Keyboard, StyleSheet } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';
import { useCreateCommentState } from '../../../api';
import { LoadingSpinner } from '../../../components';
import FlashMessage from 'react-native-flash-message';
import { PostType } from '../../../types';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';

type ICommentinput = {
  closeCommentInputBottomSheet: () => void;
  currentPost: PostType;
  refs: {
    commentInputRef: React.RefObject<TextInput>;
    flashMessageRef: React.RefObject<FlashMessage>;
  };
};

// ここでref消費しないし、いちいちforwardRefいらないね多分。
const inputAccessoryViewID = 'COMMENT_INPUT';

export const CommentInput = forwardRef((props: ICommentinput, ref) => {
  const { closeCommentInputBottomSheet, refs, currentPost } = props;
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);
  const [commentInput, setCommentInput] = useState('');
  const { apiResult: createCommentResultState, requestApi: requestCreateComment } = useCreateCommentState();

  if (!currentSpace.isCommentAvailable) {
    return (
      <View style={styles.commentIsNotAvailable}>
        <Text style={{ color: 'white' }}>Commenting is not allowed</Text>
      </View>
    );
  }

  const onSendPress = () => {
    requestCreateComment({ content: commentInput, postId: currentPost._id, userId: auth._id });
  };

  const onCancelPress = () => {
    Keyboard.dismiss();
    setCommentInput('');
    closeCommentInputBottomSheet();
  };

  useEffect(() => {
    if (createCommentResultState.status === 'success') {
      refs.flashMessageRef.current?.showMessage({ message: 'Your comment has been sent.', type: 'success' });
      Keyboard.dismiss();
      setCommentInput('');
      closeCommentInputBottomSheet();
    }
  }, [createCommentResultState]);

  return (
    <View style={{ height: '100%', flexDirection: 'row' }}>
      <BottomSheetTextInput
        multiline={true}
        placeholder={'Type here...'}
        placeholderTextColor={'rgb(170,170,170)'}
        inputAccessoryViewID={inputAccessoryViewID}
        style={{
          padding: 15,
          height: '100%',
          width: '100%',
          color: 'white',
          fontSize: 17,
        }}
        ref={refs.commentInputRef}
        value={commentInput}
        onChangeText={setCommentInput}
        autoCapitalize='none'
      />
      <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={'rgb(50,50,50)'}>
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
      <LoadingSpinner isVisible={createCommentResultState.status === 'loading'} message={'Processing now✈️'} />
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
