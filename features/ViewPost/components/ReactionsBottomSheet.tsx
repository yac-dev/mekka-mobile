import React, { useMemo, useContext, useEffect, forwardRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { AuthContext, CurrentSpaceContext } from '../../../providers';
import { TagScreenContext } from '../../Space';
import { useGetReactionsByPostId } from '../hooks';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type Ref = BottomSheetModal;

/// これ、なんで動かなかったんだろう？？forwardrefをnestするとだめなのかな。。。？
type ReactionsBottomSheetProps = {
  isReactionsBottomSheetOpen: boolean;
  closeReactionsBottomSheet: () => void;
  onReactionsBottomSheetClose: () => void;
  openReactionsBottomSheetToIndex: (index: number) => void;
};

const oneGridWidth = Dimensions.get('window').width / 3;
const iconContainerWidth = oneGridWidth * 0.7;

export const ReactionsBottomSheet = forwardRef<Ref, ReactionsBottomSheetProps>(
  (
    {
      isReactionsBottomSheetOpen,
      closeReactionsBottomSheet,
      onReactionsBottomSheetClose,
      openReactionsBottomSheetToIndex,
    },
    ref
  ) => {
    const { currentSpace } = useContext(CurrentSpaceContext);
    const { currentPost } = useContext(TagScreenContext);
    const { auth, setAuth } = useContext(AuthContext);
    const { apiResult: getReactionsByPostIdResult, requestApi: requestGetReactionsByPostId } =
      useGetReactionsByPostId();

    // const upvoteReaction = async (reactionStatus, index) => {
    //   setLoading(true);
    //   const result = await backendAPI.post(`/userandreactionrelationships/user/${auth._id}/post/${reactionStatus.post}`, {
    //     reactionId: reactionStatus.reaction._id,
    //   });
    //   setLoading(false);
    //   setReactionStatuses((previous) => {
    //     const updating = [...previous];
    //     updating[index].count++;
    //     return updating;
    //   });
    // };

    // console.log('bottom sheet state', isReactionsBottomSheetOpen);
    useEffect(() => {
      if (isReactionsBottomSheetOpen) {
        console.log('heeey');
        // openReactionsBottomSheetToIndex(0);
        // ref.current?.snapToIndex(0);
        // requestGetReactionsByPostId({ postId: currentPost._id });
      }
    }, [isReactionsBottomSheetOpen]);

    // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。
    const renderReactionStatuses = () => {
      const list = getReactionsByPostIdResult.data.reactionStatuses.map((reactionStatus, index) => {
        return (
          <View
            key={index}
            style={{
              // backgroundColor: 'blue',
              // backgroundColor: 'rgb(70, 70, 70)',
              // borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              // marginRight: 10,
              width: oneGridWidth,
              aspectRatio: 1,
              padding: 5,
              // marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                // backgroundColor: 'rgb(70, 70, 70)',
                width: iconContainerWidth,
                aspectRatio: 1,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}
              // onPress={() => upvoteReaction(reactionStatus, index)}
              onPress={() => console.log('react!!!')}
            >
              {reactionStatus.reaction.type === 'emoji' ? (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View
                    style={{
                      width: iconContainerWidth * 0.6,
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 60,
                      }}
                    >
                      {reactionStatus.reaction.emoji}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View
                    style={{
                      width: iconContainerWidth * 0.6,
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <ExpoImage
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={{ uri: reactionStatus.reaction.sticker.url }}
                      contentFit='contain'
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            {reactionStatus.reaction.caption.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgb(70,70,70)',
                  padding: 5,
                  borderRadius: 10,
                  maxWidth: oneGridWidth,
                }}
              >
                <View
                  style={{
                    marginRight: 5,
                    borderRightWidth: 1,
                    borderColor: 'rgb(150,150,150)',
                    paddingLeft: 3,
                    paddingRight: 3,
                    flex: 9,
                  }}
                >
                  <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
                    {reactionStatus.reaction.caption}
                  </Text>
                </View>
                <View style={{ paddingLeft: 3, paddingRight: 3, flex: 1 }}>
                  <Text style={{ color: 'white' }}>{reactionStatus.count}</Text>
                </View>
              </View>
            ) : (
              <View style={{ backgroundColor: 'rgb(70,70,70)', padding: 5, borderRadius: 10 }}>
                <Text style={{ color: 'white' }}>{reactionStatus.count}</Text>
              </View>
            )}
          </View>
        );
      });

      return (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: 'white',
              marginBottom: 10,
              flexWrap: 'wrap',
            }}
          >
            {list}
          </View>
        </ScrollView>
      );
    };

    console.log('reactions bottom ', isReactionsBottomSheetOpen);
    if (isReactionsBottomSheetOpen) {
      return (
        <AppBottomSheet.Gorhom
          ref={ref}
          snapPoints={['60%']}
          title='How do you feel?'
          onCloseButtonClose={closeReactionsBottomSheet}
          onClose={onReactionsBottomSheetClose}
        >
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            {/* {!currentSpace.isReactionAvailable && (
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
                  Reactions are not allowed in this space.
                </Text>
              )} */}
            {getReactionsByPostIdResult.status === 'loading' ? <ActivityIndicator /> : null}
            {getReactionsByPostIdResult.status === 'success' ? renderReactionStatuses() : null}
          </View>
        </AppBottomSheet.Gorhom>
      );
    } else {
      return null;
    }
  }
);
