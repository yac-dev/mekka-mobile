import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import SnackBar from '../../../components/SnackBar';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const Stickers = (props) => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);
  const { navigation } = useContext(CreateNewSpaceContext);
  const [stickers, setStickers] = useState([]);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 9;

  useEffect(() => {
    if (props.route?.params?.createdReaction) {
      setSelectedReactions((previous) => {
        return {
          ...previous,
          [props.route?.params?.createdReaction._id]: {
            type: 'sticker',
            emoji: undefined,
            sticker: props.route?.params?.createdReaction,
          },
        };
      });
      setStickers((previous) => [...previous, props.route?.params.createdReaction]);
    }
  }, [props.route?.params?.createdReaction]);

  const getStickers = async () => {
    const result = await backendAPI.get('/stickers');
    const { stickers } = result.data;
    setStickers(stickers);
  };

  useEffect(() => {
    getStickers();
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: selectedReactions[item._id] ? 'rgb(120,120,120)' : 'black',
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
                      [item._id]: {
                        type: 'sticker',
                        emoji: undefined,
                        sticker: item,
                      },
                    };
                  });
                }
              }
            }}
          >
            <FastImage source={{ uri: item.url }} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      );
    },
    [selectedReactions]
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}
          onPress={() => navigation.navigate('CreateNewSticker')}
        >
          <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>Create new reaction</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={stickers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}`}
        numColumns={9}
        contentContainerStyle={{ paddingTop: 5 }}
      />
    </View>
  );
};

export default Stickers;
