import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';

const ContentTypeForm = () => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

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
              backgroundColor: 'blue',
              marginRight: 15,
              borderRadius: 5,
            }}
          >
            <AntDesign name='plus' color='red' size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Content</Text>
        </View>
        {accordion ? (
          <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
        ) : (
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
        )}
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>What kind of content can you share in this space?</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      contentType: 'photo',
                    };
                  })
                }
              >
                <Text>Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      contentType: 'video',
                    };
                  })
                }
              >
                <Text>Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ContentTypeForm;
