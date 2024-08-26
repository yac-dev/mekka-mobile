import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { emojisByCategory } from '../../../utils/Emoji/emojis';
import { emojis } from '../../../utils/Emoji/shortNameToUnicode';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { FlashList } from '@shopify/flash-list';

type EmojisCategoryProps = {
  category: string;
};

export const EmojisByCategory: React.FC<EmojisCategoryProps> = ({ category }) => {
  const {
    selectedReactions,
    setSelectedReactions,
    onEmojiPress,
    onEmojiChange,
    onCaptionChange,
    selectedReactionOption,
  } = useContext(ReactionPickerContext);
  // まずは、ここでcontextをconsumeすることで、componentのrerenderingがおこってしまっていると。
  const oneGridWidth = Dimensions.get('window').width / 9;

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            // backgroundColor: selectedReactions[emojis[`:${item}:`]] ? 'rgb(70,70,70)' : 'black',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
          onPress={() => onEmojiChange(item)}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 35 }}>{emojis[`:${item}:`]}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        data={emojisByCategory[category]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={9}
        contentContainerStyle={{ paddingTop: 5 }}
        // extraData={selectedReactionOption}
        // removeClippedSubviews
        // initialNumToRender={300}
        // maxToRenderPerBatch={}
        estimatedItemSize={300}
      />
    </View>
  );
};
