import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Overview = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const [count, setCount] = useState<number>(0);

  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      // console.log(pickedImage);
      setFormData((previous) => {
        return {
          ...previous,
          icon: pickedImage.assets[0].uri,
        };
      });
    }
  };
  // シンプルなこのarrow functionであると、毎度このfunctionが実行される。componentがrerenderされるたびにこれが実行される。
  // const renderTextInputLength = () => {
  //   console.log('hello');
  //   return (
  //     <Text style={{ color: formData.name.length <= 40 ? 'rgb(170,170,170)' : 'red' }}>{formData.name.length}</Text>
  //   );
  // };

  // これだと、最初のrender時のみのrender。だから、formDataのstateが変わってもここのfunction componentのrenderは更新されない。
  // const renderTex = useCallback(() => {
  //   console.log('hello');
  //   return (
  //     <Text style={{ color: formData.name.length <= 40 ? 'rgb(170,170,170)' : 'red' }}>{formData.name.length}</Text>
  //   );
  // }, []);

  const renderText = () => {
    return (
      <Text style={{ color: formData.name.length <= 40 ? 'rgb(170,170,170)' : 'red' }}>{formData.name.length}</Text>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}
      style={{ flex: 1, backgroundColor: 'black', padding: 10 }}
    >
      <ScrollView>
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
            <ExpoImage
              style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center' }}
              source={{ uri: formData.icon }}
              contentFit='cover'
            />
          ) : (
            <>
              <MaterialCommunityIcons name='camera-plus' size={30} color='black' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Upload icon</Text>
            </>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'rgb(88, 88, 88)',
          }}
        >
          <TextInput
            style={{
              fontSize: 18,
              color: 'white',
              flex: 1,
              padding: 10,
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderText()}
            <Text style={{ marginRight: 10, color: 'rgb(170,170,170)' }}>/40</Text>
          </View>
        </View>

        {/* <View style={{ borderBottomColor: 'rgb(88, 88, 88)', borderBottomWidth: 1 }}>
          <TextInput
            style={{
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
          <Text style={{ marginRight: 10, alignSelf: 'flex-end', color: 'rgb(170,170,170)' }}>
            {formData.name.length}
          </Text>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Overview;
