import { useContext, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Share, Animated, FlatList, Dimensions } from 'react-native';
import { Tabs } from '../components';
import { Image as ExpoImage } from 'expo-image';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { urls } from '../../../settings/urls';
import { useNavigation } from '@react-navigation/native';
import { SpaceInfoStackNavigatorProps } from '../navigations/SpaceInfoStackNavigator';
import { TabView } from 'react-native-tab-view';
import { Feature, Members } from '../components';

export const HEADER_HEIGHT = 180;
export const TAB_BAR_HEIGHT = 40;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export const SpaceInfo = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const spaceInfoStackNavigation = useNavigation<SpaceInfoStackNavigatorProps>();
  const [routes] = useState([
    { key: 'features', title: 'Features' },
    { key: 'members', title: 'Members' },
    { key: 'activities', title: 'Activities' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const position: any = useRef(new Animated.Value(0)).current;
  const isValidTabPress: any = useRef(false);

  const firstRef: any = useRef();
  const secondRef: any = useRef();
  const thirdRef: any = useRef();
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'features':
        return (
          <Feature
            position={position}
            syncOffset={syncOffset}
            firstRef={firstRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
          />
        );
      case 'members':
        return (
          <Members
            position={position}
            syncOffset={syncOffset}
            secondRef={secondRef}
            onMomentumScrollBegin={onMomentumScrollBegin}
            spaceId={currentSpace._id}
          />
        );
      // case 'activities':
      //   return (
      //     <View>
      //       <Text>Activities</Text>
      //     </View>
      //   );
      default:
        return null;
    }
  };
  const renderTab = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          paddingVertical: 0,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: currentIndex === index ? 'white' : null,
        }}
        activeOpacity={0.7}
        onPress={() => setCurrentIndex(index)}
      >
        <Text
          style={{ color: currentIndex === index ? 'white' : 'rgb(100,100,100)', fontSize: 17, fontWeight: 'bold' }}
        >
          {item.title}
        </Text>
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
        <View style={{ height: HEADER_HEIGHT }}>
          <View style={{ marginBottom: 10 }}>
            <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <ExpoImage
                  style={{ width: 60, height: 60, borderRadius: 40, marginBottom: 15 }}
                  source={{ uri: currentSpace.icon }}
                  contentFit='cover'
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 27,
                    marginBottom: 5,
                  }}
                >
                  {currentSpace.name}
                </Text>
                <Text
                  style={{
                    color: 'rgb(150, 150, 150)',
                    fontSize: 12,
                  }}
                >
                  @{currentSpace.secretKey}
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ lineHeight: 21, color: 'white', fontSize: 15, marginBottom: 5 }}>
                {currentSpace.description}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                  <VectorIcon.MCI
                    name='rocket-launch'
                    color='rgb(150, 150, 150)'
                    size={12}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={{
                      color: 'rgb(150, 150, 150)',
                      fontSize: 12,
                      marginRight: 10,
                    }}
                  >
                    {currentSpace.createdBy.name}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                  <VectorIcon.MCI name='cake-variant' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
                  <Text
                    style={{
                      color: 'rgb(150, 150, 150)',
                      fontSize: 12,
                      marginRight: 10,
                    }}
                  >
                    {formatDate(currentSpace.createdAt)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
        lazy
        swipeEnabled={false}
        navigationState={{ index: currentIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setCurrentIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
};
