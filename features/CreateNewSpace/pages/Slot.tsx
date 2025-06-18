import React, { useContext, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { iconColorTable } from '../../../themes/color';

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

// Only hour and AM/PM pickers
const hours12 = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

// Helper to get hour in 24h format
function hour12To24(hour, ampm) {
  let h = parseInt(hour, 10);
  if (ampm === 'AM') {
    if (h === 12) return 0;
    return h;
  } else {
    if (h === 12) return 12;
    return h + 12;
  }
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

// Build hour-am/pm options for from and to
const hourLabels = [];
for (let h = 0; h < 24; h++) {
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  hourLabels.push(`${hour12}${ampm}`);
}

// Always show full options
const fromOptions = hourLabels.slice(0, 23); // 12am-11pm
const toOptions = hourLabels.slice(1).concat(hourLabels[0]); // 1am-12am

// Helper to convert '7pm' etc. to 24-hour number
function to24(label) {
  const match = label.match(/^(\d+)(am|pm)$/);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  if (match[2] === 'am') {
    if (h === 12) return 0;
    return h;
  } else {
    if (h === 12) return 12;
    return h + 12;
  }
}

export const Slot = () => {
  const { formData, onDisapperAfterChange } = useContext(CreateNewSpaceContext);
  const timeSheetRef = useRef<BottomSheetModal>(null);

  // State for from/to
  const [fromValue, setFromValue] = useState('12am');
  const [toValue, setToValue] = useState('12am');

  // Helper to convert '7pm' etc. to 24-hour number
  const from24 = to24(fromValue);
  const to24h = to24(toValue);
  const isInvalid = to24h <= from24 && toValue !== '12am';

  // Picker UI
  const renderHourPicker = (selected, setSelected, options) => (
    <Picker selectedValue={selected} onValueChange={setSelected} style={{ width: 120 }}>
      {options.map((opt) => (
        <Picker.Item key={opt} label={opt} value={opt} color='white' />
      ))}
    </Picker>
  );

  // All-day判定
  const isAllDay = fromValue === '12am' && toValue === '11pm';

  // Open/close BottomSheet
  const openTimeSheet = () => timeSheetRef.current?.snapToIndex(0);
  const closeTimeSheet = () => timeSheetRef.current?.close();

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
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', marginBottom: 10 }}>
          Time slots can shape your community's culture.{'\n'}Morning for productive sharing,{'\n'}Evening for relaxed
          stories,{'\n'}or any time that fits your community's rhythm.
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          {isAllDay ? 'All-day' : `${fromValue} - ${toValue}`}
        </Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* First row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          {/* Anytime */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 14,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.7}
            onPress={() => {
              setFromValue('12am');
              setToValue('12am');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <VectorIcon.MCI
                  name='clock-time-four-outline'
                  size={24}
                  color={iconColorTable.green1}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>All-day</Text>
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Members can post at any time
              </Text>
            </View>
          </TouchableOpacity>
          {/* Morning */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 14,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.7}
            onPress={() => {
              setFromValue('7am');
              setToValue('12pm');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <VectorIcon.MCI
                  name='weather-sunset-up'
                  size={24}
                  color={iconColorTable.lightBlue1}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Morning</Text>
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                7 AM - 12 PM{'\n'}Perfect for morning routines, goals,{'\n'}and starting the day energetically
              </Text>
            </View>
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
              padding: 14,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.7}
            onPress={() => {
              setFromValue('12pm');
              setToValue('6pm');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <VectorIcon.MCI
                  name='white-balance-sunny'
                  size={24}
                  color={iconColorTable.orange1}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Afternoon</Text>
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                12 PM - 6 PM{'\n'}Share lunch breaks, daily progress,{'\n'}and active discussions
              </Text>
            </View>
          </TouchableOpacity>
          {/* Evening */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 18,
              padding: 14,
              position: 'relative',
              overflow: 'visible',
              minHeight: 60,
            }}
            activeOpacity={0.7}
            onPress={() => {
              setFromValue('6pm');
              setToValue('12am');
            }}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <VectorIcon.MCI
                  name='weather-night'
                  size={24}
                  color={iconColorTable.yellow1}
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Evening</Text>
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                6 PM - 12 AM{'\n'}Wind down, share achievements,{'\n'}and enjoy relaxed conversations
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Custom option */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 18,
            padding: 14,
            position: 'relative',
            overflow: 'visible',
            minHeight: 60,
            marginBottom: 12,
          }}
          activeOpacity={0.7}
          onPress={openTimeSheet}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom</Text>
              </View>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>Set your own time window</Text>
            </View>
            <VectorIcon.MCI name='chevron-down' size={24} color='white' />
          </View>
        </TouchableOpacity>
      </View>

      <AppBottomSheet.Gorhom
        ref={timeSheetRef}
        snapPoints={['70%']}
        header={
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Set Time Range</Text>
        }
        onCloseButtonClose={closeTimeSheet}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>From</Text>
            {renderHourPicker(fromValue, setFromValue, fromOptions)}
          </View>
          <View style={{ width: 20 }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>To</Text>
            {renderHourPicker(toValue, setToValue, toOptions)}
          </View>
        </View>
        {isInvalid && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>
            The end time must be after the start time (except 12am is always allowed).
          </Text>
        )}
        <TouchableOpacity
          onPress={closeTimeSheet}
          style={{
            marginTop: 8,
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 8,
            padding: 12,
            width: '80%',
            alignSelf: 'center',
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Done</Text>
        </TouchableOpacity>
      </AppBottomSheet.Gorhom>
    </View>
  );
};
