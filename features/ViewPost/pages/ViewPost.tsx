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
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { TagRootContext } from '../../../contexts/TagRootContext';
import { TagScreenContext } from '../../Space';
import { PostType } from '../../../types';
import { CarouselContents } from '../components/CarouselContents';
import { ViewPostMenu } from '../components';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { useBottomSheet } from '../hooks';
import { ReactionsBottomSheet } from '../components/ReactionsBottomSheet';
import { Reactions } from '../components/Reactions';

const ViewPost = (props) => {
  const {
    getPostsApiResult,
    getPostsByTagIdAndRegionResult,
    setCurrentPost,
    viewPostsType,
    currentPost,
    currentPostIndex,
    onCurrentPostIndexChange,
  } = useContext(TagScreenContext);
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

  // const { currentPost, setCurrentPost, posts, currentIndex } = useContext(TagViewContext);
  // const { viewPostsType } = useContext(SpaceRootContext);
  // const { currentPost, setCurrentPost, posts, currentIndex, mapPosts } = useContext(TagRootContext);
  const mediaRefs = useRef([]);

  const textInputRef = useRef(null);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [isLoadingReactionStatuses, setIsLoadingReactionStatuses] = useState(false);
  const [isOtherOptionsBottomSheetOpen, setIsOtherOptionsBottomSheetOpen] = useState(false);

  const onReactionsPress = () => {
    openReactionsBottomSheetToIndex(0);
  };

  // const getReactionStatuses = async () => {
  //   // currentPostがあってこれを使う。
  //   reactionStatusesBottomSheetRef.current.snapToIndex(0);
  //   setIsLoadingReactionStatuses(true);
  //   const result = await backendAPI.get(`/reactionstatuses/post/${currentPost._id}`);
  //   const { reactionStatuses } = result.data;
  //   setReactionStatuses(reactionStatuses);
  //   setIsLoadingReactionStatuses(false);
  // };

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
        {/* <Content post={item} ref={(ContentRef) => (mediaRefs.current[item._id] = ContentRef)} /> */}
      </View>
    );
  };

  // return (
  //   <ViewPostContext.Provider
  //     value={
  //       {
  //         // post,
  //         // setPost,
  //         // isPostFetched,
  //         // setIsPostFetched,
  //         // reactionStatuses,
  //         // setReactionStatuses,
  //         // areReactionStatusesFetched,
  //         // comments,
  //         // setComments,
  //         // areCommentsFetched,
  //         // navigation: props.navigation,
  //         // reactionOptionsBottomSheetRef,
  //         // commentInputBottomSheetRef,
  //         // textInputRef,
  //       }
  //     }
  //   >
  //     <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
  //       {/* <Content />
  //       <Header />
  //       <BottomMenu />
  //       <ReactionOptionsBottomSheet />
  //       <CommentInputBottomSheet />
  //       <View>
  //         <Text style={{ color: 'red' }}>{currentPost._id}</Text>
  //       </View>
  //     </GestureHandlerRootView>
  //   </ViewPostContext.Provider>
  // );
  // console.log('currentpost', currentPost);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      if (element.isViewable) {
        onCurrentPostIndexChange(element.item);
      }
    });
  });

  return (
    // <ViewPostContext.Provider
    //   value={{
    //     getReactionStatuses,
    //     viewPostStackNavigatorNavigation: props.navigation,
    //     reactionStatusesBottomSheetRef,
    //     commentInputBottomSheetRef,
    //     otherActionsBottomSheetRef,
    //     textInputRef,
    //     reactionStatuses,
    //     setReactionStatuses,
    //     isLoadingReactionStatuses,
    //     setIsLoadingReactionStatuses,
    //     isReactionsBottomSheetOpen,
    //     setIsReactionsBottomSheetOpen,
    //     isCommentsBottomSheetOpen,
    //     setIsCommentsBottomSheetOpen,
    //     isOtherOptionsBottomSheetOpen,
    //     setIsOtherOptionsBottomSheetOpen,
    //   }}
    // >
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
      <ViewPostMenu onReactionPress={handleReactionBottomSheetVisibility} />
      <AppBottomSheet.Gorhom
        ref={reactionsBottomSheetRef}
        snapPoints={['60%']}
        title='How do you feel?'
        onCloseButtonClose={closeReactionsBottomSheet}
        onClose={onReactionsBottomSheetClose}
      >
        <Reactions isReactionsBottomSheetOpen={isReactionsBottomSheetOpen} />
      </AppBottomSheet.Gorhom>

      {/* <ReactionsBottomSheet
        ref={reactionsBottomSheetRef}
        isReactionsBottomSheetOpen={isReactionsBottomSheetOpen}
        openReactionsBottomSheetToIndex={openReactionsBottomSheetToIndex}
        closeReactionsBottomSheet={closeReactionsBottomSheet}
        onReactionsBottomSheetClose={onReactionsBottomSheetClose}
      /> */}
      {/* <ReactionOptionsBottomSheet />
        <CommentInputBottomSheet />
        <OtherActionsBottomSheet /> */}
    </GestureHandlerRootView>
    // </ViewPostContext.Provider>
  );
};

export default ViewPost;
