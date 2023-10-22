import React, { useMemo, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import FastImage from 'react-native-fast-image';

// rgb(35, 35, 35)
const ChooseViewBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['55%'], []);
  const { chooseViewBottomSheetRef, viewPostsType, setViewPostsType, navigation } = useContext(SpaceRootContext);
  const { currentSpaceAndUserRelationship, currentTagObject } = useContext(GlobalContext);
  // だめだね。。。SpaceRootBottomのnavigationだとなんか挙動がおかしいわ。
  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={chooseViewBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      {/* `SpaceTab_${currentTagObject.tag._id}`, params: { screen: 'Grid' }  */}
      <BottomSheetView style={{ flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 10, fontSize: 25, marginLeft: 10 }}>
          Choose View
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <View style={{ width: '50%', padding: 5 }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate(`Space_${currentSpaceAndUserRelationship._id}`, {
                //   screen: `TagsTopTabNavigator`,
                //   params: {
                //     screen: `SpaceTab_${currentTagObject.tag._id}`,
                //     // params: { screen: 'Grid' },
                //   },
                // });
                navigation.navigate('ViewPostsTopTabNavigator', { screen: 'TagsTopTabNavigator' });
                setViewPostsType('grid');
                chooseViewBottomSheetRef.current.close();
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}
            >
              <MaterialCommunityIcons name='dots-grid' size={35} color='black' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Grid</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', padding: 5 }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate(`Space_${currentSpaceAndUserRelationship._id}`, {
                //   screen: `LocationsViewTopTabNavigator`,
                //   params: {
                //     screen: `SpaceTab_${currentTagObject.tag._id}`,
                //     // params: { screen: 'Map' },
                //   },
                // });
                navigation.navigate('ViewPostsTopTabNavigator', { screen: 'LocationsViewTopTabNavigator' });
                setViewPostsType('map');
                chooseViewBottomSheetRef.current.close();
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}
            >
              <FastImage
                source={require('../../../assets/forApp/globe.png')}
                style={{ width: 25, height: 35, marginBottom: 10 }}
                tintColor={'black'}
              />
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <View style={{ width: '50%', padding: 5 }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate(`Space_${currentSpaceAndUserRelationship._id}`, {
                //   screen: `PeopleViewTopTabNavigator`,
                //   params: {
                //     screen: `SpaceTab_${currentTagObject.tag._id}`,
                //     // params: { screen: 'Calendar' },
                //   },
                // });
                navigation.navigate('ViewPostsTopTabNavigator', { screen: 'PeopleViewTopTabNavigator' });
                setViewPostsType('people');
                chooseViewBottomSheetRef.current.close();
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}
            >
              {/* <Ionicons name='calendar' size={35} color='white' style={{ marginBottom: 10 }} /> */}
              <MaterialCommunityIcons name='account-multiple' size={35} color='black' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'black', fontWeight: 'bold' }}>People</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ width: '50%', padding: 5 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(`Space_${currentSpaceAndUserRelationship._id}`, {
                  screen: `TagsTopTabNavigator`,
                  params: {
                    screen: `SpaceTab_${currentTagObject.tag._id}`,
                    params: { screen: 'Calendar' },
                  },
                });
                chooseViewBottomSheetRef.current.close();
              }}
              style={{
                backgroundColor: 'rgb(70,70,70)',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}
            >
              <MaterialCommunityIcons name='account-group' size={35} color='white' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>People</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginBottom: 10,
            }}
            onPress={() => spaceMenuBottomSheetRef.current.close()}
          >
            <Ionicons name='close' size={20} color='black' />
            <Text>Close</Text>
          </TouchableOpacity> */}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ChooseViewBottomSheet;
