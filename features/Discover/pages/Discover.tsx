import React, { useReducer, useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import { primaryBackgroundColor } from '../../../themes/color';
import CreateNewButton from '../components/CreateNewButton';
import { DiscoverContext } from '../contexts/DiscoverContext';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RouterProps = {
  navigation: NavigationProp<any, any>;
};

type SpaceType = {
  _id: string;
  name: string;
  contentType: string;
};

// client上では,mekkaとかそういう表現を使うことにする。
const Discover: React.FC<RouterProps> = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 4 : Dimensions.get('window').width / 2;
  // const { setSpaceAndMeRelationships } = useContext(GlobalContext);
  const [spaces, setSpaces] = useState<SpaceType[]>([]);
  const [areSpacesFetched, setAreSpacesFetched] = useState(false);

  // useEffect(() => {
  //   if (props.route?.params?.createdSpace) {
  //     setSpaceAndMeRelationships((previous) => [...previous, props.route?.params?.createdSpace]);
  //   }
  // }, [props.route?.params?.createdSpace]);

  const onButtonPress = () => {
    props.navigation.navigate('Create new space');
  };

  const getSpaces = async () => {
    const result = await backendAPI.get('/spaces');
    const { spaces } = result.data;
    setSpaces(spaces);
    setAreSpacesFetched(true);
  };
  useEffect(() => {
    getSpaces();
  }, []);

  // tapして、detailを出す様にする。
  const renderSpace = useCallback((space: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 30,
          paddingLeft: 10,
          paddingRight: 10,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(170,170,170)',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ExpoImage
            style={{ width: 80, height: 80, borderRadius: 13, marginRight: 20 }}
            source={{ uri: space.icon }}
            contentFit='cover'
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{space.name}</Text>
            <Text numberOfLines={2} style={{ color: 'rgb(170,170,170)', width: 150 }}>
              {space.description}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              props.navigation.navigate('SpaceDetailStackNavigator', {
                screen: 'SpaceDetail',
                params: { spaceId: space._id },
              })
            }
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
            }}
          >
            <MaterialCommunityIcons name='magnify' size={25} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const renderSpaces = () => {
    if (areSpacesFetched) {
      if (spaces.length) {
        return (
          <FlatList
            data={spaces}
            renderItem={({ item }) => renderSpace(item)}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        );
      } else {
        return (
          <Text style={{ paddingTop: 100, color: 'white', textAlign: 'center', fontSize: 20 }}>
            There are no public spaces now.
          </Text>
        );
      }
    } else {
      return (
        <View style={{ flex: 1, paddingTop: 100, backgroundColor: 'black' }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  return (
    <DiscoverContext.Provider value={{ spaces, setSpaces }}>
      <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 10 }}>{renderSpaces()}</View>
    </DiscoverContext.Provider>
  );
};

export default Discover;
