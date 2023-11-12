import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../themes/color';
import MapView, { Marker } from 'react-native-maps';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// いいや、locationは、
const AddLocationTag = (props) => {
  const { createNewPostFormData, setCreateNewPostFormData } = useContext(GlobalContext);
  const {
    navigation,
    route,
    addedLocationTag,
    setAddedLocationTag,
    createdLocationTag,
    setCreatedLocationTag,
    locationTagOptions,
    setLocationTagOptions,
    space,
    setDummyCreatedTagId,
  } = useContext(CreateNewPostContext);
  const mapRef = useRef(null);

  useEffect(() => {
    if (props.route?.params?.createdLocationTag) {
      // setCreatedLocationTag(props.route?.params?.createdLocationTag);
      // setAddedLocationTag(props.route?.params?.createdLocationTag);
      setLocationTagOptions((previous) => {
        const updating = [...previous];
        updating.unshift(props.route?.params?.createdLocationTag);
        return updating;
      });
      setCreateNewPostFormData((previous) => {
        return {
          ...previous,
          addedLocationTag: props.route?.params?.createdLocationTag,
        };
      });
      // setAddedLocationTag(props.route?.params?.createdLocationTag);
      setDummyCreatedTagId((previous) => previous + 1);
    }
  }, [props.route?.params?.createdLocationTag]);

  useEffect(() => {
    if (addedLocationTag) {
      const newLat = addedLocationTag.point.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: addedLocationTag.point.coordinates[0],
      });
    } else if (createdLocationTag) {
      const newLat = createdLocationTag.point.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: createdLocationTag.point.coordinates[0],
      });
    }
  }, [addedLocationTag, createdLocationTag]);
  // createdLocationTagがある場合はそれを優先で表示する。
  // ない場合は、addedLocationTagの方をrender

  const renderAddedLocationTag = () => {
    if (addedLocationTag) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(90,90,90)',
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
            marginBottom: 20,
            alignSelf: 'flex-start',
          }}
        >
          <ExpoImage
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            source={{ uri: addedLocationTag.icon }}
            contentFit='cover'
          />
          <Text style={{ color: 'white', marginRight: 10 }}>{addedLocationTag.name}</Text>
          {/* <TouchableOpacity
            onPress={() => {
              setFormData((previous) => {
                return {
                  ...previous,
                  addedLocationTag: null,
                };
              });
              setLocationTagOptions((previous) => [...previous, formData.addedLocationTag]);
            }}
          >
            <Ionicons name='close-circle-sharp' color='white' size={20} />
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCreatedLocationTag = () => {
    if (createdLocationTag) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(90,90,90)',
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
            marginBottom: 20,
            alignSelf: 'flex-start',
          }}
        >
          <ExpoImage
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            source={{ uri: createdLocationTag.icon }}
            contentFit='cover'
            tintColor={'white'}
          />
          <Text style={{ color: 'white', marginRight: 10 }}>{createdLocationTag.name}</Text>
          {/* <TouchableOpacity
            onPress={() => {
              setFormData((previous) => {
                return {
                  ...previous,
                  createdLocationTag: null,
                };
              });
            }}
          >
            <Ionicons name='close-circle-sharp' color='white' size={20} />
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return null;
    }
  };
  // createしたものがきたら、すでにaddedなやつのaddedをfalseにする感じかな。

  const renderLocationTagOptions = () => {
    if (locationTagOptions.length) {
      const list = locationTagOptions.map((locationTag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(90,90,90)',
              borderRadius: 20,
              marginRight: 10,
              marginBottom: 10,
            }}
            // disabled={addedLocationTag ? true : false}
            onPress={() => {
              if (createNewPostFormData.addedLocationTag) {
                if (createNewPostFormData.addedLocationTag._id === locationTag._id) {
                  // setAddedLocationTag(null);
                  setCreateNewPostFormData((previous) => {
                    return {
                      ...previous,
                      addedLocationTag: null,
                    };
                  });
                } else {
                  // setAddedLocationTag(locationTag);
                  setCreateNewPostFormData((previous) => {
                    return {
                      ...previous,
                      addedLocationTag: locationTag,
                    };
                  });
                }
              } else {
                // setAddedLocationTag(locationTag);
                setCreateNewPostFormData((previous) => {
                  return {
                    ...previous,
                    addedLocationTag: locationTag,
                  };
                });
              }
            }}
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 10, borderRadius: 8 }}
              source={{ uri: locationTag.icon }}
              placeholder={blurhash}
              contentFit='cover'
              transition={1000}
              tintColor={locationTag.iconType === 'icon' ? locationTag.color : null}
            />
            <Text style={{ color: 'white' }}>{locationTag.name}</Text>
            {createNewPostFormData.addedLocationTag &&
            createNewPostFormData.addedLocationTag._id === locationTag._id ? (
              <Ionicons
                name='checkmark-circle'
                size={25}
                color='green'
                style={{ position: 'absolute', right: -7, top: -10 }}
              />
            ) : null}
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>{list}</View>
      );
    } else {
      return (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>There are no location tag options yet.</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 10 }}>
          <ExpoImage
            style={{ width: 20, height: 20, marginRight: 10 }}
            source={require('../../../assets/forApp/map-pin.png')}
            placeholder={blurhash}
            contentFit='cover'
            transition={1000}
            tintColor={'white'}
          />
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            Add Location Tag (Optional)
          </Text>
        </View>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Where did you take that snap? Please choose a location tag as needed.
        </Text>
      </View>
      {/* {renderAddedLocationTag()}
          {renderCreatedLocationTag()} */}
      {renderLocationTagOptions()}
      <MapView
        ref={mapRef}
        userInterfaceStyle='dark'
        style={{ width: '100%', height: 350, marginBottom: 20 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        // provider='google'
        pitchEnabled={false}
      >
        {/* <TouchableOpacity onPress={() => navigation?.navigate('LocationPicker')}></TouchableOpacity> */}
        {createNewPostFormData.addedLocationTag ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: createNewPostFormData.addedLocationTag.point.coordinates[1],
              longitude: createNewPostFormData.addedLocationTag.point.coordinates[0],
            }}
          >
            <ExpoImage
              style={{ width: 40, height: 40, borderRadius: 10 }}
              source={{ uri: createNewPostFormData.addedLocationTag.icon }}
              placeholder={blurhash}
              contentFit='cover'
              transition={1000}
              tintColor={
                createNewPostFormData.addedLocationTag.iconType === 'icon'
                  ? createNewPostFormData.addedLocationTag.color
                  : null
              }
            />
          </Marker>
        ) : null}
      </MapView>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          // marginTop: 30,
        }}
        onPress={() => {
          navigation.navigate('CreateNewLocationTag');
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          {/* <Ionicons name='add' color='black' size={25} style={{ marginRight: 5 }} /> */}
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Create new?</Text>
        </View>
      </TouchableOpacity>

      {/* {formData.location.coordinates.length ? (
            <>
              <Text style={{ color: 'white', marginBottom: 20 }}>Please add a location title down below.</Text>
              {!formData.addedLocationTag && !formData.createdLocationTag ? (
                <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
                  There is no location title selected yet...
                </Text>
              ) : null}

              {renderCreatedLocationTag()}
            </>
          ) : null} */}
    </View>
  );
};

export default AddLocationTag;
