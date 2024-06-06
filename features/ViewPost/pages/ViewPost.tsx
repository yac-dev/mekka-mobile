import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Header from '../components/Header';
import Content from '../components/Content';
import ReactionOptionsBottomSheet from '../components/ReactionsBottomSheet';
import CommentInputBottomSheet from './CommentInputBottomSheet';
import OtherActionsBottomSheet from './OtherActionsBottomSheet';
import BottomMenu from '../components/BottomMenu';
// import ReactionOptions from '../compoReactionOptions';
import Comments from './Comments';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import { Image as ExpoImage } from 'expo-image';
import { TagRootContext } from '../../../contexts/TagRootContext';
import { TagScreenContext } from '../../Space';
import { PostType } from '../../../types';
import { CarouselContents } from '../components/CarouselContents';
import { ViewPostMenu } from '../components';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { useBottomSheet, useModal } from '../hooks';
import { ReactionsBottomSheet } from '../components/ReactionsBottomSheet';
import { Reactions } from '../components/Reactions';
import { SpaceRootContext } from '../../Space/providers/SpaceRootProvider';
import { CommentsModal } from '.';

const ViewPost = () => {
  const {
    getPostsApiResult,
    getPostsByTagIdAndRegionResult,
    setCurrentPost,
    currentPost,
    currentPostIndex,
    onCurrentPostIndexChange,
    // viewPostsType,
  } = useContext(TagScreenContext);

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
  } = useBottomSheet();

  const { isCommentsModalVisible, handleCommentsModalVisibility } = useModal();

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          backgroundColor: 'black',
        }}
      >
        <CarouselContents post={item} />
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      if (element.isViewable) {
        onCurrentPostIndexChange(element.item);
      }
    });
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={viewPostsType === 'grid' ? getPostsApiResult.data?.posts : getPostsByTagIdAndRegionResult.data?.posts}
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
      <ViewPostMenu
        onReactionPress={openReactionsBottomSheetToIndex}
        onCommentsPress={handleCommentsModalVisibility}
        onAvatarPress={openUserInfoBottomSheetRefBottomSheetToIndex}
      />
      <AppBottomSheet.Gorhom
        ref={reactionsBottomSheetRef}
        snapPoints={['60%']}
        title='How do you feel?'
        onCloseButtonClose={closeReactionsBottomSheet}
        onClose={onReactionsBottomSheetClose}
      >
        <Reactions isReactionsBottomSheetOpen={isReactionsBottomSheetOpen} />
      </AppBottomSheet.Gorhom>

      {/* <AppBottomSheet.Gorhom
          ref={commentsBottomSheetRef}
          snapPoints={['80%']}
          title='Settings'
          onCloseButtonClose={closeAuthMenuBottomSheet}
        >
        </AppBottomSheet.Gorhom> */}
      {/* commentのinputをbottom sheetで出す様にする。 */}
    </GestureHandlerRootView>
  );
};

export default ViewPost;
