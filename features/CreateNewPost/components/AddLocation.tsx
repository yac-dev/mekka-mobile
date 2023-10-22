import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../themes/color';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';

// いいや、locationは、
const AddLocation = () => {
  const { navigation, route, setFormData, formData, locationTagOptions, setLocationTagOptions } =
    useContext(CreateNewPostContext);
  const [accordion, setAccordion] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (route?.params?.selectedLocation) {
      setFormData((previous) => {
        return {
          ...previous,
          location: route?.params?.selectedLocation,
        };
      });
    }
  }, [route?.params?.selectedLocation]);

  useEffect(() => {
    if (route?.params?.createdLocationTag) {
      setFormData((previous) => {
        return {
          ...previous,
          createdLocationTag: route?.params?.createdLocationTag,
        };
      });
    }
  }, [route?.params?.createdLocationTag]);
  // setLocationTagOptions

  useEffect(() => {
    if (formData.addedLocationTag) {
      const newLat = formData.addedLocationTag.point.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: formData.addedLocationTag.point.coordinates[0],
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
    } else if (formData.createdLocationTag) {
      const newLat = formData.createdLocationTag.point.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: formData.createdLocationTag.point.coordinates[0],
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
    }
  }, [formData.addedLocationTag, formData.createdLocationTag]);

  // formData.createdLocationTag dependencyにcreatedTagも入れる。

  // {formData.createdLocationTag.name ? (
  //   <TouchableOpacity
  //     style={{
  //       padding: 10,
  //       flexDirection: 'row',
  //       alignItems: 'center',
  //       backgroundColor: 'rgb(80,80,80)',
  //       borderRadius: 8,
  //       marginRight: 10,
  //       marginBottom: 10,
  //     }}
  //     onPress={() =>
  //       setFormData((previous) => {
  //         return {
  //           ...previous,
  //           createdLocationTag: {
  //             ...previous.createdLocationTag,
  //             selected: !previous.createdLocationTag.selected,
  //           },
  //           addedLocationTag: null,
  //         };
  //       })
  //     }
  //   >
  //     <FastImage
  //       source={{ uri: 'https://mekka-dev.s3.us-east-2.amazonaws.com/locationTagIcons/map-pin.png' }}
  //       style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
  //       tintColor={'white'}
  //     />
  //     <Text style={{ color: 'white', marginRight: 10 }}>{formData.createdLocationTag.name}</Text>
  //     <Ionicons
  //       name='checkmark-circle-sharp'
  //       size={20}
  //       color={formData.createdLocationTag.selected ? iconColorTable['lightGreen1'] : 'rgb(100,100,100)'}
  //     />
  //   </TouchableOpacity>
  // ) : null}

  // <TouchableOpacity
  //         style={{
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           backgroundColor: 'rgb(80,80,80)',
  //           borderRadius: 8,
  //           padding: 5,
  //           marginRight: 10,
  //           marginBottom: 10,
  //         }}
  //         onPress={() => navigation?.navigate('CreateNewLocationTag')}
  //       >
  //         <Ionicons name='create' size={20} color='white' style={{ marginBottom: 5 }} />
  //         <Text style={{ color: 'white' }}>Create</Text>
  //       </TouchableOpacity>

  // createdLocationTagがある場合はそれを優先で表示する。
  // ない場合は、addedLocationTagの方をrender
  const renderAddedLocationTag = () => {
    if (formData.addedLocationTag) {
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
          <FastImage
            source={{ uri: formData.addedLocationTag.icon }}
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            // tintColor={'white'}
          />
          <Text style={{ color: 'white', marginRight: 10 }}>{formData.addedLocationTag.name}</Text>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCreatedLocationTag = () => {
    if (formData.createdLocationTag) {
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
          <FastImage
            source={{ uri: formData.createdLocationTag.icon }}
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            tintColor={'white'}
          />
          <Text style={{ color: 'white', marginRight: 10 }}>{formData.createdLocationTag.name}</Text>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderLocationTagOptions = () => {
    if (locationTagOptions.length) {
      const list = locationTagOptions.map((locationTag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(90,90,90)',
              borderRadius: 8,
              marginRight: 10,
              marginBottom: 10,
            }}
            disabled={formData.addedLocationTag || formData.createdLocationTag ? true : false}
            onPress={() => {
              setFormData((previous) => {
                return {
                  ...previous,
                  addedLocationTag: locationTag,
                };
              });
              setLocationTagOptions((previous) => {
                const updating = [...previous];
                return updating.filter((element, idx) => idx !== index);
              });
            }}
          >
            <FastImage
              source={{ uri: locationTag.icon }}
              style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            />
            <Text style={{ color: 'white', marginRight: 10 }}>{locationTag.name}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ padding: 10, backgroundColor: 'rgb(70,70,70)', borderRadius: 5, marginBottom: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
          >
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Options</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              disabled={formData.addedLocationTag || formData.createdLocationTag ? true : false}
              onPress={() => navigation?.navigate('CreateNewLocationTag')}
            >
              <Ionicons
                name='create'
                size={17}
                color={formData.addedLocationTag || formData.createdLocationTag ? 'rgb(170,170,170)' : 'white'}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  color: formData.addedLocationTag || formData.createdLocationTag ? 'rgb(170,170,170)' : 'white',
                }}
              >
                Create new?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{list}</View>
        </View>
      );
    } else {
      return (
        <View style={{ padding: 10, backgroundColor: 'rgb(70,70,70)', borderRadius: 5, marginBottom: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
          >
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Options</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              disabled={formData.addedLocationTag || formData.createdLocationTag ? true : false}
              onPress={() => navigation?.navigate('CreateNewLocationTag')}
            >
              <Ionicons
                name='create'
                size={17}
                color={formData.addedLocationTag || formData.createdLocationTag ? 'rgb(170,170,170)' : 'white'}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  color: formData.addedLocationTag || formData.createdLocationTag ? 'rgb(170,170,170)' : 'white',
                }}
              >
                Create new?
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'white', textAlign: 'center' }}>There are no location tag options left...</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ padding: 7, borderRadius: 5, marginBottom: 10, backgroundColor: 'rgb(50,50,50)' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => setAccordion((previous) => !previous)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconParameterBackgroundColorTable['blue1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialCommunityIcons name='map-marker' color={iconColorTable['blue1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Location</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginRight: 10, color: 'rgb(170, 170,170)' }}>Optional</Text>
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 20, color: 'white' }}>Where did you take that?</Text>
          {renderAddedLocationTag()}
          {renderCreatedLocationTag()}
          {renderLocationTagOptions()}

          <MapView
            ref={mapRef}
            style={{ width: '100%', height: 300, marginBottom: 20 }}
            // 今の自分の場所
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            // provider='google'
            pitchEnabled={false}
          >
            <TouchableOpacity onPress={() => navigation?.navigate('LocationPicker')}></TouchableOpacity>
            {formData.addedLocationTag ? (
              <Marker
                tracksViewChanges={false}
                coordinate={{
                  latitude: formData.addedLocationTag.point.coordinates[1],
                  longitude: formData.addedLocationTag.point.coordinates[0],
                }}
              >
                <FastImage
                  source={{ uri: formData.addedLocationTag.icon }}
                  style={{ width: 40, height: 40, borderRadius: 10 }}
                />
              </Marker>
            ) : null}
            {formData.createdLocationTag ? (
              <Marker
                tracksViewChanges={false}
                coordinate={{
                  latitude: formData.createdLocationTag.point.coordinates[1],
                  longitude: formData.createdLocationTag.point.coordinates[0],
                }}
              >
                <FastImage
                  source={{ uri: formData.createdLocationTag.icon }}
                  style={{ width: 40, height: 40, borderRadius: 10 }}
                />
              </Marker>
            ) : null}
          </MapView>

          {formData.location.coordinates.length ? (
            <>
              <Text style={{ color: 'white', marginBottom: 20 }}>Please add a location title down below.</Text>
              {!formData.addedLocationTag && !formData.createdLocationTag ? (
                <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
                  There is no location title selected yet...
                </Text>
              ) : null}

              {renderCreatedLocationTag()}
            </>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default AddLocation;
