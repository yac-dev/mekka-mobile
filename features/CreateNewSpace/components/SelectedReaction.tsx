import React, { useCallback, useContext, useEffect } from 'react';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { ReactionType } from '../contexts/ReactionPickerProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';

export const SelectedReaction = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { selectedReactionOption, onCaptionChange } = useContext(ReactionPickerContext);

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('hllo')}
          // disabled={Object.keys(selectedReactions).length && Object.keys(selectedReactions).length < 7 ? false : true}
        >
          <Text
            style={{
              color:
                (selectedReactionOption && selectedReactionOption.emoji) ||
                (selectedReactionOption && selectedReactionOption.sticker)
                  ? 'white'
                  : 'rgb(117,117, 117)',
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

  console.log('selected', selectedReactionOption);

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
            placeholder='e.g.) Nice'
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
