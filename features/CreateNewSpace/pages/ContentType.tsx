import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const ContentType = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const [selectedMin, setSelectedMin] = useState();
  const [selectedSec, setSelectedSec] = useState();
  const pickerMinRef = useRef();
  const pickerSecRef = useRef();

  const formatTime = (inputSeconds) => {
    if (inputSeconds < 0) {
      return 'Invalid input';
    }

    const minutes = Math.floor(inputSeconds / 60);
    const seconds = inputSeconds % 60;

    // const minuteText = minutes > 0 ? `${minutes} minute` + (minutes > 1 ? 's' : '') : '';
    // const secondText = seconds > 0 ? `${seconds} second` + (seconds > 1 ? 's' : '') : '';

    return {
      minutes: minutes,
      seconds: seconds,
    };
  };

  function calculateSeconds(minutes, seconds) {
    const minNumber = Number(minutes);
    const secNumber = Number(seconds);

    if (minNumber < 0 || secNumber < 0 || secNumber >= 60) {
      return 'Invalid input. Minutes should be non-negative, and seconds should be in the range 0-59.';
    }

    return minNumber * 60 + secNumber;
  }

  // 最後は、これの逆をやればいいのかな。
  useEffect(() => {
    const res = formatTime(formData.videoLength);
    console.log(res);
    setSelectedMin(res.minutes.toString());
    setSelectedSec(res.seconds.toString());
  }, []);

  useEffect(() => {
    const seconds = calculateSeconds(selectedMin, selectedSec);
    setFormData((previous) => {
      return {
        ...previous,
        videoLength: seconds,
      };
    });
  }, [selectedMin, selectedSec]);

  const renderMinPickerItems = () => {
    const minArr = Array.from({ length: 3 }, (x, i) => i);
    const list = minArr.map((min, index) => {
      return <Picker.Item key={index} label={min.toString()} value={min.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          ref={pickerMinRef}
          selectedValue={selectedMin}
          onValueChange={(itemValue, itemIndex) => setSelectedMin(itemValue)}
          style={{ width: 50, marginRight: 20 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>min</Text>
      </View>
    );
  };

  const renderSecPickerItems = () => {
    const secArr = Array.from({ length: 60 }, (x, i) => i);
    const list = secArr.map((sec, index) => {
      return <Picker.Item key={index} label={sec.toString()} value={sec.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          ref={pickerMinRef}
          selectedValue={selectedSec}
          onValueChange={(itemValue, itemIndex) => setSelectedSec(itemValue)}
          style={{ width: 100, marginRight: 20 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>sec</Text>
      </View>
    );
  };

  const renderSecPickerItemsFromFiveToFiftyNine = () => {
    const secArr = Array.from({ length: 55 }, (x, i) => i + 5);
    const list = secArr.map((sec, index) => {
      return <Picker.Item key={index} label={sec.toString()} value={sec.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          ref={pickerMinRef}
          selectedValue={selectedSec}
          onValueChange={(itemValue, itemIndex) => setSelectedSec(itemValue)}
          style={{ width: 100, marginRight: 20 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>sec</Text>
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
          Content type
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          What kind of snap can share in this space?
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 30 }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            padding: 2,
            borderRadius: 80 / 2,
            marginRight: 20,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                contentType: 'photo',
              };
            })
          }
        >
          <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Photo</Text>
          {formData.contentType === 'photo' ? (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            padding: 2,
            borderRadius: 80 / 2,
            marginRight: 20,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                contentType: 'video',
              };
            })
          }
        >
          <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Video</Text>
          {formData.contentType === 'video' ? (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            padding: 2,
            borderRadius: 80 / 2,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                contentType: 'photoAndVideo',
              };
            })
          }
        >
          <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Photo & Video</Text>
          {formData.contentType === 'photoAndVideo' ? (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      {formData.contentType === 'video' || formData.contentType === 'photoAndVideo' ? (
        <View>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Just as there are limits on video length on other platforms, you can put limits on the length of videos you
            can post here.
          </Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {renderMinPickerItems()}
            {selectedMin === '0' ? renderSecPickerItemsFromFiveToFiftyNine() : renderSecPickerItems()}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ContentType;
