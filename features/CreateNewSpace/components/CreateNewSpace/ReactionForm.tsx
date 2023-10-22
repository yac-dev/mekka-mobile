import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { HomeContext } from '../../../Home/contexts/HomeContext';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable, inputBackgroundColor } from '../../../../themes/color';
import FastImage from 'react-native-fast-image';

const ReactionForm: React.FC = (props) => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData, navigation, route, validation, setValidation } = useContext(CreateNewSpaceContext);

  // emojipickerから帰ってきたら、emojiをarrayに入れる。
  useEffect(() => {
    if (route?.params?.selectedReaction) {
      console.log(route?.params?.selectedReaction);
      setFormData((previous) => {
        return {
          ...previous,
          reactions: [
            ...previous.reactions,
            {
              type: route?.params?.selectedReaction.type,
              emoji:
                route?.params?.selectedReaction.type === 'emoji' ? route?.params?.selectedReaction.emoji : undefined,
              sticker:
                route?.params?.selectedReaction.type === 'sticker'
                  ? {
                      _id: route?.params?.selectedReaction.sticker._id,
                      name: route?.params?.selectedReaction.sticker.name,
                      url: route?.params?.selectedReaction.sticker.url,
                    }
                  : undefined,
            },
          ],
        };
      });
    }
  }, [route?.params?.selectedReaction]);

  useEffect(() => {
    if (route?.params?.generatedReaction) {
      setFormData((previous) => {
        return {
          ...previous,
          reactions: [...previous.reactions, route?.params?.generatedReaction],
        };
      });
    }
  }, [route?.params?.generatedReaction]);

  useEffect(() => {
    if (formData.isReactionAvailable === undefined) {
      setValidation((previous) => {
        return {
          ...previous,
          reactions: false,
        };
      });
    } else {
      if (formData.reactions.length) {
        setValidation((previous) => {
          return {
            ...previous,
            reactions: true,
          };
        });
      } else {
        setValidation((previous) => {
          return {
            ...previous,
            reactions: false,
          };
        });
      }
    }
  }, [formData.isReactionAvailable, formData.reactions]);

  const renderAddedReactions = () => {
    if (formData.isReactionAvailable) {
      if (formData.reactions.length) {
        const list = formData.reactions.map((reaction, index) => {
          return (
            <View
              key={index}
              style={{
                width: 50,
                height: 50,
                backgroundColor: inputBackgroundColor,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}
            >
              {reaction.type === 'sticker' ? (
                <FastImage source={{ uri: reaction.sticker.url }} style={{ width: 35, height: 35 }} />
              ) : (
                <Text style={{ fontSize: 40 }}>{reaction.emoji}</Text>
              )}
              <TouchableOpacity
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: -7,
                  right: -7,
                }}
                onPress={() => {
                  setFormData((previous) => {
                    const updating = [...previous.reactions].filter((reaction, idx) => index !== idx);
                    return {
                      ...previous,
                      reactions: updating,
                    };
                  });
                }}
              >
                <Ionicons name='trash' size={15} color='white' />
              </TouchableOpacity>
            </View>
          );
        });

        return (
          <ScrollView style={{ paddingTop: 10 }} horizontal={true}>
            <View style={{ flexDirection: 'row' }}>{list}</View>
          </ScrollView>
        );
      } else {
        return null;
      }
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
              backgroundColor: iconParameterBackgroundColorTable['pink1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Ionicons name='heart' color={iconColorTable['pink1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Reaction</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.reactions ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
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
          <Text style={{ marginBottom: 10, color: 'white' }}>Is it able for members to react each content.</Text>
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: 15 }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isReactionAvailable: true,
                    };
                  })
                }
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Yes</Text>
                {formData.isReactionAvailable === undefined ? null : formData.isReactionAvailable ? (
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
                style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isReactionAvailable: false,
                    };
                  })
                }
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>No</Text>
                {formData.isReactionAvailable === undefined ? null : formData.isReactionAvailable ? null : (
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
          {formData.isReactionAvailable ? (
            <>
              <Text style={{ color: 'white', marginBottom: 10 }}>
                Please select the reaction options that can be used in this space. (up to 6 options)
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgb(88,88,88)',
                  padding: 10,
                  borderRadius: 5,
                  width: '100%',
                }}
                onPress={() => navigation?.navigate('EmojiPicker')}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>😁Add</Text>
                {/* <MaterialCommunityIcons name='chevron-down' size={20} color='white' /> */}
              </TouchableOpacity>
              {/* <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                <View style={{ width: '50%', padding: 2 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgb(88,88,88)',
                      padding: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => navigation?.navigate('EmojiPicker')}
                  >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Add emoji😁</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', padding: 2 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5 }}
                    onPress={() => navigation?.navigate('EmojiPicker')}
                  >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Add special emoji😎</Text>
                  </TouchableOpacity>
                </View>
              </View> */}
              <Text style={{ color: 'rgb(170, 170, 170)', alignSelf: 'flex-end', marginBottom: 15 }}>
                {formData.reactions.length}/6
              </Text>
            </>
          ) : null}

          {renderAddedReactions()}
        </View>
      ) : null}
    </View>
  );
};

export default ReactionForm;
