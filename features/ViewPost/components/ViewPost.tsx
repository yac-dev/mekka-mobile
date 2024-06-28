import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Header from '../components/Header';
import Content from '../components/Content';
import { CommentInput } from '../components/CommentInput';
import BottomMenu from '../components/BottomMenu';
// import ReactionOptions from '../compoReactionOptions';
import { Comments } from '../components';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import { Image as ExpoImage } from 'expo-image';
import { TagScreenContext } from '../../Space';
import { PostType } from '../../../types';
import { CarouselContents } from '../components/CarouselContents';
import { ViewPostMenu } from '../components';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { useBottomSheet, useModal } from '../hooks';
import { ReactionsBottomSheet } from '../components/ReactionsBottomSheet';
import { Reactions } from '../components/Reactions';
import { SpaceRootContext } from '../../Space/providers/SpaceRootProvider';
import { useGetCommentsByPostIdState } from '../../../api/hooks/useGetCommentsByPostIdState';
import { useGetReactionsByPostId } from '../hooks';
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { ViewPostStackNavigatorProps } from '../../../navigations/ViewPostStackNavigator';
import { StatusBar } from 'react-native';

type IViewPost = {
  posts: PostType[];
  currentPostIndex: number;
  currentPost: PostType;
  onCurrentPostChange: (post: PostType) => void;
};

export const ViewPost: React.FC<IViewPost> = ({ posts, currentPost, onCurrentPostChange, currentPostIndex }) => {
  const viewStackNavigation = useNavigation<ViewPostStackNavigatorProps>();
  const {
    getPostsApiResult,
    getPostsByTagIdAndRegionResult,
    setCurrentPost,
    // currentPost,
    onCurrentPostIndexChange,
    // viewPostsType,
  } = useContext(TagScreenContext);
  const viewPostFlashMessageRef = useRef<FlashMessage>();

  const { apiResult: getCommentsResult, requestApi: requestGetCommentsByPostId } = useGetCommentsByPostIdState();
  const { apiResult: getReactionsByPostIdResult, requestApi: requestGetReactionsByPostId } = useGetReactionsByPostId();

  const { viewPostsType } = useContext(SpaceRootContext);

  const {
    isReactionsBottomSheetOpen,
    isCommentsBottomSheetOpen,
    reactionsBottomSheetRef,
    commentsBottomSheetRef,
    userInfoBottomSheetRef,
    othersBottomSheetRef,
    openReactionsBottomSheetToIndex,
    handleReactionBottomSheetVisibility,
    openCommentsBottomSheetToIndex,
    openUserInfoBottomSheetRefBottomSheetToIndex,
    openOthersBottomSheetToIndex,
    closeReactionsBottomSheet,
    onReactionsBottomSheetClose,
    closeCommentsBottomSheet,
    closeUserInfoBottomSheetRefBottomSheet,
    closeOthersBottomSheet,
    commentInputBottomSheetRef,
    openCommentInputBottomSheet,
    closeCommentInputBottomSheet,
    commentInputRef,
  } = useBottomSheet();

  const flashMessageRef = useRef<FlashMessage>();

  const { isCommentsModalVisible, handleCommentsModalVisibility } = useModal();

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return (
      <View
        style={{
          flex: 1,
          // height: Dimensions.get('window').height,
          // width: Dimensions.get('window').width,
          backgroundColor: 'black',
        }}
      >
        <CarouselContents post={item} />
      </View>
    );
  };
  // bottom sheet開くと同時にgetCommentsをやればいいかね。。。

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      if (element.isViewable) {
        onCurrentPostChange(element.item);
        // onCurrentPostIndexChange(element.item);
        // setCurrentPost(element.item);
      }
    });
  });

  // handle reactionで開けようか。
  // これは絶対必要なものになる。
  const handleReactionPress = () => {
    requestGetReactionsByPostId({ postId: currentPost._id });
    openReactionsBottomSheetToIndex();
  };

  const handleCommentsPress = () => {
    requestGetCommentsByPostId({ postId: currentPost._id });
    openCommentsBottomSheetToIndex();
  };

  const handleCommentInputPress = () => {
    openCommentInputBottomSheet(0);
  };

  const handleHorizontalDotsPress = () => {
    viewStackNavigation.navigate('ReportPost');
  };

  // console.log('post', JSON.stringify(posts[currentPostIndex], null, 2));

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar hidden />
      <FlatList
        data={posts}
        renderItem={renderItem}
        pagingEnabled
        removeClippedSubviews
        keyExtractor={(item, index) => `${item._id}-${index}`}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        initialScrollIndex={currentPostIndex}
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').height, // Set the height of each item
          offset: Dimensions.get('window').height * index, // Calculate the offset based on the index
          index, // Pass the index
        })}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 50, left: 20 }}>
        <ExpoImage source={currentPost.createdBy.avatar} style={{ width: 30, height: 30, marginRight: 15 }} />
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{currentPost.createdBy.name}</Text>
      </View>

      <ViewPostMenu
        post={currentPost}
        onReactionPress={handleReactionPress}
        onCommentsPress={handleCommentsPress}
        onAvatarPress={openUserInfoBottomSheetRefBottomSheetToIndex}
        onHorizontalDotsPress={handleHorizontalDotsPress}
      />
      <AppBottomSheet.Gorhom
        ref={reactionsBottomSheetRef}
        snapPoints={['60%']}
        title='How do you feel?'
        onCloseButtonClose={closeReactionsBottomSheet}
        onClose={onReactionsBottomSheetClose}
      >
        <Reactions getReactionsByPostIdResult={getReactionsByPostIdResult} />
      </AppBottomSheet.Gorhom>

      <AppBottomSheet.Gorhom
        ref={commentsBottomSheetRef}
        snapPoints={['80%']}
        title='Comments'
        onCloseButtonClose={closeCommentsBottomSheet}
      >
        <Comments getCommentsResult={getCommentsResult} handleCommentInputPress={handleCommentInputPress} />
      </AppBottomSheet.Gorhom>
      <AppBottomSheet.Gorhom
        ref={commentInputBottomSheetRef}
        snapPoints={['40%']}
        title='What are your thoughts?'
        onCloseButtonClose={closeCommentInputBottomSheet}
      >
        <CommentInput
          refs={{ commentInputRef: commentInputRef, flashMessageRef: flashMessageRef }}
          closeCommentInputBottomSheet={closeCommentInputBottomSheet}
        />
      </AppBottomSheet.Gorhom>
      <FlashMessage ref={flashMessageRef} position={'top'} />
    </GestureHandlerRootView>
  );
};
