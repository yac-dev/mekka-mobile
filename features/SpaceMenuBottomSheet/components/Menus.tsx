import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const SpaceMenus = (props) => {
  const { isIpad, spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, currentSpace } = useContext(GlobalContext);
  const { navigation } = useContext(SpaceRootContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7;
  const iconWidth = oneGridWidth * 0.7;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingBottom: 10 }}>
        <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 51, 51, 0.3)',
              borderRadius: 14,
              marginBottom: 5,
            }}
            onPress={() => {
              spaceMenuBottomSheetRef?.current.close();
              props.navigation?.navigate({
                name: 'CreateNewPost',
                params: { space: currentSpace, spaceAndUserRelationship: currentSpaceAndUserRelationship },
                merge: true,
              });
            }}
          >
            <AntDesign name='plus' size={25} color='white' />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Post</Text>
        </View>
        <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(45, 209, 40, 0.3)',
              borderRadius: 14,
              marginBottom: 5,
            }}
            onPress={() => {
              console.log('invite');
            }}
          >
            <MaterialCommunityIcons name='human-greeting-variant' size={25} color='white' />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Invite</Text>
        </View>
        <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(254, 115, 0, 0.3)',
              borderRadius: 14,
              marginBottom: 5,
            }}
            onPress={() => {
              console.log('discussion');
            }}
          >
            <Octicons name='comment-discussion' size={25} color='white' />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Discussion</Text>
        </View>
        {/* <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(229, 188, 0, 0.3)',
              borderRadius: 14,
              marginBottom: 5,
            }}
            onPress={() => {
              console.log('calendar');
            }}
          >
            <MaterialCommunityIcons name='calendar-search' size={25} color='white' />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Calendar</Text>
        </View>

        <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 60,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 108, 255, 0.3)',
              borderRadius: 14,
              marginBottom: 5,
            }}
            onPress={() => {
              console.log('map view');
            }}
          >
            <MaterialCommunityIcons name='map-search-outline' size={25} color='white' />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Map view</Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default SpaceMenus;
