import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ScrollView, FlatList } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations';
import { urls } from '../../../settings';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { AppButton } from '../../../components';

export const Header = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  const handleInvite = async () => {
    Share.share({
      title: 'Share Var',
      message: `Access here to download Var: ${urls.appStore}${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!item.value && (
          <View style={{ position: 'absolute', right: 0, top: 0, zIndex: 10 }}>
            <VectorIcon.MCI name='slash-forward' color={'red'} size={15} />
          </View>
        )}
        {item.icon}
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
        activeOpacity={0.7}
      >
        <View style={{ marginRight: 5 }}>
          <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 23 }}>{currentSpace.name}</Text>
        </View>
        <VectorIcon.MI name='chevron-right' size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

{
  /* <View style={{ marginRight: 20 }}>
        <FlatList
          numColumns={2}
          scrollEnabled={false}
          data={[
            {
              spec: 'visibility',
              value: currentSpace.isPublic,
              icon: <VectorIcon.MI name='public' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />,
            },
            {
              spec: 'ads',
              value: false,
              icon: <VectorIcon.FD name='megaphone' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />,
            },
            {
              spec: 'reactions',
              value: currentSpace.isReactionAvailable,
              icon: <VectorIcon.MCI name='thumb-up' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />,
            },
            {
              spec: 'comments',
              value: currentSpace.isCommentAvailable,
              icon: (
                <VectorIcon.MCI
                  name='comment-multiple'
                  color={'rgb(150,150,150)'}
                  size={15}
                  style={{ marginRight: 5 }}
                />
              ),
            },
          ]}
          renderItem={renderItem}
          keyExtractor={(item) => item.spec}
        />
      </View> */
}
