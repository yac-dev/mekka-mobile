import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { VectorIcon } from '../../../Icons';
import BottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { convertMinutesToHoursAndMinutes } from '.';
import { AppButton } from '../../../components/Button';
import { Ionicons } from '@expo/vector-icons';

const formatTime = (inputMinutes: number): { hours: number; minutes: number } => {
  const hours = Math.floor(inputMinutes / 60);
  const minutes = inputMinutes % 60;

  return {
    hours,
    minutes,
  };
};

const calculateMinutes = (hours: string, minutes: string) => {
  const hourNumber = Number(hours);
  const minNumber = Number(minutes);

  const d = hourNumber * 60 + minNumber;
  return hourNumber * 60 + minNumber;
};

type PresetTime = {
  label: string;
  value: number;
  description: string;
};

const presetTimes: PresetTime[] = [
  {
    label: '5 min',
    value: 5,
    description: 'Perfect for quick updates and live moments',
  },
  {
    label: '1 hour',
    value: 60,
    description: 'Great for events and activities in real-time',
  },
  {
    label: '12 hours',
    value: 12 * 60,
    description: 'Ideal for day-long events and gatherings',
  },
  {
    label: '24 hours',
    value: 24 * 60,
    description: 'Perfect for daily updates and memories',
  },
];

const Moment = () => {
  const { formData, onDisapperAfterChange } = useContext(CreateNewSpaceContext);
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMin, setSelectedMin] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const customTimeBottomSheetRef = useRef<BottomSheetModal>(null);

  const openCustomTimeBottomSheet = (index: number) => {
    customTimeBottomSheetRef.current?.snapToIndex(index);
  };

  const closeCustomTimeBottomSheet = () => {
    customTimeBottomSheetRef.current?.close();
  };

  useEffect(() => {
    const res = formatTime(formData.disappearAfter.value);
    setSelectedHour(res.hours.toString());
    setSelectedMin(res.minutes.toString());
  }, []);

  useEffect(() => {
    const minutes = calculateMinutes(selectedHour, selectedMin);
    console.log('minutes changed', minutes);
    onDisapperAfterChange(minutes);
  }, [selectedHour, selectedMin]);

  const renderHourPickerItems = () => {
    const secArr = Array.from({ length: 24 }, (x, i) => i);
    const list = secArr.map((sec, index) => {
      return <Picker.Item key={index} label={sec.toString()} value={sec.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          selectedValue={selectedHour}
          onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
          style={{ width: 100 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          {Number(selectedHour) > 1 ? 'hours' : 'hour'}
        </Text>
      </View>
    );
  };

  // hourが0のときだけ、ここのrangeを5 - 59にしたい。
  const renderMinPickerItems = () => {
    const minArr = Array.from({ length: 60 }, (x, i) => i);
    const list = minArr.map((min, index) => {
      return <Picker.Item key={index} label={min.toString()} value={min.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          selectedValue={selectedMin}
          onValueChange={(itemValue, itemIndex) => setSelectedMin(itemValue)}
          style={{ width: 100 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>min</Text>
      </View>
    );
  };

  const renderMinPickerItemsFromFiveToFiftyNine = () => {
    const fromFiveToFityNine = Array.from({ length: 59 }, (x, i) => i + 1);
    const list = fromFiveToFityNine.map((min, index) => {
      return <Picker.Item key={index} label={min.toString()} value={min.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          selectedValue={selectedMin}
          onValueChange={(itemValue, itemIndex) => setSelectedMin(itemValue)}
          style={{ width: 100 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>min</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: PresetTime }) => {
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
          // const { hours, minutes } = formatTime(item.value);
          // setSelectedHour(hours.toString());
          // setSelectedMin(minutes.toString());
          onDisapperAfterChange(item.value);
        }}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 30 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Moment Time
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Choose how long your posts stay visible.
        </Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* First row: 5 min & 1 hour */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          {/* 5 min */}
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
            onPress={() => onDisapperAfterChange(5)}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>5 min</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Perfect for quick updates and live moments
              </Text>
            </View>
            {formData.disappearAfter.value === 5 ? (
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
                <Ionicons name='checkmark' color='black' size={18} />
              </View>
            ) : null}
          </TouchableOpacity>
          {/* 1 hour */}
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
            onPress={() => onDisapperAfterChange(60)}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>1 hour</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Great for events and activities in real-time
              </Text>
            </View>
            {formData.disappearAfter.value === 60 ? (
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
                <Ionicons name='checkmark' color='black' size={18} />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>

        {/* Second row: 12 hours & 24 hours */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          {/* 12 hours */}
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
            onPress={() => onDisapperAfterChange(12 * 60)}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>12 hours</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Ideal for day-long events and gatherings
              </Text>
            </View>
            {formData.disappearAfter.value === 12 * 60 ? (
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
                <Ionicons name='checkmark' color='black' size={18} />
              </View>
            ) : null}
          </TouchableOpacity>
          {/* 24 hours */}
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
            onPress={() => onDisapperAfterChange(24 * 60)}
          >
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>24 hours</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
                Perfect for daily updates and memories
              </Text>
            </View>
            {formData.disappearAfter.value === 24 * 60 ? (
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
                <Ionicons name='checkmark' color='black' size={18} />
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
          onPress={() => openCustomTimeBottomSheet(0)}
        >
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom</Text>
              {![5, 60, 12 * 60, 24 * 60].includes(formData.disappearAfter.value) ? (
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginLeft: 8 }}>
                  {convertMinutesToHoursAndMinutes(formData.disappearAfter.value)}
                </Text>
              ) : null}
            </View>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Create your own unique rhythm
            </Text>
          </View>
          <Ionicons name='chevron-down' size={22} color='white' style={{ marginLeft: 8, marginRight: 4 }} />
          {![5, 60, 12 * 60, 24 * 60].includes(formData.disappearAfter.value) ? (
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
              <Ionicons name='checkmark' color='black' size={18} />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: 'rgb(170,170,170)',
          fontSize: 16,
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          marginBottom: 10,
          textDecorationLine: 'underline',
        }}
        onPress={() => setIsModalVisible(!isModalVisible)}
      >
        🤔 What is Moment by the way?
      </Text>
      <AppBottomSheet.Gorhom
        ref={customTimeBottomSheetRef}
        snapPoints={['65%']}
        header={<Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Custom Time</Text>}
        onCloseButtonClose={closeCustomTimeBottomSheet}
      >
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          {renderHourPickerItems()}
          {selectedHour === '0' ? renderMinPickerItemsFromFiveToFiftyNine() : renderMinPickerItems()}
        </View>
      </AppBottomSheet.Gorhom>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <AppButton.Icon
              customStyle={{
                width: 28,
                height: 28,
                backgroundColor: 'rgb(50,50,50)',
                alignSelf: 'flex-end',
                marginBottom: 10,
              }}
              onButtonPress={() => setIsModalVisible(!isModalVisible)}
              hasShadow
            >
              <VectorIcon.II name='close' size={20} color={'white'} />
            </AppButton.Icon>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              What is Moments?
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modalText}>
                Moments are temporary posts that create a unique rhythm in your space. The duration you choose shapes
                how people interact and share their experiences.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    lineHeight: 25,
  },
});

export default Moment;
