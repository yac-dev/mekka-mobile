import React, { useContext, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
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

const hours12 = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const ampm = ['AM', 'PM'];

function to24Hour(hour: string, ampmValue: string) {
  let h = parseInt(hour, 10);
  if (ampmValue === 'AM') {
    if (h === 12) return 0;
    return h;
  } else {
    if (h === 12) return 12;
    return h + 12;
  }
}

function timeToSeconds(hour: string, min: string, sec: string, ampmValue: string) {
  const h24 = to24Hour(hour, ampmValue);
  return h24 * 3600 + parseInt(min, 10) * 60 + parseInt(sec, 10);
}

// Helper to convert 24-hour time string (e.g. '18:00') to 12-hour format and AM/PM
function convert24To12(hour24: string) {
  let h = parseInt(hour24, 10);
  let ampm = h >= 12 ? 'PM' : 'AM';
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour: hour12.toString().padStart(2, '0'), ampm };
}

// Add a simple toggle button component for AM/PM
const AMPMToggle = ({ value, setValue }) => (
  <View style={{ marginVertical: 16 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgb(50,50,50)',
        alignSelf: 'center',
        borderRadius: 8,
        padding: 8,
      }}
    >
      {['AM', 'PM'].map((ampmOpt) => (
        <TouchableOpacity
          key={ampmOpt}
          onPress={() => setValue(ampmOpt)}
          activeOpacity={0.7}
          style={{
            backgroundColor: value === ampmOpt ? 'rgb(70,70,70)' : undefined,
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 24,
            marginHorizontal: 8,
          }}
        >
          <Text style={{ color: value === ampmOpt ? 'white' : '#888', fontWeight: 'bold', fontSize: 16 }}>
            {ampmOpt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// In renderTimePickers, remove the AM/PM Picker and return only hour/min/sec pickers
const renderTimePickers = (hour, setHour, min, setMin, sec, setSec) => (
  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
    <Picker selectedValue={hour} onValueChange={setHour} style={{ width: 100 }}>
      {hours12.map((h) => (
        <Picker.Item key={h} label={h} value={h} color='white' />
      ))}
    </Picker>
    <Text style={{ color: 'white', fontSize: 18 }}>:</Text>
    <Picker selectedValue={min} onValueChange={setMin} style={{ width: 100 }}>
      {minutes.map((m) => (
        <Picker.Item key={m} label={m} value={m} color='white' />
      ))}
    </Picker>
    <Text style={{ color: 'white', fontSize: 18 }}>:</Text>
    <Picker selectedValue={sec} onValueChange={setSec} style={{ width: 100 }}>
      {seconds.map((s) => (
        <Picker.Item key={s} label={s} value={s} color='white' />
      ))}
    </Picker>
  </View>
);

export const Slot = () => {
  const { formData, onDisapperAfterChange } = useContext(CreateNewSpaceContext);
  const customTimeBottomSheetRef = useRef<BottomSheetModal>(null);
  const [isFromSheetVisible, setIsFromSheetVisible] = useState(false);
  const [isToSheetVisible, setIsToSheetVisible] = useState(false);

  // from state
  const [fromHour, setFromHour] = useState('12');
  const [fromMin, setFromMin] = useState('00');
  const [fromSec, setFromSec] = useState('00');
  const [fromAMPM, setFromAMPM] = useState('AM');

  // to state
  const [toHour, setToHour] = useState('12');
  const [toMin, setToMin] = useState('00');
  const [toSec, setToSec] = useState('00');
  const [toAMPM, setToAMPM] = useState('PM');

  // 比較
  const fromTotal = timeToSeconds(fromHour, fromMin, fromSec, fromAMPM);
  const toTotal = timeToSeconds(toHour, toMin, toSec, toAMPM);
  const isToBeforeFrom = toTotal <= fromTotal;

  const openCustomSlotBottomSheet = (index: number) => {
    customTimeBottomSheetRef.current?.snapToIndex(index);
  };

  const closeCustomSlotBottomSheet = () => {
    customTimeBottomSheetRef.current?.close();
  };

  const formatHourToAMPM = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
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
          setFromHour(item.value.start.split(':')[0]);
          setFromMin(item.value.start.split(':')[1]);
          setFromSec(item.value.start.split(':')[2]);
          setFromAMPM(item.value.start.split(' ')[1]);
          setToHour(item.value.end.split(':')[0]);
          setToMin(item.value.end.split(':')[1]);
          setToSec(item.value.end.split(':')[2]);
          setToAMPM(item.value.end.split(' ')[1]);
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
              const from = convert24To12('00');
              const to = convert24To12('00');
              setFromHour(from.hour);
              setFromMin('00');
              setFromSec('00');
              setFromAMPM(from.ampm);
              setToHour(to.hour);
              setToMin('00');
              setToSec('00');
              setToAMPM(to.ampm);
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>All-day</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Members can post at any time
              </Text>
            </View>
            {fromHour === '12' &&
            fromMin === '00' &&
            fromSec === '00' &&
            fromAMPM === 'AM' &&
            toHour === '12' &&
            toMin === '00' &&
            toSec === '00' &&
            toAMPM === 'AM' ? (
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
              const from = convert24To12('07');
              const to = convert24To12('12');
              setFromHour(from.hour);
              setFromMin('00');
              setFromSec('00');
              setFromAMPM(from.ampm);
              setToHour(to.hour);
              setToMin('00');
              setToSec('00');
              setToAMPM(to.ampm);
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Morning</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>7:00 AM - 12:00 PM</Text>
            </View>
            {fromHour === '07' &&
            fromMin === '00' &&
            fromSec === '00' &&
            fromAMPM === 'AM' &&
            toHour === '12' &&
            toMin === '00' &&
            toSec === '00' &&
            toAMPM === 'AM' ? (
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
              const from = convert24To12('12');
              const to = convert24To12('18');
              setFromHour(from.hour);
              setFromMin('00');
              setFromSec('00');
              setFromAMPM(from.ampm);
              setToHour(to.hour);
              setToMin('00');
              setToSec('00');
              setToAMPM(to.ampm);
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Afternoon</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>12:00 PM - 6:00 PM</Text>
            </View>
            {fromHour === '12' &&
            fromMin === '00' &&
            fromSec === '00' &&
            fromAMPM === 'PM' &&
            toHour === '18' &&
            toMin === '00' &&
            toSec === '00' &&
            toAMPM === 'PM' ? (
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
              const from = convert24To12('18');
              const to = convert24To12('00');
              setFromHour(from.hour);
              setFromMin('00');
              setFromSec('00');
              setFromAMPM(from.ampm);
              setToHour(to.hour);
              setToMin('00');
              setToSec('00');
              setToAMPM(to.ampm);
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Evening</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>6:00 PM - 12:00 AM</Text>
            </View>
            {fromHour === '18' &&
            fromMin === '00' &&
            fromSec === '00' &&
            fromAMPM === 'PM' &&
            toHour === '24' &&
            toMin === '00' &&
            toSec === '00' &&
            toAMPM === 'AM' ? (
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
            marginBottom: 12,
          }}
          activeOpacity={0.85}
          onPress={() => openCustomSlotBottomSheet(0)}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom</Text>
            </View>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>Set your own time window</Text>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 10, alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => setIsFromSheetVisible(true)}
                style={{
                  backgroundColor: 'rgb(80,80,80)',
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 18,
                  marginRight: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>From</Text>
                <Text style={{ color: 'white', fontSize: 15 }}>
                  {fromHour}:{fromMin}:{fromSec} {fromAMPM}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsToSheetVisible(true)}
                style={{ backgroundColor: 'rgb(80,80,80)', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 18 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>To</Text>
                <Text style={{ color: 'white', fontSize: 15 }}>
                  {toHour}:{toMin}:{toSec} {toAMPM}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {fromHour !== '12' && toHour !== '24' && (
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
          )}
        </TouchableOpacity>
      </View>

      {/* From BottomSheet */}
      <Modal
        visible={isFromSheetVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setIsFromSheetVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'rgb(30,30,30)', borderRadius: 16, padding: 24, width: 340 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>Set From Time</Text>
            {renderTimePickers(fromHour, setFromHour, fromMin, setFromMin, fromSec, setFromSec)}
            <AMPMToggle value={fromAMPM} setValue={setFromAMPM} />
            <TouchableOpacity
              onPress={() => setIsFromSheetVisible(false)}
              style={{ marginTop: 8, backgroundColor: 'white', borderRadius: 8, padding: 12 }}
            >
              <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* To BottomSheet */}
      <Modal
        visible={isToSheetVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setIsToSheetVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'rgb(30,30,30)', borderRadius: 16, padding: 24, width: 340 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>Set To Time</Text>
            {renderTimePickers(toHour, setToHour, toMin, setToMin, toSec, setToSec)}
            <AMPMToggle value={toAMPM} setValue={setToAMPM} />
            {isToBeforeFrom && (
              <Text style={{ color: 'red', marginTop: 12, textAlign: 'center' }}>To time must be after From time</Text>
            )}
            <TouchableOpacity
              onPress={() => {
                if (!isToBeforeFrom) setIsToSheetVisible(false);
              }}
              style={{
                marginTop: 8,
                backgroundColor: isToBeforeFrom ? 'gray' : 'white',
                borderRadius: 8,
                padding: 12,
              }}
              disabled={isToBeforeFrom}
            >
              <Text style={{ color: isToBeforeFrom ? 'white' : 'black', fontWeight: 'bold', textAlign: 'center' }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
