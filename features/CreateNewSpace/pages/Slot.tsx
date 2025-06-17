import React, { useContext, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { AppBottomSheet } from '../../../components/AppBottomSheet';

const screenHorizontalPadding = 20;

type PresetSlot = {
  label: string;
  value: {
    start: string;
    end: string;
  };
};

const presetSlots: PresetSlot[] = [
  {
    label: 'Anytime',
    value: {
      start: '00:00',
      end: '24:00',
    },
  },
  {
    label: 'Morning',
    value: {
      start: '07:00',
      end: '12:00',
    },
  },
  {
    label: 'Afternoon',
    value: {
      start: '12:00',
      end: '18:00',
    },
  },
  {
    label: 'Evening',
    value: {
      start: '18:00',
      end: '24:00',
    },
  },
];

export const Slot = () => {
  const { formData, onDisapperAfterChange } = useContext(CreateNewSpaceContext);
  const customTimeBottomSheetRef = useRef<BottomSheetModal>(null);

  const [selectedStartHour, setSelectedStartHour] = useState<string>('00');
  const [selectedStartMin, setSelectedStartMin] = useState<string>('00');
  const [selectedEndHour, setSelectedEndHour] = useState<string>('23');
  const [selectedEndMin, setSelectedEndMin] = useState<string>('59');

  const openCustomSlotBottomSheet = (index: number) => {
    customTimeBottomSheetRef.current?.snapToIndex(index);
  };

  const closeCustomSlotBottomSheet = () => {
    customTimeBottomSheetRef.current?.close();
  };

  const renderHourPickerItems = (
    selectedHour: string,
    setSelectedHour: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    return (
      <Picker
        selectedValue={selectedHour}
        onValueChange={(itemValue) => setSelectedHour(itemValue)}
        style={{ width: 85 }}
      >
        {hours.map((hour) => (
          <Picker.Item key={hour} label={hour} value={hour} color='white' />
        ))}
      </Picker>
    );
  };

  const renderMinPickerItems = (selectedMin: string, setSelectedMin: React.Dispatch<React.SetStateAction<string>>) => {
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    return (
      <Picker
        selectedValue={selectedMin}
        onValueChange={(itemValue) => setSelectedMin(itemValue)}
        style={{ width: 85 }}
      >
        {minutes.map((min) => (
          <Picker.Item key={min} label={min} value={min} color='white' />
        ))}
      </Picker>
    );
  };

  const renderItem = ({ item }: { item: PresetSlot }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: 'rgb(50, 50, 50)',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 20,
          marginRight: 10,
        }}
        onPress={() => {
          setSelectedStartHour(item.value.start);
          setSelectedStartMin(item.value.start);
          setSelectedEndHour(item.value.end);
          setSelectedEndMin(item.value.end);
        }}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
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
          Hours
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Set when members can post in your space.{'\n'}Choose preset times like Morning or Evening,{'\n'}or create your
          own custom time slot.
        </Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* First row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          {/* Anytime */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 18,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.85}
            onPress={() => {
              setSelectedStartHour('00');
              setSelectedEndHour('24');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Anytime</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Members can post at any time
              </Text>
            </View>
            {selectedStartHour === '00' && selectedEndHour === '24' ? (
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
                <VectorIcon.II name='checkmark' size={18} color='black' />
              </View>
            ) : null}
          </TouchableOpacity>
          {/* Morning */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 18,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.85}
            onPress={() => {
              setSelectedStartHour('07');
              setSelectedEndHour('12');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Morning</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>7:00 AM - 12:00 PM</Text>
            </View>
            {selectedStartHour === '07' && selectedEndHour === '12' ? (
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
                <VectorIcon.II name='checkmark' size={18} color='black' />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>

        {/* Second row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          {/* Afternoon */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 18,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.85}
            onPress={() => {
              setSelectedStartHour('12');
              setSelectedEndHour('18');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Afternoon</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>12:00 PM - 6:00 PM</Text>
            </View>
            {selectedStartHour === '12' && selectedEndHour === '18' ? (
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
                <VectorIcon.II name='checkmark' size={18} color='black' />
              </View>
            ) : null}
          </TouchableOpacity>
          {/* Evening */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 18,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.85}
            onPress={() => {
              setSelectedStartHour('18');
              setSelectedEndHour('24');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Evening</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>6:00 PM - 12:00 AM</Text>
            </View>
            {selectedStartHour === '18' && selectedEndHour === '24' ? (
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
                <VectorIcon.II name='checkmark' size={18} color='black' />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>

        {/* Custom option */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 18,
            padding: 18,
            position: 'relative',
            overflow: 'visible',
            minHeight: 60,
          }}
          activeOpacity={0.85}
          onPress={() => openCustomSlotBottomSheet(0)}
        >
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom</Text>
              {selectedStartHour !== '00' &&
              selectedEndHour !== '24' &&
              selectedStartHour !== '07' &&
              selectedEndHour !== '12' &&
              selectedStartHour !== '12' &&
              selectedEndHour !== '18' &&
              selectedStartHour !== '18' &&
              selectedEndHour !== '24' ? (
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginLeft: 8 }}>
                  {selectedStartHour}:00 - {selectedEndHour}:00
                </Text>
              ) : null}
            </View>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>Set your own time window</Text>
          </View>
          <VectorIcon.MCI name='chevron-down' size={22} color='white' style={{ marginLeft: 8, marginRight: 4 }} />
          {selectedStartHour !== '00' &&
          selectedEndHour !== '24' &&
          selectedStartHour !== '07' &&
          selectedEndHour !== '12' &&
          selectedStartHour !== '12' &&
          selectedEndHour !== '18' &&
          selectedStartHour !== '18' &&
          selectedEndHour !== '24' ? (
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
              <VectorIcon.II name='checkmark' size={18} color='black' />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <AppBottomSheet.Gorhom
        ref={customTimeBottomSheetRef}
        snapPoints={['65%']}
        header={<Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Custom Time Range</Text>}
        onCloseButtonClose={closeCustomSlotBottomSheet}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, gap: 10 }}>
          <View>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>
              From
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderHourPickerItems(selectedStartHour, setSelectedStartHour)}
              {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>:</Text>
              {renderMinPickerItems(selectedStartMin, setSelectedStartMin)} */}
            </View>
          </View>
          <View>
            <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>
              To
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderHourPickerItems(selectedEndHour, setSelectedEndHour)}
              {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>:</Text>
              {renderMinPickerItems(selectedEndMin, setSelectedEndMin)} */}
            </View>
          </View>
        </View>
      </AppBottomSheet.Gorhom>
    </View>
  );
};
