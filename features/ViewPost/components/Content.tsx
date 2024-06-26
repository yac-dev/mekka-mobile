import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { Image as ExpoImage } from 'expo-image';

const Content = forwardRef(({ post }, parentRef) => {
  // const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);
  const [viewingContent, setViewingContent] = useState(post.contents[0]);
  // const {} = useContext(SpaceRootContext)

  // ここも横スクロールできるようにするといいよな。。。contentに対して。
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const renderContentOptions = () => {
    if (post.contents.length >= 2) {
      const list = post.contents.map((content, index) => {
        if (content.type === 'video') {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: 40, height: 40, marginRight: 3 }}
              onPress={() => setViewingContent(content)}
            >
              <Video source={{ uri: content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: 40, height: 40, marginRight: 3 }}
              onPress={() => setViewingContent(content)}
            >
              <ExpoImage
                key={index}
                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                source={{ uri: content.data }}
                contentFit='contain'
              />
            </TouchableOpacity>
          );
        }
      });

      return (
        <ScrollView horizontal={true} style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  if (viewingContent.type === 'video') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Video
            source={{ uri: viewingContent.data }}
            useNativeControls
            isMuted={false}
            volume={1}
            isLooping
            style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
          />
        </View>
        <View style={{ position: 'absolute', bottom: 60 }}>{renderContentOptions()}</View>
      </View>
    );
  } else if (viewingContent.type === 'photo') {
    // ここ、個別にcomponentつくてref使わないといかん。iosのsilent modeでも音量出すために。
    // ただ、video再生はできているっぽいね。
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ExpoImage
            style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
            source={{ uri: viewingContent.data }}
            contentFit='cover'
          />
        </View>
        <View style={{ position: 'absolute', bottom: 60 }}>{renderContentOptions()}</View>
      </View>
    );
  }
});

export default Content;
{
  /* <Video source={{ uri: viewingContent.data }} style={{ width: '100%' }} /> */
}
