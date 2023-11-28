import React, { useContext, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Share } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SpaceInfoTopTabNavigator from '../../../navigations/SpaceInfoTopTabNavigator';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const SpaceInfo = (props) => {
  const { currentSpaceAndUserRelationship, spaceMenuBottomSheetRef, currentSpace } = useContext(GlobalContext);
  // const { spaceAndUserRelationship } = props.route?.params;
  const { spaceAndUserRelationship } = useContext(SpaceInfoContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
    // console.log(e.nativeEvent);
  }, []);

  const handleShare = async () => {
    Share.share({
      title: 'Share Mekka',
      message: `Access here to download Mekka: https://apps.apple.com/us/app/mekka/id6472717148${'\n'} and then enter this private key: ${
        spaceAndUserRelationship.space.secretKey
      }`,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30,30,30)', padding: 10 }}>
      <View style={{ height: 200, width: '100%', marginBottom: 10 }}>
        <ExpoImage
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          source={{ uri: spaceAndUserRelationship.space.icon }}
          placeholder={blurhash}
          contentFit='cover'
        />
        {/* これ、下に影入れた方がいいな。 */}
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, position: 'absolute', bottom: 10, left: 10 }}>
          {spaceAndUserRelationship.space.name}
        </Text>
        <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 15,
                marginRight: 10,
              }}
              onPress={() =>
                props.navigation.navigate('ReportSpace', {
                  spaceAndUserRelationship,
                })
              }
            >
              {/* <Feather name='more-horizontal' color='black' size={20} /> */}
              <MaterialCommunityIcons name='exclamation' color='black' size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 15,
              }}
              onPress={() => handleShare()}
            >
              <Ionicons name='share-social' size={20} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SpaceInfoTopTabNavigator />
    </View>
  );
};

export default SpaceInfo;
