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
          Space Visibility
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Make your space private or public?</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 30,
          paddingVertical: 10,
          paddingHorizontal: screenHorizontalPadding,
        }}
      >
        <View style={{ width: selectionItemWidth, paddingRight: 8 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={() => onIsPubcliChange(false)}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MI name='public-off' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Private</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Accessible by invitation code only</Text>
            </View>
          </TouchableOpacity>
          {formData.isPublic.value === undefined ? null : formData.isPublic.value ? null : (
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: 0,
                backgroundColor: 'black',
                width: 35,
                height: 35,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='checkmark' size={20} color={'black'} />
              </View>
            </View>
          )}
        </View>
        <View style={{ width: selectionItemWidth, paddingLeft: 8 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={() => onIsPubcliChange(true)}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MI name='public' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Public</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Anyone can join</Text>
            </View>
          </TouchableOpacity>
          {formData.isPublic.value === undefined ? null : formData.isPublic.value ? (
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                backgroundColor: 'black',
                width: 35,
                height: 35,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='checkmark' size={20} color={'black'} />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};
