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
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ width: 70, height: 70, borderRadius: 40, marginRight: 20 }}
          onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
          activeOpacity={0.7}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 40 }}
            source={{ uri: currentSpace.icon }}
            contentFit='cover'
          />
        </TouchableOpacity>
        <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 23 }}>{currentSpace.name}</Text>
      </View>
      <TouchableOpacity
        onPress={handleInvite}
        style={{ backgroundColor: 'rgb(70,70,70)', padding: 5, borderRadius: 80, width: 60 }}
      >
        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>Invite</Text>
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
