import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Share, Alert } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { FadingTransition } from 'react-native-reanimated';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CurrentSpaceContext } from '../../../providers';
import { SpaceType } from '../../../types';

type MembersProps = {
  space: SpaceType;
};

const Members: React.FC<MembersProps> = ({ space }) => {
  const [members, setMembers] = useState([]);
  const [haveMembersBeenFetched, setHaveMembersBeenFetched] = useState(false);

  const getSpaceMembersBySpaceId = async () => {
    const result = await backendAPI.get(`/users/${space._id}/space`);
    const { users } = result.data;
    setMembers(users);
    setHaveMembersBeenFetched(true);
  };

  useEffect(() => {
    getSpaceMembersBySpaceId();
  }, []);

  const renderUser = useCallback((user) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(90,90,90)',
        }}
        // onPress={() => {
        //   props.reportBottomSheetRef.current.snapToIndex(0);
        // }}
      >
        <ExpoImage
          style={{ width: 25, height: 25, marginRight: 20 }}
          source={{ uri: user.avatar }}
          contentFit='contain'
        />
        <Text style={{ color: 'white', fontSize: 17 }}>{user.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  const handleShare = async () => {
    Share.share({
      title: 'Share Mekka',
      message: `Access here to download Mekka: https://apps.apple.com/us/app/mekka/id6472717148${'\n'} and then enter this private key: ${
        space.secretKey
      }`,
    });
  };

  const renderMembers = useCallback(() => {
    if (haveMembersBeenFetched) {
      if (members.length) {
        return (
          <FlatList
            data={members}
            renderItem={({ item }) => renderUser(item)}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        );
      } else {
        return (
          <Text style={{ color: 'white', textAlign: 'center' }}>There are no members in this space currentlly.</Text>
        );
      }
    } else {
      return <ActivityIndicator />;
    }
  }, [haveMembersBeenFetched]);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', paddingHorizontal: 10 }}>
      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => {
          handleShare();
        }}
        activeOpacity={1}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='human-greeting-variant' color='white' size={25} style={{ marginRight: 20 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Invite friends</Text>
          </View>
        </View>
        <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
      </TouchableOpacity>
      {renderMembers()}
    </View>
  );
};

export default Members;
