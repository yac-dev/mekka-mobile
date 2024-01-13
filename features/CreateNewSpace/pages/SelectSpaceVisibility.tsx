import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SelectSpaceVisibility = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

  const renderVisibilityDescription = () => {
    if (formData.isPublic !== undefined) {
      if (formData.isPublic) {
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              By setting it to public, this space will be open to everyone, allowing anyone to join and share
              photos/videos freely.
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{ padding: 20 }}>
            {/* <Text style={{ color: 'white', textAlign: 'center' }}>
              By setting to private, you can enjoy sharing only with people you know.
            </Text> */}
            <Text style={{ color: 'white', textAlign: 'center' }}>
              By setting it to private, this space will be closed, allowing sharing only with people you know.
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

      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() =>
          setFormData((previous) => {
            return {
              ...previous,
              isPublic: false,
            };
          })
        }
        activeOpacity={1}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name='public-off' color='white' size={20} style={{ marginRight: 20 }} />
          <View style={{ width: 250 }}>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Private</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
              The space will be secret, accessible only to people you know through an invitation code.
            </Text>
          </View>
        </View>
        {/* <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} /> */}
        {formData.isPublic === undefined ? null : formData.isPublic ? null : (
          <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() =>
          setFormData((previous) => {
            return {
              ...previous,
              isPublic: true,
            };
          })
        }
        activeOpacity={1}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name='public' color='white' size={20} style={{ marginRight: 20 }} />
          <View style={{ width: 250 }}>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Public</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
              The space will be open to everyone. People can find your space from 🧭"Discover" tab and join here.
            </Text>
          </View>
        </View>
        {formData.isPublic === undefined ? null : formData.isPublic ? (
          <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        ) : null}
      </TouchableOpacity>

      {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
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
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Private</Text>
          {formData.isPublic === undefined ? null : formData.isPublic ? null : (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -5, right: -5 }}
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
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Public</Text>
          {formData.isPublic === undefined ? null : formData.isPublic ? (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}
        </TouchableOpacity>
      </View> */}
      {/* {renderVisibilityDescription()} */}
    </View>
  );
};

export default SelectSpaceVisibility;
