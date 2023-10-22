import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable } from '../../../themes/color';
import { iconParameterBackgroundColorTable } from '../../../themes/color';
import { Video } from 'expo-av';

const AddPhoto = () => {
  const { formData, setFormData, route, spaceAndUserRelationship, space } = useContext(CreateNewPostContext);
  const [accordion, setAccordion] = useState<boolean>(true);

  const pickAndSendImage = async () => {
    const pickerOption = {
      mediaTypes:
        route?.params?.spaceAndUserRelationship.space.contentType === 'photo'
          ? ImagePicker.MediaTypeOptions.Images
          : route?.params?.spaceAndUserRelationship.space.contentType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      // duration: space.videoLength ? space.videoLength : 3000,
    };
    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    if (!result.canceled && result.assets) {
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setFormData((previous) => {
        console.log(result.assets);
        const adding = [];
        const addedAssets = result.assets.forEach((asset) => {
          if (asset.type === 'video') {
            // 基本は, videoの時はdurationがspace以下の時だけ入れる様にする。
            if (asset.duration / 1000 <= space.videoLength) {
              adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
            } else {
              // addingのarrayに入れないで、snacbarを出してあげる。無理ですって。
            }
          } else if (asset.type === 'image') {
            adding.push({ uri: asset.uri, type: 'image', duration: asset.duration ? asset.duration : null });
          }
        });

        return {
          ...previous,
          contents: [...previous.contents, ...adding],
        };
      });

      // Determine media type based on file extension
      // if (uri.endsWith('.jpg') || uri.endsWith('.png')) {
      //   // The picked content is a photo.
      //   console.log('Picked photo:', uri);
      // } else if (uri.endsWith('.mp4') || uri.endsWith('.mov')) {
      //   // The picked content is a video.
      //   console.log('Picked video:', uri);
      // } else {
      //   console.log('Unknown media type:', uri);
      // }

      // setFormData((previous) => {
      //   return {
      //     ...previous,
      //     photos: [...previous.photos, result.assets[0].uri],
      //   };
      // });
    }
  };
  // console.log(JSON.stringify(formData, null, 4));

  const renderPhoto = () => {
    if (formData.contents.length) {
      const list = formData.contents.map((content, index) => {
        return (
          <View key={index}>
            {content.type === 'image' ? (
              <Image
                source={{ uri: content.uri }}
                style={{ width: 90, height: 90, borderRadius: 12, marginRight: 10 }}
              />
            ) : (
              <Video
                source={{ uri: content.uri }}
                style={{ width: 90, height: 90, borderRadius: 12, marginRight: 10 }}
              />
            )}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -10,
                right: 0,
                backgroundColor: 'red',
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  const updating = [...previous.contents];
                  const updated = updating.filter((content, idx) => index !== idx);
                  return {
                    ...previous,
                    contents: updated,
                  };
                })
              }
            >
              <Ionicons name='trash' size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true} style={{ paddingTop: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ padding: 7, borderRadius: 5, marginBottom: 10, backgroundColor: 'rgb(50,50,50)' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => setAccordion((previous) => !previous)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconParameterBackgroundColorTable['red1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialIcons name='add-to-photos' color={iconColorTable['red1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Photo / Video</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'white', marginBottom: 20 }}>Please add photos or videos you wanna post.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity
              style={{
                width: 90,
                height: 90,
                backgroundColor: 'rgb(88,88,88)',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                alignSelf: 'center',
                marginRight: 10,
              }}
              onPress={() => pickAndSendImage()}
            >
              <AntDesign name='plus' size={25} color='white' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'white' }}>{formData.contents.length ? 'Add more' : 'Add image'}</Text>
            </TouchableOpacity>
            {renderPhoto()}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default AddPhoto;
