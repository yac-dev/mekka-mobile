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
  const { formData, onIsPubcliChange } = useContext(CreateNewSpaceContext);

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
        onPress={() => onIsPubcliChange(false)}
        activeOpacity={0.5}
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
        activeOpacity={0.5}
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
        {formData.isPublic.value === undefined ? null : formData.isPublic.value ? (
          <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default SelectSpaceVisibility;
