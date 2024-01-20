import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import SnackBar from '../../../components/SnackBar';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Stickers = (props) => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);
  const { navigation } = useContext(CreateNewSpaceContext);
  const [stickers, setStickers] = useState([]);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 9;

  useEffect(() => {
    if (props.route?.params?.createdSticker) {
      setSelectedReactions((previous) => {
        return {
          ...previous,
          [props.route?.params?.createdSticker.sticker._id]: props.route?.params.createdSticker,
        };
      });
      setStickers((previous) => [...previous, props.route?.params.createdSticker.sticker]);
    }
  }, [props.route?.params?.createdSticker]);

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
            <ExpoImage style={{ width: 30, height: 30 }} source={{ uri: item.url }} contentFit='cover' />
          </TouchableOpacity>
        </View>
      );
    },
    // [selectedReactions]
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{}}>
        {/* <TouchableOpacity
          style={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}
          onPress={() => navigation.navigate('CreateNewSticker')}
        >
          <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold' }}>Create new reaction</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => {
            navigation.navigate('CreateNewSticker');
          }}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='edit' color='white' size={20} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Create new one?</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>
      <FlashList
        data={stickers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}`}
        numColumns={9}
        contentContainerStyle={{ paddingTop: 5 }}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default Stickers;
