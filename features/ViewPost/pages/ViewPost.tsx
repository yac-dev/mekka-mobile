import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Header from '../components/Header';
import Content from '../components/Content';
import ReactionOptionsBottomSheet from './ReactionOptionsBottomSheet';
import CommentInputBottomSheet from './CommentInputBottomSheet';
import BottomMenu from '../components/BottomMenu';
// import ReactionOptions from '../compoReactionOptions';
import Comments from './Comments';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SnackBar from '../../../components/SnackBar';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import FastImage from 'react-native-fast-image';

const ViewPost = (props) => {
  const { currentPost, setCurrentPost, posts, currentIndex } = useContext(TagViewContext);
  const mediaRefs = useRef([]);
  const reactionStatusesBottomSheetRef = useRef(null);
  const commentInputBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [isLoadingReactionStatuses, setIsLoadingReactionStatuses] = useState(false);
  // const [post, setPost] = useState(null);
  // const [isPostFetched, setIsPostFetched] = useState(false);
  // const [reactionStatuses, setReactionStatuses] = useState([]);
  // const [areReactionStatusesFetched, setAreReactionStatusesFetched] = useState(false);
  // const [comments, setComments] = useState([]);
  // const [areCommentsFetched, setAreCommentsFetched] = useState(false);
  // const reactionOptionsBottomSheetRef = useRef(null);
  // const commentInputBottomSheetRef = useRef(null);
  // const textInputRef = useRef(null);

  // const getPost = async () => {
  //   const result = await backendAPI.get(`/posts/${props.route.params.post._id}`);
  //   const { post } = result.data;
  //   setPost(post);
  //   setIsPostFetched(true);
  // };

  // const getReactionStatuses = async () => {
  //   const result = await backendAPI.get(`/reactionstatuses/post/${props.route?.params?.post._id}`);
  //   const { reactionStatuses } = result.data;
  //   setReactionStatuses(reactionStatuses);
  //   setAreReactionStatusesFetched(true);
  // };

  // const getComments = async () => {
  //   const result = await backendAPI.get(`/comments/post/${props.route?.params?.post._id}`);
  //   const { comments } = result.data;
  //   setComments(comments);
  //   setAreCommentsFetched(true);
  // };

  // useEffect(() => {}, []);

  // useEffect(() => {
  //   getPost();
  //   getReactionStatuses();
  //   getComments();
  // }, []);

  // if (viewingContent.type === 'video') {
  //   return (
  //     <View style={{ paddingTop: 10, paddingBottom: 10 }}>
  //       <Video source={{ uri: viewingContent.data }} style={{ width: '100%' }} />
  //       <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>{renderContentOptions()}</View>
  //     </View>
  //   );
  // } else if (viewingContent.type === 'photo') {
  //   return (
  //     <View style={{}}>
  //       <FastImage
  //         source={{ uri: viewingContent.data }}
  //         style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
  //         resizeMode='cover'
  //       />
  //       <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>{renderContentOptions()}</View>
  //     </View>
  //   );

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
  console.log('currentpost', currentPost);

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
        textInputRef,
        reactionStatuses,
        setReactionStatuses,
        isLoadingReactionStatuses,
        setIsLoadingReactionStatuses,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          pagingEnabled
          keyExtractor={(item, index) => `${item._id}-${index}`}
          decelerationRate={'normal'}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
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
        <CommentInputBottomSheet
        // commentInputBottomSheetRef={commentInputBottomSheetRef} textInputRef={textInputRef}
        />
        <ReactionOptionsBottomSheet
        // reactionStatusesBottomSheetRef={reactionStatusesBottomSheetRef}
        // reactionStatuses={reactionStatuses}
        // setReactionStatuses={setReactionStatuses}
        // isLoadingReactionStatuses={isLoadingReactionStatuses}
        />
        <LoadingSpinner />
        <SnackBar />
      </GestureHandlerRootView>
    </ViewPostContext.Provider>
  );
};

export default ViewPost;
