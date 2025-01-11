import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { GridView } from '../../Space/components/GridView';
import { RegionView } from './RegionView';
import { CurrentSpace } from './CurrentSpace';
import { Features } from './Features';
import { Image as ExpoImage } from 'expo-image';
import { currentSpaceAtom } from '../../../recoil';
import { useRecoilValue } from 'recoil';
import { VectorIcon } from '../../../Icons';
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
      <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <TouchableOpacity onPress={() => setIndex(0)}>
          <Text style={{ color: 'white' }}>Grid</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIndex(1)}>
          <Text style={{ color: 'white' }}>Map</Text>
        </TouchableOpacity>
      </View>
      <Features />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
        activeOpacity={0.7}
        onPress={() => {
          console.log('pressed');
        }}
      >
        <ExpoImage source={{ uri: currentSpace.icon }} style={{ width: 48, height: 48, borderRadius: 30 }} />
        <AddIcon />
      </TouchableOpacity>
    </View>
    // やっぱ、floatingボタン類はここにおくしかないかもな。。。
    // ここにView toggle用のボタンを置いておくのがいいかもね。。。
  );
};

const AddIcon = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        width: 24,
        height: 24,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -4,
        right: -5,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          width: 16,
          height: 16,
          borderRadius: 20,
        }}
      >
        <VectorIcon.II name='add' size={14} color={'black'} />
      </View>
    </View>
  );
};
