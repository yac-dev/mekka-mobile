import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { GetNotificationByUserIdOutput } from '../../../query/types';
import { queryKeys } from '../../../query/queryKeys';
import { authAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { FlashList } from '@shopify/flash-list';
import { NotificationType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { iconColorTable } from '../../../themes/color';
// どのspaceでcommentかreactionか、followかのtypeのnotificationをcellで表示しなきゃいけない。

export const Notifications = () => {
  const queryClient = useQueryClient();
  const [auth] = useRecoilState(authAtom);
  const data = queryClient.getQueryData<GetNotificationByUserIdOutput>([queryKeys.notifications, auth]);

  const renderItem = ({ item }: { item: NotificationType }) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 16 }} activeOpacity={0.7}>
        <View
          style={{
            backgroundColor: 'rgb(70,70,70)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            marginRight: 12,
          }}
        >
          {item.createdBy.avatar ? (
            <View style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}>
              <ExpoImage
                style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}
                source={{ uri: item.createdBy.avatar }}
                contentFit='cover'
              />
            </View>
          ) : (
            <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', fontWeight: 'bold' }}>
              {item.createdBy.name.slice(0, 2).toUpperCase()}
            </Text>
          )}
          <View
            style={{
              position: 'absolute',
              bottom: -6,
              right: -6,
              backgroundColor: 'black',
              width: 26,
              height: 26,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ExpoImage
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
                source={{ uri: item.space.icon }}
                contentFit='contain'
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgb(100,100,100)',
            paddingBottom: 12,
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {item.createdBy.name}
              {item.type === 'comment' && ' commented on your post'}
              {item.type === 'reaction' && ' reacted to your post'}
              {item.type === 'follow' && ' started following you'}
            </Text>
            <Text style={{ color: 'rgb(150,150,150)' }}>1h ago</Text>
          </View>
          <Text style={{ color: 'white', marginBottom: 8 }}>@{item.space.name}</Text>
          {item.type === 'comment' && (
            <Text numberOfLines={2} style={{ color: 'white' }}>
              {item.comment?.content}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 12 }}>
      <FlashList data={data?.notifications} renderItem={renderItem} estimatedItemSize={100} />
    </View>
  );
};
