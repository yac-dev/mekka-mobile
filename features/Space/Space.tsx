import { useEffect, useContext, useRef, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../features/Space/providers/SpaceRootProvider';
import { CurrentSpaceContext, CurrentTagContext } from '../../providers';
import { TagType } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { TagScreenProvider } from '../../features';
import { AppButton } from '../../components';
import { VectorIcon } from '../../Icons/VectorIcons';
import { ViewPostsTypeToggleButton } from '../../features/Space/components';
import { Posts } from '../../features/Space/components';
import {
  HomeStackNavigatorProps,
  HomeStackParams,
  SpaceRootStackNavigatorProp,
  SpaceStackNavigatorProps,
} from '../../navigations';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpaceStackNavigatorParams } from '../../navigations';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useRecoilValue } from 'recoil';
import { viewPostsTypeAtomFamily } from './atoms';
import { useRecoilState } from 'recoil';
import { createPostResultAtomFamily } from '../../api/atoms';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
// pagerviewはlazy loadingをサポートしていないという。。。
// 使い方はtab viewの方が面倒臭いがlazy loadingサポートはいいね。

const Tab = createMaterialTopTabNavigator<TagsNavigationParams>();

type TagsNavigationParams = {
  [key: string]: undefined;
};

type ISpace = NativeStackScreenProps<SpaceStackNavigatorParams, 'Space'>;

export const Space: React.FC<ISpace> = ({ route }) => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const createPostResult = useRecoilValue(createPostResultAtomFamily(route.params.space._id));
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const scrollViewRef = useRef(null);
  // NOTE: これ、tagを作った後も動的に変わるようになるな。。。めんどいな。。。一回ここやめようか。。。キリがない。。。
  // const [routes, setRoutes] = useState(
  //   route.params.space.tags.map((tag) => {
  //     return {
  //       key: tag._id,
  //       title: tag.name,
  //     };
  //   })
  // );
  // const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(() => {
    const currentIndex = currentSpace?.tags.findIndex((tag) => currentTag._id === tag._id);
    scrollViewRef.current.scrollToOffset({
      offset: (currentIndex - 1) * 120,
      animated: true,
    });
  }, [currentTag]);
  // currentTag
  // ここのparamsのmerge trueにしないといかんかった。
  const onTabPress = (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTag(tab);
    homeStackNavigation.navigate({
      name: 'Space',
      params: { screen: `Posts_${tab._id}` },
      merge: true,
    });
  };

  const onCreatePostPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    spaceStackNavigation.navigate('CreateNewPostStackNavigator');
  };

  const renderTab = ({ item }) => {
    const isFocused = currentTag._id === item._id;
    return (
      <TouchableOpacity key={route.key} onPress={() => onTabPress(item)} onLongPress={() => console.log('hello')}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            padding: 5,
          }}
        >
          <ExpoImage
            style={{ width: 20, height: 20, marginBottom: 5 }}
            source={{ uri: item.icon?.url }}
            tintColor={isFocused ? 'white' : 'rgb(100,100,100)'}
          />
          <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(100,100,100)', fontSize: 13 }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {/* 上tabは別でcomponent分けた方がいい。 ただ、navigatorにはしなくていいよ。 */}
        <View style={{ flexDirection: 'row' }}>
          <AppButton.Icon
            onButtonPress={() => spaceStackNavigation.goBack()}
            customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)', marginHorizontal: 10 }}
            hasShadow={false}
          >
            <VectorIcon.MCI name='arrow-left' size={18} color={'rgb(190,190,190)'} />
          </AppButton.Icon>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={currentSpace?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            style={{ marginBottom: 10 }}
          />
        </View>

        <Tab.Navigator
          tabBar={() => null}
          initialRouteName={`Posts_${currentTag._id}`}
          screenOptions={({ route }) => ({
            lazy: true,
            swipeEnabled: true,
            animationEnabled: false,
          })}
        >
          {currentSpace?.tags.map((tag: TagType, index: number) => (
            <Tab.Screen key={index} name={`Posts_${tag._id}`} options={{ title: tag.name }}>
              {() => <Posts space={route.params.space} tag={tag} />}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
        {/* NOTE: TabViewへ切り替える。　material toptab はroutingがnestしてくそうざい。performance考えて実装する。 */}
        {/* {route.params.space.tags.map((tag: TagType, index: number) => (
          <Posts space={route.params.space} tag={tag} />
        ))} */}
        <AppButton.Icon
          customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
          onButtonPress={() => onCreatePostPress()}
          isPressDisabled={createPostResult.status === 'loading' ? true : false} // createのstatusをここに足す感じだな。
          hasShadow
        >
          {createPostResult.status === 'loading' ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <VectorIcon.II name='add' size={32} color={'white'} />
          )}
        </AppButton.Icon>
        <ViewPostsTypeToggleButton space={route.params.space} />
      </View>
    </SafeAreaView>
  );
};
