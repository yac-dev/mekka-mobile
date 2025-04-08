import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { CreateNewPostContext, TagOptionType } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateNewPostStackParams } from '../navigations/CreateNewPostStackNavigator';
import { Colors } from '../../../themes';

type IAddTags = NativeStackScreenProps<CreateNewPostStackParams, 'AddTags'>;

const AddTags: React.FC<IAddTags> = ({ route }) => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const {
    // navigation,
    // route,
    // tagOptions,
    // setTagOptions,

    // dummyCreatedTagId,
    // setDummyCreatedTagId,
    formData,
    tagOptions,
    addTag,
    removeAddedTag,
    addCreatedTag,
    // やっぱ、addとremoveを分けた方がいいのか、あと、tag options用のstate を持っておく方が良さそうだわ。。。
  } = useContext(CreateNewPostContext);

  useEffect(() => {
    if (route?.params?.createdTag) {
      addCreatedTag(route.params.createdTag);
    }
  }, [route?.params?.createdTag]);

  const renderTagOptions = () => {
    // Use slice(1) to create a new array without the first element
    const list = tagOptions.map((tag: TagOptionType, index: number) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          onPress={() => {
            if (formData.addedTagsTable.value[tag._id]) {
              removeAddedTag(tag);
            } else {
              addTag(tag);
            }
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.iconColors[tag.color],
              padding: 12,
              borderRadius: 20,
              marginRight: 12,
              marginBottom: 10,
              // borderWidth: 0.3,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }}
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 10 }}
              source={{ uri: tag.icon.url }}
              contentFit='cover'
              // tintColor={Colors.iconColors[tag.color]}
              tintColor={'white'}
            />
            <Text style={{ color: 'white' }}>{tag.name}</Text>
            {formData.addedTagsTable.value[tag._id] ? (
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -13,
                  backgroundColor: 'black',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='checkmark' color='black' size={15} />
                </View>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView contentContainerStyle={{ height: 250 }} showsVerticalScrollIndicator={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 10, height: 250 }}>
          {list}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
      <View style={{ paddingHorizontal: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Add tags
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Please add at least one tag down below.
        </Text>
      </View>

      {renderTagOptions()}
      <TouchableOpacity
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(50,50,50)',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 100,
        }}
        onPress={() => {
          createNewPostStackNavigation.navigate('CreateNewTag');
        }}
        activeOpacity={0.8}
      >
        <View style={{ width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <AntDesign name='edit' color='white' size={20} style={{ marginRight: 10 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17 }}>Create new one</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddTags;
