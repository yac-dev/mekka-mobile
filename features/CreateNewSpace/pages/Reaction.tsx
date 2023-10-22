import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const Reaction = (props) => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    if (props.route?.params?.selectedReactions) {
      setFormData((previous) => {
        return {
          ...previous,
          reactions: props.route?.params?.selectedReactions,
        };
      });
    }
  }, [props.route?.params?.selectedReactions]);

  const renderSelectedReactions = () => {
    if (formData.isReactionAvailable) {
      const list = formData.reactions.map((reactionObject, index) => {
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
              <FastImage source={{ uri: reactionObject.sticker.url }} style={{ width: 40, height: 40 }} />
            )}
          </TouchableOpacity>
        );
      });

      return (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20, marginTop: 30 }}
        >
          {formData.reactions.length === 6 ? null : (
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                width: 56,
                height: 56,
                padding: 2,
                borderRadius: 56 / 2,
                marginRight: 8,
              }}
              onPress={() => props.navigation.navigate('ReactionPicker', { reactions: formData.reactions })}
            >
              <Text style={{ fontSize: 23 }}>😁</Text>
              <Text style={{ fontWeight: 'bold' }}>Add</Text>
            </TouchableOpacity>
          )}
          {formData.reactions.length ? list : null}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 50 }}>
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
          You can set reaction options. you can disable any reactions.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            padding: 2,
            borderRadius: 100 / 2,
            marginRight: 20,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                isReactionAvailable: true,
              };
            })
          }
        >
          {/* <MaterialCommunityIcons name='camera-plus' size={30} color='black' /> */}
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Allow</Text>
          {formData.isReactionAvailable === undefined ? null : formData.isReactionAvailable ? (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -7, right: -7 }}
            />
          ) : null}
        </TouchableOpacity>
        <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 20, fontSize: 20 }}>Or</Text>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            padding: 2,
            borderRadius: 100 / 2,
          }}
          onPress={() =>
            setFormData((previous) => {
              return {
                ...previous,
                isReactionAvailable: false,
              };
            })
          }
        >
          {/* <MaterialCommunityIcons name='camera-plus' size={30} color='black' /> */}
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Disabled</Text>
          {formData.isReactionAvailable === undefined ? null : formData.isReactionAvailable ? null : (
            <Ionicons
              name='checkmark-circle'
              size={30}
              color={'rgba(45, 209, 40, 0.85)'}
              style={{ position: 'absolute', top: -7, right: -7 }}
            />
          )}
        </TouchableOpacity>
      </View>
      {renderSelectedReactions()}
    </View>
  );
};

export default Reaction;
