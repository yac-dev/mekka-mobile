import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getReactionsByPostId } from '../../../query/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewPostStackNavigatorParams } from '../navigations';
import { queryKeys } from '../../../query/queryKeys';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType } from '../../../types';
import { incrementReaction } from '../../../query/mutations';
import { IncrementReactionInputType } from '../../../query/types';
import { authAtom } from '../../../recoil';
import { ReactionOption } from '../components';
type IHowDoYouFeel = NativeStackScreenProps<ViewPostStackNavigatorParams, 'HowDoYouFeel'>;

const itemWidth = Dimensions.get('window').width / 3;
const reactionContainerWidth = itemWidth * 0.7;

export const HowDoYouFeel: React.FC<IHowDoYouFeel> = ({ route }) => {
  const { postId } = route.params;
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);
  const { data, status: getReactionsByPostIdStatus } = useQuery({
    queryKey: [queryKeys.reactions, postId],
    queryFn: () => getReactionsByPostId({ postId, spaceId: currentSpace._id, userId: auth._id }),
  });
  // debounce使ったやり方で行きたいね。
  //　多分、これも個々のreactionごとにcomponent作ってそれぞれでstateを持たせておいたほうがいいのかもしれん。。。
  console.log('postId', postId, 'spaceId', currentSpace._id, 'userId', auth._id);

  const renderReactionOption = ({ item, index }: { item: ReactionType; index: number }) => {
    const count = data?.reactions.find((reactionObject) => reactionObject._id === item._id)?.count;
    const reactedByCurrentUser = data?.reactions.find(
      (reactionObject) => reactionObject._id === item._id
    )?.reactedByCurrentUser;

    return (
      <ReactionOption
        key={index}
        reaction={item}
        postId={postId}
        count={count}
        userId={auth._id}
        reactedByCurrentUser={reactedByCurrentUser}
      />
    );
  };

  if (getReactionsByPostIdStatus === 'pending') {
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
        <FlatList
          data={currentSpace.reactions}
          renderItem={renderReactionOption}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
          numColumns={
            currentSpace.reactions.length === 2
              ? 2
              : currentSpace.reactions.length === 3
              ? 3
              : currentSpace.reactions.length === 4
              ? 2
              : currentSpace.reactions.length >= 5
              ? 3
              : 0
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
