import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, logsTableAtom, momentLogsAtom, mySpacesAtom } from '../../../recoil/atoms';
import { SpaceType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';

export const RegionView = () => {
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [logsTable, setLogsTable] = useRecoilState(logsTableAtom);

  const onSpacePress = (item: SpaceType, index: number) => {
    setCurrentSpace(item);
  };

  const renderItem = ({ item, index }: { item: SpaceType; index: number }) => {
    const isFocused = currentSpace._id === item._id;
    const momentLogsCount = momentLogs[item._id] || 0;
    const logs =
      logsTable[item._id] && Object.values(logsTable[item._id]).reduce((accumlator, logs) => accumlator + logs, 0);
    logsTable[item._id] && Object.values(logsTable[item._id]).reduce((accumlator, logs) => accumlator + logs, 0);

    const totalLogs = logs + momentLogsCount;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={item._id}
        style={{
          marginRight: 8,
          borderBottomWidth: isFocused ? 2 : 0,
          borderBottomColor: 'white',
          paddingVertical: 10,
        }}
        onPress={() => onSpacePress(item, index)}
      >
        <View
          style={{
            width: 30,
            aspectRatio: 1,
            borderRadius: 22.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 22.5 }}
            source={{ uri: item.icon }}
            contentFit='contain'
          />
          {totalLogs ? (
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 12,
                backgroundColor: 'black',
                position: 'absolute',
                top: -5,
                right: -5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                }}
              >
                <Text style={{ color: 'white', fontSize: 10 }}>{totalLogs}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.spacesContainer}>
        <FlatList
          data={mySpaces}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: 32,
                  aspectRatio: 1,
                  borderRadius: 25,
                  backgroundColor: 'rgb(50,50,50)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // openAddNewSpaceMenuBottomSheet(0);
                  console.log('home');
                }}
              >
                <VectorIcon.II name='home' color={Colors.white} size={18} />
                <View
                  style={{
                    backgroundColor: 'black',
                    width: 18,
                    height: 18,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: -4,
                    right: -5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 10,
                      height: 10,
                      borderRadius: 20,
                    }}
                  >
                    <VectorIcon.II name='add' size={11} color={'black'} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacesContainer: {
    backgroundColor: 'black',
    // flex: 1,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: 'rgb(40,40,40)',
    paddingHorizontal: 10,
    // paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgb(100,100,100)',

    // borderBottomWidth: 0.3,
    // borderBottomColor: 'white',
  },
});
