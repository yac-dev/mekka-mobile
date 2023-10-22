import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const Overview = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

  const pickImage = async () => {
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
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View>
        {/* これviewで囲わないとばぐるんだけど。。。なぜ？？ Viewで囲わないと縦方向にjustifuContent:"space-between"みたいな形になる。。。*/}
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 30 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Create new Space
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            The space is where you and your friends get together and share photos/videos. {'\n'}Make yours and start
            sharing.
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 120,
            height: 120,
            padding: 2,
            borderRadius: 120 / 2,
            marginBottom: 20,
            marginTop: 30,
          }}
          onPress={() => pickImage()}
        >
          {formData.icon ? (
            <FastImage
              source={{ uri: formData.icon }}
              style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center' }}
            />
          ) : (
            <>
              <MaterialCommunityIcons name='camera-plus' size={30} color='black' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Upload icon</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ borderBottomColor: 'rgb(88, 88, 88)', borderBottomWidth: 1, padding: 10 }}>
          <TextInput
            style={{
              padding: 0,
              fontSize: 18,
              color: 'white',
            }}
            placeholder='Space name'
            placeholderTextColor={'rgb(170,170,170)'}
            autoCapitalize='none'
            value={formData.name}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  name: text,
                };
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Overview;
