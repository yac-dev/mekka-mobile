import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { VectorIcon } from '../../../Icons';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { AppButton } from '../../../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SelectSpaceVisibility = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onIsPubcliChange, onFollowAvailabilityChange } = useContext(CreateNewSpaceContext);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Space Visibility
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Is your space private or public?</Text>
      </View>

      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => onIsPubcliChange(false)}
        activeOpacity={0.7}
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
        {formData.isPublic.value === undefined ? null : formData.isPublic.value ? null : (
          <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => onIsPubcliChange(true)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name='public' color='white' size={20} style={{ marginRight: 20 }} />
          <View style={{ width: 250 }}>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Public</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
              The space will be open to everyone. People can find your space from "Discover" and join.
            </Text>
          </View>
        </View>
        {formData.isPublic.value === undefined ? null : formData.isPublic.value ? (
          <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        ) : null}
      </TouchableOpacity>

      {formData.isPublic.value === undefined ? null : formData.isPublic.value ? (
        <>
          <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Allow "follow" feature?</Text>
          </View>

          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => onFollowAvailabilityChange(true)}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.II name='person-add' size={20} color={'white'} style={{ marginRight: 20 }} />
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Allowed</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  Like the traditional social media, people can follow each other and get notified when there are new
                  posts from followed people.
                </Text>
              </View>
            </View>
            {formData.isFollowAvailable.value === undefined ? null : formData.isFollowAvailable.value ? (
              <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => onFollowAvailabilityChange(false)}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 20 }}>
                <VectorIcon.II name='person-add' color='white' size={20} />
                <VectorIcon.FD
                  name='prohibited'
                  color='white'
                  size={20}
                  style={{ position: 'absolute', top: -10, right: -10 }}
                />
              </View>
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Disallowed</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  By turning off, people will free from the stress of following/unfollowing others, as well as the
                  followers number contest.
                </Text>
              </View>
            </View>
            {formData.isFollowAvailable.value === undefined ? null : !formData.isFollowAvailable.value ? (
              <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
            ) : null}
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

export default SelectSpaceVisibility;
