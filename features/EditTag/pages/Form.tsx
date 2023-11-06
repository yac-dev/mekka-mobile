import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
        <ExpoImage
          style={{ width: 30, height: 30, marginRight: 10 }}
          source={{ uri: props.route.params.tag.icon }}
          placeholder={blurhash}
          contentFit='cover'
          transition={1000}
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
