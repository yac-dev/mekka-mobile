import React, { useReducer, useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NavigationProp } from '@react-navigation/native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetSpacesState } from '../hooks';
import { SpaceType } from '../../../types';
import { VectorIcon } from '../../../Icons';

type RouterProps = {
  navigation: NavigationProp<any, any>;
};
// client上では,mekkaとかそういう表現を使うことにする。
const Discover: React.FC<RouterProps> = (props) => {
  const { apiResult, requestApi } = useGetSpacesState();

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

  // const getSpaces = async () => {
  //   const result = await backendAPI.get('/spaces');
  //   const { spaces } = result.data;
  //   setSpaces(spaces);
  //   setAreSpacesFetched(true);
  // };
  // useEffect(() => {
  //   getSpaces();
  // }, []);

  useEffect(() => {
    requestApi();
  }, []);

  // useEffect(() => {
  //   if(apiResult.status === ''){}
  // },[])

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
          <View>
            <ExpoImage
              style={{ width: 80, height: 80, borderRadius: 13, marginRight: 20 }}
              source={{ uri: space.icon }}
              contentFit='cover'
            />
            <View style={{ backgroundColor: 'black', padding: 2, position: 'absolute', top: 2, right: 2 }}>
              <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <VectorIcon.II name='close' size={15} color={'black'} />
                <VectorIcon.II name='close' size={15} color={'black'} />
              </View>
            </View>
          </View>
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

  const renderItem = ({ item }: { item: SpaceType }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.5}>
        <View style={styles.itemInnerContainer}>
          <View>
            <ExpoImage style={styles.spaceIcon} source={{ uri: item.icon }} contentFit='cover' />
            <View
              style={{
                backgroundColor: 'black',
                padding: 3,
                position: 'absolute',
                top: -2,
                right: 7,
                borderRadius: 100,
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 100,
                  padding: 5,
                }}
              >
                <VectorIcon.II name='image' size={13} color={'black'} style={{ marginRight: 3 }} />
                <VectorIcon.OI name='video' size={13} color={'black'} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.spaceName}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.description}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (apiResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={apiResult.data?.spaces}
        renderItem={renderItem}
        // estimatedItemSize={200}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loading: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgb(170,170,170)',
    justifyContent: 'space-between',
  },
  itemInnerContainer: { flexDirection: 'row', alignItems: 'center' },
  spaceName: { color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 5 },
  spaceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  description: {
    color: 'rgb(170,170,170)',
    width: 150,
  },
});
