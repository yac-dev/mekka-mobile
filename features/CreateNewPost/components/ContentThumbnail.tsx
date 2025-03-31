import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import * as VideoThumbnail from 'expo-video-thumbnails';
import { ContentType, BufferContentType } from '../contexts';
import { VectorIcon } from '../../../Icons';

type ContentThumbnailProps = {
  bufferContent: BufferContentType;
  index: number;
  onRemoveContentPress: (index: number) => void;
};

const oneAssetWidth = 210;
export const ContentThumbnail: React.FC<ContentThumbnailProps> = ({ bufferContent, index, onRemoveContentPress }) => {
  return (
    <View style={{ width: oneAssetWidth, height: oneAssetWidth * (16 / 9) }}>
      {bufferContent.type === 'image/jpg' ? (
        <View style={{ width: '100%', height: '100%' }}>
          <ExpoImage
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
            source={{ uri: bufferContent.uri }}
            contentFit='cover'
            transition={100}
          />
          <View
            style={{
              position: 'absolute',
              top: -15,
              right: -10,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50, 50, 50)',
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => onRemoveContentPress(index)}
            >
              <VectorIcon.MCI name='minus' size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ width: '100%', height: '100%' }}>
          <Video
            source={{ uri: bufferContent.uri }}
            style={{ width: '100%', height: '100%', marginRight: 10 }}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
          />
        </View>
      )}
      {/* <View
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
      </View> */}
    </View>
  );
};
