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

export const Comment = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onIsPubcliChange, onCommentAvailabilityChange } = useContext(CreateNewSpaceContext);

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
          Comment
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Is your space private or public?</Text>
      </View>

      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => onCommentAvailabilityChange(true)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <VectorIcon.MCI name='comment' color='white' size={20} style={{ marginRight: 20 }} />
          <View style={{ width: 250 }}>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Allowed</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>People can leave comments on each post.</Text>
          </View>
        </View>
        {formData.isCommentAvailable.value === undefined ? null : formData.isCommentAvailable.value ? (
          <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => onCommentAvailabilityChange(false)}
        activeOpacity={0.7}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <VectorIcon.MCI name='comment-off' color='white' size={20} style={{ marginRight: 20 }} />
          <View style={{ width: 250 }}>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Disallowed</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>People can't leave comments on each post.</Text>
          </View>
        </View>
        {formData.isCommentAvailable.value === undefined ? null : formData.isCommentAvailable.value ? null : (
          <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
        )}
      </TouchableOpacity>
    </View>
  );
};
