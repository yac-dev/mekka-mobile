import React, { useContext } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Dimensions } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const screenHorizontalPadding = 20;
const selectionItemWidth = Dimensions.get('window').width / 2 - screenHorizontalPadding;

export const Following = () => {
  const { formData, onFollowAvailabilityChange } = useContext(CreateNewSpaceContext);
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
          Following
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', lineHeight: 20 }}>
          Choose whether members can follow each other in this space.
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
          onPress={() => onFollowAvailabilityChange(true)}
        >
          {/* Icon */}
          <View style={{ marginRight: 14 }}>
            <VectorIcon.II name='person-add' color={Colors.white} size={28} />
          </View>
          {/* Title & Description */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Allowed</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Connect, discover new friends, and stay updated with everyone’s latest posts.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.isFollowAvailable.value === true ? (
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
          onPress={() => onFollowAvailabilityChange(false)}
        >
          {/* Icon */}
          <View style={{ marginRight: 14 }}>
            <VectorIcon.FD name='prohibited' color='white' size={28} />
          </View>
          {/* Title & Description */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Disallowed</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              No following system. Enjoy content at your own pace, free from follower counts or social pressure.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.isFollowAvailable.value === false ? (
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
