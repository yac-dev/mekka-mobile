import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetNotificationByUserIdOutput } from '../../../query/types';
import { queryKeys } from '../../../query/queryKeys';
import { authAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { FlashList } from '@shopify/flash-list';
import { NotificationType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { iconColorTable } from '../../../themes/color';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { useNavigation } from '@react-navigation/native';
import { currentSpaceAtom } from '../../../recoil';
import { mySpacesAtom } from '../../../recoil';
import { getNotificationByUserId } from '../../../query';
// どのspaceでcommentかreactionか、followかのtypeのnotificationをcellで表示しなきゃいけない。

export const Notifications = () => {
  const [auth] = useRecoilState(authAtom);
  // const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<GetNotificationByUserIdOutput>([queryKeys.notifications, auth]);
  // ここは正直数だけ取れればいいだけなんだよね。そこで迷っていたのか。。。
  const { data: notificationsData, isLoading: isLoadingNotifications } = useQuery({
    queryKey: [queryKeys.notifications, auth],
    queryFn: () => getNotificationByUserId({ userId: auth._id }),
  });
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [mySpaces] = useRecoilState(mySpacesAtom);
  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval = seconds / 31536000; // years
    if (interval > 1) {
      return `${Math.floor(interval)} year${Math.floor(interval) > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 2592000; // months
    if (interval > 1) {
      return `${Math.floor(interval)} month${Math.floor(interval) > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 86400; // days
    if (interval > 1) {
      return `${Math.floor(interval)} day${Math.floor(interval) > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 3600; // hours
    if (interval > 1) {
      return `${Math.floor(interval)} hour${Math.floor(interval) > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 60; // minutes
    if (interval > 1) {
      return `${Math.floor(interval)} minute${Math.floor(interval) > 1 ? 's' : ''} ago`;
    }
    return `${Math.floor(seconds)} second${Math.floor(seconds) > 1 ? 's' : ''} ago`;
  };

  const onNotificationPress = (notification: NotificationType) => {
    if (notification.type === 'comment') {
      const space = mySpaces.find((space) => space._id === notification.space._id);
      if (space) {
        setCurrentSpace(space);
        homeStackNavigation.navigate({
          name: 'ViewPostStackNavigator',
          params: {
            screen: 'ViewPost',
            params: { posts: [notification.post], index: 0 },
          },
        });
      }
    }
  };

  const renderItem = ({ item }: { item: NotificationType }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 12 }}
        activeOpacity={0.7}
        onPress={() => onNotificationPress(item)}
      >
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
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
            <Text style={{ color: 'white' }}>@{item.space.name}</Text>
            <Text style={{ color: 'rgb(150,150,150)' }}>{timeSince(new Date(item.createdAt))}</Text>
          </View>
          {item.type === 'comment' && (
            <Text numberOfLines={2} style={{ color: 'white' }}>
              {item.comment?.content}
            </Text>
          )}
          {item.type === 'reaction' && (
            <View>
              {item.reaction.type === 'emoji' && (
                <Text style={{ color: 'white', fontSize: 32 }}>{item.reaction.emoji}</Text>
              )}
              {item.reaction.type === 'sticker' && (
                <ExpoImage
                  style={{ width: 32, height: 32 }}
                  source={{ uri: item.reaction.sticker.url }}
                  contentFit='contain'
                />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoadingNotifications) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 12 }}>
      {notificationsData?.notifications.length === 0 ? (
        <View style={{ flex: 1, paddingTop: 100, alignItems: 'center' }}>
          <VectorIcon.MCI name='bell' size={50} color='rgb(150,150,150)' />
          <Text style={{ color: 'rgb(150,150,150)', textAlign: 'center', marginTop: 12 }}>
            Notifications will be shown here
          </Text>
        </View>
      ) : (
        <FlashList data={notificationsData?.notifications} renderItem={renderItem} estimatedItemSize={100} />
      )}
    </View>
  );
};
