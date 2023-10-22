import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { emojis } from '../../../utils/emojis';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { inputBackgroundColor } from '../../../themes/color';
import { iconParameterBackgroundColorTable } from '../../../themes/color';
import FastImage from 'react-native-fast-image';
import backendAPI from '../../../apis/backend';

// smilyAndPeople, animalsAndNature, foodAndDrink, objects, flags, symbols, travelAndPlaces, activity

type StickerType = {
  _id: string;
  url: string;
  name: string | undefined;
};

type ReactionType = {
  type: 'emoji' | 'sticker';
  emoji: string | undefined;
  sticker: StickerType | undefined;
} | null;

// これもtop tabかbottom sheetを使った方がいいな。bottom tabの方がいいかな。。。
const EmojiPicker: React.FC = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 8;
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>(null);
  const [filterOption, setFilterOption] = useState('smileyAndPeople');
  const [stickers, setStickers] = useState({});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate({ name: 'CreateNewSpace', params: { selectedReaction }, merge: true })
          }
          disabled={selectedReaction ? false : true}
        >
          <Text
            style={{
              color: selectedReaction ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedReaction]);

  const getStickers = async () => {
    const result = await backendAPI.get('/stickers');
    const { stickers } = result.data;
    setStickers((previous) => {
      const table = {};
      stickers.forEach((sticker) => {
        table[sticker._id] = sticker;
      });
      return table;
    });
  };

  useEffect(() => {
    if (filterOption === 'sticker') {
      getStickers();
    }
  }, [filterOption]);

  const renderSelectedReaction = () => {
    if (selectedReaction) {
      if (selectedReaction.type === 'sticker') {
        return (
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: inputBackgroundColor,
              borderRadius: 8,
              marginTop: 10,
              marginBottom: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FastImage source={{ uri: selectedReaction.sticker.url }} style={{ width: 65, height: 65 }} />
          </View>
        );
      } else {
        return (
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: inputBackgroundColor,
              borderRadius: 8,
              marginTop: 10,
              marginBottom: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 70 }}>{selectedReaction.emoji}</Text>
          </View>
        );
      }
    } else {
      return null;
    }
  };

  const renderStickers = () => {
    const stickersList = Object.values(stickers);
    if (stickersList.length) {
      const list = stickersList.map((sticker, index: number) => {
        return (
          <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => {
                setSelectedReaction({
                  type: 'sticker',
                  emoji: undefined,
                  sticker: { _id: sticker._id, url: sticker.url, name: sticker.name },
                });
              }}
            >
              <FastImage source={{ uri: sticker.url }} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <View>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
              onPress={() => props.navigation?.navigate('CreateSticker')}
            >
              <Text style={{ textAlign: 'center', color: 'black' }}>Create new?</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
            </ScrollView>
          </View>
        </View>
      );
    }
  };

  const renderEmojis = () => {
    const list = emojis[filterOption].map((emoji: string, index: number) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
            }}
          >
            <Text style={{ fontSize: 35 }}>{emoji}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
          Choose a reaction
        </Text>
        <Text style={{ color: 'rgb(170, 170, 170)', textAlign: 'center', marginBottom: 20 }}>
          Instead of using traditional heart icon button, you use the emoji or sticker option to give a reaction to each
          post.
        </Text>
      </View>
      {renderSelectedReaction()}
      {filterOption === 'sticker' ? renderStickers() : renderEmojis()}
      <ScrollView
        horizontal={true}
        style={{ backgroundColor: 'rgb(40,40,40)', position: 'absolute', width: '100%', bottom: 0 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // alignSelf: 'center',
            // paddingTop: 5,
            // paddingBottom: 5,
            // padding: 5,
          }}
        >
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'sticker' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('sticker')}
            >
              <FastImage source={require('../../../assets/forApp/elon-wtf.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'smileyAndPeople' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('smileyAndPeople')}
            >
              <Text style={{ fontSize: 35 }}>😀</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'symbols' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('symbols')}
            >
              <Text style={{ fontSize: 35 }}>❤️</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'animalsAndNature' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('animalsAndNature')}
            >
              <Text style={{ fontSize: 35 }}>🐶</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'foodAndDrink' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('foodAndDrink')}
            >
              <Text style={{ fontSize: 35 }}>🍕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'activity' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('activity')}
            >
              <Text style={{ fontSize: 35 }}>🎾</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'travelAndPlaces' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('travelAndPlaces')}
            >
              <Text style={{ fontSize: 35 }}>✈️</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'objects' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('objects')}
            >
              <Text style={{ fontSize: 35 }}>📱</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'flags' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('flags')}
            >
              <Text style={{ fontSize: 35 }}>🌎</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmojiPicker;
