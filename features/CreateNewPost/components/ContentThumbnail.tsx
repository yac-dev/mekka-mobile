import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import * as VideoThumbnail from 'expo-video-thumbnails';
import { ContentType } from '../contexts';

type ContentThumbnailProps = {
  content: ContentType;
  index: number;
  onRemovePress: (index: number) => void;
};

export const ContentThumbnail: React.FC<ContentThumbnailProps> = ({ content, onRemovePress, index }) => {
  const oneAssetWidth = Dimensions.get('window').width / 3;

  return (
    <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 1 }}>
      {content.type === 'photo' ? (
        <>
          <ExpoImage
            style={{ width: '100%', height: '100%', marginRight: 10 }}
            source={{ uri: content.uri }}
            contentFit='cover'
            transition={100}
          />
        </>
      ) : (
        <>
          <Video
            source={{ uri: content.uri }}
            style={{ width: '100%', height: '100%', marginRight: 10 }}
            resizeMode={ResizeMode.COVER}
          />
        </>
      )}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: -5,
          right: -5,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onRemovePress(index)}
        >
          <Ionicons name='close' size={20} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
