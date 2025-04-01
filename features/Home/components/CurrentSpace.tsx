import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { Header, Specs, Features, Tags } from '.';
import { AppButton } from '../../../components';
import { useRecoilState } from 'recoil';
import { authAtom, currentSpaceAtom, currentTagsTableBySpaceIdsAtom, mySpacesAtom } from '../../../recoil';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { momentLogsAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { queryKeys, getLogsByUserId, updateSpaceCheckedInDate } from '../../../query';
import * as Haptics from 'expo-haptics';
import { currentUserBottomSheetRef } from '../../../Refs';
import { Space } from '../../Space';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SpacesHeader } from '.';
import { SpaceType, TagType } from '../../../types';
import { logsTableAtom } from '../../../recoil';
import { Colors } from '../../../themes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { HomeDrawerNavigatorProps, HomeStackNavigatorProps } from '../navigations';
import { currentTagAtomFamily } from '../../../recoil';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../../../query';
import { GetNotificationByUserIdOutput, UpdateSpaceCheckedInDateInputType } from '../../../query/types';
import { useQueryClient } from '@tanstack/react-query';
const windowWidth = Dimensions.get('window').width;

type CurrentSpaceProps = {
  openAuthMenuBottomSheet: (index: number) => void;
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  openChooseViewBottomSheet: (index: number) => void;
  openAddNewPostMenuBottomSheet: (index: number) => void;
  currentViewIndex: number;
};

export type RouteType = SpaceType & { key: number };

