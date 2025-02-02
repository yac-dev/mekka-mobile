import { useContext } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { Tabs } from '../components';
import { Image as ExpoImage } from 'expo-image';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { urls } from '../../../settings/urls';
import { useNavigation } from '@react-navigation/native';
import { SpaceInfoStackNavigatorProps } from '../navigations/SpaceInfoStackNavigator';

export const SpaceInfo = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const spaceInfoStackNavigation = useNavigation<SpaceInfoStackNavigatorProps>();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginBottom: 10 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ExpoImage
              style={{ width: 60, height: 60, borderRadius: 40, marginBottom: 15 }}
              source={{ uri: currentSpace.icon }}
              contentFit='cover'
            />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 27,
              }}
            >
              {currentSpace.name}
            </Text>
            <Text
              style={{
                color: 'rgb(150, 150, 150)',
                fontSize: 12,
              }}
            >
              @{currentSpace.secretKey}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ lineHeight: 21, color: 'white', fontSize: 15, marginBottom: 5 }}>
            {currentSpace.description}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
              <VectorIcon.MCI name='rocket-launch' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
              <Text
                style={{
                  color: 'rgb(150, 150, 150)',
                  fontSize: 12,
                  marginRight: 10,
                }}
              >
                {currentSpace.createdBy.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
              <VectorIcon.MCI name='cake-variant' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
              <Text
                style={{
                  color: 'rgb(150, 150, 150)',
                  fontSize: 12,
                  marginRight: 10,
                }}
              >
                {formatDate(currentSpace.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Tabs />
    </View>
  );
};

{
  /* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Posts</Text>
                <Text style={{ color: 'rgb(150,150,150)', fontSize: 16 }}>1k</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => spaceInfoStackNavigation.navigate('Members')}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Members</Text>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 15 }}>2k</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Tags</Text>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 15 }}>{currentSpace.tags.length}</Text>
            </TouchableOpacity>
          </View> */
}
