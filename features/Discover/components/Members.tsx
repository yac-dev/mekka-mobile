import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useGetMembersBySpaceIdState } from '../hooks';
import { UserType } from '../../../types';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { useQuery } from '@tanstack/react-query';
import { getMembersBySpaceId, queryKeys } from '../../../query';

type MembersProps = {
  spaceId: string;
};

const itemWidth = Dimensions.get('window').width / 3;
const avatarWidth = itemWidth * 0.7;

export const Members: React.FC<MembersProps> = ({ spaceId }) => {
  const { data, status } = useQuery({
    queryKey: [queryKeys.members, spaceId],
    queryFn: () => getMembersBySpaceId({ spaceId: spaceId }),
  });

  const renderUser = useCallback(({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          width: itemWidth,
          height: itemWidth,
        }}
        activeOpacity={0.5}
        onPress={() => {
          // spaceInfoStackNavigation.navigate('UserStackNavigator', { userId: item._id });
        }}
      >
        <View
          style={{
            backgroundColor: 'rgb(70,70,70)',
            justifyContent: 'center',
            alignItems: 'center',
            width: avatarWidth,
            height: avatarWidth,
            borderRadius: avatarWidth / 2,
            marginBottom: 10,
          }}
        >
          {item.avatar ? (
            <ExpoImage
              style={{ width: avatarWidth, height: avatarWidth }}
              source={{ uri: item.avatar }}
              contentFit='contain'
            />
          ) : (
            <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
              {item.name.charAt(0)}
            </Text>
          )}
        </View>
        <Text numberOfLines={2} style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  if (status === 'pending') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black, paddingTop: 10 }}>
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
