import React, { useMemo, useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  InputAccessoryView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import backendAPI from '../../../apis/backend';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import * as Haptics from 'expo-haptics';
import { TagRootContext } from '../../../contexts/TagRootContext';
import { AuthContext, SnackBarContext } from '../../../providers';
import { SnackBar } from '../../../components';
import { CurrentSpaceContext } from '../../../providers';

type ICommentinput = {};

export const CommentInput = (props) => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [commentInput, setCommentInput] = useState('');
  const inputAccessoryViewID = 'COMMENT_INPUT';

  // const sendComment = async () => {
  //   const payload = {
  //     content: commentInput,
  //     postId: posts[currentIndex]._id,
  //     userId: auth._id,
  //   };
  //   setLoading(true);
  //   const result = await backendAPI.post(`/comments/`, payload);
  //   setLoading(false);
  //   setSnackBar({
  //     isVisible: true,
  //     status: 'success',
  //     message: 'Sent a comment successfully.',
  //     duration: 5000,
  //   });
  //   Keyboard.dismiss();
  //   setCommentInput('');
  //   commentInputBottomSheetRef.current.close();
  // };
  // まあ、bottomsheetが閉じないが、まあいいか。

  // {space.isCommentAvailable ? (
  //   <>

  //   </>
  // ) : (
  //   <View style={{}}>
  //     <TouchableOpacity
  //       style={{ marginRight: 10, alignSelf: 'flex-end', marginBottom: 10 }}
  //       onPress={() => {
  //         Keyboard.dismiss();
  //         setCommentInput('');
  //         commentInputBottomSheetRef.current.close();
  //       }}
  //     >
  //       <Ionicons name='close-circle-sharp' size={30} color='white' />
  //     </TouchableOpacity>
  //     <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
  //       Comment is not allowed in this space.
  //     </Text>
  //   </View>
  // )}

  if (!currentSpace.isCommentAvailable) {
    return (
      <View style={styles.commentIsNotAvailable}>
        <Text style={{ color: 'white' }}>Commenting is not allowed</Text>
      </View>
    );
  }

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
        // ref={textInputRef}
        value={commentInput}
        onChangeText={setCommentInput}
        autoCapitalize='none'
      />
      <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={'rgb(88,88,88)'}>
        <View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View></View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  Keyboard.dismiss();
                  setCommentInput('');
                  // commentInputBottomSheetRef.current.close();
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => console.log('hello')}
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
    </View>
  );
};

const styles = StyleSheet.create({
  commentIsNotAvailable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
