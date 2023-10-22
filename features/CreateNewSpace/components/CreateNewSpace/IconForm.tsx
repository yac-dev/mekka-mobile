import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// image pickerを使おう。

const IconForm: React.FC = (props) => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData, validation, setValidation } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    if (formData.icon) {
      setValidation((previous) => {
        return {
          ...previous,
          icon: true,
        };
      });
    } else {
      setValidation((previous) => {
        return {
          ...previous,
          icon: false,
        };
      });
    }
  }, [formData.icon]);

  const pickAndSendImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      console.log(pickedImage);
      setFormData((previous) => {
        return {
          ...previous,
          icon: pickedImage.assets[0].uri,
        };
      });
    }
    // user idと日付でfile名を確保しておく。
    // let creatingFileName = `${auth.data._id}-${Date.now()}`;
    // if (!pickedImage.cancelled && pickedImage.uri) {
    // }
  };

  return (
    <TouchableOpacity
      style={{ padding: 7, borderRadius: 5, marginBottom: 10, backgroundColor: 'rgb(50,50,50)' }}
      onPress={() => setAccordion((previous) => !previous)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconParameterBackgroundColorTable['blue1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Foundation name='thumbnails' color={iconColorTable['blue1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Icon</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.icon ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
          />
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', marginBottom: 10 }}>Please choose an icon to represent your space.</Text>
          <TouchableOpacity
            style={{
              width: 100,
              aspectRatio: 1,
              backgroundColor: inputBackgroundColor,
              borderRadius: 15,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            onPress={() => pickAndSendImage()}
          >
            {formData.icon ? (
              <Image source={{ uri: formData.icon }} style={{ width: 100, aspectRatio: 1, borderRadius: 15 }} />
            ) : (
              <>
                <AntDesign name='plus' size={25} color={'white'} style={{ marginBottom: 5 }} />
                <Text style={{ color: 'white' }}>Select an image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default IconForm;
