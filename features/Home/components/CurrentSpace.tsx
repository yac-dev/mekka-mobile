import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Specs, Features, Tags } from '.';
import { AppButton } from '../../../components';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';

type CurrentSpaceProps = {
  openAddNewPostMenuBottomSheet: (index: number) => void;
};

export const CurrentSpace: React.FC<CurrentSpaceProps> = ({ openAddNewPostMenuBottomSheet }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 15 }}>
        <Header />
        <Features />
        {/* <Specs /> */}
        {/* <Divider /> */}
        {/* <ScrollView> */}
        <Tags />
        {/* </ScrollView> */}
      </ScrollView>
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
