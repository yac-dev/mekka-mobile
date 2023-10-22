import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';

const Content = forwardRef(({ moment }, parentRef) => {
  // const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);
  const [viewingContent, setViewingContent] = useState(moment.contents[0]);
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
    if (moment.contents.length >= 2) {
      const list = moment.contents.map((content, index) => {
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
              <FastImage source={{ uri: content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
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
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Video source={{ uri: viewingContent.data }} style={{ width: '100%' }} />

        <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>{renderContentOptions()}</View>
      </View>
    );
  } else if (viewingContent.type === 'photo') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', position: 'absolute', top: 80, left: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <FastImage
              source={{ uri: moment.createdBy.avatar }}
              style={{
                width: 30,
                height: 30,
                marginRight: 20,
                // backgroundColor: iconColorTable['blue1'],
                borderRadius: 5,
              }}
              // tintColor={'white'}
            />
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ color: 'white', marginRight: 20 }}>{moment.createdBy.name}</Text>
                <Text style={{ color: 'white' }}>{renderDate(moment.createdAt)}</Text>
              </View>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{moment.caption}</Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FastImage
            source={{ uri: viewingContent.data }}
            style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
            resizeMode='cover'
          />
        </View>
        <View style={{ position: 'absolute', bottom: 60 }}>{renderContentOptions()}</View>
      </View>
    );
  }
});

export default Content;
