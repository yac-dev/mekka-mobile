import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps, CreateNewSpaceStackParams } from '../navigations/CreateNewSpaceStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';

type ReactionProps = NativeStackScreenProps<CreateNewSpaceStackParams, 'Reaction'>;

const itemWidth = Dimensions.get('window').width / 3.5;
const reactionContainerWidth = itemWidth * 0.7;

const screenHorizontalPadding = 20;

const selectionItemWidth = Dimensions.get('window').width / 2 - screenHorizontalPadding;
const Reaction: React.FC<ReactionProps> = ({ route }) => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onReactionAvailabilityChange, onReactionsChange, setFormData } = useContext(CreateNewSpaceContext);

  // useEffect(() => {
  //   if (route?.params?.selectedReactions) {
  //     onReactionsChange(route?.params?.selectedReactions);
  //   }
  // }, [route?.params?.selectedReactions]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('Description')}
  //         disabled={
  //           (formData.isReactionAvailable.value && formData.reactions.isValidated) ||
  //           !formData.isReactionAvailable.value
  //             ? false
  //             : true
  //         }
  //       >
  //         <Text
  //           style={{
  //             color:
  //               (formData.isReactionAvailable.value && formData.reactions.isValidated) ||
  //               !formData.isReactionAvailable.value
  //                 ? 'white'
  //                 : 'rgb(170,170,170)',
  //             fontSize: 20,
  //             fontWeight: 'bold',
  //           }}
  //         >
  //           Next
  //         </Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [formData.isReactionAvailable, formData.reactions]);

  const renderSelectedReactions = () => {
    if (formData.isReactionAvailable.value) {
      const list = formData.reactions.value.map((reactionObject, index) => {
        return (
          <View
            key={index}
            style={{
              // backgroundColor: 'blue',
              // backgroundColor: 'rgb(70, 70, 70)',
              // borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              // marginRight: 10,
              width: itemWidth,
              aspectRatio: 1,
              padding: 5,
              // marginBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate({
                  name: 'ReactionPickerStackNavigator',
                  params: {
                    screen: 'ReactionPicker',
                    params: { defaultReactionIndex: index },
                  },
                })
              }
              style={{
                // backgroundColor: 'rgb(70, 70, 70)',
                width: reactionContainerWidth,
                aspectRatio: 1,
                borderRadius: reactionContainerWidth / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(50,50,50)',
                marginBottom: 4,
              }}
            >
              {reactionObject.type === 'emoji' ? (
                <View>
                  <View
                    style={{
                      width: reactionContainerWidth * 0.6,
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (reactionContainerWidth / 2) * 1.15,
                      }}
                    >
                      {reactionObject.emoji}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      setFormData((previous) => {
                        const newReactions = [...previous.reactions.value].filter((_, idx) => index !== idx);

                        return {
                          ...previous,
                          reactions: {
                            ...previous.reactions,
                            value: newReactions,
                            isValidated: newReactions.length > 0,
                          },
                        };
                      })
                    }
                    style={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      backgroundColor: 'rgb(70,70,70)',
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <VectorIcon.II name='remove' size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      width: reactionContainerWidth * 0.6,
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <ExpoImage
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={{ uri: reactionObject.sticker.url }}
                      contentFit='contain'
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      setFormData((previous) => {
                        const newReactions = [...previous.reactions.value].filter((_, idx) => index !== idx);

                        return {
                          ...previous,
                          reactions: {
                            ...previous.reactions,
                            value: newReactions,
                            isValidated: newReactions.length > 0,
                          },
                        };
                      })
                    }
                    style={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      backgroundColor: 'rgb(70,70,70)',
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <VectorIcon.II name='remove' size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            {reactionObject.caption?.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'rgb(70,70,70)',
                  maxWidth: itemWidth,
                }}
              >
                <Text numberOfLines={1} style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                  {reactionObject.caption}
                </Text>
              </View>
            ) : (
              <View>
                <Text></Text>
              </View>
            )}
          </View>
        );
      });

      return (
        <View>
          <ScrollView horizontal>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {formData.reactions.value.length === 6 ? null : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginRight: 10,
                    width: itemWidth,
                    aspectRatio: 1,
                    padding: 5,
                    // marginBottom: 10,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('ReactionPickerStackNavigator')}
                    style={{
                      // backgroundColor: 'rgb(70, 70, 70)',
                      width: reactionContainerWidth,
                      aspectRatio: 1,
                      borderRadius: reactionContainerWidth / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgb(50,50,50)',
                      marginBottom: 4,
                    }}
                  >
                    <VectorIcon.II name='thumbs-up-sharp' size={25} color={'white'} />
                    <View
                      style={{
                        backgroundColor: 'black',
                        width: 28,
                        height: 28,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: -5,
                        right: -5,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 18,
                          height: 18,
                          borderRadius: 20,
                        }}
                      >
                        <VectorIcon.II name='add' size={15} color={'black'} />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}></Text>
                </View>
              )}

              {formData.reactions.value.length ? list : null}
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 30 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Reaction
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          You can set reaction options that can be used for each post.
        </Text>
      </View>
      <View>
        <ScrollView
          horizontal
          style={{
            flexDirection: 'row',
            paddingBottom: 30,
            paddingVertical: 10,
          }}
          contentContainerStyle={{
            paddingHorizontal: screenHorizontalPadding,
          }}
        >
          <View style={{ width: selectionItemWidth, paddingRight: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 20,
                width: '100%',
                height: 160,
              }}
              activeOpacity={0.8}
              onPress={() => onReactionAvailabilityChange(true)}
            >
              <View
                style={{
                  height: 85,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'rgb(100,100,100)',
                }}
              >
                <VectorIcon.II name='thumbs-up-sharp' color={Colors.white} size={50} />
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Allowed</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Share reactions together</Text>
              </View>
            </TouchableOpacity>
            {formData.isReactionAvailable.value ? (
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  backgroundColor: 'black',
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='checkmark' color='black' size={20} />
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ width: selectionItemWidth, paddingLeft: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 20,
                width: '100%',
                height: 160,
              }}
              activeOpacity={0.8}
              onPress={() => onReactionAvailabilityChange(false)}
            >
              <View
                style={{
                  height: 85,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'rgb(100,100,100)',
                }}
              >
                <View>
                  <VectorIcon.II name='thumbs-up-sharp' color='white' size={50} />
                  <VectorIcon.FD
                    name='prohibited'
                    color='white'
                    size={30}
                    style={{ position: 'absolute', top: -8, right: -8 }}
                  />
                </View>
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Disallowed</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Post freely, no likes needed</Text>
              </View>
            </TouchableOpacity>
            {formData.isReactionAvailable.value ? null : (
              <View
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  backgroundColor: 'black',
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='checkmark' color='black' size={20} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {formData.isReactionAvailable.value ? (
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', marginBottom: 20 }}>
          Please add space reactions.
        </Text>
      ) : null}
      {renderSelectedReactions()}
    </View>
  );
};

export default Reaction;
