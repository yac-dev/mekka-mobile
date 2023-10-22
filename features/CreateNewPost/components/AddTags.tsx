import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../themes/color';
import FastImage from 'react-native-fast-image';

const AddTags = () => {
  const { navigation, route, setFormData, formData, tagOptions, setTagOptions } = useContext(CreateNewPostContext);
  const [accordion, setAccordion] = useState(false);

  useEffect(() => {
    if (route?.params?.createdTag) {
      setFormData((previous) => {
        return {
          ...previous,
          createdTags: [...previous.createdTags, route?.params?.createdTag],
        };
      });
    }
  }, [route?.params?.createdTag]);

  const renderTagOptions = () => {
    if (Object.values(tagOptions).length) {
      const list = Object.values(tagOptions).map((tag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(88,88,88)',
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}
            onPress={() => {
              setFormData((previous) => {
                return {
                  ...previous,
                  addedTags: {
                    ...previous.addedTags,
                    [tag._id]: tag,
                  },
                };
              });
              setTagOptions((previous) => {
                const updating = { ...previous };
                delete updating[tag._id];
                return updating;
              });
            }}
          >
            <FastImage
              source={{ uri: tag.icon }}
              style={{ width: 20, height: 20, marginRight: 10 }}
              tintColor={'white'}
            />
            <Text style={{ color: 'white' }}>{tag.name}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ padding: 10, backgroundColor: 'rgb(70,70,70)', borderRadius: 5, marginBottom: 10 }}>
          <View
            style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Options</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation?.navigate('CreateTag')}
            >
              <Ionicons name='create' size={17} style={{ marginRight: 5 }} color={'white'} />
              <Text style={{ color: 'white' }}>Create new?</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: 'rgb(70,70,70)',
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <View
            style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Options</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigation?.navigate('CreateTag')}
            >
              <Ionicons name='create' size={17} style={{ marginRight: 5 }} color={'white'} />
              <Text style={{ color: 'white' }}>Create new?</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'white', textAlign: 'center' }}>No more tag options left.</Text>
        </View>
      );
    }
  };

  const renderAddedTags = () => {
    if (Object.values(formData.addedTags).length) {
      const list = Object.values(formData.addedTags).map((tag, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(90,90,90)',
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <FastImage
              source={{ uri: tag.icon }}
              style={{ width: 20, height: 20, marginRight: 10 }}
              tintColor={'white'}
            />
            <Text style={{ color: 'white', marginRight: 10 }}>{tag.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setFormData((previous) => {
                  const updating = { ...previous.addedTags };
                  delete updating[tag._id];
                  return {
                    ...previous,
                    addedTags: updating,
                  };
                });
                setTagOptions((previous) => {
                  return {
                    ...previous,
                    [tag._id]: tag,
                  };
                });
              }}
            >
              <Ionicons name='close-circle-sharp' color='white' size={20} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <View>
          <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCreatedTags = () => {
    if (formData.createdTags.length) {
      const list = formData.createdTags.map((tagName, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(88,88,88)',
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}
          >
            <Feather name='hash' size={15} style={{ marginRight: 10 }} color={'white'} />
            <Text style={{ color: 'white', marginRight: 10 }}>{tagName}</Text>
            <TouchableOpacity
              onPress={() => {
                setFormData((previous) => {
                  const updating = [...previous.createdTags].filter((tag, idx) => index !== idx);
                  return {
                    ...previous,
                    createdTags: updating,
                  };
                });
              }}
            >
              <Ionicons name='close-circle-sharp' color='white' size={20} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{list}</View>
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
              backgroundColor: iconParameterBackgroundColorTable['orange1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Feather name='hash' color={iconColorTable['orange1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Tags</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Text style={{ color: 'white', marginRight: 10, color: 'rgb(170, 170,170)' }}>Optional</Text> */}
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 20, color: 'white' }}>Please add at least one tag.</Text>
          {renderAddedTags()}
          {renderCreatedTags()}
          {renderTagOptions()}
        </View>
      ) : null}
    </View>
  );
};

export default AddTags;
