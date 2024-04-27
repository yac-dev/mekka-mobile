import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGetMembersBySpaceId } from '../../Members/hooks';
import { AppButton } from '../../../components';
import { FlashList } from '@shopify/flash-list';
import { CurrentSpaceContext } from '../../../providers';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { UserType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';

export const Members = () => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const { apiResult, requestApi } = useGetMembersBySpaceId();

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  const renderMember = ({ item }: { item: UserType }) => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
        <AppButton.Icon
          onButtonPress={() => console.log('invite button')}
          customStyle={{
            width: 50,
            height: 50,
            backgroundColor: null,
            borderRadius: 25,
            marginBottom: 5,
          }}
          hasShadow={false}
        >
          <ExpoImage style={{ width: 30, aspectRatio: 1 }} source={{ uri: item.avatar }} contentFit='contain' />
        </AppButton.Icon>
        <Text numberOfLines={1} style={{ color: 'white' }}>
          {item.name}
        </Text>
      </View>
    );
  };

  if (apiResult.status === 'loading') {
    return (
      <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
          <AppButton.Icon
            onButtonPress={() => console.log('invite button')}
            customStyle={{
              width: 50,
              height: 50,
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 25,
              marginBottom: 5,
            }}
            hasShadow={false}
          >
            <VectorIcon.II name='person-add' size={20} color={Colors.white} />
          </AppButton.Icon>
          <Text style={{ color: 'white' }}>Invite</Text>
        </View>
        <FlashList
          horizontal
          data={apiResult.data?.users}
          renderItem={renderMember}
          keyExtractor={(_, index) => `${index}`}
          estimatedItemSize={45}
        />
      </View>
    </View>
  );
};
