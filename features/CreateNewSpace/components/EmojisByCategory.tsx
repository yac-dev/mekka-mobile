import React, { useCallback, memo, useContext } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { emojisByCategory } from '../../../utils/Emoji/emojis';
import shortnameToUnicode from '../../../utils/Emoji/shortNameToUnicode';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EmojisByCategory = ({ category }) => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 9;
  // {
  //   type: route?.params?.selectedReaction.type,
  //   emoji:
  //     route?.params?.selectedReaction.type === 'emoji' ? route?.params?.selectedReaction.emoji : undefined,
  //   sticker:
  //     route?.params?.selectedReaction.type === 'sticker'
  //       ? {
  //           _id: route?.params?.selectedReaction.sticker._id,
  //           name: route?.params?.selectedReaction.sticker.name,
  //           url: route?.params?.selectedReaction.sticker.url,
  //         }
  //       : undefined,
  // },
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: selectedReactions[shortnameToUnicode[`:${item}:`]] ? 'rgb(120,120,120)' : 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              // setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
              if (selectedReactions[item]) {
                setSelectedReactions((previous) => {
                  const updating = { ...previous };
                  delete updating[item];
                  return updating;
                });
              } else {
                if (Object.keys(selectedReactions).length >= 6) {
                  setSnackBar({
                    isVisible: true,
                    barType: 'warning',
                    message: 'OOPS. The number of reaction options is limited to 6 at most.',
                    duration: 5000,
                  });
                } else {
                  setSelectedReactions((previous) => {
                    return {
                      ...previous,
                      [shortnameToUnicode[`:${item}:`]]: {
                        type: 'emoji',
                        emoji: shortnameToUnicode[`:${item}:`],
                        sticker: undefined,
                      },
                    };
                  });
                }
              }
            }}
          >
            <Text style={{ fontSize: 35 }}>{shortnameToUnicode[`:${item}:`]}</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [selectedReactions]
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={emojisByCategory[category]}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={9}
        contentContainerStyle={{ paddingTop: 5 }}
      />
    </View>
  );
};

export default memo(EmojisByCategory);
