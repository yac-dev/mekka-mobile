import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';

const Form = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 50 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Edit Tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          There are a lot of options other than hash mark. Customize your tag and have fun.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <FastImage
          style={{ width: 30, height: 30, marginRight: 10 }}
          source={{ uri: props.route.params.tag.icon }}
          tintColor={props.route.params.tag.iconType === 'icon' ? props.route.params.tag.color : null}
        />
        <Text style={{ color: 'white', fontSize: 17 }}>{props.route.params.tag.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <TouchableOpacity style={{ backgroundColor: 'white' }}>
          <Text style={{ color: 'white' }}>Simple icon</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: 'white' }}>Customize</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;
