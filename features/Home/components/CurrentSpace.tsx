import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Header, Specs, Features, Tags } from '.';
import { AppButton } from '../../../components';
import { useRecoilState } from 'recoil';
import { authAtom, currentSpaceAtom } from '../../../recoil';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { momentLogsAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { queryKeys, getMySpaces, getLogsByUserId, updateSpaceCheckedInDate } from '../../../query';
type CurrentSpaceProps = {
  openAddNewPostMenuBottomSheet: (index: number) => void;
};

// tan stack使うかね？
export const CurrentSpace: React.FC<CurrentSpaceProps> = ({ openAddNewPostMenuBottomSheet }) => {
  const [auth] = useRecoilState(authAtom);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { isRefetching: isRefetchingMySpaces } = useQuery({
    queryKey: [queryKeys.mySpaces, auth],
  });
  const { isRefetching: isRefetchingLogs } = useQuery({
    queryKey: [queryKeys.logs, auth],
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 20 }}>
        <Header />
        {/* <Specs /> */}
        {/* <Divider /> */}
        {/* <ScrollView> */}
        <Tags />

        {/* </ScrollView> */}
      </ScrollView>
      <Features />
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 30, right: 20 }}
        activeOpacity={0.7}
        onPress={() => openAddNewPostMenuBottomSheet(0)}
      >
        <ExpoImage source={{ uri: currentSpace.icon }} style={{ width: 48, height: 48, borderRadius: 30 }} />
        <AddIcon />
      </TouchableOpacity>
    </View>
  );
};

const AddIcon = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        width: 24,
        height: 24,
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
          width: 16,
          height: 16,
          borderRadius: 20,
        }}
      >
        <VectorIcon.II name='add' size={14} color={'black'} />
      </View>
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const styles = StyleSheet.create({
  container: {
    // flex: 9,
    flex: 1,
  },
  divider: {
    width: '90%',
    backgroundColor: 'rgb(80,80,80)',
    height: 0.3,
    alignSelf: 'center',
  },
});
