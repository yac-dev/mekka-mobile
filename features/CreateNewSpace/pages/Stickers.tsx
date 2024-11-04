import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import backendAPI from '../../../apis/backend';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import { Image as ExpoImage } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReactionPickerContext } from '../contexts/ReactionPickerProvider';
import { VectorIcon } from '../../../Icons';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { getStickers, queryKeys } from '../../../query';
import { useQuery } from '@tanstack/react-query';

const Stickers = (props) => {
  const { selectedReactions, setSelectedReactions, onStickerChange } = useContext(ReactionPickerContext);
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const oneGridWidth = Dimensions.get('window').width / 9;
  const { data, status: getStickersStatus } = useQuery({
    queryKey: [queryKeys.stickers],
    queryFn: () => getStickers({}),
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: selectedReactions[item._id] ? 'rgb(120,120,120)' : 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            onStickerChange(item);
          }}
        >
          <ExpoImage style={{ width: 30, height: 30 }} source={{ uri: item.url }} contentFit='cover' />
        </TouchableOpacity>
      </View>
    );
  }, []);

  if (getStickersStatus === 'pending') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size='small' color='white' />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlashList
        data={data?.stickers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}`}
        numColumns={9}
        contentContainerStyle={{ paddingTop: 5 }}
        estimatedItemSize={200}
      />
      {/* 一旦、sticker作成は置いてこうか。結作業思い。。。 */}
      {/* <View style={{ position: 'absolute', bottom: 20, paddingHorizontal: 30, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateNewSticker')}
          style={{
            paddingVertical: 15,
            borderRadius: 100,
            backgroundColor: 'rgb(70,70,70)',
            paddingHorizontal: 20,
          }}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>Create new sticker?</Text>
            <VectorIcon.MCI name='chevron-down' color={'white'} size={20} />
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Stickers;
