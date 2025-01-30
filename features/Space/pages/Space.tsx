import { useEffect, useContext, useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  LayoutChangeEvent,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { GridView, Posts, RegionView, ViewPostsTypeToggleButton } from '../components';
import { SpaceStackNavigatorProps } from '../../../navigations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpaceStackNavigatorParams } from '../../../navigations';
import { useRecoilValue } from 'recoil';
import { createPostResultAtomFamily } from '../../../api/atoms';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, currentTagAtom } from '../../../recoil';
import { useQuery, useMutation } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { mutationKeys, queryKeys } from '../../../query';
import { Colors } from '../../../themes';
import { SpaceType, TagType } from '../../../types';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import PagerView from 'react-native-pager-view';
import { viewPostsTypeAtomFamily } from '../atoms';
import { currentTagsTableBySpaceIdsAtom } from '../../../recoil';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, VibrancyView } from '@react-native-community/blur';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Grid } from '../components/Grid';
import { useQueryClient } from '@tanstack/react-query';

// id毎でqueryをcacheしたいのよね。
// type ISpace = NativeStackScreenProps<SpaceStackNavigatorParams, 'Space'>;

const windowWidth = Dimensions.get('window').width;

type ISpace = {
  space: SpaceType;
};

export type RouteType = TagType & { key: number };

export const Space: React.FC<ISpace> = ({ space }) => {
  const queryClient = useQueryClient();
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const scrollViewRef = useRef(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const viewPostsType = useRecoilValue(viewPostsTypeAtomFamily(space._id));
  const [routes, setRoutes] = useState<RouteType[]>(currentSpace.tags.map((tag, index) => ({ ...tag, key: index })));
  const [index, setIndex] = useState(0);
  // setRoutesもspace作ったあととかせんといかんのよ。

  const { isPending: isCreatePostPending, status: createPostStatus } = useMutation({
    mutationKey: [mutationKeys.createPost, currentSpace._id],
  });

  useEffect(() => {
    setRoutes(currentSpace.tags.map((tag, index) => ({ ...tag, key: index })));
  }, [currentSpace.tags.length]);

  const onTabPress = (tab, index) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTagsTableBySpaceIds((prev) => {
      return {
        ...prev,
        [currentSpace._id]: tab,
      };
    });
    setIndex(index);
  };

  const onCreatePostPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    spaceStackNavigation.navigate('CreateNewPostStackNavigator', {
      screen: 'NormalPost',
      params: {
        handleNavigation: () => spaceStackNavigation.goBack(),
      },
    });
  };

  const onItemLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setItemWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const scrollToCenter = () => {
    // const currentIndex = currentSpace.tags.findIndex(
    //   (tag) => tag._id === currentTagsTableBySpaceIds[currentSpace._id]._id
    // );
    if (index !== 0 && index !== 1 && itemWidths.length === currentSpace.tags.length) {
      const itemWidth = itemWidths[index];
      const offset =
        itemWidths.slice(0, index).reduce((sum, width) => sum + width, 0) - (windowWidth / 2 - itemWidth / 2);
      scrollViewRef.current?.scrollToOffset({
        offset: Math.max(0, offset) + 20,
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToCenter();
  }, [index, itemWidths, currentSpace.tags.length]);

  // useEffect(() => {
  //   currentSpace.tags.forEach((tag) => {
  //     console.log('postsByTagId states', queryClient.getQueryData([queryKeys.postsByTagId, tag._id]));
  //   });
  // }, [currentTagsTableBySpaceIds]);

  // useEffect(() => {
  //   setCurrentTagsTableBySpaceIds((prev) => {
  //     return {
  //       ...prev,
  //       [currentSpace._id]: space.tags[0],
  //     };
  //   });
  // }, [space]);

  const renderTab = ({ item, index }) => {
    const isFocused = currentTagsTableBySpaceIds[currentSpace._id]._id === item._id;
    return (
      <View onLayout={(event) => onItemLayout(event, index)}>
        <TouchableOpacity
          // key={route.key}
          activeOpacity={0.7}
          onPress={() => onTabPress(item, index)}
          onLongPress={() => console.log('hello')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: isFocused ? Colors.iconColors[item.color] : 'rgb(40,40,40)',
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
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={{ uri: item.icon?.url }}
              tintColor={'white'}
            />
            <Text numberOfLines={1} style={{ color: 'white', fontSize: 13 }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const createTabViewScene = useCallback((routes: TagType[]) => {
    return SceneMap(
      routes.reduce((acc: Record<string, React.FC<any>>, option: RouteType) => {
        acc[option.key] = () => <Grid tag={option} />;
        return acc;
      }, {})
    );
  }, []);

  const renderScene = useMemo(() => createTabViewScene(routes), [routes]);

  if (!currentTagsTableBySpaceIds) return null;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <LinearGradient
        style={{
          zIndex: 1000,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.2)', 'transparent']}
      >
        <View
          style={{
            flexDirection: 'column',
            paddingTop: 10,
            paddingHorizontal: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
              onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
              activeOpacity={0.7}
            >
              <View style={{ marginRight: 8 }}>
                <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 25 }}>{currentSpace.name}</Text>
              </View>
              <VectorIcon.MCI name='chevron-right' size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={currentSpace?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={{ paddingLeft: 12 }}
          />
        </View>
      </LinearGradient>
      {/* routesはtagsか。 */}
      <TabView
        lazy
        swipeEnabled={false}
        animationEnabled
        style={styles.tabView}
        renderTabBar={() => null}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={(index) => {
          console.log(index);
          setIndex(index);
        }}
      />
      {/* <GridView space={currentSpace} /> */}
    </View>
  );
};

// tagごとにsceneを作る感じだな。

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tabView: {
    width: '100%',
  },
});
