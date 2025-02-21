import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType, SpaceType } from '../../../types';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { Colors } from '../../../themes/colors';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../query';
import { getSpaceById } from '../apis/getSpaceById';
import { useQueryClient } from '@tanstack/react-query';

type FeatureProps = {
  spaceId: string;
};

export const Feature: React.FC<FeatureProps> = ({ spaceId }) => {
  // const { apiResult } = useGetSpaceByIdState();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([queryKeys.spaceById, spaceId]);

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
    <View style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: 15, paddingTop: 10 }}>
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
              value={data?.space.isPublic ? 'Public' : 'Private'}
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
              title='Banner'
              value={'Turned off'}
            />
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
                  <VectorIcon.MCI name='dots-grid' size={20} color={'white'} />
                </View>
              }
              title='Posts'
              value={'100'}
            />
            <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['purple1'],
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.MCI name='account-group' size={20} color={'white'} />
                </View>
              }
              title='Members'
              value={'100 / free'}
            /> */}
          </View>
          <View style={{ marginBottom: 20, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
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
                  <ExpoImage
                    source={require('../../../assets/forApp/photo-video.png')}
                    style={{ width: 20, height: 20 }}
                    tintColor={'white'}
                  />
                </View>
              }
              title='Content'
              value={
                data?.space.contentType
                  ? data?.space.contentType === 'photo'
                    ? 'Photo'
                    : data?.space.contentType === 'video'
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
                    source={require('../../../assets/forApp/ghost.png')}
                    style={{ width: 20, height: 20 }}
                    tintColor={'white'}
                  />
                </View>
              }
              title='Moment'
              value={convertMinutesToHoursAndMinutes(data?.space.disappearAfter)}
            />
            {data?.space.videoLength ? (
              <>
                <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
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
                      <VectorIcon.II name='play-circle-sharp' size={20} color={'white'} />
                    </View>
                  }
                  title='Video Length'
                  value={formatTimeString(data?.space.videoLength)}
                />
              </>
            ) : null}

            {/* <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
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
                    width: 32,
                    height: 32,
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
              value={renderReactions(data?.space)}
            />
            <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
            <MenuCell
              icon={
                <View
                  style={{
                    backgroundColor: Colors.iconColors['brown1'],
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
              value={data?.space.isCommentAvailable ? 'Allowed' : 'Disallowed'}
            />
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
              value={data?.space.isFollowAvailable ? 'Allowed' : 'Disallowed'}
            />
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
