import React, { useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
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

type ICommentsPage = NativeStackScreenProps<ViewPostStackNavigatorParams, 'Comments'>;

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

export const CommentsPage: React.FC<ICommentsPage> = ({ route }) => {
  const { postId } = route.params;
  const viewPostStackNavigation = useNavigation<ViewPostStackNavigatorProps>();

  const { data, status } = useQuery({
    queryKey: [queryKeys.commentsByPostId, postId],
    queryFn: () => getCommentsByPostId({ postId }),
  });

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
                <ExpoImage
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                  source={{ uri: item.createdBy.avatar }}
                  contentFit='contain'
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                    {item.createdBy.name}
                  </Text>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 12, fontWeight: 'bold' }}>
                    {timeSince(new Date(item.createdAt))}
                  </Text>
                </View>
              </View>
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
            <Text style={{ color: 'white', fontSize: 17 }}>{item.content}</Text>
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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
      behavior='padding'
      keyboardVerticalOffset={65}
    >
      <FlashList
        data={data?.comments}
        renderItem={renderComment}
        keyExtractor={(_, index) => `${index}`}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 150 }}>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>No comments yet...</Text>
          </View>
        }
        estimatedItemSize={100}
      />
      <CommentInput currentPost={postId} />
      {/* <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: 'rgb(100,100,100)', backgroundColor: 'black' }}>
        <TextInput
          // multiline={true}
          placeholder={'Type here...'}
          placeholderTextColor={'rgb(170,170,170)'}
          inputAccessoryViewID={inputAccessoryViewID}
          style={{
            padding: 15,
            // height: 40,
            width: '100%',
            color: 'white',
            fontSize: 17,
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 10,
          }}
          // ref={refs.commentInputRef}
          value={'comment'}
          // onChangeText={setCommentInput}
          autoCapitalize='none'
        />
      </View> */}
    </KeyboardAvoidingView>
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
});
