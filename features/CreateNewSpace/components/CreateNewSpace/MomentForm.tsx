import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MomentForm: React.FC = (props) => {
  const { formData, setFormData, validation, setValidation } = useContext(CreateNewSpaceContext);
  const [accordion, setAccordion] = useState<boolean>(false);
  // でも、これtopで持ってないとダメだな。
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  // useEffect(() => {
  //   if (formData.name.length && formData.name.length <= 41) {
  //     setValidation((previous) => {
  //       return {
  //         ...previous,
  //         name: true,
  //       };
  //     });
  //   } else {
  //     setValidation((previous) => {
  //       return {
  //         ...previous,
  //         name: false,
  //       };
  //     });
  //   }
  // }, [formData.name]);

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
              backgroundColor: iconParameterBackgroundColorTable['red1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Ionicons name='home' color={iconColorTable['red1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Moment</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.name ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
          />
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>
            Moment is the story of Instagram. Instead of 24 hours restriction, you can set this disappear time on your
            own.
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {/* <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    disappearAfter: 0,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>Permanent</Text>
              {!formData.disappearAfter ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'rgba(45, 209, 40, 0.85)'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    disappearAfter: 60,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>1 hour</Text>
              {formData.disappearAfter === 60 ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'rgba(45, 209, 40, 0.85)'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    disappearAfter: 120,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>2 hours</Text>
              {formData.disappearAfter === 120 ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'rgba(45, 209, 40, 0.85)'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    disappearAfter: 180,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>3 hours</Text>
              {formData.disappearAfter === 180 ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'rgba(45, 209, 40, 0.85)'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    disappearAfter: 24,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>10 hours</Text>
              {formData.disappearAfter === 600 ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'rgba(45, 209, 40, 0.85)'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
              onPress={() =>
                setFormData((previous) => {
                  return {
                    ...previous,
                    disappearAfter: 24,
                  };
                })
              }
            >
              <Text style={{ color: 'white' }}>24 hours</Text>
              {formData.disappearAfter === 1440 ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'rgba(45, 209, 40, 0.85)'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsDateTimePickerVisible(true)}>
            <Text style={{ color: 'white' }}>Pick</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDateTimePickerVisible}
            mode='time'
            date={new Date(new Date().setHours(1, 0, 0, 0))}
            onConfirm={(date) => console.log(date)}
            onCancel={() => setIsDateTimePickerVisible(false)}
            locale='en_GB'
            // isConfirmBtnDisabled={true}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default MomentForm;
