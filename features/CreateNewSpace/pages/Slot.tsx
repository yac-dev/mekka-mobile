import React, { useContext, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';

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
      end: '23:59',
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
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMin, setSelectedMin] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const customTimeBottomSheetRef = useRef<BottomSheetModal>(null);

  const [selectedStartHour, setSelectedStartHour] = useState<string>('00');
  const [selectedStartMin, setSelectedStartMin] = useState<string>('00');
  const [selectedEndHour, setSelectedEndHour] = useState<string>('23');
  const [selectedEndMin, setSelectedEndMin] = useState<string>('59');

  const openCustomTimeBottomSheet = (index: number) => {
    customTimeBottomSheetRef.current?.snapToIndex(index);
  };

  const closeCustomTimeBottomSheet = () => {
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
        style={{ width: 100 }}
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
        style={{ width: 100 }}
      >
        {minutes.map((min) => (
          <Picker.Item key={min} label={min} value={min} color='white' />
        ))}
      </Picker>
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
          Slot
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Specify the time periods during which posts can be made. This allows you to control when content is available
          for posting.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
        <View>
          <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>Start Time</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderHourPickerItems(selectedStartHour, setSelectedStartHour)}
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>:</Text>
            {renderMinPickerItems(selectedStartMin, setSelectedStartMin)}
          </View>
        </View>
        <View>
          <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>End Time</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderHourPickerItems(selectedEndHour, setSelectedEndHour)}
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>:</Text>
            {renderMinPickerItems(selectedEndMin, setSelectedEndMin)}
          </View>
        </View>
      </View>
      {/* <View>
        <FlatList
          data={presetSlots}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ListHeaderComponent={
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: 'rgb(50, 50, 50)',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 20,
                marginRight: 10,
                flexDirection: 'row',
              }}
              onPress={() => {
                console.log('Custom');
              }}
            >
              <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Custom</Text>
              <VectorIcon.MCI name='chevron-down' size={20} color='white' />
            </TouchableOpacity>
          }
        />
      </View> */}
    </View>
  );
};
