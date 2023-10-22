import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import backendAPI from '../../../apis/backend';

const MomentsView = () => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const [moments, setMoments] = useState([]);
  const [haveMomentosBeenFetched, setHaveMomentosBeenFetched] = useState(false);

  const getMoments = async () => {
    const result = await backendAPI.get(`/moments/${spaceAndUserRelationship.space._id}`);
    const { moments } = result.data;
    setMoments(moments);
    setHaveMomentosBeenFetched(true);
  };

  console.log(moments);

  useEffect(() => {
    getMoments();
  }, []);

  const calculateLeftTime = (disappearAt) => {
    const now = new Date();
    const last = new Date(disappearAt);
    const timeLeftMs = last - now;
    const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5, alignSelf: 'center' }}
      >
        <FastImage
          source={require('../../../assets/forApp/ghost.png')}
          style={{ width: 15, height: 15, marginRight: 5 }}
          tintColor={'white'}
        />
        <Text style={{ color: 'white' }}>{`${hours ? `${hours} h` : ''} ${minutes ? `${minutes} min` : ''}`}</Text>
      </View>
    );
  };

  const renderItem = useCallback((moment) => {
    if (moment.content.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          // onPress={() => navigation.navigate({ name: 'ViewPost', params: { moment } })}
        >
          <Video source={{ uri: moment.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          // onPress={() => navigation.navigate({ name: 'ViewPost', params: { moment } })}
        >
          <FastImage source={{ uri: moment.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
          {calculateLeftTime(moment.disappearAt)}
        </TouchableOpacity>
      );
    }
  }, []);

  if (haveMomentosBeenFetched) {
    if (moments.length) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList
            style={{ paddingTop: 10 }}
            numColumns={3}
            data={moments}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id}
            // refreshControl={
            //   <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
            // }
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 50, alignSelf: 'center' }}>
            <Text style={{ color: 'white', marginRight: 10 }}>There are no moments currently</Text>
            <FastImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ width: 25, height: 25 }}
              tintColor={'white'}
            />
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // return <Text style={{ color: 'white' }}>Moments</Text>;
};

export default MomentsView;
