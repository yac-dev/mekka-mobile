import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { FadingTransition } from 'react-native-reanimated';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Members = () => {
  const { currentSpace } = useContext(GlobalContext);
  const { spaceAndUserRelationship } = useContext(SpaceInfoContext);
  const { space } = spaceAndUserRelationship;
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
          borderBottomColor: 'rgb(150,150,150)',
        }}
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
        spaceAndUserRelationship.space.secretKey
      }`,
    });
  };

  // <TouchableOpacity
  //             activeOpacity={1}
  //             style={{
  //               width: 30,
  //               height: 30,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               backgroundColor: 'white',
  //               borderRadius: 15,
  //             }}
  //             onPress={() => handleShare()}
  //           >
  //             <Ionicons name='share-social' size={20} color='black' />
  //           </TouchableOpacity>

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
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)' }}>
      {/* <TouchableOpacity
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
                onPress={() => pickContents()}
                activeOpacity={1}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name='add-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
                  <View>
                    <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
              </TouchableOpacity> */}
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
        <MaterialCommunityIcons name='chevron-right' color='white' size={20} />
      </TouchableOpacity>
      {renderMembers()}
    </View>
  );
};

export default Members;
