import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { Foundation } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TagsFrom: React.FC = (props) => {
  const { formData, setFormData, navigation, route } = useContext(CreateNewSpaceContext);
  const [accordion, setAccordion] = useState<boolean>(false);
  // でも、これtopで持ってないとダメだな。

  // validationは後でいいや。
  // useEffect(() => {
  //   if (formData.name.length) {
  //   }
  // }, [formData.name]);

  useEffect(() => {
    if (route?.params?.addedTag) {
      setFormData((previous) => {
        return {
          ...previous,
          tags: [...previous.tags, route.params?.addedTag],
        };
      });
    }
  }, [route?.params?.addedTag]);

  const renderTags = () => {
    if (formData.tags.length) {
      const list = formData.tags.map((tag, index) => {
        return (
          <View
            key={index}
            style={{ backgroundColor: inputBackgroundColor, borderRadius: 8, padding: 10, marginRight: 15 }}
          >
            <Text style={{ color: 'white' }}>#{tag}</Text>
            <TouchableOpacity
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: -12,
                top: -7,
              }}
              onPress={() =>
                setFormData((previous) => {
                  const updating = [...previous.tags].filter((tag, idx) => index !== idx);
                  return {
                    ...previous,
                    tags: updating,
                  };
                })
              }
            >
              <Ionicons name='trash' color={'white'} size={15} />
            </TouchableOpacity>
          </View>
        );
      });
      return (
        <ScrollView horizontal={true} style={{ paddingTop: 10 }}>
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
              backgroundColor: iconParameterBackgroundColorTable['gray1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Octicons name='hash' color={iconColorTable['gray1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Tags</Text>
        </View>
        {accordion ? (
          <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
        ) : (
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
        )}
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>
            Please add tags that can be available on this space. (optional)
          </Text>
          <TouchableOpacity
            style={{ width: '100%', backgroundColor: 'rgb(88,88,88)', padding: 10, marginBottom: 10, borderRadius: 5 }}
            onPress={() => navigation?.navigate('AddTag')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <AntDesign name='plus' size={20} color='white' style={{ marginRight: 5 }} />
              <Text style={{ color: 'white' }}>Add tag</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ color: 'rgb(170, 170, 170)', alignSelf: 'flex-end' }}>{formData.tags.length}/5</Text>
          {renderTags()}
        </View>
      ) : null}
    </View>
  );
};

export default TagsFrom;
