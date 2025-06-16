import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { VectorIcon } from '../../../Icons/VectorIcons';
import { Colors } from '../../../themes';

const screenHorizontalPadding = 20;
const selectionItemWidth = Dimensions.get('window').width / 2 - screenHorizontalPadding;

export const SpaceVisibilitySelection = () => {
  const createNewSpaceNavigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onIsPubcliChange, onFollowAvailabilityChange } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    createNewSpaceNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createNewSpaceNavigation.navigate('Base')}
          disabled={!formData.isPublic.isValidated}
        >
          <Text
            style={{
              color: !formData.isPublic.isValidated ? 'rgb(100,100,100)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

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
          Choose Your Space Type
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', lineHeight: 20 }}>
          Select how others can discover and join your space
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {/* Private Space Card */}
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
          onPress={() => onIsPubcliChange(false)}
        >
          {/* Space Icon */}
          <View style={{ marginRight: 14 }}>
            <VectorIcon.MI name='public-off' color={Colors.white} size={36} />
          </View>
          {/* Title & Description */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Private Space</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Only invited members can join. Perfect for close-knit communities and exclusive content.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.isPublic.value === false ? (
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
        {/* Public Space Card */}
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
          onPress={() => onIsPubcliChange(true)}
        >
          {/* Space Icon */}
          <View style={{ marginRight: 14 }}>
            <VectorIcon.MI name='public' color={Colors.white} size={36} />
          </View>
          {/* Title & Description */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Public Space</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Anyone can discover and join. Great for growing communities and open discussions.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.isPublic.value === true ? (
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
