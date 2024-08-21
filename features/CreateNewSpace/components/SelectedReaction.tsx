import React, { useCallback, useContext, useEffect } from 'react';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { ReactionType } from '../contexts/ReactionPickerProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';

type SelectedReactionProps = {
  defaultReactionIndex?: number;
};

export const SelectedReaction: React.FC<SelectedReactionProps> = ({ defaultReactionIndex }) => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const { selectedReactionOption, onCaptionChange, setDefaultReaction } = useContext(ReactionPickerContext);

  // そっか, addの挙動ね。defaultがある場合は、pushではなく該当のものを変えるだけでいいのか。
  // ここの挙動が面倒だったんだが、まあいいか。
  console.log(defaultReactionIndex);
  useEffect(() => {
    if (defaultReactionIndex !== undefined) {
      setDefaultReaction(formData.reactions.value[defaultReactionIndex]);
    }
  }, [defaultReactionIndex]);
  // useEffect(() => {
  //   if (route.params.reaction) {
  //     setDefaultReaction(route.params.reaction);
  //   }
  // }, [route.params.reaction]);

  // useEffect(() => {
  //   if (reactions) {
  //     setSelectedReactions(() => {
  //       const table = {};
  //       reactions.forEach((reaction) => {
  //         if (reaction.type === 'emoji') {
  //           table[reaction.emoji] = reaction;
  //         } else if (reaction.type === 'sticker') {
  //           table[reaction.sticker._id] = reaction;
  //         }
  //       });
  //       return table;
  //     });
  //   }
  // }, [reactions]);

  // やっぱindex baseの方がいいわ。探索しないといかんから。。。
  // paramsじゃなくて、もうここでformDateを更新するようにしようか。。。
  const onAddPress = () => {
    // 編集の時
    if (defaultReactionIndex !== undefined) {
      setFormData((previous) => {
        const newReactions = [...previous.reactions.value];
        newReactions[defaultReactionIndex] = selectedReactionOption;
        return {
          ...previous,
          reactions: {
            ...previous.reactions,
            value: newReactions,
            isValidated: true,
          },
        };
      });
    } else {
      //追加の時
      setFormData((previous) => {
        return {
          ...previous,
          reactions: {
            ...previous.reactions,
            value: [...previous.reactions.value, selectedReactionOption],
            isValidated: true,
          },
        };
      });
    }
    // ここでもうaddすればよくて、わざわざreactionへもっていってaddする必要はないね。
    navigation.navigate('Reaction');
  };

  const isAddInValid = () => {
    if (!selectedReactionOption) return true;
    if (selectedReactionOption && selectedReactionOption.type === 'emoji' && !selectedReactionOption.emoji) return true;
    if (selectedReactionOption && selectedReactionOption.type === 'sticker' && !selectedReactionOption.sticker)
      return true;

    return false;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onAddPress()}
          // selectedOptionがあるかつ、type emojiでemojiがある場合、またはselectedOptionがあるかつtypeがstickerでstickerがあるときのみfalseにする。
          disabled={isAddInValid()}
        >
          <Text
            style={{
              color: isAddInValid() ? 'rgb(117,117,117)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedReactionOption]); // そもそもここでpicker contextをやれないよねw

  const renderSelectedReactionIcon = () => {
    // console.log(selectedReactionOption);
    if (selectedReactionOption === undefined) return null;
    if (selectedReactionOption.type === 'emoji') {
      return <Text style={{ fontSize: 50 }}>{selectedReactionOption.emoji}</Text>;
    } else if (selectedReactionOption.type === 'sticker') {
      return (
        <ExpoImage
          style={{ width: 40, height: 40 }}
          source={{ uri: selectedReactionOption.sticker.url }}
          contentFit='cover'
        />
      );
    }
  };

  return (
    <View>
      <View style={{ alignSelf: 'center' }}>
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: 'rgb(80, 80, 80)',
            borderRadius: 100 / 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          {renderSelectedReactionIcon()}
        </View>
      </View>
      <Text style={{ color: 'white', fontSize: 13, marginLeft: 15 }}>Caption (optional)</Text>
      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderBottomColor: 'rgb(88, 88, 88)',
          }}
        >
          <TextInput
            style={{
              fontSize: 18,
              color: 'white',
              flex: 1,
              paddingVertical: 10,
            }}
            placeholder='e.g.) Like it!'
            placeholderTextColor={'rgb(170,170,170)'}
            autoCapitalize='none'
            value={selectedReactionOption?.caption}
            onChangeText={onCaptionChange}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: 'rgb(170,170,170)' }}>
              {selectedReactionOption?.caption?.length}/12
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
