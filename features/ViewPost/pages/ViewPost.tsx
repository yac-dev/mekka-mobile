import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CommentInput } from '../components/CommentInput';
import { Comments } from '../components';
import { Image as ExpoImage } from 'expo-image';
import { PostType } from '../../../types';
import { CarouselContents } from '../components/CarouselContents';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { useBottomSheet, useModal } from '../hooks';
import { Reactions } from '../components/Reactions';
import { useGetCommentsByPostIdState } from '../../../api/hooks/useGetCommentsByPostIdState';
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { getReactionsByPostIdResultAtomFamily } from '../../../api/atoms';
import { useRecoilState } from 'recoil';
import { useGetReactionsByPostIdResult } from '../../../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewPostStackNavigatorParams, ViewPostStackNavigatorProps } from '../navigations/ViewPostStackNavigator';
import { SpaceStackNavigatorProps } from '../../Space/navigations/SpaceStackNavigator';
import { FlashList } from '@shopify/flash-list';
import { currentSpaceAtom } from '../../../recoil';
import { ViewPostStackNavigator } from '../navigations/ViewPostStackNavigator';
import { currentUserAtom } from '../../../recoil';
import { PostDetailBottomSheet } from '../components';

// type IViewPost = {
//   posts: PostType[];
//   currentPostIndex: number;
//   currentPost: PostType;
//   onCurrentPostChange: (post: PostType) => void;
// };

