import React, { useMemo, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput, Keyboard } from 'react-native';
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
  const commentInputBottomSheetRef = useRef<BottomSheetModal>(null);
  const textInputRef = useRef<TextInput>(null);

  const snapPoints = useMemo(() => ['15%', '65%', '100%'], []);

  const { data, status } = useQuery({
    queryKey: [queryKeys.commentsByPostId, postId],
    queryFn: () => getCommentsByPostId({ postId }),
  });

  const handleFocus = () => {
    commentInputBottomSheetRef.current?.snapToIndex(1); // 50% index
  };

  const handleSheetChanges = (index: number) => {
    if (index === 0) {
      // 15% index
      Keyboard.dismiss();
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
                {/* <ExpoImage
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                  source={{ uri: item.createdBy.avatar }}
                  contentFit='contain'
                /> */}
                <View
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
                </View>
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
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>No comments yet...</Text>
          </View>
        }
        estimatedItemSize={100}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      {/* <CommentInput currentPost={postId} /> */}
      {/* <CommentInputBottomSheet header={<Text>Comment</Text>} ref={commentInputBottomSheetRef} snapPoints={snapPoints} /> */}
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
        <View style={{ flex: 1, backgroundColor: 'rgb(30,30,30)', paddingHorizontal: 10, paddingVertical: 10 }}>
          <TextInput
            ref={textInputRef}
            placeholder='What are your thoughts?'
            placeholderTextColor={'rgb(170,170,170)'}
            multiline
            style={{
              color: 'white',
              fontSize: 17,
            }}
            onFocus={handleFocus}
          />
        </View>
      </BottomSheet>
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
