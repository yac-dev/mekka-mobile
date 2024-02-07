import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Share, Platform } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SpaceInfoTopTabNavigator from '../../../navigations/SpaceInfoTopTabNavigator';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import SnackBar from '../../../components/SnackBar';

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

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30,30,30)' }}>
      <View style={{ height: 250, width: '100%', marginBottom: 10 }}>
        <ExpoImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: spaceAndUserRelationship.space.icon }}
          placeholder={blurhash}
          contentFit='cover'
        />
        {/* これ、下に影入れた方がいいな。 */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 }}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
            position: 'absolute',
            bottom: 10,
            left: 20,
            // textShadowColor: 'rgba(0, 0, 0, 0.9)',
            // textShadowOffset: { width: -3, height: 3 },
            // textShadowRadius: 10,
            // 文字影は分からん。。。今は。。。
          }}
        >
          {spaceAndUserRelationship.space.name}
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
              },
              android: {
                elevation: 5,
              },
            }),
          }}
        >
          <Ionicons name='close' size={20} color={'black'} />
        </TouchableOpacity>
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
                ...Platform.select({
                  ios: {
                    shadowColor: 'black',
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
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
          </View>
        </View>
      </View>
      <SpaceInfoTopTabNavigator />
      <SnackBar />
    </View>
  );
};

export default SpaceInfo;
