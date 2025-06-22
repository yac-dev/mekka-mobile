import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
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
  const ampm = h < 12 ? 'am' : 'pm';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  hourLabels.push(`${hour12}${ampm}`);
}

// Always show full options
const fromOptions = hourLabels.slice(0, 24); // 12am-11pm
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

export const Hours = () => {
  const { formData, onHoursChange } = useContext(CreateNewSpaceContext);
  const timeSheetRef = useRef<BottomSheetModal>(null);

  // Get current hours from context
  const { from: fromValue, to: toValue } = formData.hours.value;

  // State for selected time slot
  const [selectedSlot, setSelectedSlot] = useState<'all-day' | 'morning' | 'afternoon' | 'evening' | 'custom'>(
    'all-day'
  );

  // Helper to convert '7pm' etc. to 24-hour number
  const from24 = to24(fromValue);
  const to24h = to24(toValue);

  // Helper to check if a slot is currently selected
  const isSlotSelected = (slotType: typeof selectedSlot) => {
    return selectedSlot === slotType;
  };

  // Helper to get time range for a slot
  const getSlotTimeRange = (slotType: typeof selectedSlot) => {
    switch (slotType) {
      case 'all-day':
        return { from: '12am', to: '12am' };
      case 'morning':
        return { from: '7am', to: '12pm' };
      case 'afternoon':
        return { from: '12pm', to: '6pm' };
      case 'evening':
        return { from: '6pm', to: '12am' };
      case 'custom':
        return { from: fromValue, to: toValue };
      default:
        return { from: '12am', to: '12am' };
    }
  };

  // Helper to update hours in context
  const updateHours = (from: string, to: string) => {
    onHoursChange({ from, to });
  };

  // Initialize selected slot based on current hours
  useEffect(() => {
    const currentRange = `${fromValue}-${toValue}`;
    if (currentRange === '12am-12am') {
      setSelectedSlot('all-day');
    } else if (currentRange === '7am-12pm') {
      setSelectedSlot('morning');
    } else if (currentRange === '12pm-6pm') {
      setSelectedSlot('afternoon');
    } else if (currentRange === '6pm-12am') {
      setSelectedSlot('evening');
    } else {
      setSelectedSlot('custom');
    }
  }, [fromValue, toValue]);

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

  // Handle custom time changes
  const handleCustomTimeChange = (newFromValue: string, newToValue: string) => {
    updateHours(newFromValue, newToValue);
    setSelectedSlot('custom');
  };

  // Dummy button for testing time range validation
  const isCurrentTimeInRange = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Convert fromValue and toValue to minutes
    const fromMinutes = to24(fromValue) * 60;
    const toMinutes = to24(toValue) * 60;

    // Create actual date objects for from and to
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setHours(to24(fromValue), 0, 0, 0);

    const toDate = new Date(today);
    if (toValue === '12am') {
      // 12amの場合は翌日の0時として設定
      toDate.setDate(today.getDate() + 1);
      toDate.setHours(0, 0, 0, 0);
    } else {
      toDate.setHours(to24(toValue), 0, 0, 0);
    }

    // Handle special case for "12am" (midnight)
    if (toValue === '12am') {
      // 12amの場合は、from時刻以降または翌日の0時まで
      return currentTimeInMinutes >= fromMinutes;
    }

    // Normal case
    if (fromMinutes <= toMinutes) {
      return currentTimeInMinutes >= fromMinutes && currentTimeInMinutes <= toMinutes;
    } else {
      // Crosses midnight (e.g., 10pm to 6am)
      return currentTimeInMinutes >= fromMinutes || currentTimeInMinutes <= toMinutes;
    }
  };

  const getCurrentTimeString = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}${ampm}`;
  };

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
            Hours
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Time slots can shape your community's culture.{'\n'}Morning for productive sharing,{'\n'}Evening for relaxed
            stories,{'\n'}or any time that fits your community's rhythm.
          </Text>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Anytime */}
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
            onPress={() => {
              setSelectedSlot('all-day');
              const range = getSlotTimeRange('all-day');
              updateHours(range.from, range.to);
            }}
          >
            <VectorIcon.MCI
              name='clock-time-four-outline'
              size={24}
              color={iconColorTable.green1}
              style={{ marginRight: 14 }}
            />
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>All-day</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                12 AM - 12 AM{'\n'}Members can post at any time
              </Text>
            </View>
            {isSlotSelected('all-day') && (
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
          {/* Morning */}
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
            onPress={() => {
              setSelectedSlot('morning');
              const range = getSlotTimeRange('morning');
              updateHours(range.from, range.to);
            }}
          >
            <VectorIcon.MCI
              name='weather-sunset-up'
              size={24}
              color={iconColorTable.lightBlue1}
              style={{ marginRight: 14 }}
            />
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Morning</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                7 AM - 12 PM{'\n'}Perfect for morning routines, goals and starting the day energetically
              </Text>
            </View>
            {isSlotSelected('morning') && (
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
          {/* Afternoon */}
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
            onPress={() => {
              setSelectedSlot('afternoon');
              const range = getSlotTimeRange('afternoon');
              updateHours(range.from, range.to);
            }}
          >
            <VectorIcon.MCI
              name='white-balance-sunny'
              size={24}
              color={iconColorTable.orange1}
              style={{ marginRight: 14 }}
            />
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Afternoon</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                12 PM - 6 PM{'\n'}Share lunch breaks, daily progress and active discussions
              </Text>
            </View>
            {isSlotSelected('afternoon') && (
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
          {/* Evening */}
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
            onPress={() => {
              setSelectedSlot('evening');
              const range = getSlotTimeRange('evening');
              updateHours(range.from, range.to);
            }}
          >
            <VectorIcon.MCI name='weather-night' size={24} color={iconColorTable.yellow1} style={{ marginRight: 14 }} />
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Evening</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                6 PM - 12 AM{'\n'}Wind down, share achievements and enjoy relaxed conversations
              </Text>
            </View>
            {isSlotSelected('evening') && (
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
            onPress={() => {
              setSelectedSlot('custom');
              openTimeSheet();
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom</Text>
                </View>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                  Set your own time window
                </Text>
              </View>
              <VectorIcon.MCI name='chevron-down' size={24} color='white' />
            </View>
            {isSlotSelected('custom') && (
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

      <AppBottomSheet.Gorhom
        ref={timeSheetRef}
        snapPoints={['70%']}
        header={
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Set Custom Hours
          </Text>
        }
        onCloseButtonClose={closeTimeSheet}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>From</Text>
            {renderHourPicker(fromValue, (value) => handleCustomTimeChange(value, toValue), fromOptions)}
          </View>
          <View style={{ width: 20 }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>To</Text>
            {renderHourPicker(toValue, (value) => handleCustomTimeChange(fromValue, value), toOptions)}
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 12, marginTop: 8, textAlign: 'center' }}>
              *To's 12am = next day midnight
            </Text>
          </View>
        </View>
        {!formData.hours.isValidated && (
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

{
  /* Dummy button for testing time range validation */
}
{
  /* <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(70,70,70)',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
          }}
          activeOpacity={0.7}
          onPress={() => {
            if (isCurrentTimeInRange()) {
              Alert.alert(
                'Time Check',
                `Current time (${getCurrentTimeString()}) is within the selected range (${fromValue} - ${toValue}).\n\nYou can post now!`,
                [{ text: 'OK', style: 'default' }]
              );
            } else {
              Alert.alert(
                'Cannot Post',
                `Current time (${getCurrentTimeString()}) is outside the posting time range (${fromValue} - ${toValue}).\n\nYou cannot post at this time.`,
                [{ text: 'OK', style: 'default' }]
              );
            }
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Post Now</Text>
          <Text style={{ color: 'rgb(170,170,170)', fontSize: 12, marginTop: 4 }}>
            Current: {getCurrentTimeString()} | Range: {fromValue} - {toValue}
          </Text>
        </TouchableOpacity>
      </View> */
}
