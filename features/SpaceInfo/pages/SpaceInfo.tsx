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
      <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <ExpoImage
            style={{ width: 60, height: 60, borderRadius: 40, marginRight: 20 }}
            source={{ uri: currentSpace.icon }}
            contentFit='cover'
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
                flexDirection: 'row',
                // backgroundColor: 'rgb(50, 50, 50)',
              }}
              activeOpacity={0.7}
            >
              {/* <VectorIcon.II name='images' color='white' size={20} style={{ marginRight: 10 }} /> */}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Posts</Text>
                <Text style={{ color: 'rgb(150,150,150)', fontSize: 16 }}>1k</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
                alignItems: 'center',
                // backgroundColor: 'rgb(50, 50, 50)',
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Members</Text>
              <Text style={{ color: 'rgb(150,150,150)', fontSize: 15 }}>-</Text>
            </TouchableOpacity> */}
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
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
            marginBottom: 5,
          }}
        >
          {currentSpace.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: 'rgb(150, 150, 150)',
              fontSize: 12,
              marginRight: 10,
            }}
          >
            @{currentSpace.secretKey}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ lineHeight: 21, color: 'white', fontSize: 15, marginBottom: 5 }}>
          {currentSpace.description}
        </Text>
      </View>
      <Text
        style={{
          color: 'rgb(150, 150, 150)',
          fontSize: 12,
          marginRight: 10,
          textAlign: 'right',
          paddingRight: 20,
        }}
      >
        {currentSpace.createdBy.name} created at {formatDate(currentSpace.createdAt)}
      </Text>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <VectorIcon.MCI name='rocket-launch' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
          <Text
            style={{
              color: 'rgb(150, 150, 150)',
              fontSize: 12,
              marginRight: 10,
            }}
          >
            {currentSpace.createdBy.name} created at {formatDate(currentSpace.createdAt)}
          </Text>
        </View>
      </View> */}

      <Tabs />
    </View>
  );
};
