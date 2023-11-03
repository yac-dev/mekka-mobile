import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';
import { iconColorTable } from '../../../themes/color';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Header = () => {
  const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);

  const renderHeader = () => {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <ExpoImage
            style={{ width: 30, height: 30, marginRight: 20 }}
            source={{ uri: post.createdBy.avatar }}
            placeholder={blurhash}
            contentFit='contain'
            transition={1000}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text>{post.createdBy.name}</Text>
            <Text>{post.createdBY}</Text>
          </View>
        </View>
        <Text style={{ color: 'white' }}>{post.caption}</Text>
      </View>
    );
  };

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  return (
    <View style={{ padding: 10 }}>
      {post ? (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <ExpoImage
              style={{
                width: 30,
                height: 30,
                marginRight: 20,
                borderRadius: 5,
              }}
              source={{ uri: post.createdBy.avatar }}
              placeholder={blurhash}
              contentFit='contain'
              transition={1000}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'white', marginBottom: 10 }}>{post.createdBy.name}</Text>
              <Text style={{ color: 'white' }}>{renderDate(post.createdAt)}</Text>
            </View>
          </View>
          <Text style={{ color: 'white', fontSize: 17 }}>{post.caption}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Header;
