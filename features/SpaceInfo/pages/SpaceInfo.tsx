import { useContext } from 'react';
import { View, Text } from 'react-native';
import { Tabs } from '../components';
import { Image as ExpoImage } from 'expo-image';
import { CurrentSpaceContext } from '../../../providers';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

export const SpaceInfo = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <ExpoImage
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
            source={{ uri: currentSpace.icon }}
            contentFit='cover'
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
            }}
          >
            {currentSpace.name}
          </Text>
        </View>
      </View>
      <Tabs />
    </View>
  );
};
