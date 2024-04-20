import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps, CreateNewSpaceStackParams } from '../../../navigations/CreateNewSpaceStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ReactionProps = NativeStackScreenProps<CreateNewSpaceStackParams, 'Reaction'>;

const Reaction: React.FC<ReactionProps> = ({ route }) => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onReactionAvailabilityChange } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    if (route?.params?.selectedReactions) {
      // setFormData((previous) => {
      //   return {
      //     ...previous,
      //     reactions: props.route?.params?.selectedReactions,
      //   };
      // });
    }
  }, [route?.params?.selectedReactions]);

  const renderSelectedReactions = () => {
    if (formData.isReactionAvailable.value) {
      const list = formData.reactions.value.map((reactionObject, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgb(80, 80, 80)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}
            onPress={() => props.navigation.navigate('ReactionPicker', { reactions: formData.reactions })}
          >
            {reactionObject.type === 'emoji' ? (
              <Text style={{ fontSize: 40 }}>{reactionObject.emoji}</Text>
            ) : (
              <ExpoImage
                style={{ width: 40, height: 40 }}
                source={{ uri: reactionObject.sticker.url }}
                contentFit='cover'
              />
            )}
          </TouchableOpacity>
        );
      });

      return (
        <View>
          {formData.reactions.value.length === 6 ? null : (
            <TouchableOpacity
              style={{
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              onPress={() => navigation.navigate('ReactionPicker', { reactions: formData.reactions.value })}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='add-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Add</Text>
                  <Text style={{ color: 'rgb(180, 180, 180)', textAlign: 'center' }}>
                    Please choose at most 6 reaction options.
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20 }}>
            {formData.reactions.value.length ? list : null}
          </View>
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
          activeOpacity={0.5}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='thumbs-up' color='white' size={20} style={{ marginRight: 20 }} />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Allowed</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Enjoy giving reactions with each other.</Text>
            </View>
          </View>
          {/* <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} /> */}
          {formData.isReactionAvailable === undefined ? null : formData.isReactionAvailable ? (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => onReactionAvailabilityChange(false)}
          activeOpacity={0.5}
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
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Disabled</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                Enjoy sharing without worrying about upvotes from others.
              </Text>
            </View>
          </View>
          {/* <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} /> */}
          {formData.isReactionAvailable === undefined ? null : formData.isReactionAvailable ? null : (
            <Ionicons name='checkmark' size={20} color={'white'} style={{ marginRight: 10 }} />
          )}
        </TouchableOpacity>
      </View>
      {renderSelectedReactions()}
    </View>
  );
};

export default Reaction;
