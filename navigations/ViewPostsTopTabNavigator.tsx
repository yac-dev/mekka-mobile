import { View, TouchableOpacity, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import LocationsViewTopTabNavigator from './LocationsViewTopTabNavigator';
import PeopleViewTopTabNavigator from './PeopleViewTopTabNavigator';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import TagViewStackNavigator from './TagViewStackNavigator';
import MavViewStackNavigator from './MapViewStackNavigator';
import * as Haptics from 'expo-haptics';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Tab = createMaterialTopTabNavigator();

const viewTypeObject = {
  grid: <MaterialCommunityIcons name='dots-grid' color='black' size={22} />,
  map: (
    <ExpoImage
      style={{ width: 22, height: 22 }}
      source={require('../assets/forApp/globe.png')}
      placeholder={blurhash}
      contentFit='contain'
      transition={1000}
      tintColor={'white'}
    />
  ),
  people: <MaterialCommunityIcons name='account-multiple' color='black' size={22} />,
};

const ViewPostsTopTabNavigator = (parentProps) => {
  const { chooseViewBottomSheetRef, viewPostsType, setViewPostsType, navigation, spaceAndUserRelationship } =
    useContext(SpaceRootContext);
  // navigation={navigation}
  // tagObject={tagObject}
  // tagsFetchingStatus={tagsFetchingStatus}
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        // toptab navigatorで表示させるが、top tab自体は表示しない
        tabBar={() => null}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
          animationEnabled: false,
          height: 0,
          backgroundColor: 'transparent',
        })}
        initialRouteName={viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator'}
      >
        <Tab.Screen name='TagViewStackNavigator'>
          {(props) => (
            <TagViewStackNavigator
              {...props}
              navigation={parentProps.navigation}
              tagObject={parentProps.tagObject}
              tagsFetchingStatus={parentProps.tagsFetchingStatus}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name='MavViewStackNavigator'>
          {(props) => (
            <MavViewStackNavigator
              {...props}
              navigation={parentProps.navigation}
              tagObject={parentProps.tagObject}
              tagsFetchingStatus={parentProps.tagsFetchingStatus}
            />
          )}
        </Tab.Screen>
        {/* <Tab.Screen name='PeopleViewTopTabNavigator' component={PeopleViewTopTabNavigator} /> */}
      </Tab.Navigator>
      <TouchableOpacity
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 40,
          right: 20,
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
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          navigation?.navigate('CreateNewPostStackNavigator', { spaceAndUserRelationship });
        }}
      >
        <Ionicons name='add' size={32} color={'black'} />
      </TouchableOpacity>
      <View
        style={{
          borderRadius: 25,
          backgroundColor: 'rgb(50,50,50)',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 5,
          alignSelf: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            marginRight: 15,
            padding: 5,
            backgroundColor: viewPostsType === 'grid' ? 'rgb(80,80,80)' : null,
            borderRadius: viewPostsType === 'grid' ? 12 : 0,
          }}
          onPress={() => {
            setViewPostsType('grid');
            navigation.navigate('TagViewStackNavigator');
          }}
        >
          <MaterialCommunityIcons name='dots-grid' color='white' size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 7,
            backgroundColor: viewPostsType === 'map' ? 'rgb(80,80,80)' : null,
            borderRadius: viewPostsType === 'map' ? 12 : 0,
          }}
          // 'MavViewStackNavigator'
          onPress={() => {
            setViewPostsType('map');
            navigation.navigate('MavViewStackNavigator');
          }}
        >
          <ExpoImage
            style={{ width: 25, height: 25 }}
            source={require('../assets/forApp/globe.png')}
            contentFit='contain'
            tintColor={'white'}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          chooseViewBottomSheetRef.current.snapToIndex(0);
        }}
        style={{
          backgroundColor: 'white',
          width: 44,
          height: 44,
          borderRadius: 22,
          position: 'absolute',
          bottom: 80,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
      >
        {viewPostsType === 'grid' ? (
          <MaterialCommunityIcons name='dots-grid' color='black' size={25} />
        ) : (
          <ExpoImage
            style={{ width: 25, height: 25 }}
            source={require('../assets/forApp/globe.png')}
            contentFit='contain'
            tintColor={'black'}
          />
        )}
      </TouchableOpacity> */}
    </View>
  );
};

export default ViewPostsTopTabNavigator;
