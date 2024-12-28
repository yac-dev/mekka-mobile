import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UserStackNavigatorParams } from '../navigations/UserStackNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { currentTagAtom } from '../../../recoil';
import axios from 'axios';
import Config from 'react-native-config';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsByTagId, getPostsByUserId, queryKeys } from '../../../query';

import Mapbox, { Camera, MarkerView } from '@rnmapbox/maps';
import { VectorIcon } from '../../../Icons';
import { Posts, Header } from '../components';

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
  const [currentTag] = useRecoilState(currentTagAtom);
  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ height: '100%', width: '100%', flex: 1 }}> */}
      <Header userId={userId} />
      <Posts userId={userId} />
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
