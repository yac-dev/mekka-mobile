import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CurrentSpaceContext, LogsTableContext, CurrentTagContext } from '../../../providers';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations';
import { TagType } from '../../../types';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

export const Channels = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { logsTable, setLogsTable } = useContext(LogsTableContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  const onTagPress = (tag: TagType) => {
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

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 15, paddingTop: 10 }}>
        <Text style={{ color: 'rgb(150,150,150)', marginBottom: 5 }}>Channels</Text>
      </View>
      {currentSpace.tags.map((tag, index) => {
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
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
