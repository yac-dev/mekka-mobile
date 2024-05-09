import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';

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

const Moment = () => {
  const { formData, onDisapperAfterChange } = useContext(CreateNewSpaceContext);
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMin, setSelectedMin] = useState<string>('');

  useEffect(() => {
    const res = formatTime(formData.disappearAfter.value);
    setSelectedHour(res.hours.toString());
    setSelectedMin(res.minutes.toString());
  }, []);

  useEffect(() => {
    const minutes = calculateMinutes(selectedHour, selectedMin);
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
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>hour</Text>
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
    const fromFiveToFityNine = Array.from({ length: 55 }, (x, i) => i + 5);
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

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 50 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Set Moment time
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Like IG stories, you can share not only regular posts, but also posts that disappear after a certain amount of
          time, which does not have to be 24 hours.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {renderHourPickerItems()}
        {selectedHour === '0' ? renderMinPickerItemsFromFiveToFiftyNine() : renderMinPickerItems()}
      </View>
    </View>
  );
};

export default Moment;
