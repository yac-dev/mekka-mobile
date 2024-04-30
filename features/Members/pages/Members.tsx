import React, { useEffect, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetMembersBySpaceId } from '../hooks';
import { CurrentSpaceContext } from '../../../providers';
import { UserType } from '../../../types';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';

type MembersProps = {
  spaceId: string;
};

export const Members: React.FC<MembersProps> = () => {
  const { apiResult, requestApi } = useGetMembersBySpaceId();
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  const handleInvite = async () => {
    Share.share({
      title: 'Share Mekka',
      message: `Access here to download Mekka: https://apps.apple.com/us/app/mekka/id6472717148${'\n'} and then enter this private key: ${
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

  if (apiResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black, padding: 10 }}>
      <FlatList
        data={apiResult.data?.users}
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
              <VectorIcon.MCI name='human-greeting-variant' color='white' size={30} style={{ marginRight: 20 }} />
              <Text style={{ color: 'white', fontSize: 17 }}>Invite</Text>
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
