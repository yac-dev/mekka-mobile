import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { iconColorTable } from '../../../themes/color';
import { iconParameterBackgroundColorTable } from '../../../themes/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddCaption = () => {
  const { setFormData, formData } = useContext(CreateNewPostContext);
  const [accordion, setAccordion] = useState(false);

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
              backgroundColor: iconParameterBackgroundColorTable['lightGreen1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialCommunityIcons name='chat-processing-outline' color={iconColorTable['lightGreen1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Caption</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginRight: 10, color: 'rgb(170, 170,170)' }}>Optional</Text>
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 20, color: 'white' }}>Please write the caption as you need.</Text>
          <TextInput
            style={{
              backgroundColor: 'rgb(88, 88, 88)',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              color: 'white',
            }}
            placeholder='Add caption...'
            placeholderTextColor={'rgb(170,170,170)'}
            autoCapitalize='none'
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  caption: text,
                };
              })
            }
          />
        </View>
      ) : null}
    </View>
  );
};

export default AddCaption;
