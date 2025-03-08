import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, SafeAreaView, Animated, Text, TouchableOpacity } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { HomeStackNavigatorProps } from '../../Home/navigations';

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
const HEADER_HEIGHT = 240;
const TAB_BAR_HEIGHT = 50;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = ({ position, syncOffset, firstRef, onMomentumScrollBegin }: any) => {
  return (
    <Animated.FlatList
      ref={firstRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], { useNativeDriver: true })}
      onMomentumScrollEnd={(e) => {
        syncOffset('first', e.nativeEvent.contentOffset.y);
      }}
      data={DATA}
      keyExtractor={(item, i) => String(i)}
      renderItem={({ item }) => (
        <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
          <Text>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT }}
    />
  );
};

const SecondRoute = ({ position, syncOffset, secondRef, onMomentumScrollBegin }: any) => (
  <Animated.FlatList
    ref={secondRef}
    scrollEventThrottle={1}
    onMomentumScrollBegin={onMomentumScrollBegin}
    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
      useNativeDriver: true,
    })}
    onMomentumScrollEnd={(e) => {
      syncOffset('second', e.nativeEvent.contentOffset.y);
    }}
    data={DATA}
    keyExtractor={(item, i) => String(i)}
    renderItem={({ item }) => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
        <Text>{item.name}</Text>
      </View>
    )}
    contentContainerStyle={{ paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT }}
  />
);

export const MyPage = () => {
  const [index, setIndex] = useState(0);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  useEffect(() => {
    homeStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Follow
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);

  const firstRef: any = useRef();
  const secondRef: any = useRef();

  const onMomentumScrollBegin = () => {
    isValidTabPress.current = true;
  };

  const syncOffset = (scene: any, y: any) => {
    console.log(scene, y);
    if (scene === 'first') {
      secondRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    if (scene === 'second') {
      firstRef?.current?.scrollToOffset({
        offset: y,
        animated: false,
      });
    }
    isValidTabPress.current = false;
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'second':
        return (
          <SecondRoute
            position={position}
            syncOffset={syncOffset}
            secondRef={secondRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      default:
        return null;
    }
  };

  function renderTabBar(props: any) {
    const translateY = position.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }, { transform: [{ translateY }] }]}
      >
        <View
          style={{
            height: HEADER_HEIGHT,
            backgroundColor: 'green',
          }}
        >
          <Text>Header</Text>
        </View>
        <TabBar
          {...props}
          style={{ height: TAB_BAR_HEIGHT }}
          onTabPress={({ route, preventDefault }) => {
            if (isValidTabPress.current) {
              preventDefault();
            }
          }}
        />
      </Animated.View>
    );
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    height: 150,
  },
});
