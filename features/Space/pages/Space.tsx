import { useEffect, useContext, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, LayoutChangeEvent, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Posts, ViewPostsTypeToggleButton } from '../components';
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

// id毎でqueryをcacheしたいのよね。
type ISpace = NativeStackScreenProps<SpaceStackNavigatorParams, 'Space'>;

const windowWidth = Dimensions.get('window').width;

export const Space: React.FC<ISpace> = ({ route }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const createPostResult = useRecoilValue(createPostResultAtomFamily(route.params.space._id));
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const scrollViewRef = useRef(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);

  const { isPending: isCreatePostPending, status: createPostStatus } = useMutation({
    mutationKey: [mutationKeys.createPost, currentSpace._id],
  });

  const onTabPress = (tab) => {
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTag(tab);
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
    const currentIndex = currentSpace.tags.findIndex((tag) => tag._id === currentTag._id);
    if (currentIndex !== 0 && currentIndex !== 1 && itemWidths.length === currentSpace.tags.length) {
      const itemWidth = itemWidths[currentIndex];
      const offset =
        itemWidths.slice(0, currentIndex).reduce((sum, width) => sum + width, 0) - (windowWidth / 2 - itemWidth / 2);
      scrollViewRef.current?.scrollToOffset({
        offset: Math.max(0, offset) + 44,
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToCenter();
  }, [currentTag, itemWidths, currentSpace.tags.length]);

  const renderTab = ({ item, index }) => {
    const isFocused = currentTag._id === item._id;
    return (
      <View onLayout={(event) => onItemLayout(event, index)}>
        <TouchableOpacity
          key={route.key}
          activeOpacity={0.7}
          onPress={() => onTabPress(item)}
          onLongPress={() => console.log('hello')}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
            }}
          >
            <View
              style={{
                backgroundColor: isFocused ? Colors.iconColors[item.color] : undefined,
                width: 30,
                height: 30,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <ExpoImage
                style={{ width: 20, height: 20 }}
                source={{ uri: item.icon?.url }}
                tintColor={isFocused ? 'white' : 'rgb(100,100,100)'}
              />
            </View>
            <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(100,100,100)', fontSize: 13 }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
        <Posts space={route.params.space} />
        <AppButton.Icon
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
        <ViewPostsTypeToggleButton space={route.params.space} />
      </View>
    </SafeAreaView>
  );
};
