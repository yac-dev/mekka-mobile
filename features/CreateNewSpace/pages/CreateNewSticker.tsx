import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AppButton, LoadingSpinner } from '../../../components';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { previewSticker } from '../../../query/mutations';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../../../query/mutationKeys';
import { PreviewStickerInputType, StickerContentType } from '../../../query/types';
import { Image as ExpoImage } from 'expo-image';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { ReactionPickerContext, ReactionType } from '../contexts/ReactionPickerProvider';
import { StickerType } from '../../../types';

// doneした後のdata構造が少し面倒だがまあ考えるしかないな。。。
export const CreateNewSticker = () => {
  // const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const { onStickerChange } = useContext(ReactionPickerContext);
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const [auth] = useRecoilState(authAtom);
  const [content, setContent] = useState<StickerContentType | undefined>(void 0);
  const [stickerPreview, setStickerPreview] = useState<string | undefined>(void 0);

  // console.log('previewStickerData', stickerPreview);

  const {
    mutate: previewStickerMutation,
    data: previewStickerData,
    status: previewStickerStatus,
  } = useMutation({
    mutationKey: [mutationKeys.previewSticker], // keyをuniqueにするために content.nameを足したけど、意味ないっぽいな。。。
    mutationFn: (input: PreviewStickerInputType) => previewSticker(input),
    onSuccess: (data) => {
      setStickerPreview(data.image);
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <AppButton.Icon
          onButtonPress={() => {
            navigation.goBack();
          }}
          customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
          hasShadow={false}
        >
          <VectorIcon.II name='close' size={18} color={Colors.white} />
        </AppButton.Icon>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onDonePress} disabled={previewStickerStatus === 'success' ? false : true}>
          <Text
            style={{
              color: previewStickerStatus === 'success' ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [previewStickerStatus, stickerPreview]);

  // currentのselectedにも入れないといかんよな。。。それも高ryしないといかん。。。
  // というかsetFormよりもコッチな気がするわ。。。
  const onDonePress = () => {
    const creatingStickerObject = {
      _id: new Date().toString(),
      url: stickerPreview,
    };
    onStickerChange(creatingStickerObject);
    navigation.goBack();
  };

  // pickしたら、その画像をそのままserverに送って、removebgのcodeを動かす感じ。
  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    const fileName = `${auth._id}_${new Date().getTime()}`;
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      const content: StickerContentType = {
        name: `${fileName}.webp`,
        uri: pickedImage.assets[0].uri,
        type: 'image/jpg',
      };
      setContent(content);
      previewStickerMutation({ content });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, marginBottom: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
          Create sticker
        </Text>
        <Text style={{ color: 'rgb(170, 170, 170)', textAlign: 'center' }}>
          Couldn't find the sticker you want to use?{'\n'}Create one from an image easily and quickly.{'\n'}This sticker
          will be only usable to space members.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, alignSelf: 'center' }}>
        <ExpoImage
          source={require('../../../assets/forApp/elon-wtf-original.png')}
          style={{ width: 100, height: 70, marginRight: 20 }}
        />
        <MaterialCommunityIcons name='chevron-right' color='white' size={25} style={{ marginRight: 20 }} />
        <ExpoImage
          source={require('../../../assets/forApp/elon-wtf.png')}
          style={{ width: 70, height: 70, marginRight: 20 }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          alignSelf: 'center',
          backgroundColor: 'rgb(50,50,50)',
          justifyContent: 'center',
          alignItems: 'center',
          width: 110,
          height: 110,
          padding: 2,
          borderRadius: 110 / 2,
        }}
        onPress={() => pickImage()}
      >
        {stickerPreview ? (
          <ExpoImage
            style={{ width: 80, height: 80, alignSelf: 'center' }}
            source={{ uri: stickerPreview }}
            contentFit='cover'
          />
        ) : (
          <>
            <VectorIcon.II name='image' size={35} color='white' style={{ marginBottom: 5 }} />
            <Text style={{ color: 'white', fontSize: 17 }}>Choose</Text>
          </>
        )}
        <View
          style={{
            backgroundColor: 'black',
            width: 38,
            height: 38,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: -5,
            right: -5,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              width: 28,
              height: 28,
              borderRadius: 20,
            }}
          >
            <VectorIcon.II name='add' size={20} color={'black'} />
          </View>
        </View>
      </TouchableOpacity>
      <LoadingSpinner isVisible={previewStickerStatus === 'pending'} message={'Processing now'} />
    </View>
  );
};
