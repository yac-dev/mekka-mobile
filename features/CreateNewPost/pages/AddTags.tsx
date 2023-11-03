import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const AddTags = (props) => {
  const { createNewPostFormData, setCreateNewPostFormData } = useContext(GlobalContext);
  const {
    navigation,
    route,
    tagOptions,
    setTagOptions,
    addedTags,
    setAddedTags,
    createdTags,
    setCreatedTags,
    dummyCreatedTagId,
    setDummyCreatedTagId,
  } = useContext(CreateNewPostContext);

  useEffect(() => {
    if (props.route?.params?.createdTag) {
      setCreateNewPostFormData((previous) => {
        return {
          ...previous,
          [props.route?.params?.createdTag._id]: props.route?.params?.createdTag,
        };
      });
      // setAddedTags((previous) => {
      //   return {
      //     ...previous,
      //     [props.route?.params?.createdTag._id]: props.route?.params?.createdTag,
      //   };
      // });
      setTagOptions((previous) => {
        const updating = [...previous];
        updating.unshift(props.route?.params?.createdTag);
        return updating;
      });
    }
  }, [props.route?.params?.createdTag]);

  const renderTagOptions = () => {
    // if (Object.values(tagOptions).length) {
    const list = tagOptions.map((tag, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(80,80,80)',
            padding: 12,
            borderRadius: 20,
            marginRight: 10,
            marginBottom: 10,
          }}
          onPress={() => {
            setCreateNewPostFormData((previous) => {
              const updating = { ...previous.addedTags };
              if (createNewPostFormData.addedTags[tag._id]) {
                delete updating[tag._id];
                return {
                  ...previous,
                  addedTags: updating,
                };
              } else {
                const updating = { ...previous.addedTags };
                updating[tag._id] = tag;
                return {
                  ...previous,
                  addedTags: updating,
                };
              }
            });
            // setAddedTags((previous) => {
            //   const updating = { ...previous };
            //   if (addedTags[tag._id]) {
            //     delete updating[tag._id];
            //     return updating;
            //   } else {
            //     return {
            //       ...updating,
            //       [tag._id]: tag,
            //     };
            //   }
            // });
          }}
        >
          <ExpoImage
            style={{ width: 20, height: 20, marginRight: 10 }}
            source={{ uri: tag.icon }}
            placeholder={blurhash}
            contentFit='cover'
            transition={1000}
            tintColor={tag.iconType === 'icon' ? tag.color : null}
          />
          <Text style={{ color: 'white' }}>{tag.name}</Text>
          {createNewPostFormData.addedTags[tag._id] ? (
            <View style={{ position: 'absolute', top: -10, right: -7 }}>
              <Ionicons name='checkmark-circle' color='green' size={25} />
            </View>
          ) : null}
        </TouchableOpacity>
      );
    });

    return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 10 }}>{list}</View>;
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
          # Add tags
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Please add at least one tag.</Text>
      </View>
      {renderTagOptions()}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          marginTop: 30,
        }}
        onPress={() => {
          navigation.navigate('CreateNewTag');
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          {/* <Ionicons name='add' color='black' size={25} style={{ marginRight: 5 }} /> */}
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Create new?</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddTags;
