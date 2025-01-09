import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
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

const itemWidth = Dimensions.get('window').width / 3;
const reactionContainerWidth = itemWidth * 0.7;

type IReactionOptionProps = {
  reaction: ReactionType;
  postId: string;
  count: number;
};

// 次は何から始めるんだっけ？？reaction関連の機能の修正か。次に、写真のfetchを修正する感じかね。
// ここはredisの導入も絡むから一般公開後の作業になるかな。。。redi入れるとなるとdocker環境の方も変わるしね。。。あと、awsの本番運用を始めたいし。awsだtp勉強用だっつって会社の経費にしてくれそうだしw
// ただ、今の状態はキープで一旦いいとは思う。

// ok。今集中すべきはこのreactionのapiフェッチとデザインをまず修正することだねまずは。
// reaction voteした時のanimationをやってみたいよね。midiumみたいなさ。ただ、これvote数に応じてdocumentを作るのでいいかな。。。？それとも誰が何回的な感じでやるほうがいいのか。。。？まあdocument作る方向性でいいかとりま。
// あと、皆んなのreactionもみせる的なことは今は止めようと思う。
export const ReactionOption: React.FC<IReactionOptionProps> = ({ reaction, postId, count }) => {
  // ここdebounceでincrementするのをやりたいね。
  const queryClient = useQueryClient();
  const [currentCount, setCurrentCount] = useState<number>(count);
  const [incrementedCountByCurrentUser, setIncrementedCountByCurrentUser] = useState<number>(0);
  const [auth] = useRecoilState(authAtom);
  const { mutate: incrementReactionMutate } = useMutation({
    mutationFn: (input: IncrementReactionInputType) => incrementReaction(input),
    onMutate: () => {
      // そもそも、ここってどういうデータ構造だっけ。。。？
      queryClient.setQueryData([queryKeys.reactionsByPostId, postId], (previous: GetReactionsByPostIdOutputType) => {
        const updatedReactions = previous.reactions.map((reactionObject) => {
          if (reactionObject._id === reaction._id) {
            return { ...reactionObject, count: reactionObject.count + 1 };
          }
          return reactionObject;
        });
        return updatedReactions;
      });
    },
  });

  // currentUserによるincrement自体も引っ張ってきたいよな。。。

  const onReactionOptionPress = () => {
    // console.log('obj', { postId: postId, reactionId: reaction._id });
    incrementReactionMutate({ postId: postId, reactionId: reaction._id, userId: auth._id });
    setCurrentCount((previousCurrentCount) => previousCurrentCount + 1);
    // setIncrementedCountByCurrentUser(
    //   (previousIncrementedCountByCurrentUser) => previousIncrementedCountByCurrentUser + 1
    // );
  };

  return (
    <View
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
        activeOpacity={0.7}
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
        onPress={() => {
          // incrementReactionMutate({ postId: postId, reactionId: reaction._id, userId: auth._id });
          onReactionOptionPress();
        }}
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
                  backgroundColor: 'rgb(50,50,50)',
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
                  backgroundColor: 'rgb(50,50,50)',
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
    </View>
  );
};
