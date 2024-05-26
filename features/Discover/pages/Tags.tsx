import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useGetTagsBySpaceIdState } from '../hooks';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { TagType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';

export const Tags = () => {
  const { apiResult } = useGetSpaceByIdState();
  const { apiResult: getTagsBySpaceIdResult, requestApi: requestGetTagsBySpaceId } = useGetTagsBySpaceIdState();

  useEffect(() => {
    requestGetTagsBySpaceId({ spaceId: apiResult.data?.space._id });
  }, []);

  const renderItem = ({ item }: { item: TagType }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ExpoImage source={item.icon?.url} style={{ width: 20, height: 20, marginRight: 15 }} tintColor={'white'} />
        <Text style={{ color: 'white' }}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <FlatList
        data={getTagsBySpaceIdResult.data?.tags}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};
