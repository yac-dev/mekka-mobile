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

const itemWidth = (Dimensions.get('window').width - screenHorizontalPadding * 2) / 2 - 10;

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
    <ScrollView
      style={{ flex: 1, backgroundColor: 'black' }}
      contentContainerStyle={{ paddingBottom: 40 }}
      keyboardShouldPersistTaps='handled'
    >
      <View
        style={{
          paddingLeft: screenHorizontalPadding,
          paddingRight: screenHorizontalPadding,
          paddingTop: 20,
          paddingBottom: 10,
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
        <Text
          style={{
            textAlign: 'center',
            color: 'rgb(180, 180, 180)',
            marginBottom: 4,
            fontSize: 15,
            lineHeight: 20,
          }}
        >
          Choose what kind of content people can post in this space. You can allow photos, videos, or both.
        </Text>
      </View>
      <View style={{ flexDirection: 'column', paddingHorizontal: screenHorizontalPadding }}>
        {/* Photo & Video Card */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 18,
            padding: 18,
            marginRight: 0,
            marginBottom: 18,
            position: 'relative',
            overflow: 'visible',
            minHeight: 80,
          }}
          activeOpacity={0.85}
          onPress={() => onContentTypeChange('photoAndVideo')}
        >
          {/* Icon */}
          <ExpoImage
            style={{ width: 36, aspectRatio: 1, marginRight: 14 }}
            source={require('../../../assets/forApp/photo-video.png')}
            contentFit='cover'
            tintColor={'white'}
          />
          {/* Title & Description */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Photo & Video</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Both photos and videos can be shared. Perfect for all kinds of moments.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.contentType.value === 'photoAndVideo' ? (
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
        {/* Video Card */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 18,
            padding: 18,
            marginRight: 0,
            marginBottom: 18,
            position: 'relative',
            overflow: 'visible',
            minHeight: 80,
          }}
          activeOpacity={0.85}
          onPress={() => onContentTypeChange('video')}
        >
          {/* Icon */}
          <ExpoImage
            style={{ width: 36, aspectRatio: 1, marginRight: 14 }}
            source={require('../../../assets/forApp/video.png')}
            contentFit='cover'
            tintColor={'white'}
          />
          {/* Title & Description */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Video</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Only videos can be posted. Great for dynamic stories and events.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.contentType.value === 'video' ? (
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
        {/* Photo Card */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 18,
            padding: 18,
            marginBottom: 18,
            position: 'relative',
            overflow: 'visible',
            minHeight: 80,
          }}
          activeOpacity={0.85}
          onPress={() => onContentTypeChange('photo')}
        >
          {/* Icon */}
          <ExpoImage
            style={{ width: 36, aspectRatio: 1, marginRight: 14 }}
            source={require('../../../assets/forApp/photo.png')}
            contentFit='cover'
            tintColor={'white'}
          />
          {/* Title & Description */}
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Photo</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>
              Only photos can be posted. Ideal for snapshots and memories.
            </Text>
          </View>
          {/* Checkmark */}
          {formData.contentType.value === 'photo' ? (
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
      {formData.contentType.value === 'video' || formData.contentType.value === 'photoAndVideo' ? (
        <View style={{ paddingHorizontal: screenHorizontalPadding, paddingTop: 10 }}>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', marginBottom: 14 }}>
            You can limit the length of videos that can be posted. Choose a preset or set your own.
          </Text>
          {/* 1st row: 5 sec & 30 sec */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            {/* 5 sec */}
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
              onPress={() => onVideoLengthChange(5)}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>5 sec</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>Super short moments</Text>
              </View>
              {formData.videoLength.value === 5 ? (
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
            {/* 30 sec */}
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
              onPress={() => onVideoLengthChange(30)}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>30 sec</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>For short stories</Text>
              </View>
              {formData.videoLength.value === 30 ? (
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
          {/* 2nd row: 1 min & 3 min */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            {/* 1 min */}
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
              onPress={() => onVideoLengthChange(60)}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>1 min</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>Capture more details</Text>
              </View>
              {formData.videoLength.value === 60 ? (
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
            {/* 3 min */}
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
              onPress={() => onVideoLengthChange(180)}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>3 min</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>For longer events</Text>
              </View>
              {formData.videoLength.value === 180 ? (
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
          {/* 3rd row: Custom left-aligned */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                marginBottom: 12,
              }}
              activeOpacity={0.85}
              onPress={() => openCustomTimeBottomSheet(0)}
            >
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Custom</Text>
                  {![5, 10, 30, 60, 180].includes(formData.videoLength.value) ? (
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginLeft: 8 }}>
                      {formatTimeString(formData.videoLength.value)}
                    </Text>
                  ) : null}
                </View>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13, lineHeight: 18 }}>Set your own length</Text>
              </View>
              {/* Chevron down icon on the far right */}
              <Ionicons name='chevron-down' size={22} color='white' style={{ marginLeft: 8, marginRight: 4 }} />
              {![5, 10, 30, 60, 180].includes(formData.videoLength.value) ? (
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
    </ScrollView>
  );
};

export default ContentType;
