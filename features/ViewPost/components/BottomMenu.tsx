import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import * as Haptics from 'expo-haptics';

const BottomMenu = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const {
    navigation,
    reactionStatusesBottomSheetRef,
    commentInputBottomSheetRef,
    textInputRef,
    reactionStatuses,
    getReactionStatuses,
  } = useContext(ViewPostContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  // const { currentPost } = useContext(TagViewContext);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;

  // const renderFirstTwoReactions = () => {
  //   const list = reactionStatuses.slice()
  // };

  const renderReactionIcons = () => {
    const list = space.reactions.slice(0, 2).map((reaction, index) => {
      if (reaction.type === 'emoji') {
        return (
          <Text
            key={index}
            style={{
              fontSize: 22,
              // marginRight: 5,
              // position: 'absolute',
              // top: index === 0 ? -5 : null,
              // left: index === 0 ? -5 : null,
              // right: index === 0 ? null : -5,
              // bottom: index === 0 ? null : -5,
            }}
          >
            {reaction.emoji}
          </Text>
        );
      } else if (reaction.type === 'sticker') {
        return (
          <FastImage
            key={index}
            source={{ uri: reaction.sticker.url }}
            style={{
              width: 22,
              height: 22,
              //  marginRight: 5
              // position: 'absolute',
              // top: index === 0 ? -5 : null,
              // left: index === 0 ? -5 : null,
              // right: index === 0 ? null : -5,
              // bottom: index === 0 ? null : -5,
            }}
          />
        );
      }
    });

    return (
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          getReactionStatuses();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>{list}</View>
        <Text style={{ color: 'white', textAlign: 'center' }}>React</Text>
      </TouchableOpacity>
    );
  };

  return (
    // <ScrollView
    //   horizontal={true}
    //   style={{
    //     backgroundColor: 'rgb(40,40,40)',
    //     position: 'absolute',
    //     width: '100%',
    //     bottom: 0,
    //   }}
    // >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // alignSelf: 'center',
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        // marginHorizontal: 100,
        height: 60,
        paddingTop: 5,
        paddingBottom: 5,
        // borderRadius: 30,
      }}
    >
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        {renderReactionIcons()}
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (space.isCommentAvailable) {
              commentInputBottomSheetRef?.current.snapToIndex(1);
              textInputRef.current.focus();
            } else {
              commentInputBottomSheetRef?.current.snapToIndex(0);
            }
          }}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Entypo name='feather' size={20} color={'white'} style={{ marginBottom: 5 }} />
          <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Comment</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons name='share-variant' size={22} color={'white'} style={{ marginBottom: 5 }} />
          <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Info</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Feather name='more-horizontal' size={22} color={'white'} style={{ marginBottom: 5 }} />
          <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Other</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default BottomMenu;
