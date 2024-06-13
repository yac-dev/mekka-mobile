import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetMembersBySpaceIdState } from '../hooks';
import { UserType } from '../../../types';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';

type MembersProps = {
  spaceId: string;
};

export const Members: React.FC<MembersProps> = () => {
  const { apiResult } = useGetSpaceByIdState();
  const { apiResult: getMembersBySpaceIdResult, requestApi } = useGetMembersBySpaceIdState();

  useEffect(() => {
    requestApi({ spaceId: apiResult.data?.space._id });
  }, []);

  const renderUser = useCallback(({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          justifyContent: 'space-between',
        }}
        activeOpacity={0.5}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ExpoImage
            style={{ width: 30, height: 30, marginRight: 20 }}
            source={{ uri: item.avatar }}
            contentFit='contain'
          />
          <Text style={{ color: 'white', fontSize: 17 }}>{item.name}</Text>
        </View>
        <VectorIcon.MI name='chevron-right' color={'white'} size={20} />
      </TouchableOpacity>
    );
  }, []);

  if (getMembersBySpaceIdResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black, padding: 10 }}>
      <FlatList
        data={getMembersBySpaceIdResult.data?.users}
        renderItem={renderUser}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
