import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Animated, FlatList, TouchableOpacity, Platform } from 'react-native';
import { mySpacesAtom } from '../../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { SpaceType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import { SceneMap, TabView } from 'react-native-tab-view';
import { Grid } from '../components';

const HEADER_HEIGHT = 140;
const TAB_BAR_HEIGHT = 50;

const DATA = [
  { name: 'Marissa Castillo' },
  { name: 'Denzel Curry' },
  { name: 'Miles Ferguson' },
  { name: 'Kenny Moreno' },
  { name: 'Shelby Craig' },
  { name: 'Jordyn Brewer' },
  { name: 'Tanya Walker' },
  { name: 'Nolan Figueroa' },
  { name: 'Sophia Gibbs' },
  { name: 'Vincent Sandoval' },
];

type RouteType = SpaceType & { key: number };

export const Posts = ({ position, syncOffset, firstRef, onMomentumScrollBegin }: any) => {
  const mySpaces = useRecoilValue(mySpacesAtom);
  const [routes, setRoutes] = useState<RouteType[]>(mySpaces.map((space, index) => ({ ...space, key: index })));
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const renderItem = ({ item, index }: { item: SpaceType; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={item._id}
        style={{
          marginRight: 8,
          padding: 5,
          paddingHorizontal: 10,
          paddingVertical: 0,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: currentIndex === index ? 'white' : 'rgb(30,30,30)',
          borderRadius: 130,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 1, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 1,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
        onPress={() => {
          setCurrentIndex(index);
        }}
      >
        <View
          style={{
            width: 20,
            aspectRatio: 1,
            borderRadius: 22.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
          }}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 22.5 }}
            source={{ uri: item.icon }}
            contentFit='contain'
          />
        </View>
        <Text style={{ color: currentIndex === index ? 'black' : 'rgb(100,100,100)', fontSize: 13 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const createTabViewScene = useCallback((routes: RouteType[]) => {
    return SceneMap(
      routes.reduce((acc: Record<string, React.FC<any>>, option: RouteType) => {
        acc[option.key] = () => (
          <Grid
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            spaceId={option._id}
          />
        );
        return acc;
      }, {})
    );
  }, []);

  const renderScene = useMemo(() => createTabViewScene(routes), [routes]);

  return (
    <View style={{ flex: 1 }}>
      <TabView
        lazy
        swipeEnabled={false}
        // animationEnabled
        style={{ flex: 1, height: '100%' }}
        renderTabBar={() => null}
        renderScene={renderScene}
        navigationState={{ index: currentIndex, routes }}
        onIndexChange={(index) => {
          setCurrentIndex(index);
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          // left: 0,
          // right: 0,
          // zIndex: 1000,
          height: 55,
          // backgroundColor: 'black',
          paddingVertical: 8,
          // borderTopWidth: 0.3,
          // borderTopColor: 'rgb(100,100,100)',
          width: '100%',
        }}
      >
        <FlatList
          data={mySpaces}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
    </View>
  );
};
