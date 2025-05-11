import React from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import { Colors } from '../../../themes';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { UserStackNavigatorProps } from '../navigations/UserStackNavigation';

type MoreOptionsProps = {
  closeMoreOptionsBottomSheet: () => void;
};

export const MoreOptions: React.FC<MoreOptionsProps> = ({ closeMoreOptionsBottomSheet }) => {
  const userStackNavigation = useNavigation<UserStackNavigatorProps>();

  const handleReportUser = () => {
    closeMoreOptionsBottomSheet();
    userStackNavigation.navigate('ReportUser');
  };

  const handleBlockRequest = () => {
    closeMoreOptionsBottomSheet();
    Alert.alert(
      'Block User',
      'Are you sure you want to block this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement block user logic here
            console.log('User blocked');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flexDirection: 'column', paddingHorizontal: 20, gap: 12 }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgb(38,38,38)',
          borderRadius: 16,
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        activeOpacity={0.8}
        onPress={handleReportUser}
      >
        <View
          style={{
            backgroundColor: Colors.iconColors['red1'],
            width: 46,
            height: 46,
            marginRight: 15,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VectorIcon.MI name='report-problem' size={30} color={'white'} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>Request Report</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 15 }}>
              Report this user for inappropriate{'\n'}content or behavior.
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 26,
              height: 26,
              backgroundColor: 'rgb(65,65,65)',
              borderRadius: 100,
            }}
          >
            <VectorIcon.MCI name='chevron-right' size={20} color={'rgb(170,170,170)'} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgb(38,38,38)',
          borderRadius: 16,
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        activeOpacity={0.8}
        onPress={handleBlockRequest}
      >
        <View
          style={{
            backgroundColor: Colors.iconColors['blue1'],
            width: 46,
            height: 46,
            marginRight: 15,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VectorIcon.MI name='block' size={30} color={'white'} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>Request Block</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 15 }}>
              Block this user to hide their{'\n'}posts and comments.
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 26,
              height: 26,
              backgroundColor: 'rgb(65,65,65)',
              borderRadius: 100,
            }}
          >
            <VectorIcon.MCI name='chevron-right' size={20} color={'rgb(170,170,170)'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
