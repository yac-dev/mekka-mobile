import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { CreateNewPostContext } from '../contexts';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../../../navigations/CreateNewPostStackNavigator';
import { CurrentSpaceContext } from '../../../providers';
import { TagType } from '../../../types';

const AddTags = (props) => {
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
    onChangeAddedTags,
  } = useContext(CreateNewPostContext);

  // useEffect(() => {
  //   if (props.route?.params?.createdTag) {
  //     setCreateNewPostFormData((previous) => {
  //       // [props.route?.params?.createdTag._id]: props.route?.params?.createdTag,
  //       const updating = { ...previous.addedTags };
  //       updating[props.route?.params?.createdTag._id] = props.route?.params?.createdTag;
  //       return {
  //         ...previous,
  //         addedTags: updating,
  //       };
  //     });
  //     // setAddedTags((previous) => {
  //     //   return {
  //     //     ...previous,
  //     //     [props.route?.params?.createdTag._id]: props.route?.params?.createdTag,
  //     //   };
  //     // });
  //     setTagOptions((previous) => {
  //       const updating = [...previous];
  //       updating.unshift(props.route?.params?.createdTag);
  //       return updating;
  //     });
  //   }
  // }, [props.route?.params?.createdTag]);

  const renderTagOptions = () => {
    // if (Object.values(tagOptions).length) {
    const list = currentSpace.tags.map((tag: TagType, index: number) => {
      return (
        <TouchableWithoutFeedback key={index} onPress={() => onChangeAddedTags(tag)}>
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
            {formData.addedTags.value[tag._id] ? (
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
        </TouchableWithoutFeedback>
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
