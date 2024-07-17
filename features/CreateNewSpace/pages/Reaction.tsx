import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps, CreateNewSpaceStackParams } from '../../../navigations/CreateNewSpaceStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VectorIcon } from '../../../Icons';

type ReactionProps = NativeStackScreenProps<CreateNewSpaceStackParams, 'Reaction'>;

const itemWidth = Dimensions.get('window').width / 3.5;
const reactionContainerWidth = itemWidth * 0.7;

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
              onPress={() => navigation.navigate('ReactionPicker', { defaultReactionIndex: index })}
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
                        return {
                          ...previous,
                          reactions: {
                            ...previous.reactions,
                            value: previous.reactions.value.filter((_, idx) => index !== idx),
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
                        return {
                          ...previous,
                          reactions: {
                            ...previous.reactions,
                            value: previous.reactions.value.filter((_, idx) => index !== idx),
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
                    onPress={() => navigation.navigate('ReactionPicker')}
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
                    <VectorIcon.MCI name='plus' size={30} color={'white'} />
                  </TouchableOpacity>
                  <Text style={{ color: 'white', fontSize: 15 }}>Add new</Text>
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
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onReactionAvailabilityChange(true)}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='thumbs-up' color='white' size={20} style={{ marginRight: 20 }} />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Allowed</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Enjoy giving reactions with each other.</Text>
            </View>
          </View>
          {/* <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} /> */}
          {formData.isReactionAvailable.value ? (
            <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onReactionAvailabilityChange(false)}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 20 }}>
              <Ionicons name='thumbs-up' color='white' size={20} />
              <Foundation
                name='prohibited'
                color='white'
                size={20}
                style={{ position: 'absolute', top: -10, right: -10 }}
              />
            </View>
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Disallowed</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                Enjoy sharing without worrying about upvotes from others.
              </Text>
            </View>
          </View>
          {/* <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} /> */}
          {formData.isReactionAvailable.value ? null : (
            <VectorIcon.II name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          )}
        </TouchableOpacity>
      </View>
      {renderSelectedReactions()}
    </View>
  );
};

export default Reaction;
