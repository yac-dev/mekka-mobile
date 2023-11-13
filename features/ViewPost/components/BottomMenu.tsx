import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { TagViewContext } from '../../Space/contexts/TagViewContext';
import * as Haptics from 'expo-haptics';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const BottomMenu = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const {
    navigation,
    reactionStatusesBottomSheetRef,
    commentInputBottomSheetRef,
    textInputRef,
    otherActionsBottomSheetRef,
    reactionStatuses,
    getReactionStatuses,
  } = useContext(ViewPostContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  const { currentPost, setCurrentPost, posts, currentIndex } = useContext(TagViewContext);
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
          <ExpoImage
            key={index}
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
            source={{ uri: reaction.sticker.url }}
            contentFit='contain'
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
          flexDirection: 'row',
        }}
      >
        {renderReactionIcons()}
        <Text style={{ color: 'white' }}>{currentPost.totalReactions}</Text>
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          flexDirection: 'row',
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
          {/* <Entypo name='feather' size={20} color={'white'} style={{ marginBottom: 5 }} /> */}
          <MaterialCommunityIcons name='comment-multiple' size={20} color={'white'} style={{ marginBottom: 5 }} />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>{currentPost.totalComments}</Text>
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
          <ExpoImage
            style={{ width: 25, height: 25 }}
            source={{ uri: currentPost.createdBy.avatar }}
            placeholder={blurhash}
            contentFit='contain'
            transition={1000}
          />
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
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            otherActionsBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <Feather name='more-horizontal' size={22} color={'white'} style={{ marginBottom: 5 }} />
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default BottomMenu;
