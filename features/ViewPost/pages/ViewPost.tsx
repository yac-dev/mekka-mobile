import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Header from '../components/Header';
import Content from '../components/Content';
import ReactionOptionsBottomSheet from './ReactionOptionsBottomSheet';
import CommentInputBottomSheet from './CommentInputBottomSheet';
import OtherActionsBottomSheet from './OtherActionsBottomSheet';
import BottomMenu from '../components/BottomMenu';
// import ReactionOptions from '../compoReactionOptions';
import Comments from './Comments';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SnackBar from '../../../components/SnackBar';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ViewPost = (props) => {
  const { currentPost, setCurrentPost, posts, currentIndex } = useContext(TagViewContext);
  const mediaRefs = useRef([]);
  const reactionStatusesBottomSheetRef = useRef(null);
  const commentInputBottomSheetRef = useRef(null);
  const otherActionsBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [isLoadingReactionStatuses, setIsLoadingReactionStatuses] = useState(false);
  // gorhom bottomがfull screen modalでdefaultで開いちゃうとき用の対策。
  const [isReactionsBottomSheetOpen, setIsReactionsBottomSheetOpen] = useState(false);
  const [isCommentsBottomSheetOpen, setIsCommentsBottomSheetOpen] = useState(false);
  const [isOtherOptionsBottomSheetOpen, setIsOtherOptionsBottomSheetOpen] = useState(false);

  const getReactionStatuses = async () => {
    // currentPostがあってこれを使う。
    reactionStatusesBottomSheetRef.current.snapToIndex(0);
    setIsLoadingReactionStatuses(true);
    const result = await backendAPI.get(`/reactionstatuses/post/${currentPost._id}`);
    const { reactionStatuses } = result.data;
    setReactionStatuses(reactionStatuses);
    setIsLoadingReactionStatuses(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          // -50はbottom menuのheight文を引いている。
          {
            flex: 1,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            backgroundColor: 'black',
          },
          // index % 2 === 0 ? { backgroundColor: 'red' } : { backgroundColor: 'blue' },
        ]}
      >
        <Content post={item} ref={(ContentRef) => (mediaRefs.current[item._id] = ContentRef)} />
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
  //       <LoadingSpinner /> */}
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
        setCurrentPost(element.item);
      }
    });
  });
  // 最初の見るやつをcurrentPostに設定したいよね。多分、

  return (
    <ViewPostContext.Provider
      value={{
        getReactionStatuses,
        viewPostStackNavigatorNavigation: props.navigation,
        reactionStatusesBottomSheetRef,
        commentInputBottomSheetRef,
        otherActionsBottomSheetRef,
        textInputRef,
        reactionStatuses,
        setReactionStatuses,
        isLoadingReactionStatuses,
        setIsLoadingReactionStatuses,
        isReactionsBottomSheetOpen,
        setIsReactionsBottomSheetOpen,
        isCommentsBottomSheetOpen,
        setIsCommentsBottomSheetOpen,
        isOtherOptionsBottomSheetOpen,
        setIsOtherOptionsBottomSheetOpen,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          pagingEnabled
          removeClippedSubviews
          keyExtractor={(item, index) => `${item._id}-${index}`}
          decelerationRate={'normal'}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: Dimensions.get('window').height, // Set the height of each item
            offset: Dimensions.get('window').height * index, // Calculate the offset based on the index
            index, // Pass the index
          })}
        />
        <BottomMenu
        // getReactionStatuses={getReactionStatuses}
        // reactionStatusesBottomSheetRef={reactionStatusesBottomSheetRef}
        // commentInputBottomSheetRef={commentInputBottomSheetRef}
        // textInputRef={textInputRef}
        />
        <ReactionOptionsBottomSheet />
        <CommentInputBottomSheet />
        <OtherActionsBottomSheet />
        <LoadingSpinner />
        <SnackBar />
      </GestureHandlerRootView>
    </ViewPostContext.Provider>
  );
};

export default ViewPost;
