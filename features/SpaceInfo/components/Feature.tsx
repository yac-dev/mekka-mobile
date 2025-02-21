import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType, SpaceType } from '../../../types';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Colors } from '../../../themes/colors';

type FeatureProps = {};

export const Feature: React.FC<FeatureProps> = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [textShown, setTextShown] = useState<boolean>(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
    // console.log(e.nativeEvent);
  }, []);
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const renderReactions = (space: SpaceType) => {
    if (space.isReactionAvailable) {
      const list = space.reactions.map((reaction: ReactionType, index: number) => {
        if (reaction) {
          if (reaction.type === 'emoji') {
            return (
              <Text key={index} style={{ fontSize: 25, marginRight: 5 }}>
                {reaction.emoji}
              </Text>
            );
          } else if (reaction.type === 'sticker') {
            return (
              <ExpoImage
                key={index}
                style={{ width: 25, height: 25, marginRight: 5 }}
                source={{ uri: reaction.sticker.url }}
                contentFit='contain'
              />
            );
          }
        } else {
          return null;
        }
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>;
    } else {
      return <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Turned off</Text>;
    }
  };

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  };

  const formatTimeString = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes} minutes ${seconds > 0 ? `${seconds} seconds` : ''}`;
    }
    return `${seconds} seconds`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: 10, paddingTop: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ marginBottom: 20, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['red1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.MI name='public' size={20} color={'white'} />
                </View>
              }
              title='Visibility'
              value={currentSpace.isPublic ? 'Public' : 'Private'}
            />
            <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['pink1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.MCI name='advertisements' size={20} color={'white'} />
                </View>
              }
              title='Ads'
              value={'Turned off'}
            />
            {/* {currentSpace.isPublic === undefined ? null : currentSpace.isPublic ? (
              <>
                <Divider />
                <MenuCell
                  icon={
                    <View
                      style={{
                        backgroundColor: Colors.iconColors['brown1'],
                        width: 32,
                        height: 32,
                        marginRight: 15,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <VectorIcon.MCI name='account-group' size={20} color={'white'} />
                    </View>
                  }
                  title='Quota'
                  value={'Free'}
                />
              </>
            ) : null} */}
          </View>
          <View style={{ marginBottom: 20, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['green1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ExpoImage
                    source={require('../../../assets/forApp/photo-video.png')}
                    style={{ width: 20, height: 20 }}
                    tintColor={'white'}
                  />
                </View>
              }
              title='Content'
              value={
                currentSpace.contentType
                  ? currentSpace.contentType === 'photo'
                    ? 'Photo'
                    : currentSpace.contentType === 'video'
                    ? 'Video'
                    : 'Photo & Video'
                  : ''
              }
            />

            <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['orange1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ExpoImage
                    source={require('../../../assets/forApp/ghost.png')}
                    style={{ width: 20, height: 20 }}
                    tintColor={'white'}
                  />
                </View>
              }
              title='Moment'
              value={convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
            />
            {currentSpace.videoLength ? (
              <>
                <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
                <MenuCell
                  icon={
                    <View
                      style={{
                        backgroundColor: Colors.iconColors['magenta1'],
                        width: 30,
                        height: 30,
                        marginRight: 15,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <VectorIcon.II name='play-circle-sharp' size={20} color={'white'} />
                    </View>
                  }
                  title='Video Length'
                  value={formatTimeString(currentSpace.videoLength)}
                />
              </>
            ) : null}

            {/* <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['blue1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.MCI name='clock-time-two-outline' size={20} color={'white'} />
                </View>
              }
              title='Time Slot'
              value={'Anytime'}
            /> */}
          </View>
          <View style={{ marginBottom: 15, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['yellow1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.II name='thumbs-up-sharp' size={20} color={'white'} />
                </View>
              }
              title='Reaction'
              value={renderReactions(currentSpace)}
            />
            <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['teal1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.FD name='comments' size={20} color={'white'} />
                </View>
              }
              title='Comment'
              value={currentSpace.isCommentAvailable ? 'Available' : 'Turned off'}
            />

            {currentSpace.isPublic ? (
              <>
                <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
                <MenuCell
                  icon={
                    <View
                      style={{
                        backgroundColor: Colors.iconColors['violet1'],
                        width: 30,
                        height: 30,
                        marginRight: 15,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <VectorIcon.II name='person-add' size={20} color={'white'} />
                    </View>
                  }
                  title='Following'
                  value={currentSpace.isFollowAvailable ? 'Allowed' : 'Disallowed'}
                />
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Divider = () => {
  return <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />;
};

type MenuCellProp = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const MenuCell: React.FC<MenuCellProp> = ({ icon, title, value }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      disabled={true}
      activeOpacity={0.8}
    >
      {icon}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'white', fontSize: 17 }}>{title}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 15, color: 'rgb(170,170,170)', marginRight: 5, width: 170, textAlign: 'right' }}
          >
            {value}
          </Text>
          {/* <VectorIcon.MCI name='chevron-right' size={20} color='rgb(170,170,170)' /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
