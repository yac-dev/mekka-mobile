import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getReactionsByPostId } from '../../../query/queries';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewPostStackNavigatorParams } from '../navigations';
import { queryKeys } from '../../../query/queryKeys';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType } from '../../../types';

type IHowDoYouFeel = NativeStackScreenProps<ViewPostStackNavigatorParams, 'HowDoYouFeel'>;

const itemWidth = Dimensions.get('window').width / 3;
const reactionContainerWidth = itemWidth * 0.7;

export const HowDoYouFeel: React.FC<IHowDoYouFeel> = ({ route }) => {
  const { postId } = route.params;
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { data, status: getReactionsByPostIdStatus } = useQuery({
    queryKey: [queryKeys.reactionsByPostId, postId],
    queryFn: () => getReactionsByPostId({ postId, spaceId: currentSpace._id }),
  });

  const renderReactionOption = ({ item, index }: { item: ReactionType; index: number }) => {
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
          // onPress={() => requestApi({ postId: currentPost._id, reactionId: reaction._id, userId: auth._id })}
        >
          {item.type === 'emoji' ? (
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
                  {item.emoji}
                </Text>
              </View>
              {data?.reactions.some(
                (reactionObject) => reactionObject._id === item._id && reactionObject.count > 0
              ) && (
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
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {data?.reactions.find((reactionObject) => reactionObject._id === item._id).count}
                  </Text>
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
                  source={{ uri: item.sticker.url }}
                  contentFit='contain'
                />
              </View>
              {data?.reactions.some(
                (reactionObject) => reactionObject._id === item._id && reactionObject.count > 0
              ) && (
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
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {data?.reactions.find((reactionObject) => reactionObject._id === item._id).count}
                  </Text>
                </View>
              )}
            </View>
          )}
        </TouchableOpacity>

        {item.caption?.length ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: 'rgb(70,70,70)',
              maxWidth: itemWidth,
            }}
          >
            <Text numberOfLines={1} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              {item.caption}
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
