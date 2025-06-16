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
          Comments
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', lineHeight: 20 }}>
          Choose whether people can leave comments on posts in this space.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {/* Allowed Card */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(40,40,40)',
            borderRadius: 18,
            padding: 18,
            marginBottom: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            position: 'relative',
            overflow: 'visible',
          }}
          activeOpacity={0.85}
          onPress={() => onCommentAvailabilityChange(true)}
        >
          {/* Icon */}
          <View style={{ marginRight: 14 }}>
            <VectorIcon.MCI name='comment' color='white' size={28} />
          </View>
          {/* Title & Description */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Allowed</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              A space for conversation. Leave feedback, spark discussions, and build community together.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.isCommentAvailable.value === true ? (
            <View
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'white',
                width: 28,
                height: 28,
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.12,
                shadowRadius: 2,
                borderWidth: 2,
                borderColor: 'black',
              }}
            >
              <VectorIcon.II name='checkmark' size={18} color={'black'} />
            </View>
          ) : null}
        </TouchableOpacity>
        {/* Disallowed Card */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(40,40,40)',
            borderRadius: 18,
            padding: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            position: 'relative',
            overflow: 'visible',
          }}
          activeOpacity={0.85}
          onPress={() => onCommentAvailabilityChange(false)}
        >
          {/* Icon */}
          <View style={{ marginRight: 14 }}>
            <VectorIcon.MCI name='comment-off' color='white' size={28} />
          </View>
          {/* Title & Description */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Disallowed</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Just enjoy the posts, free from comments or outside noise.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.isCommentAvailable.value === false ? (
            <View
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'white',
                width: 28,
                height: 28,
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.12,
                shadowRadius: 2,
                borderWidth: 2,
                borderColor: 'black',
              }}
            >
              <VectorIcon.II name='checkmark' size={18} color={'black'} />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};