type IViewPost = NativeStackScreenProps<ViewPostStackNavigatorParams, 'ViewPost'>;

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
  return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? 's' : ''} ago`;
}

const avatarWidth = 42;

export const ViewPost: React.FC<IViewPost> = ({ route }) => {
  const { posts, index } = route.params;
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const spaceStackNavigator = useNavigation<SpaceStackNavigatorProps>();
  const viewStackNavigation = useNavigation<ViewPostStackNavigatorProps>();

  const { apiResult: getCommentsResult, requestApi: requestGetCommentsByPostId } = useGetCommentsByPostIdState();

  const [currentPost, setCurrentPost] = useState<PostType>(posts[index]);
  const [_, setCurrentUser] = useRecoilState(currentUserAtom);
  const { requestGetReactionsBySpaceId } = useGetReactionsByPostIdResult(currentPost._id);
  const [getReactionsByPostIdResult] = useRecoilState(getReactionsByPostIdResultAtomFamily(currentPost._id));

  const {
    isReactionsBottomSheetOpen,
    isCommentsBottomSheetOpen,
    infoBottomSheetRef,
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
    openInfoBottomBottomSheet,
    postDetailBottomSheetRef,
    openPostDetailBottomSheet,
    closePostDetailBottomSheet,
  } = useBottomSheet();

  const flashMessageRef = useRef<FlashMessage>();

  const { isCommentsModalVisible, handleCommentsModalVisibility } = useModal();

  useEffect(() => {
    viewStackNavigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', width: 200, paddingTop: 10 }}
          onPress={() => {
            // setCurrentUser(currentPost.createdBy);
            viewStackNavigation.navigate('UserStackNavigator', { userId: currentPost.createdBy._id });
          }}
          activeOpacity={0.7}
        >
          <View
            style={{
              backgroundColor: 'rgb(70,70,70)',
              justifyContent: 'center',
              alignItems: 'center',
              width: avatarWidth,
              height: avatarWidth,
              borderRadius: avatarWidth / 2,
              marginRight: 15,
            }}
          >
            {currentPost.createdBy.avatar ? (
              <ExpoImage source={currentPost.createdBy.avatar} style={{ width: 30, height: 30, marginRight: 15 }} />
            ) : (
              <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                {currentPost.createdBy.name.slice(0, 2).toUpperCase()}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{ flexDirection: 'column' }}
            activeOpacity={0.7}
            onPress={() => {
              openPostDetailBottomSheet();
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 5 }}>
                {currentPost.createdBy.name}
              </Text>
              <Text style={{ color: 'rgb(200,200,200)', fontSize: 11, fontWeight: 'bold' }}>
                {timeSince(new Date(currentPost.createdAt))}
              </Text>
            </View>
            {currentPost.caption.length ? (
              <View>
                <Text numberOfLines={1} style={{ color: 'white', fontSize: 14 }}>
                  {currentPost.caption}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </TouchableOpacity>
      ),
    });
  }, [currentPost]);

  // useEffect(() => {
  //   const date = new Date(currentPost.createdAt);
  //   const formattedDate = date.toLocaleDateString('en-US', {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   });
  //   viewStackNavigation.setOptions({
  //     title: formattedDate,
  //   });
  // }, [currentPost]);

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
        setCurrentPost(element.item);
        // onCurrentPostIndexChange(element.item);
        // setCurrentPost(element.item);
      }
    });
  });

  // handle reactionで開けようか。
  // これは絶対必要なものになる。
  const handleInfoBottomSheet = () => {
    openInfoBottomBottomSheet();
  };

  const handleReactionPress = () => {
    // requestGetReactionsBySpaceId({ postId: currentPost._id, spaceId: currentSpace._id });
    // openReactionsBottomSheetToIndex();
    viewStackNavigation.navigate('HowDoYouFeel', { postId: currentPost._id });
  };

  const handleCommentsPress = () => {
    // requestGetCommentsByPostId({ postId: currentPost._id });
    // openCommentsBottomSheetToIndex();
    viewStackNavigation.navigate({
      name: 'CommentsStackNavigator',
      params: {
        screen: 'Comments',
        params: {
          postId: currentPost._id,
        },
      },
    });
  };

  const handleCommentInputPress = () => {
    // openCommentInputBottomSheet(0);
    // viewStackNavigation.navigate('Comments');
  };

  const handleHorizontalDotsPress = () => {
    spaceStackNavigator.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ReportPost',
      },
    });
  };

  console.log('currentPost', JSON.stringify(currentPost, null, 2));

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar hidden />
      <FlashList
        data={posts}
        renderItem={renderItem}
        pagingEnabled
        removeClippedSubviews
        keyExtractor={(item, index) => `${item._id}-${index}`}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        initialScrollIndex={index}
        estimatedItemSize={Dimensions.get('window').height}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 25, right: 10 }}>
        {currentSpace.isCommentAvailable && (
          <View>
            <AppButton.Icon
              onButtonPress={handleCommentsPress}
              customStyle={{
                width: 40,
                height: 40,
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                marginRight: 14,
                ...Platform.select({
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.6,
                    shadowRadius: 6,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
              }}
              hasShadow={false}
            >
              <VectorIcon.II name='chatbubbles-sharp' size={20} style={{ color: 'white' }} />
            </AppButton.Icon>
            {currentPost.totalComments >= 1 && (
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  position: 'absolute',
                  top: -8,
                  right: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{currentPost.totalComments}</Text>
              </View>
            )}
          </View>
        )}

        {currentSpace.isReactionAvailable && (
          <View>
            <AppButton.Icon
              onButtonPress={handleReactionPress}
              customStyle={{
                width: 40,
                height: 40,
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                ...Platform.select({
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.6,
                    shadowRadius: 6,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
              }}
              hasShadow={false}
            >
              {currentSpace.reactions[0].type === 'emoji' ? (
                <Text style={{ fontSize: 26 }}>{currentSpace.reactions[0].emoji}</Text>
              ) : (
                <ExpoImage source={{ uri: currentSpace.reactions[0].sticker.url }} style={{ width: 26, height: 26 }} />
              )}
            </AppButton.Icon>
            {currentPost.totalReactions >= 1 && (
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{currentPost.totalReactions}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <AppButton.Icon
        onButtonPress={handleHorizontalDotsPress}
        customStyle={{
          width: 40,
          height: 40,
          backgroundColor: 'rgb(50,50,50)',
          borderRadius: 100,
          position: 'absolute',
          left: 10,
          bottom: 25,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.6,
              shadowRadius: 6,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
        hasShadow={false}
      >
        <VectorIcon.MCI name='dots-horizontal' size={20} style={{ color: 'white' }} />
      </AppButton.Icon>
      {/* <AppBottomSheet.Gorhom
        ref={reactionsBottomSheetRef}
        snapPoints={['60%']}
        header={<Text style={styles.text}>How do you feel?</Text>}
        onCloseButtonClose={closeReactionsBottomSheet}
        onClose={onReactionsBottomSheetClose}
      >
        <Reactions currentPost={currentPost} />
      </AppBottomSheet.Gorhom> */}

      {/* <AppBottomSheet.Gorhom
        ref={commentsBottomSheetRef}
        snapPoints={['80%']}
        header={<Text style={styles.text}>Comments</Text>}
        onCloseButtonClose={closeCommentsBottomSheet}
      >
        <Comments getCommentsResult={getCommentsResult} handleCommentInputPress={handleCommentInputPress} />
      </AppBottomSheet.Gorhom> */}
      <AppBottomSheet.Gorhom
        ref={postDetailBottomSheetRef}
        snapPoints={['70%']}
        header={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(70,70,70)',
                justifyContent: 'center',
                alignItems: 'center',
                width: avatarWidth,
                height: avatarWidth,
                borderRadius: avatarWidth / 2,
                marginRight: 15,
              }}
              onPress={() => {
                viewStackNavigation.navigate('UserStackNavigator', { userId: currentPost.createdBy._id });
              }}
              activeOpacity={0.7}
            >
              {currentPost.createdBy.avatar ? (
                <ExpoImage source={currentPost.createdBy.avatar} style={{ width: 30, height: 30, marginRight: 15 }} />
              ) : (
                <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                  {currentPost.createdBy.name.slice(0, 2).toUpperCase()}
                </Text>
              )}
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 5 }}>
              {currentPost.createdBy.name}
            </Text>
          </View>
        }
        onCloseButtonClose={closePostDetailBottomSheet}
      >
        <PostDetailBottomSheet currentPost={currentPost} />
      </AppBottomSheet.Gorhom>
      <FlashMessage ref={flashMessageRef} position={'top'} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 40,
    height: 3,
    backgroundColor: Colors.white,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
    // marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
});
