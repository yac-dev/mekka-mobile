import React, { useCallback, memo, useContext } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { emojisByCategory } from '../../../utils/Emoji/emojis';
import { emojis } from '../../../utils/Emoji/shortNameToUnicode';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { FlashList } from '@shopify/flash-list';
import { SnackBarContext } from '../../../providers';
import { SnackBar } from '../../../components';

const EmojisByCategory = ({ category }) => {
  const { setSnackBar } = useContext(SnackBarContext);
  const { selectedReactions, setSelectedReactions, onEmojiPress } = useContext(ReactionPickerContext);
  const oneGridWidth = Dimensions.get('window').width / 9;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: selectedReactions[emojis[`:${item}:`]] ? 'rgb(70,70,70)' : 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => onEmojiPress(item)}
        >
          <Text style={{ fontSize: 35 }}>{emojis[`:${item}:`]}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // flashlistすごいな。なんか早くなったぞ。。。
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={emojisByCategory[category]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={9}
        contentContainerStyle={{ paddingTop: 5 }}
        // estimatedItemSize={300}
      />
      <SnackBar.Primary />
    </View>
  );
};

export default EmojisByCategory;
