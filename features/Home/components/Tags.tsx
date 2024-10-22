import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations';
import { TagType } from '../../../types';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, logsTableAtom, currentTagAtom } from '../../../recoil';
import { Header } from './Header';
import { Colors } from '../../../themes';
import * as Haptics from 'expo-haptics';

const tagOuterWidth = Dimensions.get('window').width / 4;
const tagSquareWidth = tagOuterWidth * 0.63;

//ここでFlatListのheaderでfeatureなりをやるのは設計面で見ても違和感ある。
//配列で展開するほうがいいだろうな。。。
export const Tags = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [logsTable, setLogsTable] = useRecoilState(logsTableAtom);
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  const onTagPress = (tag: TagType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentTag(tag);
    setLogsTable((previous) => {
      return {
        ...previous,
        [currentSpace._id]: {
          ...previous[currentSpace._id],
          [tag._id]: 0,
        },
      };
    });
    homeStackNavigation.navigate('SpaceStackNavigator', {
      screen: 'Space',
      params: { space: currentSpace },
    });
  };

  const renderItem = ({ item }: { item: TagType }) => {
    const isFocused = currentTag?._id === item._id;
    const tagLogs = currentSpace && logsTable[currentSpace._id] && logsTable[currentSpace._id][item._id];
    return (
      <View style={{ width: tagOuterWidth, height: 95, alignItems: 'center', marginBottom: 5 }}>
        <TouchableOpacity
          style={{
            width: tagSquareWidth,
            aspectRatio: 1,
            borderRadius: 16,
            backgroundColor: '#efefef',
            marginBottom: 5,
          }}
          activeOpacity={0.7}
          onPress={() => onTagPress(item)}
        >
          <View
            style={{
              width: tagSquareWidth,
              aspectRatio: 1,
              borderRadius: 16,
              backgroundColor: Colors.backgroundColors[item.color],
              // backgroundColor: 'rgb(40,40,40)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ExpoImage
              style={{
                width: tagSquareWidth * 0.45,
                aspectRatio: 1,
              }}
              source={{ uri: item.icon?.url }}
              // contentFit='cover'
              tintColor={Colors.iconColors[item.color]}
              // tintColor={'white'}
            />
            {tagLogs ? (
              <View
                style={{
                  backgroundColor: 'black',
                  width: 28,
                  height: 28,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -8,
                  right: -8,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    // position: 'absolute',
                    // top: -5,
                    // right: -5,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>{tagLogs}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
        <Text numberOfLines={2} style={{ color: 'white', fontSize: 11, textAlign: 'center', fontWeight: '700' }}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={{ paddingLeft: 15, paddingTop: 10 }}>
        <Text style={{ color: 'rgb(150,150,150)', marginBottom: 5 }}>Tags</Text>
      </View> */}
      {/* {currentSpace.tags.map((tag, index) => {
        const isFocused = currentTag?._id === tag._id;
        const tagLogs = currentSpace && logsTable[currentSpace._id] && logsTable[currentSpace._id][tag._id];
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            style={{
              paddingVertical: 8,
              paddingLeft: 10,
              paddingRight: 5,
            }}
            onPress={() => onTagPress(tag)}
            onLongPress={() => console.log('tag long pressed')}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // paddingVertical: 8,
                paddingLeft: 5,
                paddingRight: 10,
                borderRadius: 8,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ExpoImage
                  style={{
                    width: 20,
                    aspectRatio: 1,
                    marginRight: 10,
                  }}
                  source={{ uri: tag.icon?.url }}
                  contentFit='cover'
                  tintColor={'white'}
                />
                <View>
                  <Text numberOfLines={1} style={{ color: 'white', fontSize: 15 }}>
                    {tag.name}
                  </Text>
                </View>
              </View>
              {tagLogs ? (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>{tagLogs}</Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })} */}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 5 }}
        data={currentSpace.tags}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
