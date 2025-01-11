import { useEffect, useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  LayoutChangeEvent,
  Dimensions,
  StyleSheet,
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
import { mutationKeys } from '../../../query';
import { Colors } from '../../../themes';
import { RouteType } from '../../Home/components/CurrentSpace';
import { SpaceType } from '../../../types';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import PagerView from 'react-native-pager-view';
import { viewPostsTypeAtomFamily } from '../atoms';
import { currentTagsTableBySpaceIdsAtom } from '../../../recoil';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, VibrancyView } from '@react-native-community/blur';

// id毎でqueryをcacheしたいのよね。
// type ISpace = NativeStackScreenProps<SpaceStackNavigatorParams, 'Space'>;

const windowWidth = Dimensions.get('window').width;

type ISpace = {
  space: SpaceType;
};

export const Space: React.FC<ISpace> = ({ space }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [currentTagsTableBySpaceIds, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const scrollViewRef = useRef(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const viewPostsType = useRecoilValue(viewPostsTypeAtomFamily(space._id));

  const { isPending: isCreatePostPending, status: createPostStatus } = useMutation({
    mutationKey: [mutationKeys.createPost, currentSpace._id],
  });

  const onTabPress = (tab) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTagsTableBySpaceIds((prev) => {
      return {
        ...prev,
        [currentSpace._id]: tab,
      };
    });
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

  // useEffect(() => {
  //   setCurrentTagsTableBySpaceIds((prev) => {
  //     return {
  //       ...prev,
  //       [currentSpace._id]: space.tags[0],
  //     };
  //   });
  // }, [space]);

  const pagerViewRef = useRef<PagerView>(null);

  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);

  const onCurrentPostIndexChange = (index: number) => {
    setCurrentPostIndex(index);
  };

  useEffect(() => {
    pagerViewRef.current?.setPage(viewPostsType === 'grid' ? 0 : 1);
  }, [viewPostsType]);

  const renderTab = ({ item, index }) => {
    const isFocused = currentTagsTableBySpaceIds[currentSpace._id]._id === item._id;
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
              paddingHorizontal: 10,
              backgroundColor: isFocused ? Colors.iconColors[item.color] : 'rgb(70,70,70)',
              borderRadius: 130,
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

  if (!currentTagsTableBySpaceIds) return null;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50 }}
      /> */}

      {/* <BlurView
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
        blurType='light'
        blurAmount={20}
        reducedTransparencyFallbackColor='white'
      /> */}

      <BlurView
        style={{
          zIndex: 1000,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        blurAmount={0}
        reducedTransparencyFallbackColor='white'
      >
        <View
          style={{
            flexDirection: 'column',
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}
              onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
              activeOpacity={0.7}
            >
              <View style={{ marginRight: 5 }}>
                <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 27 }}>{space.name}</Text>
              </View>
              <VectorIcon.MI name='chevron-right' size={23} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={space?.tags}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={{ paddingLeft: 20, paddingTop: 6 }}
          />
        </View>
      </BlurView>

      <GridView space={space} />
      {/* <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
        onButtonPress={() => onCreatePostPress()}
        isPressDisabled={createPostStatus === 'pending' ? true : false} // createのstatusをここに足す感じだな。
        hasShadow
      >
        {createPostStatus === 'pending' ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <VectorIcon.II name='add' size={32} color={'white'} />
        )}
      </AppButton.Icon>
      <ViewPostsTypeToggleButton space={space} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
