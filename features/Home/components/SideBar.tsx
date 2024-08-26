import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { LogsTableContext, AuthContext } from '../../../providers';
import { SpaceType } from '../../../types';
import { Image as ExpoImage } from 'expo-image';
import { momentLogsAtom } from '../../../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AppButton } from '../../../components';
import { useUpdateSpaceCheckedInDate } from '../../../api';
import { mySpacesAtom, currentSpaceAtom } from '../../../recoil';

type SideBarProps = {
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  openAuthMenuBottomSheet: (index: number) => void;
};

export const SideBar: React.FC<SideBarProps> = ({ openAddNewSpaceMenuBottomSheet, openAuthMenuBottomSheet }) => {
  const mySpaces = useRecoilValue(mySpacesAtom);
  const { logsTable } = useContext(LogsTableContext);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const { auth } = useContext(AuthContext);
  const [momentLogs] = useRecoilState(momentLogsAtom);

  const { requestApi: requestUpdateSpaceCheckedInDate } = useUpdateSpaceCheckedInDate();

  const onSpacePress = (space: SpaceType) => {
    setCurrentSpace(space);
    requestUpdateSpaceCheckedInDate({ spaceId: space._id, userId: auth._id });
  };

  const onAddNewSpacePress = () => {
    openAddNewSpaceMenuBottomSheet(0);
  };

  const onAuthMenuPress = () => {
    openAuthMenuBottomSheet(0);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {/* こことかボタンの再利用化進めなきゃいけない。。。 */}
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 45,
              aspectRatio: 1,
              borderRadius: 25,
              backgroundColor: 'rgb(50,50,50)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onAddNewSpacePress}
          >
            <VectorIcon.MCI name='plus' color={Colors.white} size={25} />
          </TouchableOpacity>
        </View>
        {mySpaces.map((space: SpaceType) => {
          const isFocused = currentSpace._id === space._id;
          const momentLogsCount = momentLogs[space._id] || 0;
          const logs =
            logsTable[space._id] &&
            Object.values(logsTable[space._id]).reduce((accumlator, logs) => accumlator + logs, 0);

          const totalLogs = logs + momentLogsCount;

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={space._id}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                borderRightWidth: isFocused ? 1 : 0,
                borderRightColor: 'white',
              }}
              onPress={() => onSpacePress(space)}
            >
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View
                  style={{
                    width: 45,
                    aspectRatio: 1,
                    borderRadius: 22.5,
                    borderColor: 'white',
                    borderWidth: 0.3,
                  }}
                >
                  <ExpoImage
                    style={{ width: '100%', height: '100%', borderRadius: 22.5 }}
                    source={{ uri: space.icon }}
                    contentFit='contain'
                  />
                  <View></View>
                  {totalLogs ? (
                    <View
                      style={{
                        width: 24,
                        height: 24,
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
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'red',
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 12 }}>{totalLogs}</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <AppButton.Icon
          onButtonPress={onAuthMenuPress}
          customStyle={{
            width: 45,
            aspectRatio: 1,
            backgroundColor: 'rgb(50,50,50)',
            position: 'absolute',
            bottom: 10,
          }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='account' size={20} color={Colors.white} />
        </AppButton.Icon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderRightWidth: 0.3,
    borderRightColor: 'rgb(70,70,70)',
    height: '100%',
  },
});
