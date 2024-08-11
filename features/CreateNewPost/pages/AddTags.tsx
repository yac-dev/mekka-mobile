import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { CreateNewPostContext, TagOptionType } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../../../navigations/CreateNewPostStackNavigator';
import { CurrentSpaceContext } from '../../../providers';
import { TagType } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateNewPostStackParams } from '../../../navigations/CreateNewPostStackNavigator';

type IAddTags = NativeStackScreenProps<CreateNewPostStackParams, 'AddTags'>;

const AddTags: React.FC<IAddTags> = ({ route }) => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const { currentSpace } = useContext(CurrentSpaceContext);
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
    // やっぱ、addとremoveを分けた方がいいのか、あと、tag options用のstate を持っておく方が良さそうだわ。。。
  } = useContext(CreateNewPostContext);

  useEffect(() => {
    if (route?.params?.createdTag) {
      addCreatedTag(route.params.createdTag);
    }
  }, [route?.params?.createdTag]);

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => createNewPostStackNavigation.navigate('AddLocation')}
          disabled={formData.addedTagsTable.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.addedTagsTable.isValidated ? 'white' : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.addedTagsTable]);

  const renderTagOptions = () => {
    // if (Object.values(tagOptions).length) {
    const list = tagOptions.map((tag: TagOptionType, index: number) => {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          key={index}
          onPress={() => {
            if (formData.addedTagsTable.value[tag._id]) {
              removeAddedTag(tag);
            } else {
              addTag(tag);
            }
            // addTag(tag);
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(60,60,60)',
              padding: 12,
              borderRadius: 20,
              marginRight: 10,
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
              tintColor={tag.icon ? tag.color : null}
            />
            <Text style={{ color: 'white' }}>{tag.name}</Text>
            {formData.addedTagsTable.value[tag._id] ? (
              <View
                style={{
                  position: 'absolute',
                  top: -12,
                  right: -15,
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
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
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
      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => {
          createNewPostStackNavigation.navigate('CreateNewTag');
        }}
        activeOpacity={1}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name='edit' color='white' size={20} style={{ marginRight: 20 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Create new one?</Text>
          </View>
        </View>
        <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
      </TouchableOpacity>
      {renderTagOptions()}
    </View>
  );
};

export default AddTags;
