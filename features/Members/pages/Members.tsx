import React, { useEffect, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Share, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetMembersBySpaceId } from '../hooks';
import { CurrentSpaceContext } from '../../../providers';
import { UserType } from '../../../types';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';

type MembersProps = {
  spaceId: string;
};

export const Members: React.FC<MembersProps> = () => {
  const { apiResult, requestApi } = useGetMembersBySpaceId();
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  const renderUser = useCallback(({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(90,90,90)',
        }}
      >
        <ExpoImage
          style={{ width: 25, height: 25, marginRight: 20 }}
          source={{ uri: item.avatar }}
          contentFit='contain'
        />
        <Text style={{ color: 'white', fontSize: 17 }}>{item.name}</Text>
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
      <FlatList data={apiResult.data?.users} renderItem={renderUser} keyExtractor={(item, index) => `${index}`} />
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
