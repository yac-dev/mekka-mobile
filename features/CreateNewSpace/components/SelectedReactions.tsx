import React, { useCallback, useContext, useEffect } from 'react';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { ReactionType } from '../contexts/ReactionPickerProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackParams, CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SelectedReactionsProps = {
  reactions?: ReactionType[];
};

export const SelectedReactions: React.FC<SelectedReactionsProps> = ({ reactions }) => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);

  const onAddPress = () => {
    navigation.navigate('Reaction', { selectedReactions: Object.values(selectedReactions) });
  };

  useEffect(() => {
    if (reactions) {
      setSelectedReactions(() => {
        const table = {};
        reactions.forEach((reaction) => {
          if (reaction.type === 'emoji') {
            table[reaction.emoji] = reaction;
          } else if (reaction.type === 'sticker') {
            table[reaction.sticker._id] = reaction;
          }
        });
        return table;
      });
    }
  }, [reactions]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onAddPress()}
          disabled={Object.keys(selectedReactions).length && Object.keys(selectedReactions).length < 7 ? false : true}
        >
          <Text
            style={{
              color:
                Object.keys(selectedReactions).length && Object.keys(selectedReactions).length < 7
                  ? 'white'
                  : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedReactions]); // そもそもここでpicker contextをやれないよねw

  const renderSelectedReaction = ({ item }: { item: ReactionType }) => {
    return (
      <View style={styles.reactionContainer}>
        {item.type === 'emoji' ? (
          <Text style={styles.emoji}>{item.emoji}</Text>
        ) : (
          <ExpoImage style={styles.sticker} source={{ uri: item.sticker.url }} contentFit='cover' />
        )}
        <View style={styles.deleteOuterContainer}>
          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={() => {
              setSelectedReactions((previous) => {
                const updating = { ...previous };
                if (item.type === 'emoji') {
                  delete updating[item.emoji];
                } else if (item.type === 'sticker') {
                  delete updating[item.sticker._id];
                }
                return updating;
              });
            }}
          >
            <VectorIcon.II name='close' color={'black'} size={15} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!Object.values(selectedReactions).length) return null;

  // FlatListを親コンポーネントの中に入れる場合は、FlatListをViewで囲うといいっぽい。
  return (
    <View>
      <FlatList
        data={Object.values(selectedReactions)}
        renderItem={renderSelectedReaction}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ alignSelf: 'center', padding: 20 }}
        numColumns={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reactionContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(80, 80, 80)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  emoji: { fontSize: 40 },
  sticker: { width: 40, height: 40 },
  deleteOuterContainer: {
    width: 28,
    height: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -13,
    right: -13,
    borderRadius: 14,
  },
  deleteContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
