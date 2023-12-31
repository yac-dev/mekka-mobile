import { View, TouchableOpacity, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import LocationsViewTopTabNavigator from './LocationsViewTopTabNavigator';
import PeopleViewTopTabNavigator from './PeopleViewTopTabNavigator';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

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

const ViewPostsTopTabNavigator = () => {
  const { chooseViewBottomSheetRef, viewPostsType } = useContext(SpaceRootContext);
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
      >
        <Tab.Screen name='TagsTopTabNavigator' component={TagsTopTabNavigator} />
        <Tab.Screen name='LocationsViewTopTabNavigator' component={LocationsViewTopTabNavigator} />
        <Tab.Screen name='PeopleViewTopTabNavigator' component={PeopleViewTopTabNavigator} />
      </Tab.Navigator>
      <TouchableOpacity
        onPress={() => {
          chooseViewBottomSheetRef.current.snapToIndex(0);
        }}
        style={{
          backgroundColor: 'white',
          width: 40,
          height: 40,
          borderRadius: 20,
          position: 'absolute',
          bottom: 20,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        <MaterialCommunityIcons name='dots-grid' color='black' size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default ViewPostsTopTabNavigator;
