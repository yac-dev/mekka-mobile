import React, { useContext, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { HomeContext } from '../contexts/HomeContext';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { iconColorTable } from '../../../themes/color';

const Spaces: React.FC = (props) => {
  const { isIpad, spaceAndUserRelationships } = useContext(GlobalContext);
  const { navigation } = useContext(HomeContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const iconWidth = oneGridWidth * 0.65;

  const navigate = (relationship) => {
    // navigation?.navigate('SpaceRootStackNavigator', {
    //   screen: 'SpaceTopTabNavigator',
    //   params: { screen: 'Space', params: { spaceId: relationship.space._id } },
    // });
    navigation?.navigate('SpaceRootStackNavigator', {
      screen: 'SpaceTopTabNavigator',
      params: { spaceId: relationship.space._id, lastCheckedIn: relationship.lastCheckedIn },
    });
    // navigation?.navigate('SpaceRootStackNavigator', { spaceId: relationship.space._id });
  };

  const renderMySpaces = () => {
    const list = spaceAndUserRelationships.map((relationship) => {
      return (
        <TouchableOpacity
          key={relationship._id}
          style={{
            width: oneGridWidth,
            height: oneGridHeight,
            // backgroundColor: 'red',
            alignItems: 'center',
          }}
          // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
          onPress={() => navigate(relationship)}
        >
          <View style={{ width: iconWidth, aspectRatio: 1, marginBottom: 5 }}>
            <FastImage
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
              source={{ uri: relationship.space.icon }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
              }}
            >
              {relationship.space.contentType === 'photo' ? (
                <View
                  style={{
                    // backgroundColor: iconColorTable['blue1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    // width: 26,
                    // height: 26,
                    // borderRadius: 13,
                    flexDirection: 'row',
                  }}
                >
                  <Entypo name='folder-images' size={15} color='white' />
                  {/* <Text>10</Text> */}
                </View>
              ) : relationship.space.contentType === 'video' ? (
                <View
                  style={{
                    // backgroundColor: iconColorTable['blue1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    // width: 26,
                    // height: 26,
                    // borderRadius: 13,
                    flexDirection: 'row',
                  }}
                >
                  <Entypo name='folder-video' size={15} color='white' />
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: iconColorTable['blue1'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 13,
                    flexDirection: 'row',
                  }}
                >
                  <Entypo name='folder-images' size={15} color='white' />
                  <Entypo name='folder-video' size={15} color='white' />
                </View>
              )}
            </View>
          </View>
          <Text style={{ color: 'white' }}>{relationship.space.name}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>{list}</View>
      </ScrollView>
    );
  };

  return <>{renderMySpaces()}</>;
};

export default Spaces;
