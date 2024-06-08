import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';

type IReport<T> = {
  title: string; // commentに対するreportなり、userに対するreportなり分けていく感じ。
  options: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  content: React.ReactNode;
};

// user reportでは、'report 誰々'っていうタイトルになるし、
// comment reportでは、'report comment'　みたいになるし、
// post reportでは、'what's the problem with this post?'みたいになるし
// 色々だよね。これはreportの種類によって分ける様にした方がいい。
//ただ共通な部分は作っておく。

// だから、navigation でparamsを受け取るわけだが、そのparamsのものをcontentで作って、それをReportに埋め込む形になるんだと思う。
// このoptionsに関しても、T故にここでflatListで展開することはできない、だから消費する親componentでrenderitemを作って、それをここに埋め込む形かなおそらく。
export const Report = <T,>({ title, options, renderItem, content }: IReport<T>) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text>{title}</Text>
      {content}
      <FlatList data={options} renderItem={renderItem} keyExtractor={(_, index) => `${index}`} />
    </View>
  );
};
