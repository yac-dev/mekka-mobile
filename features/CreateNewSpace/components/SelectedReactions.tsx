import React, { useCallback, useContext } from 'react';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { ReactionType } from '../contexts/ReactionPickerProvider';

export const SelectedReactions = () => {
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);

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
