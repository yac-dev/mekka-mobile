import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { primaryBackgroundColor } from '../../../../themes/color';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconParameterBackgroundColorTable } from '../../../../themes/color';
import { iconColorTable } from '../../../../themes/color';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AddTagForm = () => {
  const { route, navigation, formData, setFormData } = useContext(CreateNewSpaceContext);
  const [accordion, setAccordion] = useState(false);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         onPress={() =>
  //           props.navigation.navigate({ name: 'CreateNewSpace', params: { addedTag: tagName }, merge: true })
  //         }
  //         disabled={tagName.length ? false : true}
  //       >
  //         <Text
  //           style={{
  //             color: tagName.length ? 'white' : 'rgb(117, 117, 117)',
  //             fontSize: 20,
  //             fontWeight: 'bold',
  //           }}
  //         >
  //           Done
  //         </Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [tagName]);

  useEffect(() => {
    if (route?.params?.addedTag) {
      setFormData((previous) => {
        return {
          ...previous,
          tags: [...previous, route?.params?.addedTag],
        };
      });
    }
  }, [route?.params?.addedTag]);

  const renderAddedTags = () => {
    if (formData.tags.length) {
      const list = formData.tags.map((tag, index) => {
        return (
          <View
            key={index}
            style={{ backgroundColor: 'rgb(88,88,88)', flexDirection: 'row', alignItems: 'center', padding: 5 }}
          >
            <Feather name='hash' color={iconColorTable['gray1']} size={15} style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>{tag}</Text>
            <TouchableOpacity
              style={{ width: 24, height: 24, borderRadius: 12 }}
              onPress={() =>
                setFormData((previous) => {
                  const updating = [...previous.tags].filter((tag, idx) => idx !== index);
                  return {
                    ...previous,
                    tags: updating,
                  };
                })
              }
            >
              <Ionicons name='trash' color={'red'} size={15} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return <Text style={{ color: 'white', textAlign: 'center' }}>No tags are added yet.</Text>;
    }
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
              backgroundColor: iconParameterBackgroundColorTable['gray1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Feather name='hash' color={iconColorTable['gray1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Tags</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.name ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
          /> */}
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', marginBottom: 10 }}>
            Please create tags which are available in this space.
          </Text>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginBottom: 15 }}
            onPress={() => navigation?.navigate('AddTag')}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Add from here</Text>
          </TouchableOpacity>
          {renderAddedTags()}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default AddTagForm;
