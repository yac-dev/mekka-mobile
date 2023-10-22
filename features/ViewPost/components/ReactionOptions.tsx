import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { GlobalContext } from '../../contexts/GlobalContext';
import { ViewPostContext } from '../Space/contexts/ViewPostContext';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import backendAPI from '../../apis/backend';
import FastImage from 'react-native-fast-image';

type ReactionsProps = {
  route: RouteProp<ParamListBase, string> | undefined;
};

type StickerType = {
  _id: string;
  url: string;
  name: string;
};

type ReactionType = {
  _id: string;
  type: 'emoji' | 'sticker';
  emoji: string | null;
  sticker: StickerType | null;
};

type ReactionStatusType = {
  _id: string;
  post: string;
  reaction: ReactionType;
  count: number;
};

const ReactionOptions = () => {
  const { authData, setLoading } = useContext(GlobalContext);
  const { reactionStatuses, setReactionStatuses, areReactionStatusesFetched } = useContext(ViewPostContext);
  // console.log(JSON.stringify(reactionStatuses, null, 4));

  const upvoteReaction = async (reactionStatus: ReactionStatusType, index: number) => {
    setLoading(true);
    const result = await backendAPI.post(
      `/userandreactionrelationships/user/${authData._id}/post/${reactionStatus.post}`,
      { reactionId: reactionStatus.reaction._id }
    );
    setLoading(false);
    setReactionStatuses((previous) => {
      const updating = [...previous];
      updating[index].count++;
      return updating;
    });
  };

  // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。
  const renderReactionStatuses = () => {
    if (reactionStatuses.length) {
      const list = reactionStatuses.map((reactionStatus, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: 'rgb(70, 70, 70)',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              marginBottom: 10,
            }}
            onPress={() => upvoteReaction(reactionStatus, index)}
          >
            {reactionStatus.reaction.type === 'emoji' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, marginRight: reactionStatus.count ? 10 : 0 }}>
                  {reactionStatus.reaction.emoji}
                </Text>
                {reactionStatus.count ? <Text style={{ color: 'white' }}>{reactionStatus.count}</Text> : null}
              </View>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  source={{ uri: reactionStatus.reaction.sticker.url }}
                  style={{ width: 35, height: 35, marginRight: reactionStatus.count ? 10 : 0 }}
                />
                {reactionStatus.count ? <Text style={{ color: 'white' }}>{reactionStatus.count}</Text> : null}
              </View>
            )}
            {reactionStatus.count ? null : (
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: 'rgba(45, 209, 40, 0.85)',
                  borderRadius: 8,
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons name='plus' size={15} color='white' />
              </View>
            )}
          </TouchableOpacity>
        );
      });

      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: 'white',
            marginBottom: 10,
            alignSelf: 'center',
          }}
        >
          {list}
        </View>
      );
    } else {
      return <Text style={{ color: 'white' }}>No reactions</Text>;
    }
  };

  return <>{areReactionStatusesFetched ? renderReactionStatuses() : <ActivityIndicator />}</>;
};

export default ReactionOptions;
