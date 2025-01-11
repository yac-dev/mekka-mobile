import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { GridView } from '../../Space/components/GridView';
import { RegionView } from './RegionView';
import { CurrentSpace } from './CurrentSpace';
import { Features } from './Features';
import { Image as ExpoImage } from 'expo-image';
import { currentSpaceAtom } from '../../../recoil';
import { useRecoilValue } from 'recoil';
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
  const currentSpace = useRecoilValue(currentSpaceAtom);
  const onTabPress = (item) => {
    setIndex(item.key);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TabView
        lazy
        renderTabBar={() => null}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        animationEnabled={false}
      />
      <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <TouchableOpacity onPress={() => setIndex(0)}>
          <Text style={{ color: 'white' }}>Grid</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIndex(1)}>
          <Text style={{ color: 'white' }}>Map</Text>
        </TouchableOpacity>
      </View>
      <Features />
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 30, right: 20 }}
        activeOpacity={0.7}
        onPress={() => {
          console.log('pressed');
        }}
      >
        <ExpoImage source={{ uri: currentSpace.icon }} style={{ width: 48, height: 48, borderRadius: 30 }} />
        {/* <AddIcon /> */}
      </TouchableOpacity>
    </View>
    // やっぱ、floatingボタン類はここにおくしかないかもな。。。
    // ここにView toggle用のボタンを置いておくのがいいかもね。。。
  );
};
