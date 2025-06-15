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
import { currentSpaceAtom, currentTagAtom, momentLogsAtom, logsTableAtom } from '../../../recoil';
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
  const [logsTable] = useRecoilState(logsTableAtom);
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

  console.log('isCreatePostPendingはどう？', isCreatePostPending);

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
    const logCount = logsTable?.[currentSpace._id]?.[item._id];

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
              paddingHorizontal: 12,
              backgroundColor: isFocused ? Colors.iconColors[item.color] : 'rgb(50,50,50)',
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
              style={{ width: 18, height: 18, marginRight: 5 }}
              source={{ uri: item.icon?.url }}
              tintColor={isFocused ? 'white' : 'rgb(170,170,170)'}
            />
            <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(170,170,170)', fontSize: 11 }}>
              {item.name}
            </Text>
            {logCount ? (
              <View
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -6,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  width: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>{logCount}</Text>
              </View>
            ) : null}
            {item.type.length === 1 && item.type[0] === 'photo' ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: -7,
                  right: -8,
                  backgroundColor: 'rgb(50,50,50)',
                  width: 22,
                  height: 22,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ExpoImage
                  style={{ width: 14, height: 14 }}
                  source={require('../../../assets/forApp/photo.png')}
                  contentFit='contain'
                  tintColor='white'
                />
              </View>
            ) : null}
            {item.type.length === 1 && item.type[0] === 'video' ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: -7,
                  right: -8,
                  backgroundColor: 'rgb(50,50,50)',
                  width: 22,
                  height: 22,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ExpoImage
                  style={{ width: 14, height: 14 }}
                  source={require('../../../assets/forApp/video.png')}
                  contentFit='contain'
                  tintColor='white'
                />
              </View>
            ) : null}
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
        <View
          style={{
            height: 75,
            // backgroundColor: 'red'
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: 12,
              paddingTop: 8,
              // paddingBottom: 8,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ flexDirection: 'column' }}
                onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4 }}>
                    <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 25, marginRight: 6 }}>
                      {currentSpace.name}
                    </Text>
                    {!currentSpace.isPublic ? (
                      <Text style={{ color: 'rgb(180,180,180)', fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>
                        Private
                      </Text>
                    ) : null}
                  </View>

                  <VectorIcon.MCI name='chevron-right' size={22} color={Colors.white} />
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                </View> */}
              </TouchableOpacity>

              {isCreatePostPending && <ActivityIndicator size='small' color={Colors.white} />}
            </View>
          </View>
          <SpaceRules space={currentSpace} />
        </View>
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
      <View style={{ position: 'absolute', bottom: 5, alignSelf: 'center' }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          data={currentSpace?.tags}
          renderItem={renderTab}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
          ListHeaderComponent={
            <TouchableOpacity
              style={{
                padding: 5,
                marginRight: 10,
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                width: 32,
                height: 32,
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
                style={{ width: 18, height: 18 }}
                source={require('../../../assets/forApp/ghost.png')}
                contentFit='contain'
                tintColor={Colors.white}
              />
              {momentLogs[currentSpace._id] ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -8,
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
          }
        />
      </View>
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

const SpaceRules: React.FC<{ space: SpaceType }> = ({ space }) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 5 }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{ width: 14, height: 14, marginRight: 6 }}
                source={require('../../../assets/forApp/photo-video.png')}
                contentFit='contain'
                tintColor='white'
              />
              <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>
                {space.contentType === 'photo' ? 'Photo' : space.contentType === 'video' ? 'Video' : 'Photo & Video'}
              </Text>
            </View>
          </View>

          {space.videoLength ? (
            <View
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 4,
                marginRight: 5,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <VectorIcon.II name='play-circle-sharp' size={14} color='white' style={{ marginRight: 6 }} />
                <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>{space.videoLength}s</Text>
              </View>
            </View>
          ) : null}

          <View
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{ width: 14, height: 14, marginRight: 6 }}
                source={require('../../../assets/forApp/ghost.png')}
                contentFit='contain'
                tintColor='white'
              />
              <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>
                {Math.floor(space.disappearAfter / 60)}h {space.disappearAfter % 60}m
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.II
                name='thumbs-up-sharp'
                size={14}
                color={space.isReactionAvailable ? 'white' : 'rgb(100,100,100)'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: space.isReactionAvailable ? 'white' : 'rgb(100,100,100)',
                  fontSize: 11,
                  fontWeight: 'bold',
                }}
              >
                Reactions
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.FD
                name='comments'
                size={14}
                color={space.isCommentAvailable ? 'white' : 'rgb(100,100,100)'}
                style={{ marginRight: 6 }}
              />
              <Text
                style={{
                  color: space.isCommentAvailable ? 'white' : 'rgb(100,100,100)',
                  fontSize: 11,
                  fontWeight: 'bold',
                }}
              >
                Comments
              </Text>
            </View>
          </View>

          {space.isPublic && (
            <View
              style={{ backgroundColor: 'rgb(50,50,50)', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <VectorIcon.II
                  name='person-add'
                  size={14}
                  color={space.isFollowAvailable ? 'white' : 'rgb(100,100,100)'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    color: space.isFollowAvailable ? 'white' : 'rgb(100,100,100)',
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}
                >
                  Following
                </Text>
              </View>
            </View>
          )}

          <View
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{ width: 14, height: 14, marginRight: 6 }}
                source={require('../../../assets/forApp/learning.png')}
                contentFit='contain'
                tintColor='rgb(100,100,100)'
              />
              <Text style={{ color: 'rgb(100,100,100)', fontSize: 11, fontWeight: 'bold' }}>Algorithm</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
