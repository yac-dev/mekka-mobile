import React, { useMemo, useContext, useState, useEffect, forwardRef, MutableRefObject } from 'react';
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
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AuthContext, SnackBarContext } from '../../../providers';
import { SnackBar } from '../../../components';
import { CurrentSpaceContext } from '../../../providers';
import { TextInput } from 'react-native-gesture-handler';

type ICommentinput = {
  closeCommentInputBottomSheet: () => void;
};

// ここでref消費しないし、いちいちforwardRefいらないね多分。
export const CommentInput = forwardRef<TextInput, ICommentinput>(
  ({ closeCommentInputBottomSheet }, ref: MutableRefObject<TextInput>) => {
    const { currentSpace } = useContext(CurrentSpaceContext);
    const { auth, setAuth } = useContext(AuthContext);
    const [commentInput, setCommentInput] = useState('');
    const inputAccessoryViewID = 'COMMENT_INPUT';

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
          ref={ref}
          value={commentInput}
          onChangeText={setCommentInput}
          autoCapitalize='none'
        />
        <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={'rgb(50,50,50)'}>
          <View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View></View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => {
                    Keyboard.dismiss();
                    setCommentInput('');
                    closeCommentInputBottomSheet();
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
  }
);

const styles = StyleSheet.create({
  commentIsNotAvailable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
