import { useContext } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { Tabs } from '../components';
import { Image as ExpoImage } from 'expo-image';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { urls } from '../../../settings/urls';

export const SpaceInfo = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);

  const handleInvite = async () => {
    Share.share({
      title: 'Share Var',
      message: `Access here to download Var: ${urls.appStore}${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <ExpoImage
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
            source={{ uri: currentSpace.icon }}
            contentFit='cover'
          />
          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 26,
                marginBottom: 10,
              }}
            >
              {currentSpace.name}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: 'rgb(50, 50, 50)',
                borderRadius: 100,
              }}
              activeOpacity={0.7}
              onPress={handleInvite}
            >
              <VectorIcon.MCI name='human-greeting-variant' color='white' size={20} style={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 17 }}>Invite friends</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Tabs />
    </View>
  );
};
