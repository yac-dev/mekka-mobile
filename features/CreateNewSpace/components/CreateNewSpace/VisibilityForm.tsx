import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const VisibilityForm = () => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData, validation, setValidation } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    if (formData.isPublic === undefined) {
      setValidation((previous) => {
        return {
          ...previous,
          isPublic: false,
        };
      });
    } else {
      setValidation((previous) => {
        return {
          ...previous,
          isPublic: true,
        };
      });
    }
  }, [formData.isPublic]);

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
              backgroundColor: iconParameterBackgroundColorTable['green1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialIcons name='public' color={iconColorTable['green1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Visibility</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.isPublic ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
          />
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>Is this space publicly accesible?</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'rgb(88, 88, 88)', padding: 10, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isPublic: true,
                    };
                  })
                }
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Public</Text>
                {formData.isPublic === undefined ? null : formData.isPublic ? (
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={'rgba(45, 209, 40, 0.85)'}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'rgb(88, 88, 88)', padding: 10, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isPublic: false,
                    };
                  })
                }
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Private</Text>
                {formData.isPublic === undefined ? null : formData.isPublic ? null : (
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={'rgba(45, 209, 40, 0.85)'}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default VisibilityForm;
