import React, { useMemo, useContext } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// rgb(35, 35, 35)
const ChooseViewBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['40%'], []);
  const { chooseViewBottomSheetRef, viewPostsType, setViewPostsType, navigation } = useContext(SpaceRootContext);
  const { currentSpaceAndUserRelationship, currentTagObject } = useContext(GlobalContext);
  const iconWidth = Dimensions.get('window').width / 3;
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
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        <View style={{ marginBottom: 10, paddingLeft: 20, paddingRight: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 23 }}>Choose View</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: iconWidth,
              aspectRatio: 1,
            }}
          >
            <TouchableOpacity
              style={{
                width: iconWidth * 0.5,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: (iconWidth * 0.65) / 2,
                backgroundColor: 'white',
              }}
              // onPress={() => {
              //   navigation.navigate('ViewPostsTopTabNavigator', { screen: 'TagsTopTabNavigator' });
              //   setViewPostsType('tags');
              //   chooseViewBottomSheetRef.current.close();
              // }}
              // currentTagを使う感じかな。。。
              // `SpaceTab_${currentTagObject.tag._id}`に行って、その中のTagViewかLocationViewかCalendarViewかにいく感じだな。か
              onPress={() => {
                navigation.navigate('TagsTopTabNavigator', {
                  screen: `SpaceTab_${currentTagObject.tag._id}`,
                  params: {
                    screen: 'TagViewStackNavigator',
                  },
                });
                setViewPostsType('tags');
                chooseViewBottomSheetRef.current.close();
              }}
            >
              <Octicons name='hash' color='black' size={30} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Tags</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: iconWidth,
              aspectRatio: 1,
            }}
          >
            <TouchableOpacity
              style={{
                width: iconWidth * 0.5,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: (iconWidth * 0.65) / 2,
                backgroundColor: 'white',
              }}
              // onPress={() => {
              //   navigation.navigate('ViewPostsTopTabNavigator', { screen: 'LocationsViewTopTabNavigator' });
              //   setViewPostsType('map');
              //   chooseViewBottomSheetRef.current.close();
              // }}
              onPress={() => {
                navigation.navigate('TagsTopTabNavigator', {
                  screen: `SpaceTab_${currentTagObject.tag._id}`,
                  params: {
                    screen: 'MavViewStackNavigator',
                  },
                });
                setViewPostsType('map');
                chooseViewBottomSheetRef.current.close();
              }}
            >
              <ExpoImage
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/forApp/globe.png')}
                placeholder={blurhash}
                contentFit='contain'
                transition={1000}
                tintColor={'black'}
              />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Map</Text>
          </View>
          {/* <View style={{ justifyContent: 'center', alignItems: 'center', width: iconWidth, aspectRatio: 1 }}>
            <TouchableOpacity
              style={{
                width: iconWidth * 0.5,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderRadius: (iconWidth * 0.65) / 2,
                backgroundColor: 'white',
              }}
              onPress={() => {
                navigation.navigate('ViewPostsTopTabNavigator', { screen: 'PeopleViewTopTabNavigator' });
                setViewPostsType('people');
                chooseViewBottomSheetRef.current.close();
              }}
            >
              <MaterialCommunityIcons name='account-multiple' size={30} color='black' style={{}} />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>People</Text>
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
