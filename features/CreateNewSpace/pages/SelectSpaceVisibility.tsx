import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';

const SelectSpaceVisibility = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

  const renderVisibilityDescription = () => {
    if (formData.isPublic !== undefined) {
      if (formData.isPublic) {
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              By setting public, everybody in this app can join here
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              By setting private, it is only accessible to people who you know.
            </Text>
          </View>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 50 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Space visibility
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Is your space private or public?</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            padding: 2,
            borderRadius: 100 / 2,
            marginRight: 20,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                isPublic: false,
              };
            })
          }
        >
          {/* <MaterialCommunityIcons name='camera-plus' size={30} color='black' /> */}
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Private</Text>
          {formData.isPublic === undefined ? null : formData.isPublic ? null : (
            <Ionicons
              name='checkmark-circle'
              size={20}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: 0, right: 0 }}
            />
          )}
        </TouchableOpacity>
        <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20, fontSize: 20 }}>Or</Text>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            padding: 2,
            borderRadius: 100 / 2,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                isPublic: true,
              };
            })
          }
        >
          {/* <MaterialCommunityIcons name='camera-plus' size={30} color='black' /> */}
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Public</Text>
          {formData.isPublic === undefined ? null : formData.isPublic ? (
            <Ionicons
              name='checkmark-circle'
              size={20}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: 0, right: 0 }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      {renderVisibilityDescription()}
    </View>
  );
};

export default SelectSpaceVisibility;
