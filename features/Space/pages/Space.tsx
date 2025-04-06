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
import { useRecoilValue } from 'recoil';
import { createPostResultAtomFamily } from '../../../api/atoms';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, currentTagAtom, momentLogsAtom } from '../../../recoil';
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
import { Moments } from '../../Home/components/Moments';
import { MomentSkelton } from '../../../components/Skelton';
import { Icons } from '../../../Icons/images';
// id毎でqueryをcacheしたいのよね。
// type ISpace = NativeStackScreenProps<SpaceStackNavigatorParams, 'Space'>;

const windowWidth = Dimensions.get('window').width;

type ISpace = {
  space: SpaceType;
  openChooseViewBottomSheet: (index: number) => void;
  openAddNewPostMenuBottomSheet: (index: number) => void;
  currentViewIndex: number;
};

export type RouteType = TagType & { key: number };

export const Space: React.FC<ISpace> = ({
  space,
  openChooseViewBottomSheet,
  openAddNewPostMenuBottomSheet,
  currentViewIndex,
}) => {
  const queryClient = useQueryClient();
  const [momentLogs] = useRecoilState(momentLogsAtom);
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

  const onChangeTab = (index: number) => {
    setIndex(index);
    setCurrentTagsTableBySpaceIds((prev) => {
      return {
        ...prev,
        [currentSpace._id]: currentSpace.tags[index],
      };
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
        offset: Math.max(0, offset),
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
              backgroundColor: isFocused ? Colors.iconColors[item.color] : 'rgb(30,30,30)',
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
              tintColor={isFocused ? 'white' : 'rgb(170,170,170)'}
            />
            <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(170,170,170)', fontSize: 11 }}>
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
        colors={[
          'rgba(0,0,0,0.9)',
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,0.7)',
          'rgba(0,0,0,0.6)',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.4)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.2)',
          'rgba(0,0,0,0.1)',
          'transparent',
        ]}
      >
        <View style={{ height: 105 }}>
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: 12,
              paddingTop: 8,
              paddingBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ flexDirection: 'column' }}
                onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 25, marginBottom: 4 }}>
                    {currentSpace.name}
                  </Text>

                  <VectorIcon.MCI name='chevron-right' size={22} color={Colors.white} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {!currentSpace.isPublic ? (
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Private</Text>
                  ) : null}
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginLeft: !currentSpace.isPublic ? 8 : 0,
                    }}
                  >
                    {currentSpace.totalMembers} members
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <TouchableOpacity
                  style={{
                    marginRight: 10,
                    width: 38,
                    height: 38,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
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
                    openAddNewPostMenuBottomSheet(0);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                  }}
                >
                  <VectorIcon.MCI name='plus' size={25} color={'white'} />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
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
                  onPress={() => {
                    homeStackNavigation.navigate('MomentsStackNavigator');
                  }}
                  activeOpacity={0.7}
                >
                  <ExpoImage
                    style={{ width: 20, height: 20 }}
                    source={require('../../../assets/forApp/ghost.png')}
                    contentFit='contain'
                    tintColor={Colors.white}
                  />
                  {momentLogs[currentSpace._id] ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: -3,
                        right: -5,
                        width: 16,
                        height: 16,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 10 }}>{momentLogs[currentSpace._id]}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    width: 38,
                    height: 38,
                    backgroundColor: 'rgb(50,50,50)',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
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
                  onPress={() => {
                    openChooseViewBottomSheet(0);
                  }}
                  activeOpacity={0.7}
                >
                  {currentViewIndex === 0 ? (
                    <VectorIcon.FI name='nav-icon-grid' size={15} color={'white'} />
                  ) : (
                    <ExpoImage
                      style={{ width: 20, height: 20 }}
                      source={Icons.globe}
                      contentFit='contain'
                      tintColor={Colors.white}
                    />
                  )}
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={currentSpace?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
        {/* <View
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={currentSpace?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View> */}
      </LinearGradient>
      <TabView
        lazy
        swipeEnabled={false}
        animationEnabled
        style={styles.tabView}
        renderTabBar={() => null}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={(index) => {
          onChangeTab(index);
        }}
      />
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
