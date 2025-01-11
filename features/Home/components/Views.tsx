import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { GridView } from '../../Space/components/GridView';
import { RegionView } from './RegionView';
import { CurrentSpace } from './CurrentSpace';

const renderScene = SceneMap({
  GridView: CurrentSpace,
  RegionView: RegionView,
});

const routes = [
  { key: 'GridView', title: 'Grid View' },
  { key: 'RegionView', title: 'Region View' },
];

export const Views = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      lazy
      // renderTabBar={() => null}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      animationEnabled={false}
    />
    // やっぱ、floatingボタン類はここにおくしかないかもな。。。
    // ここにView toggle用のボタンを置いておくのがいいかもね。。。
  );
};