// tan stack使うかね？
export const CurrentSpace: React.FC<CurrentSpaceProps> = ({
  openAuthMenuBottomSheet,
  openAddNewSpaceMenuBottomSheet,
  openChooseViewBottomSheet,
  openAddNewPostMenuBottomSheet,
  currentViewIndex,
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateSpaceCheckedInMutation } = useMutation({
    mutationKey: [mutationKeys.updateSpaceCheckedInDate],
    mutationFn: (input: UpdateSpaceCheckedInDateInputType) => updateSpaceCheckedInDate(input),
  });
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [routes, setRoutes] = useState<RouteType[]>(mySpaces.map((space, index) => ({ ...space, key: index })));
  const [index, setIndex] = useState<number>(0);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const homeDrawerNavigation = useNavigation<HomeDrawerNavigatorProps>();
  // const [routes, setRoutes] = useState<SpaceType[]>(mySpaces);
  const [auth] = useRecoilState(authAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [momentLogs] = useRecoilState(momentLogsAtom);
  const [logsTable] = useRecoilState(logsTableAtom);
  // const [currentTag, setCurrentTag] = useState<TagType>(currentSpace.tags[0]);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const scrollViewRef = useRef(null);
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);

  const data = queryClient.getQueryData<GetNotificationByUserIdOutput>([queryKeys.notifications, auth]);
  console.log('data', JSON.stringify(data, null, 2));

  // const scrollToCenter = () => {
  //   const currentIndex = currentSpace.tags.findIndex((tag) => tag._id === currentTagBySpaceId._id);
  //   if (currentIndex !== 0 && currentIndex !== 1 && itemWidths.length === currentSpace.tags.length) {
  //     const itemWidth = itemWidths[currentIndex];
  //     const offset =
  //       itemWidths.slice(0, currentIndex).reduce((sum, width) => sum + width, 0) - (windowWidth / 2 - itemWidth / 2);
  //     scrollViewRef.current?.scrollToOffset({
  //       offset: Math.max(0, offset),
  //       animated: true,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   scrollToCenter();
  // }, [currentTagBySpaceId, itemWidths, currentSpace.tags.length]);

  // console.log(JSON.stringify(currentTagsTableBySpaceIds, null, 2));

  useEffect(() => {
    setRoutes(mySpaces.map((space, index) => ({ ...space, key: index })));
  }, [mySpaces]);

  const scrollToCenter = () => {
    if (!currentTagsTableBySpaceIds) return;
    const currentIndex = currentSpace.tags.findIndex(
      (tag) => tag._id === currentTagsTableBySpaceIds[currentSpace._id]._id
    );
    if (currentIndex !== 0 && currentIndex !== 1 && itemWidths.length === currentSpace.tags.length) {
      const itemWidth = itemWidths[currentIndex];
      const offset =
        itemWidths.slice(0, currentIndex).reduce((sum, width) => sum + width, 0) - (windowWidth / 2 - itemWidth / 2);
      scrollViewRef.current?.scrollToOffset({
        offset: Math.max(0, offset) + 20,
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToCenter();
  }, [currentTagsTableBySpaceIds, itemWidths, currentSpace.tags.length]);

  const { isRefetching: isRefetchingMySpaces } = useQuery({
    queryKey: [queryKeys.mySpaces, auth],
  });
  const { isRefetching: isRefetchingLogs } = useQuery({
    queryKey: [queryKeys.logs, auth],
  });

  const onTabPress = (tab: TagType) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTagsTableBySpaceIds((prev) => {
      return {
        ...prev,
        [currentSpace._id]: tab,
      };
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

  const onSpacePress = (space: SpaceType, index: number) => {
    setCurrentSpace(space);
    setIndex(index);
    updateSpaceCheckedInMutation({ spaceId: space._id, userId: auth._id });
  };

  // const onAddNewSpacePress = () => {
  //   openAddNewSpaceMenuBottomSheet(0);
  // };

  const renderItem = ({ item, index }: { item: SpaceType; index: number }) => {
    const isFocused = currentSpace._id === item._id;
    const momentLogsCount = momentLogs[item._id] || 0;
    const logs =
      logsTable[item._id] && Object.values(logsTable[item._id]).reduce((accumlator, logs) => accumlator + logs, 0);
    logsTable[item._id] && Object.values(logsTable[item._id]).reduce((accumlator, logs) => accumlator + logs, 0);

    const totalLogs = logs + momentLogsCount;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={item._id}
        style={{
          marginRight: 8,
          borderBottomWidth: isFocused ? 2 : 0,
          borderBottomColor: 'white',
          paddingVertical: 10,
        }}
        onPress={() => onSpacePress(item, index)}
        onLongPress={() => {
          if (currentSpace._id === item._id) {
            homeStackNavigation.navigate('SpaceInfoStackNavigator');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        }}
      >
        <View
          style={{
            width: 30,
            aspectRatio: 1,
            borderRadius: 22.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 22.5 }}
            source={{ uri: item.icon }}
            contentFit='contain'
          />
          {totalLogs ? (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 12,
                backgroundColor: 'black',
                position: 'absolute',
                top: -5,
                right: -5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                }}
              >
                <Text style={{ color: 'white', fontSize: 10 }}>{totalLogs}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const renderTab = ({ item, index }) => {
    const isFocused = currentTagsTableBySpaceIds[currentSpace._id] === item._id;
    return (
      <View onLayout={(event) => onItemLayout(event, index)}>
        <TouchableOpacity
          // key={route.key}
          activeOpacity={0.7}
          onPress={() => onTabPress(item)}
          onLongPress={() => console.log('hello')}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              backgroundColor: isFocused ? Colors.iconColors[item.color] : undefined,
              borderRadius: 130,
            }}
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 5 }}
              source={{ uri: item.icon?.url }}
              tintColor={isFocused ? 'white' : 'rgb(100,100,100)'}
            />
            <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(100,100,100)', fontSize: 13 }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onIndexChange = (index: number) => {
    setCurrentSpace(mySpaces[index]);
  };

  const createTabViewScene = useCallback((routes: SpaceType[]) => {
    return SceneMap(
      routes.reduce((acc: Record<string, React.FC<any>>, option: RouteType) => {
        acc[option.key as number] = () => (
          <Space
            space={option}
            openChooseViewBottomSheet={openChooseViewBottomSheet}
            openAddNewPostMenuBottomSheet={openAddNewPostMenuBottomSheet}
            currentViewIndex={currentViewIndex}
          />
        );
        return acc;
      }, {})
    );
  }, []);

  const renderScene = useMemo(() => createTabViewScene(routes), [routes]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* <SpacesHeader /> */}

      <View style={styles.spacesContainer}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 32,
              aspectRatio: 1,
              borderRadius: 25,
              backgroundColor: 'rgb(50,50,50)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              // openAddNewSpaceMenuBottomSheet(0);
              homeDrawerNavigation.toggleDrawer();
            }}
          >
            <VectorIcon.II name='menu' color={Colors.white} size={18} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={mySpaces}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 32,
            aspectRatio: 1,
            borderRadius: 25,
            backgroundColor: 'rgb(50,50,50)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            // openAddNewSpaceMenuBottomSheet(0);
            homeDrawerNavigation.toggleDrawer();
          }}
        >
          <VectorIcon.MI name='notifications-none' color={Colors.white} size={18} />
        </TouchableOpacity> */}
        <View style={{ width: 30, height: 30, marginLeft: 8 }}>
          <AppButton.Icon
            onButtonPress={() => {
              homeStackNavigation.navigate('Notifications');
            }}
            customStyle={{ width: '100%', height: '100%', backgroundColor: 'rgb(50,50,50)' }}
            hasShadow={false}
          >
            <VectorIcon.MCI name='bell' size={16} color={Colors.white} />
          </AppButton.Icon>
          {auth.hasUnreadNotification && (
            <View
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 12,
                height: 12,
                borderRadius: 8,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: 'red' }}></View>
            </View>
          )}
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: 'column',
          paddingTop: 15,
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}
            onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
            activeOpacity={0.7}
          >
            <View style={{ marginRight: 5 }}>
              <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 27 }}>{currentSpace.name}</Text>
            </View>
            <VectorIcon.MI name='chevron-right' size={23} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 20, paddingBottom: 10 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          data={currentSpace?.tags}
          renderItem={renderTab}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
      </View> */}
      <TabView
        lazy
        animationEnabled={false}
        swipeEnabled={false}
        style={styles.tabView}
        renderTabBar={() => null}
        renderScene={renderScene}
        navigationState={{ index, routes }}
        onIndexChange={(index) => {
          console.log(index);
          setIndex(index);
        }}
      />
      {/* <Header />
      <Space /> */}

      {/* </ScrollView> */}
      {/* <Features />
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 30, right: 20 }}
        activeOpacity={0.7}
        onPress={() => {
          openAddNewPostMenuBottomSheet(0);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
      >
        <ExpoImage source={{ uri: currentSpace.icon }} style={{ width: 48, height: 48, borderRadius: 30 }} />
        <AddIcon />
      </TouchableOpacity> */}
    </SafeAreaView>
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

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const styles = StyleSheet.create({
  container: {
    // flex: 9,
    flex: 1,
  },
  spacesContainer: {
    backgroundColor: 'black',
    // flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: 'rgb(40,40,40)',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgb(100,100,100)',
    width: '100%',

    // borderBottomWidth: 0.3,
    // borderBottomColor: 'white',
  },
  divider: {
    width: '90%',
    backgroundColor: 'rgb(80,80,80)',
    height: 0.3,
    alignSelf: 'center',
  },
  tabView: {
    width: '100%',
  },
});
