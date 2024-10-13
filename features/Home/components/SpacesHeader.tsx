import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { useRecoilState } from 'recoil';
import { mySpacesAtom, logsTableAtom, currentSpaceAtom, authAtom, momentLogsAtom } from '../../../recoil';
import { useMutation } from '@tanstack/react-query';
import { updateSpaceCheckedInDate } from '../../../query';
import { SpaceType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';

type BottomTabProps = {
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  openAuthMenuBottomSheet: (index: number) => void;
};

export const SpacesHeader: React.FC<BottomTabProps> = ({ openAddNewSpaceMenuBottomSheet, openAuthMenuBottomSheet }) => {
  const [mySpaces] = useRecoilState(mySpacesAtom);
  const [logsTable] = useRecoilState(logsTableAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);
  const [momentLogs] = useRecoilState(momentLogsAtom);

  const updateSpaceCheckedInMutation = useMutation({
    mutationFn: updateSpaceCheckedInDate,
  });

  const onSpacePress = (space: SpaceType) => {
    setCurrentSpace(space);
    updateSpaceCheckedInMutation.mutate({ spaceId: space._id, userId: auth._id });
  };

  // const onAddNewSpacePress = () => {
  //   openAddNewSpaceMenuBottomSheet(0);
  // };

  const renderItem = ({ item }: { item: SpaceType }) => {
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
          paddingVertical: 5,
        }}
        onPress={() => onSpacePress(item)}
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
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <View style={styles.container}>
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
                marginRight: 8,
                paddingVertical: 5,
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
                onPress={() => openAddNewSpaceMenuBottomSheet(0)}
              >
                <VectorIcon.MCI name='plus' color={Colors.white} size={20} />
              </TouchableOpacity>
            </View>
          }
        />
        <AppButton.Icon
          onButtonPress={() => openAuthMenuBottomSheet(0)}
          customStyle={{ width: 30, height: 30, backgroundColor: 'rgb(50,50,50)' }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='account' size={20} color={Colors.white} />
        </AppButton.Icon>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
