import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import { AppButton } from '../../../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { VectorIcon } from '../../../Icons';

const formatTime = (inputSeconds: number): { minutes: number; seconds: number } => {
  const minutes = Math.floor(inputSeconds / 60);
  const seconds = inputSeconds % 60;
  return {
    minutes: minutes,
    seconds: seconds,
  };
};

const calculateSeconds = (minutes: string, seconds: string): number => {
  const minNumber = Number(minutes);
  const secNumber = Number(seconds);
  return minNumber * 60 + secNumber;
};

const ContentType = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onContentTypeChange, onVideoLengthChange } = useContext(CreateNewSpaceContext);
  const [selectedMin, setSelectedMin] = useState<string>('');
  const [selectedSec, setSelectedSec] = useState<string>('');
  const pickerMinRef = useRef();
  const pickerSecRef = useRef();

  // 最初の初期設定60秒をここでまず設定する。
  useEffect(() => {
    const res = formatTime(formData.videoLength.value);
    console.log(res);
    setSelectedMin(res.minutes.toString());
    setSelectedSec(res.seconds.toString());
  }, []);

  useEffect(() => {
    const seconds = calculateSeconds(selectedMin, selectedSec);
    onVideoLengthChange(seconds);
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
          What kind of content can be shared in this space?
        </Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onContentTypeChange('photo')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='image' color='white' size={20} style={{ marginRight: 20 }} />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Only Photos</Text>
            </View>
          </View>
          {formData.contentType.value === 'photo' ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onContentTypeChange('video')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name='video' color='white' size={20} style={{ marginRight: 20 }} />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Only Videos</Text>
            </View>
          </View>
          {formData.contentType.value === 'video' ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onContentTypeChange('photoAndVideo')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 20 }}>
              <Ionicons name='image' color='white' size={20} />

              <Entypo name='video' color='white' size={20} style={{ position: 'absolute', top: -10, right: -10 }} />
            </View>
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Photos & Videos</Text>
            </View>
          </View>
          {formData.contentType.value === 'photoAndVideo' ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>
      </View>

      {formData.contentType.value === 'video' || formData.contentType.value === 'photoAndVideo' ? (
        <View>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            {/* Just as there are limits on video length on other platforms, you can put limits on the length of videos you
            can post here. */}
            You can limit the length of videos that can be posted.
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
