import React, { useReducer, useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp } from '@react-navigation/native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetSpacesState } from '../hooks';
import { SpaceType } from '../../../types';
import { VectorIcon } from '../../../Icons';
import { useNavigation } from '@react-navigation/native';
import { DiscoverStackNavigatorProp } from '../../../navigations/DiscoverStackNavigator';

const Discover: React.FC = () => {
  const discoverStackNavigation = useNavigation<DiscoverStackNavigatorProp>();
  const { apiResult, requestApi } = useGetSpacesState();

  useEffect(() => {
    requestApi();
  }, []);

  const onSpacePress = (space: SpaceType) => {
    discoverStackNavigation.navigate('SpaceDetailStackNavigator', {
      screen: 'SpaceDetail',
      params: { _id: space._id },
    });
  };

  // spaceのtypeがphotoの場合は、必要なものが media type photoとmoment、
  // spaceのtypeがvideoの場合は、必要なものがvideo,
  const renderItem = ({ item }: { item: SpaceType }) => {
    const renderLabels = (space: SpaceType) => {
      if (space.contentType === 'photo') {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
              <Text style={{ color: 'white' }}>Photo</Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                padding: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
              <Text style={{ color: 'white' }}>23h59m</Text>
            </View>
          </View>
        );
      } else if (space.contentType === 'video') {
        return (
          <ScrollView horizontal>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>Video</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>23h59m</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 5 }} />
                <Text style={{ color: 'white' }}>2m30s</Text>
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>Photo</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>Video</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>23h59m</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(50,50,50)',
                  borderRadius: 100,
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='image' size={13} color={'white'} style={{ marginRight: 3 }} />
                <Text style={{ color: 'white' }}>2m30s</Text>
              </View>
            </View>
          </ScrollView>
        );
      }
    };
    // ここをreusableにしたいよね。どうするか。

    return (
      <TouchableOpacity style={styles.itemInnerContainer} activeOpacity={0.5} onPress={() => onSpacePress(item)}>
        <ExpoImage style={styles.spaceIcon} source={{ uri: item.icon }} contentFit='cover' />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.spaceName}>{item.name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
          {renderLabels(item)}
          {/* ここにlabelを表示していく。 */}
          {/* <VectorIcon.II name='image' size={13} color={'black'} style={{ marginRight: 3 }} />
                <VectorIcon.OI name='video' size={13} color={'black'} /> */}
        </View>
      </TouchableOpacity>
    );
  };

  if (apiResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={apiResult.data?.spaces}
        renderItem={renderItem}
        // estimatedItemSize={200}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  spaceName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  spaceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  description: {
    color: 'rgb(170,170,170)',
    width: 150,
    marginBottom: 10,
  },
});
