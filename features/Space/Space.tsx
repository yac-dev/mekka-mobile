import { useEffect, useContext, useRef } from 'react';
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
import { SpaceRootStackNavigatorProp } from '../../navigations';

const Tab = createMaterialTopTabNavigator();

export const Space = () => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const spaceNavigation = useNavigation<SpaceRootStackNavigatorProp>();
  const { viewPostsType, setViewPostsType, space, createPostResult } = useContext(SpaceRootContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const route = useRoute();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const currentIndex = currentSpace?.tags.findIndex((tag) => currentTag._id === tag._id);
    scrollViewRef.current.scrollToOffset({
      offset: (currentIndex - 1) * 120,
      animated: true,
    });
  }, [currentTag]);
  // currentTag
  const onTabPress = (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTag(tab);
    spaceNavigation.navigate('Space', {
      screen: `Posts_${tab._id}`,
    });
    // そっか、ここでtab移動をせなあかんな。
    // spaceRootStackNavigation.navigate('TagsTopTabNavigator', {
    //   screen: `Tag_${tab._id}`,
    //   params: {
    //     screen: 'TagScreenTopTabNavigator',
    //     params: { screen: viewPostsType === 'grid' ? 'GridView' : 'MapView' },
    //   },
    // });
  };

  const onGridViewPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewPostsType('grid');
    // spaceRootStackNavigation.navigate('TagsTopTabNavigator', {
    //   screen: `Tag_${currentTag._id}`,
    //   params: { screen: 'TagScreenTopTabNavigator', params: { screen: 'GridView' } },
    // });
  };

  const onMapViewPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewPostsType('map');
    // spaceRootStackNavigation.navigate('TagsTopTabNavigator', {
    //   screen: `Tag_${currentTag._id}`,
    //   params: { screen: 'TagScreenTopTabNavigator', params: { screen: 'MapView' } },
    // });
  };

  const onCreatePostPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // spaceRootStackNavigation.navigate('CreateNewPostStackNavigator');
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
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 20 }}>
      {/* 上tabは別でcomponent分けた方がいい。 ただ、navigatorにはしなくていいよ。 */}
      <View style={{ paddingTop: 30, flexDirection: 'row' }}>
        <AppButton.Icon
          onButtonPress={() => spaceNavigation.goBack()}
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
      {/* tabごとにPostsのcompnentを使うのね。 */}
      {/* posts componentが、、、最初のgeneralぶんしか表示されん。。。なぜだ。。。 */}
      <Tab.Navigator
        //最初のroutingをせっていしないとあかんよ。
        tabBar={() => null}
        initialRouteName={`Posts_${currentTag._id}`}
        // これ上手くいかんな。。。
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
          animationEnabled: false,
        })}
      >
        {currentSpace?.tags.map((tag: TagType, index: number) => (
          <Tab.Screen key={index} name={`Posts_${tag._id}`} options={{ title: tag.name }}>
            {() => <Posts tag={tag} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
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
      <ViewPostsTypeToggleButton onGridViewPress={onGridViewPress} onMapViewPress={onMapViewPress} />
    </View>
  );
};
