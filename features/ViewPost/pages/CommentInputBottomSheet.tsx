import React, { useMemo, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import backendAPI from '../../../apis/backend';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

// rgb(35, 35, 35)
const CommentInputBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['30%', '85%'], []);
  const { isIpad, setLoading, authData, setSnackBar } = useContext(GlobalContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  const { commentInputBottomSheetRef, textInputRef, viewPostStackNavigatorNavigation } = useContext(ViewPostContext);
  const { currentIndex, posts } = useContext(TagViewContext);
  // const { commentInputBottomSheetRef, textInputRef, post, navigation } = useContext(ViewPostContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const iconContainerWidth = oneGridWidth * 0.9;
  const [commentInput, setCommentInput] = useState('');
  const inputAccessoryViewID = 'COMMENT_INPUT';
  console.log(posts[currentIndex]._id);

  const sendComment = async () => {
    const payload = {
      content: commentInput,
      postId: posts[currentIndex]._id,
      userId: authData._id,
    };
    setLoading(true);
    const result = await backendAPI.post(`/comments/`, payload);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Sent a comment successfully.',
      duration: 5000,
    });
    Keyboard.dismiss();
    setCommentInput('');
    commentInputBottomSheetRef.current.close();
  };
  // まあ、bottomsheetが閉じないが、まあいいか。

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={commentInputBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
      keyboardBehavior={'extend'}
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        {space.isCommentAvailable ? (
          <>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
                What are your thoughts?
              </Text>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  Keyboard.dismiss();
                  setCommentInput('');
                  commentInputBottomSheetRef.current.close();
                }}
              >
                <Ionicons name='close-circle-sharp' size={30} color='white' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                marginBottom: 10,
                alignSelf: 'flex-end',
                marginRight: 20,
                borderBottomWidth: 0.3,
                borderBottomColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                // navigation?.navigate('Comments', { post });
                Keyboard.dismiss();
                commentInputBottomSheetRef.current.close();
                viewPostStackNavigatorNavigation.navigate('CommentsPage', { postId: posts[currentIndex]._id });
              }}
            >
              <Text style={{ color: 'white' }}>View all comments</Text>
            </TouchableOpacity>
            <View style={{ height: '100%', flexDirection: 'row' }}>
              <BottomSheetTextInput
                multiline={true}
                placeholder={'Type here...'}
                placeholderTextColor={'rgb(170,170,170)'}
                inputAccessoryViewID={inputAccessoryViewID}
                style={{
                  padding: 15,
                  height: '100%',
                  // padding: 10,
                  // backgroundColor: 'rgb(235, 235, 235)',
                  width: '100%', // ここも、下の修正に沿って80 90%に変える。
                  color: 'white',
                  fontSize: 17,
                }}
                ref={textInputRef}
                value={commentInput}
                onChangeText={setCommentInput}
                autoCapitalize='none'
              />
              <InputAccessoryView
                nativeID={inputAccessoryViewID}
                backgroundColor={'rgb(88,88,88)'}
                // style={{ paddingTop: 10, paddingBottom: 10 }}
              >
                <View>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View></View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => {
                          Keyboard.dismiss();
                          setCommentInput('');
                          commentInputBottomSheetRef.current.close();
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => sendComment()}
                        disabled={commentInput ? false : true}
                      >
                        <Text style={{ color: commentInput ? 'white' : 'rgb(130,130,130)', fontWeight: 'bold' }}>
                          Send
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </InputAccessoryView>
            </View>
          </>
        ) : (
          <View style={{}}>
            <TouchableOpacity
              style={{ marginRight: 10, alignSelf: 'flex-end', marginBottom: 10 }}
              onPress={() => {
                Keyboard.dismiss();
                setCommentInput('');
                commentInputBottomSheetRef.current.close();
              }}
            >
              <Ionicons name='close-circle-sharp' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
              Comment is not allowed in this space.
            </Text>
          </View>
        )}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default CommentInputBottomSheet;
