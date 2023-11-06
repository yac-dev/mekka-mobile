import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import backendAPI from '../../../apis/backend';
import { SpaceDetailContext } from '../contexts/SpaceDetailContext';
import { FadingTransition } from 'react-native-reanimated';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Members = () => {
  const { space } = useContext(SpaceDetailContext);
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
          padding: 10,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(150,150,150)',
        }}
      >
        <ExpoImage
          style={{ width: 35, height: 35, marginRight: 15 }}
          source={{ uri: user.avatar }}
          placeholder={blurhash}
          contentFit='cover'
          transition={1000}
        />
        <Text style={{ color: 'white', fontSize: 17 }}>{user.name}</Text>
      </TouchableOpacity>
    );
  }, []);

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

  return <View style={{ flex: 1, backgroundColor: 'rgb(40, 40, 40)', padding: 10 }}>{renderMembers()}</View>;
};

export default Members;
