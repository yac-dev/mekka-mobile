import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Animated,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { MyPageStackNavigatorProps } from '../navigations/MyPageStackNavigation';
import { authAtom } from '../../../recoil';
import { useRecoilValue } from 'recoil';
import { Image as ExpoImage } from 'expo-image';
import { Posts, MomentsPosts } from '.';

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
const HEADER_HEIGHT = 140;
const TAB_BAR_HEIGHT = 50;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const SecondRoute = ({ position, syncOffset, secondRef, onMomentumScrollBegin }: any) => (
  <Animated.ScrollView
    ref={secondRef}
    scrollEventThrottle={1}
    onMomentumScrollBegin={onMomentumScrollBegin}
    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
      useNativeDriver: true,
    })}
    onMomentumScrollEnd={(e) => {
      syncOffset('moments', e.nativeEvent.contentOffset.y);
    }}
    contentContainerStyle={{ paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT }}
  >
    <View style={{ backgroundColor: 'black', height: 1500 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Moments</Text>
    </View>
  </Animated.ScrollView>
);

const ThirdRoute = ({ position, syncOffset, thirdRef, onMomentumScrollBegin }: any) => {
  return (
    <Animated.FlatList
      ref={thirdRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], { useNativeDriver: true })}
      onMomentumScrollEnd={(e) => {
        syncOffset('activities', e.nativeEvent.contentOffset.y);
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

const FourthRoute = ({ position, syncOffset, fourthRef, onMomentumScrollBegin }: any) => {
  return (
    <Animated.FlatList
      ref={fourthRef}
      scrollEventThrottle={1}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], { useNativeDriver: true })}
      onMomentumScrollEnd={(e) => {
        syncOffset('about', e.nativeEvent.contentOffset.y);
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const MyPage = () => {
  const auth = useRecoilValue(authAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const myPageStackNavigation = useNavigation<MyPageStackNavigatorProps>();
  // useEffect(() => {
  //   homeStackNavigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity>
  //         <Text
  //           style={{
  //             color: 'white',
  //             fontSize: 20,
  //             fontWeight: 'bold',
  //           }}
  //         >
  //           Follow
  //         </Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, []);

  const [routes] = useState([
    { key: 'posts', title: 'Posts' },
    { key: 'moments', title: 'Moments' },
    { key: 'activities', title: 'Activities' },
    // { key: 'about', title: 'About' },
  ]);

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);

  const firstRef: any = useRef();
  const secondRef: any = useRef();
  const thirdRef: any = useRef();
  const fourthRef: any = useRef();
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
      case 'posts':
        return (
          <Posts
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'moments':
        return (
          <MomentsPosts
            position={position}
            syncOffset={syncOffset}
            secondRef={secondRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'activities':
        return (
          <ThirdRoute
            position={position}
            syncOffset={syncOffset}
            thirdRef={thirdRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'about':
        return (
          <FourthRoute
            position={position}
            syncOffset={syncOffset}
            fourthRef={fourthRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      default:
        return null;
    }
  };
  const renderTab = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: currentIndex === index ? 'rgb(50, 50,50)' : 'black',
          paddingHorizontal: 10,
          paddingVertical: 0,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={0.7}
        onPress={() => setCurrentIndex(index)}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.title}</Text>
      </TouchableOpacity>
    );
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
            paddingHorizontal: 15,
            paddingTop: 15,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: 'rgb(70,70,70)',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                marginRight: 20,
              }}
            >
              {auth.avatar ? (
                <View style={{ width: '100%', height: '100%', borderRadius: 50 / 2 }}>
                  <ExpoImage
                    style={{ width: '100%', height: '100%', borderRadius: 50 / 2 }}
                    source={{ uri: auth.avatar }}
                    contentFit='cover'
                  />
                </View>
              ) : (
                <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', fontWeight: 'bold' }}>
                  {auth.name.slice(0, 2).toUpperCase()}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: 'column', gap: 5 }}>
              <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{auth.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'rgb(150,150,150)', fontSize: 13 }}>
                  Member since {formatDate(auth.createdAt)}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ padding: 10, backgroundColor: 'white', borderRadius: 100 }}
            onPress={() => myPageStackNavigation.navigate('EditMyAccount')}
          >
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: TAB_BAR_HEIGHT,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ height: 35 }}>
            <FlatList
              horizontal
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10 }}
              data={routes}
              renderItem={renderTab}
              keyExtractor={(item, index) => item.key}
            />
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TabView
        navigationState={{ index: currentIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setCurrentIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    height: 150,
  },
});
