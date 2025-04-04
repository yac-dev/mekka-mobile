import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { ReactionType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import { incrementReaction } from '../../../query/mutations';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetReactionsByPostIdOutputType, IncrementReactionInputType } from '../../../query/types';
import { getReactionsByPostId } from '../../../query/queries';
import { queryKeys } from '../../../query/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';

const itemWidth = Dimensions.get('window').width / 3;
const reactionContainerWidth = itemWidth * 0.7;

type IReactionOptionProps = {
  reaction: ReactionType;
  postId: string;
  count: number;
  userId: string;
  reactedByCurrentUser: boolean;
};

// 次は何から始めるんだっけ？？reaction関連の機能の修正か。次に、写真のfetchを修正する感じかね。
// ここはredisの導入も絡むから一般公開後の作業になるかな。。。redi入れるとなるとdocker環境の方も変わるしね。。。あと、awsの本番運用を始めたいし。awsだtp勉強用だっつって会社の経費にしてくれそうだしw
// ただ、今の状態はキープで一旦いいとは思う。

// ok。今集中すべきはこのreactionのapiフェッチとデザインをまず修正することだねまずは。
// reaction voteした時のanimationをやってみたいよね。midiumみたいなさ。ただ、これvote数に応じてdocumentを作るのでいいかな。。。？それとも誰が何回的な感じでやるほうがいいのか。。。？まあdocument作る方向性でいいかとりま。
// あと、皆んなのreactionもみせる的なことは今は止めようと思う。

export const ReactionOption: React.FC<IReactionOptionProps> = ({
  reaction,
  postId,
  count,
  userId,
  reactedByCurrentUser,
}) => {
  // ここdebounceでincrementするのをやりたいね。
  const queryClient = useQueryClient();
  const [currentCount, setCurrentCount] = useState<number>(count);
  const [isReactedByCurrentUser, setIsReactedByCurrentUser] = useState<boolean>(reactedByCurrentUser);

  const [incrementedCountByCurrentUser, setIncrementedCountByCurrentUser] = useState<number>(0);
  const [auth] = useRecoilState(authAtom);
  const { mutate: incrementReactionMutate } = useMutation({
    mutationFn: (input: IncrementReactionInputType) => incrementReaction(input),
    onMutate: () => {
      // そもそも、ここってどういうデータ構造だっけ。。。？
      queryClient.setQueryData([queryKeys.reactions, postId], (previous: GetReactionsByPostIdOutputType) => {
        const updatedReactions = previous.reactions.map((reactionObject) => {
          if (reactionObject._id === reaction._id) {
            return { ...reactionObject, count: reactionObject.count + 1 };
          }
          return reactionObject;
        });
        return {
          reactions: updatedReactions,
        };
      });
    },
  });
  // currentUserによるincrement自体も引っ張ってきたいよな。。。
  const scaleValue = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onReactionOptionPress = () => {
    console.log('動いているのかい？？');
    incrementReactionMutate({ postId: postId, reactionId: reaction._id, userId: auth._id });
    setIsReactedByCurrentUser(true);
    setCurrentCount((previousCurrentCount) => previousCurrentCount + 1);
    startAnimation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Animated.View
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
        transform: [{ scale: scaleValue }],
        // marginBottom: 10,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          // backgroundColor: 'rgb(70, 70, 70)',
          width: reactionContainerWidth,
          aspectRatio: 1,
          borderRadius: reactionContainerWidth / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: reactedByCurrentUser ? 'rgb(32, 178, 29)' : 'rgb(50,50,50)',
          marginBottom: 4,
        }}
        onPress={() => {
          // incrementReactionMutate({ postId: postId, reactionId: reaction._id, userId: auth._id });
          onReactionOptionPress();
        }}
        // disabled={reactedByCurrentUser}
      >
        {reaction.type === 'emoji' ? (
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
                {reaction.emoji}
              </Text>
            </View>
            {currentCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  backgroundColor: reactedByCurrentUser ? 'rgb(32, 178, 29)' : 'rgb(50,50,50)',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{currentCount}</Text>
              </View>
            )}
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
                source={{ uri: reaction.sticker.url }}
                contentFit='contain'
              />
            </View>
            {currentCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  backgroundColor: reactedByCurrentUser ? 'rgb(32, 178, 29)' : 'rgb(50,50,50)',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{currentCount}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>

      {reaction.caption?.length ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'rgb(70,70,70)',
            maxWidth: itemWidth,
          }}
        >
          <Text numberOfLines={1} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
            {reaction.caption}
          </Text>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
      {/* <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 45,
            height: 45,
            backgroundColor: 'green',
            borderRadius: 50,
            padding: 4,
          }}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>+🎉</Text>
        </View>
      </Animated.View> */}
    </Animated.View>
  );
};
