import React, { useMemo, useContext, useEffect, forwardRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { AuthContext, CurrentSpaceContext } from '../../../providers';
import { TagScreenContext } from '../../Space';
import { useGetReactionsByPostId } from '../hooks';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Colors } from '../../../themes';
import { ApiResultType } from '../../../types';
import { GetReactionsByPostIdOutputType } from '../types';

type Ref = BottomSheetModal;

type IReactions = {
  getReactionsByPostIdResult: ApiResultType<GetReactionsByPostIdOutputType>;
};

const itemWidth = Dimensions.get('window').width / 3;
const reactionContainerWidth = itemWidth * 0.7;

export const Reactions: React.FC<IReactions> = ({ getReactionsByPostIdResult }) => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const { currentPost } = useContext(TagScreenContext);
  const { auth, setAuth } = useContext(AuthContext);
  // const { apiResult: getReactionsByPostIdResult, requestApi: requestGetReactionsByPostId } = useGetReactionsByPostId();

  // console.log(reactionContainerWidth * 0.6);

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
  // useEffect(() => {
  //   requestGetReactionsByPostId({ postId: currentPost._id });
  // }, []);

  // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。

  const renderReactionStatuses = () => {
    const list = getReactionsByPostIdResult.data?.reactionStatuses.map((reactionStatus, index) => {
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
            width: itemWidth,
            aspectRatio: 1,
            padding: 5,
            // marginBottom: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              // backgroundColor: 'rgb(70, 70, 70)',
              width: reactionContainerWidth,
              aspectRatio: 1,
              borderRadius: reactionContainerWidth / 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              marginBottom: 4,
            }}
            // onPress={() => upvoteReaction(reactionStatus, index)}
            onPress={() => console.log('react!!!')}
          >
            {reactionStatus.reaction.type === 'emoji' ? (
              <View>
                <View
                  style={{
                    width: reactionContainerWidth * 0.6,
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: (reactionContainerWidth / 2) * 1.15,
                    }}
                  >
                    {reactionStatus.reaction.emoji}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    backgroundColor: 'rgb(50,50,50)',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>{reactionStatus.count}</Text>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    width: reactionContainerWidth * 0.6,
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
                <View
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    backgroundColor: 'rgb(50,50,50)',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>{reactionStatus.count}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {reactionStatus.reaction.caption.length ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'rgb(70,70,70)',
                maxWidth: itemWidth,
              }}
            >
              <Text numberOfLines={1} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                {reactionStatus.reaction.caption}
              </Text>
            </View>
          ) : (
            <View>
              <Text></Text>
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

  if (getReactionsByPostIdResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!currentSpace.isReactionAvailable ? (
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
          Reactions are not allowed in this space.
        </Text>
      ) : (
        renderReactionStatuses()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
