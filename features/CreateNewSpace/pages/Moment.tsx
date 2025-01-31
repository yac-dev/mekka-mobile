import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { VectorIcon } from '../../../Icons';
import BottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { convertMinutesToHoursAndMinutes } from '.';
import { AppButton } from '../../../components/Button';

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
};

const presetTimes: PresetTime[] = [
  {
    label: '5 minutes',
    value: 5,
  },
  {
    label: '1 hour',
    value: 60,
  },
  {
    label: '12 hours',
    value: 12 * 60,
  },
  {
    label: '24 hours',
    value: 24 * 60,
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
          Set how long your post will be visible before it disappears.
        </Text>
      </View>

      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingBottom: 30 }}>
        {formData.disappearAfter.value ? convertMinutesToHoursAndMinutes(formData.disappearAfter.value) : ''}
      </Text>

      <View>
        <FlatList
          data={presetTimes}
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
                openCustomTimeBottomSheet(0);
              }}
            >
              <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Custom</Text>
              <VectorIcon.MCI name='chevron-down' size={20} color='white' />
            </TouchableOpacity>
          }
        />
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
        animationType='slide'
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
                Similar to Instagram Stories, you can create temporary posts that automatically vanish after your
                specified time.
                <Text style={{ color: 'white', fontWeight: 'bold' }}></Text>
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
