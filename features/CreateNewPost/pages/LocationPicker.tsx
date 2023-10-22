import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { PostContext } from '../../Space/contexts/PostContext';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { mapStyle } from '../../../themes/map';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

type SelectingLocationType = null | {
  type: string;
  coordinates: number[];
};

type AddLocationProps = {
  navigation: NavigationProp<ParamListBase> | undefined;
};

const LocationPicker: React.FC<AddLocationProps> = (props) => {
  const [selectingLocation, setSelectingLocation] = useState<SelectingLocationType>(null);

  const onMapPress = (event: MapPressEvent) => {
    event.persist();
    // console.log(event.nativeEvent.coordinate);
    setSelectingLocation({
      coordinates: [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude],
      type: 'Point',
    });
    // setSelectingVenue((previous) => {
    //   const updating = { ...previous };
    //   updating.coordinates[0] = event.nativeEvent.coordinate.longitude;
    //   updating.coordinates[1] = event.nativeEvent.coordinate.latitude;
    //   return updating;
    // });
  };
  useEffect(() => {
    props.navigation?.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            props.navigation?.navigate({
              name: 'CreateNewPost',
              params: { selectedLocation: selectingLocation },
              merge: true,
            })
          }
          disabled={selectingLocation ? false : true}
        >
          <Text
            style={{
              color: selectingLocation ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectingLocation]);

  return (
    <MapView
      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      showsUserLocation={true}
      customMapStyle={mapStyle}
      // // showsMyLocationButton={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      onPress={(event) => onMapPress(event)}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // provider='google'
    >
      {selectingLocation ? (
        <Marker
          tracksViewChanges={false}
          coordinate={{
            latitude: selectingLocation.coordinates[1],
            longitude: selectingLocation.coordinates[0],
          }}
          // pinColor='black'
        ></Marker>
      ) : null}
    </MapView>
  );
};

export default LocationPicker;
