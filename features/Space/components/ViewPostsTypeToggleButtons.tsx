import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SpaceRootContext } from '../providers/SpaceRootProvider';
import { CurrentTagContext } from '../../../providers';
import { VectorIcon } from '../../../Icons';
import { Icons } from '../../../Icons/images';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { SpaceRootStackNavigatorProp } from '../../../navigations';
import { Colors } from '../../../themes/colors';

export const ViewPostsTypeToggleButton = () => {
  const navigation = useNavigation<SpaceRootStackNavigatorProp>();
  const { viewPostsType, setViewPostsType } = useContext(SpaceRootContext);
  const { currentTag } = useContext(CurrentTagContext);

  const onGridIconPress = () => {
    setViewPostsType('grid');
    navigation.navigate('SpaceBottomTabNavigator', {
      screen: 'TagsTopTabNavigator',
      params: { screen: `Tag_${currentTag._id}`, params: { screen: 'GridView' } },
    });
  };

  const onGlobeIconPress = () => {
    setViewPostsType('map');
    navigation.navigate('SpaceBottomTabNavigator', {
      screen: 'TagsTopTabNavigator',
      params: { screen: `Tag_${currentTag._id}`, params: { screen: 'MapView' } },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginRight: 15,
          padding: 5,
          backgroundColor: viewPostsType === 'grid' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'grid' ? 12 : 0,
        }}
        onPress={onGridIconPress}
      >
        <VectorIcon.MCI name='dots-grid' color='white' size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: viewPostsType === 'map' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'map' ? 12 : 0,
        }}
        onPress={onGlobeIconPress}
      >
        <ExpoImage
          style={{ width: 25, height: 25 }}
          source={Icons.globe}
          contentFit='contain'
          tintColor={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: 'rgb(50,50,50)',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
