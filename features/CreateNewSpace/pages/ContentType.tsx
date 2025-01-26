import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import { AppButton } from '../../../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import BottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import { AppBottomSheet } from '../../../components/AppBottomSheet';

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

const formatTimeString = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes} min ${seconds > 0 ? `${seconds} sec` : ''}`;
  }
  return `${seconds} sec`;
};

const screenHorizontalPadding = 20;

const itemWidth = (Dimensions.get('window').width - screenHorizontalPadding * 2) / 2;

type PresetTime = {
  label: string;
  value: number;
};

const presetTimes: PresetTime[] = [
  {
    label: '5 sec',
    value: 5,
  },
  {
    label: '10 sec',
    value: 10,
  },
  {
    label: '30 sec',
    value: 30,
  },
  {
    label: '1 min',
    value: 60,
  },
  {
    label: '3 min',
    value: 3 * 60,
  },
];

const ContentType = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onContentTypeChange, onVideoLengthChange } = useContext(CreateNewSpaceContext);
  const [selectedMin, setSelectedMin] = useState<string>('');
  const [selectedSec, setSelectedSec] = useState<string>('');
  const pickerMinRef = useRef();
  const pickerSecRef = useRef();
  const customTimeBottomSheetRef = useRef<BottomSheetModal>(null);

  const openCustomTimeBottomSheet = (index: number) => {
    customTimeBottomSheetRef.current?.snapToIndex(index);
  };

  const closeCustomTimeBottomSheet = () => {
    customTimeBottomSheetRef.current?.close();
  };

  // 最初の初期設定60秒をここでまず設定する。
  useEffect(() => {
    const res = formatTime(formData.videoLength.value);
    console.log('res ->', res);
    setSelectedMin(res.minutes.toString());
    setSelectedSec(res.seconds.toString());
  }, []);

  useEffect(() => {
    const seconds = calculateSeconds(selectedMin, selectedSec);
    console.log('seconds -> ', seconds);
    onVideoLengthChange(seconds);
  }, [selectedMin, selectedSec]);

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
          onVideoLengthChange(item.value);
        }}
      >
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

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
          Content type
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          What kind of content can be shared in this space?
        </Text>
      </View>
      {/* <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onContentTypeChange('photoAndVideo')}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ExpoImage
              style={{ width: 20, aspectRatio: 1, marginRight: 20 }}
              source={require('../../../assets/forApp/photo-video.png')}
              contentFit='cover'
              tintColor={'white'}
            />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Photo & Video</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Both photo and video are available.</Text>
            </View>
          </View>
          {formData.contentType.value === 'photoAndVideo' ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onContentTypeChange('video')}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ExpoImage
              style={{ width: 20, aspectRatio: 1, marginRight: 20 }}
              source={require('../../../assets/forApp/video.png')}
              contentFit='cover'
              tintColor={'white'}
            />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Video</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Only video is available.</Text>
            </View>
          </View>
          {formData.contentType.value === 'video' ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onContentTypeChange('photo')}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ExpoImage
              style={{ width: 20, aspectRatio: 1, marginRight: 20 }}
              source={require('../../../assets/forApp/photo.png')}
              contentFit='cover'
              tintColor={'white'}
            />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Photo</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Only photo is available.</Text>
            </View>
          </View>
          {formData.contentType.value === 'photo' ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>
      </View> */}
      <View>
        <ScrollView
          horizontal
          style={{
            flexDirection: 'row',
            paddingBottom: 30,
            paddingVertical: 10,
          }}
          contentContainerStyle={{
            paddingHorizontal: screenHorizontalPadding,
          }}
        >
          <View style={{ width: itemWidth, paddingRight: 15 }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 10,
                width: '100%',
                height: 160,
              }}
              activeOpacity={0.8}
              onPress={() => onContentTypeChange('photoAndVideo')}
            >
              <View
                style={{
                  height: 85,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'rgb(100,100,100)',
                }}
              >
                <ExpoImage
                  style={{ width: 40, aspectRatio: 1 }}
                  source={require('../../../assets/forApp/photo-video.png')}
                  contentFit='cover'
                  tintColor={'white'}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Photo & Video</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Both photo and video are available.</Text>
              </View>
            </TouchableOpacity>
            {formData.contentType.value === 'photoAndVideo' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  backgroundColor: 'black',
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='checkmark' color='black' size={20} />
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ width: itemWidth, paddingRight: 15 }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 10,
                width: '100%',
                height: 160,
              }}
              activeOpacity={0.8}
              onPress={() => onContentTypeChange('video')}
            >
              <View
                style={{
                  height: 85,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'rgb(100,100,100)',
                }}
              >
                <ExpoImage
                  style={{ width: 40, aspectRatio: 1 }}
                  source={require('../../../assets/forApp/video.png')}
                  contentFit='cover'
                  tintColor={'white'}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Video</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Only video is available.</Text>
              </View>
            </TouchableOpacity>
            {formData.contentType.value === 'video' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  backgroundColor: 'black',
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='checkmark' color='black' size={20} />
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ width: itemWidth, paddingRight: 15 }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 10,
                width: '100%',
                height: 160,
              }}
              activeOpacity={0.8}
              onPress={() => onContentTypeChange('photo')}
            >
              <View
                style={{
                  height: 85,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'rgb(100,100,100)',
                }}
              >
                <ExpoImage
                  style={{ width: 40, aspectRatio: 1 }}
                  source={require('../../../assets/forApp/photo.png')}
                  contentFit='cover'
                  tintColor={'white'}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Photo</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Only photo is available.</Text>
              </View>
            </TouchableOpacity>
            {formData.contentType.value === 'photo' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  backgroundColor: 'black',
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='checkmark' color='black' size={20} />
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
      {formData.contentType.value === 'video' || formData.contentType.value === 'photoAndVideo' ? (
        <View>
          <View>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', paddingBottom: 20 }}>
              You can limit the length of videos that can be posted.
            </Text>
          </View>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingBottom: 30 }}>
            {formData.videoLength.value ? formatTimeString(formData.videoLength.value) : ''}
          </Text>
          <View>
            <FlatList
              data={presetTimes}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 20 }}>
            <View style={{ height: 0, width: 150, backgroundColor: 'rgb(170,170,170)' }}></View>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 17, paddingHorizontal: 12 }}>Or</Text>
            <View style={{ height: 0, width: 150, backgroundColor: 'rgb(170,170,170)' }}></View>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgb(50, 50, 50)',
                borderRadius: 20,
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => openCustomTimeBottomSheet(0)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>
                  Customize Time
                </Text>
                <VectorIcon.MCI name='chevron-down' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <AppBottomSheet.Gorhom
        ref={customTimeBottomSheetRef}
        snapPoints={['65%']}
        header={<Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Custom Time</Text>}
        onCloseButtonClose={closeCustomTimeBottomSheet}
      >
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          {renderMinPickerItems()}
          {selectedMin === '0' ? renderSecPickerItemsFromFiveToFiftyNine() : renderSecPickerItems()}
        </View>
      </AppBottomSheet.Gorhom>
    </View>
  );
};

export default ContentType;
