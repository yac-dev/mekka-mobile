import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  InputAccessoryView,
  Platform,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { VectorIcon } from '../../../Icons';

const screenHorizontalPadding = 20;
const INPUT_ACCESSORY_VIEW_ID = 'capacityInput';

export const Capacity = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onCapacityChange } = useContext(CreateNewSpaceContext);
  const [customInput, setCustomInput] = useState('');
  const hiddenInputRef = useRef<TextInput>(null);

  // Initialize custom input from context
  useEffect(() => {
    if (formData.capacity.value !== -1) {
      setCustomInput(formData.capacity.value.toString());
    }
  }, []);

  const handleCustomPress = () => {
    hiddenInputRef.current?.focus();
  };

  const handleCustomInputSubmit = () => {
    const capacityNumber = parseInt(customInput, 10);
    if (isNaN(capacityNumber) || capacityNumber <= 0) {
      Alert.alert('Invalid Number', 'Please enter a valid positive number.');
      return;
    }
    if (capacityNumber > 10000) {
      Alert.alert('Too Large', 'Maximum capacity is 10,000 members.');
      return;
    }
    Keyboard.dismiss();
    onCapacityChange(capacityNumber);
  };

  const isCapacitySelected = (capacityType: 'free' | 'custom') => {
    if (capacityType === 'free') {
      return formData.capacity.value === -1;
    } else {
      return formData.capacity.value !== -1;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Base')} disabled={!formData.capacity.isValidated}>
          <Text
            style={{
              color: !formData.capacity.isValidated ? 'rgb(100,100,100)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.capacity]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
        <View
          style={{
            paddingLeft: screenHorizontalPadding,
            paddingRight: screenHorizontalPadding,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Member Limit
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', lineHeight: 20 }}>
            Set how many members can join your space. You can always change this later.
          </Text>
        </View>

        <View style={{ paddingHorizontal: screenHorizontalPadding }}>
          {/* Unlimited Card */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 18,
              marginBottom: 18,
              position: 'relative',
              overflow: 'visible',
            }}
            activeOpacity={0.85}
            onPress={() => onCapacityChange(-1)}
          >
            {/* Icon */}
            <VectorIcon.MCI name='account-group' size={36} color='white' style={{ marginRight: 14 }} />
            {/* Title & Description */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>Unlimited</Text>
                <Text style={{ color: 'white', fontSize: 20 }}>∞</Text>
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                No member limit. Your space can grow as large as you want.
              </Text>
            </View>
            {/* Checkmark */}
            {isCapacitySelected('free') && (
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
                <VectorIcon.MCI name='check' size={18} color='black' />
              </View>
            )}
          </TouchableOpacity>

          {/* Custom Limit Card */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 18,
              position: 'relative',
              overflow: 'visible',
            }}
            activeOpacity={0.85}
            onPress={handleCustomPress}
          >
            {/* Icon */}
            <VectorIcon.MCI name='account-multiple' size={36} color='white' style={{ marginRight: 14 }} />
            {/* Title & Description */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>Custom</Text>
                {isCapacitySelected('custom') && (
                  <Text style={{ color: 'white', fontSize: 15 }}>{formData.capacity.value}</Text>
                )}
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Set a specific number of members allowed to join.
              </Text>
            </View>
            {/* Checkmark */}
            {isCapacitySelected('custom') && (
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
                <VectorIcon.MCI name='check' size={18} color='black' />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Hidden TextInput for handling input */}
      <TextInput
        style={{ position: 'absolute', opacity: 0, height: 0 }}
        value={customInput}
        onChangeText={setCustomInput}
        keyboardType='numeric'
        maxLength={5}
        inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
        ref={hiddenInputRef}
      />

      {/* Input Accessory View for iOS */}
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
          <View
            style={{
              backgroundColor: 'rgb(30,30,30)',
              borderTopWidth: 0.5,
              borderTopColor: 'rgb(100,100,100)',
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {customInput ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 4 }}>{customInput}</Text>
                <Text style={{ color: 'white', fontSize: 14 }}>members</Text>
              </View>
            ) : (
              <Text style={{ color: 'white', fontSize: 15 }}>Enter member limit</Text>
            )}
            <TouchableOpacity
              onPress={handleCustomInputSubmit}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};
