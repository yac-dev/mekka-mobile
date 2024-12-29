import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Icons } from '../../../Icons/images';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '../../../themes/colors';
import { SpaceType } from '../../../types';
import { useRecoilState } from 'recoil';

type ViewPostsTypeToggleButtonProps = {
  viewPostsType: 'grid' | 'region';
  onPostsTypeChangePress: (postsType: 'grid' | 'region') => void;
};

export const ViewPostsTypeToggleButton: React.FC<ViewPostsTypeToggleButtonProps> = ({
  viewPostsType,
  onPostsTypeChangePress,
}) => {
  const onGridViewPress = () => {
    onPostsTypeChangePress('grid');
  };

  const onRegionViewPress = () => {
    onPostsTypeChangePress('region');
  };

  console.log(viewPostsType);

  return (
    <View style={[styles.container, styles.shadow]}>
      <TouchableOpacity
        style={{
          marginRight: 15,
          padding: 5,
          backgroundColor: viewPostsType === 'grid' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'grid' ? 12 : 0,
        }}
        activeOpacity={0.7}
        onPress={() => onGridViewPress()}
      >
        <VectorIcon.MCI name='dots-grid' color='white' size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: viewPostsType === 'region' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'region' ? 12 : 0,
          // marginRight: 15,
        }}
        activeOpacity={0.7}
        onPress={() => onRegionViewPress()}
      >
        <ExpoImage
          style={{ width: 25, height: 25 }}
          source={Icons.globe}
          contentFit='contain'
          tintColor={Colors.white}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: viewPostsType === 'region' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'region' ? 12 : 0,
        }}
        activeOpacity={0.7}
        onPress={() => onRegionViewPress()}
      >
        <ExpoImage
          style={{ width: 25, height: 25 }}
          source={Icons.globe}
          contentFit='contain'
          tintColor={Colors.white}
        />
      </TouchableOpacity> */}
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
  shadow: {
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
  },
});
