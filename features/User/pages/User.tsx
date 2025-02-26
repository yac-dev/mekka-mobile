import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { useRecoilState } from 'recoil';
import { currentTagAtom } from '../../../recoil';
import axios from 'axios';
import Config from 'react-native-config';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPostsByTagId, getPostsByUserId, getUserById, queryKeys } from '../../../query';

import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { VectorIcon } from '../../../Icons';
import { Posts, Header, ViewPostsTypeToggleButton } from '../components';
import { useNavigation } from '@react-navigation/native';
import { UserStackNavigatorParams, UserStackNavigatorProps } from '../navigations';
import { Image as ExpoImage } from 'expo-image';
import { PostsByGrid, PostsByRegion } from '../components';

// tabViewを使って地図を描画したい気持ちでいっぱいなんだが、
// そもそもuser page自体をstackscreenで表示しなければいいのではないかね。。。？discordみたいにさ。
// うん。bottom sheetでまあいけると思う。
// type UserScreenProps = NativeStackScreenProps<UserStackNavigatorParams, 'User'>;
type IUser = {
  userId: string;
};

Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN);
// ここでuserのpostを引っ張ってくるところまでをまずやりたいね。

export const User: React.FC<IUser> = ({ userId }) => {
  const [viewPostsType, setViewPostsType] = useState<'grid' | 'region'>('grid');
  const { data, status } = useQuery({
    queryKey: [queryKeys.userById, userId],
    queryFn: () => getUserById({ userId }),
  });

  const onPostsTypeChangePress = (postsType: 'grid' | 'region') => {
    setViewPostsType(postsType);
  };

  const userStackNavigation = useNavigation<UserStackNavigatorProps>();

  useEffect(() => {
    userStackNavigation.setOptions({});
  }, []);

  // scrollView兼pager viewがいけないのね。。。。どうだろ。。。
  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ flex: 1, height: '100%' }}>
        <Header userId={userId} viewPostsType={viewPostsType} />
        <PostsByGrid userId={userId} />
       
      </ScrollView> */}
      {/* <View style={{ height: 65, backgroundColor: 'transparent' }} /> */}
      <Posts userId={userId} viewPostsType={viewPostsType} />
      <ViewPostsTypeToggleButton viewPostsType={viewPostsType} onPostsTypeChangePress={onPostsTypeChangePress} />
      {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>User</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

// headerLeft: () => (
//   <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, paddingTop: 10 }}>
//     {/* <ExpoImage source={currentPost.createdBy.avatar} style={{ width: 30, height: 30, marginRight: 15 }} /> */}
//     <View style={{ flexDirection: 'column' }}>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 5 }}>JonhDoe</Text>
//         <Text style={{ color: 'rgb(150,150,150)', fontSize: 11, fontWeight: 'bold' }}>@JonhDoe</Text>
//       </View>
//     </View>
//   </View>
// ),
