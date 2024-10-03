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

type MembersProps = {
  spaceId: string;
};

export const Members: React.FC<MembersProps> = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { data, isLoading } = useGetMembersBySpaceId({ spaceId: currentSpace._id });
  const { apiResult, requestApi } = useGetMembersBySpaceIdState();

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  const handleInvite = async () => {
    Share.share({
      title: 'Share Var',
      message: `Access here to download Var: https://apps.apple.com/us/app/mekka/id6472717148${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

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

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black, padding: 10 }}>
      <FlatList
        data={data.users}
        renderItem={renderUser}
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.5}
            onPress={handleInvite}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.II name='add' color='white' size={30} style={{ marginRight: 20 }} />
              <Text style={{ color: 'white', fontSize: 17 }}>Invite new member</Text>
            </View>
            <VectorIcon.MI name='chevron-right' color={'white'} size={20} />
          </TouchableOpacity>
        }
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
