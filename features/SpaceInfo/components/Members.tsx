import React, { useEffect, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetMembersBySpaceIdState } from '../hooks';
import { UserType } from '../../../types';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { useGetMembersBySpaceId } from '../hooks/useGetMembersBySpaceId';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { getMembersBySpaceId } from '../../../api';
import { queryKeys } from '../../../query';

type MembersProps = {
  spaceId: string;
};

// 久々にtan stackやってみよっか。
export const Members: React.FC<MembersProps> = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.members, currentSpace._id],
    queryFn: () => getMembersBySpaceId({ spaceId: currentSpace._id }),
  });

  const renderUser = useCallback(({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
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

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black, padding: 10 }}>
      <FlatList data={data.users} renderItem={renderUser} keyExtractor={(item, index) => `${index}`} />
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
