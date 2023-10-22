import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';

const Moment = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const [selectedHour, setSelectedHour] = useState();
  const [selectedMin, setSelectedMin] = useState();
  console.log('moment time', formData.disappearAfter);

  const formatTime = (inputMinutes) => {
    if (inputMinutes < 0) {
      return 'Invalid input';
    }

    const hours = Math.floor(inputMinutes / 60);
    const minutes = inputMinutes % 60;

    // const minuteText = minutes > 0 ? `${minutes} minute` + (minutes > 1 ? 's' : '') : '';
    // const secondText = seconds > 0 ? `${seconds} second` + (seconds > 1 ? 's' : '') : '';

    return {
      hours,
      minutes,
    };
  };

  function calculateMinutes(hours, minutes) {
    const hourNumber = Number(hours);
    const minNumber = Number(minutes);

    if (hourNumber < 0 || minNumber < 0 || hourNumber >= 60) {
      return 'Invalid input. Minutes should be non-negative, and seconds should be in the range 0-59.';
    }

    const d = hourNumber * 60 + minNumber;
    console.log(d);
    return hourNumber * 60 + minNumber;
  }

  useEffect(() => {
    const res = formatTime(formData.disappearAfter);
    setSelectedHour(res.hours.toString());
    setSelectedMin(res.minutes.toString());
  }, []);

  useEffect(() => {
    const minutes = calculateMinutes(selectedHour, selectedMin);
    console.log('calcurated', minutes);
    setFormData((previous) => {
      return {
        ...previous,
        disappearAfter: minutes,
      };
    });
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
    const fromFiveToFityNine = Array.from({ length: 56 }, (x, i) => i + 5);
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
          Moment is like a story of Instagram. You can have posts that automatically disappear. Instead of 24 hours
          restriction, you can set any disappearing time you want.
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
