import React, { useEffect, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
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
const itemWidth = Dimensions.get('window').width / 3;
const avatarWidth = itemWidth * 0.7;
// 久々にtan stackやってみよっか。
export const Members: React.FC<MembersProps> = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.members, currentSpace._id],
    queryFn: () => getMembersBySpaceId({ spaceId: currentSpace._id }),
  });
  // <VectorIcon.MI name='chevron-right' color={'white'} size={20} />
  {
    /*  */
  }
  const renderUser = useCallback(({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          width: itemWidth,
          height: itemWidth,
          // backgroundColor: 'red',
        }}
        activeOpacity={0.5}
      >
        <ExpoImage
          style={{ width: avatarWidth, height: avatarWidth }}
          source={{ uri: item.avatar }}
          contentFit='contain'
        />
        <Text numberOfLines={2} style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
          {item.name}
        </Text>
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
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <FlatList data={data.users} numColumns={3} renderItem={renderUser} keyExtractor={(item, index) => `${index}`} />
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
