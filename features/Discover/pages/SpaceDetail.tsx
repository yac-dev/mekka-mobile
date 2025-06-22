import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Tabs } from '../components';
import { LoadingSpinner } from '../../../components';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { SpaceDetailStackNavigatorProp } from '../navigations/SpaceDetailStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';
import { useJoinPublicSpaceByIdState } from '../hooks';
import { showMessage } from 'react-native-flash-message';
import { useRecoilState } from 'recoil';
import {
  mySpacesAtom,
  currentSpaceAtom,
  authAtom,
  logsTableAtom,
  currentTagAtom,
  momentLogsAtom,
} from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSpaceById } from '../../../query/queries';
import { queryKeys } from '../../../query/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { joinPublicSpaceBySpaceId } from '../../../query/mutations';
import { JoinPublicSpaceBySpaceIdInputType } from '../../../query/types';
import { Feature } from '../components';
import { AppButton } from '../../../components';
import { Colors } from '../../../themes';
// ここに、spaceのthumbnailから始まり、

type SpaceDetailProps = {
  spaceId: string;
};

const StatCard = ({
  iconName,
  value,
  label,
  onPress,
}: {
  iconName: React.ComponentProps<typeof VectorIcon.MCI>['name'];
  value: string | number;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.statCard} onPress={onPress ?? (() => {})} activeOpacity={0.75}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <VectorIcon.MCI name={iconName} color='white' size={24} style={{ marginRight: 6 }} />
      <Text style={styles.statValue}>{value}</Text>
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

const SpaceDetail: React.FC<SpaceDetailProps> = ({ spaceId }) => {
  const queryClient = useQueryClient();
  const spaceDetailStackNavigation = useNavigation<SpaceDetailStackNavigatorProp>();
  const [auth] = useRecoilState(authAtom);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);
  const [, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [, setCurrentTag] = useRecoilState(currentTagAtom);
  const { apiResult } = useGetSpaceByIdState();

  const { mutate: joinPublicSpaceBySpaceIdMutation, status } = useMutation({
    mutationFn: (input: JoinPublicSpaceBySpaceIdInputType) => joinPublicSpaceBySpaceId(input),
    // onMutate: () => showMessage({ type: 'info', message: 'Processing now...' }),
    onSuccess: (data) => {
      console.log('post data', data);
      showMessage({ message: 'Joined new space successfully.', type: 'success' });
      setMySpaces((previous) => [...previous, data.space]);
      if (!mySpaces?.length) {
        setCurrentSpace(data.space);
        setCurrentTag(data.space.tags[0]);
        setLogsTable((previous) => {
          return {
            ...previous,
            [data.space._id]: {
              [data.space.tags[0]._id]: 0,
            },
          };
        });
        setMomentLogs((previous) => {
          return {
            ...previous,
            [data.space._id]: 0,
          };
        });
      }
      spaceDetailStackNavigation.goBack();
    },
    onError: (error) => {
      console.log('error', error);
      showMessage({ message: 'Something went wrong...', type: 'danger' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.spaceById, spaceId] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.mySpaces, auth._id] });
    },
  });

  const { data: getSpaceByIdData, status: getSpaceByIdStatus } = useQuery({
    queryKey: [queryKeys.spaceById, spaceId],
    queryFn: () => getSpaceById({ _id: spaceId }),
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
      .format(date)
      .replace(',', '');
  };

  const isJoinSpaceValidated = () => {
    if (mySpaces.some((space) => space._id === spaceId)) {
      return true;
    }

    return false;
  };

  const isSpaceFull = () => {
    if (!getSpaceByIdData?.space) {
      return false;
    }
    const { capacity, totalMembers } = getSpaceByIdData.space;
    if (capacity === -1) {
      return false; // unlimited capacity
    }
    return totalMembers >= capacity;
  };

  const onJoinPress = async () => {
    joinPublicSpaceBySpaceIdMutation({ userId: auth._id, spaceId: spaceId });
  };

  console.log('getSpaceByIdData', getSpaceByIdData);

  if (getSpaceByIdStatus === 'pending') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <ExpoImage
              style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
              source={{ uri: getSpaceByIdData?.space.icon }}
              contentFit='cover'
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 22,
                  marginBottom: 8,
                }}
              >
                {getSpaceByIdData?.space.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <VectorIcon.MCI name='cake-variant' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
                <Text
                  style={{
                    color: 'rgb(150, 150, 150)',
                    fontSize: 12,
                  }}
                >
                  Since {formatDate(getSpaceByIdData?.space.createdAt)}
                </Text>
              </View>
            </View>
          </View>

          <Text style={{ color: 'white', fontSize: 15, marginBottom: 24 }}>{getSpaceByIdData?.space.description}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            <StatCard
              label={'Members'}
              value={`${getSpaceByIdData?.space.totalMembers ?? 0} / ${
                getSpaceByIdData?.space.capacity === -1 ? '∞' : getSpaceByIdData?.space.capacity ?? '-'
              }`}
              iconName={'account-group-outline'}
              onPress={() => spaceDetailStackNavigation.navigate('Members', { spaceId })}
            />
            <StatCard label={'Posts'} value={getSpaceByIdData?.space.totalPosts ?? 0} iconName={'note-text-outline'} />
            <StatCard
              label={'Tags'}
              value={getSpaceByIdData?.space.tags?.length ?? 0}
              iconName={'tag-multiple-outline'}
            />
            <StatCard label={'Rate'} value={'-'} iconName={'star-outline'} />
            <TouchableOpacity
              style={styles.statCard}
              activeOpacity={0.75}
              // onPress={() => {
              //   if (getSpaceByIdData?.space.createdBy._id) {
              //     spaceDetailStackNavigation.navigate('UserStackNavigator', {
              //       screen: 'User',
              //       params: {
              //         userId: getSpaceByIdData.space.createdBy._id,
              //       },
              //     });
              //   }
              // }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {getSpaceByIdData?.space.createdBy.avatar ? (
                  <ExpoImage
                    style={{ width: 24, height: 24, borderRadius: 12, marginRight: 6 }}
                    source={{ uri: getSpaceByIdData.space.createdBy.avatar }}
                    contentFit='cover'
                  />
                ) : (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      marginRight: 6,
                      backgroundColor: 'rgb(70,70,70)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {getSpaceByIdData?.space.createdBy.name.slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                )}
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', flex: 1 }} numberOfLines={1}>
                  {getSpaceByIdData?.space.createdBy.name}
                </Text>
              </View>

              <Text style={styles.statLabel}>Moderator</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isJoinSpaceValidated() || isSpaceFull()}
            onPress={() => onJoinPress()}
            style={{
              backgroundColor: isJoinSpaceValidated() || isSpaceFull() ? 'grey' : '#2A85FF',
              paddingVertical: 12,
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 14,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {isJoinSpaceValidated() ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>

        <Feature spaceId={spaceId} />
      </ScrollView>
      <LoadingSpinner isVisible={status === 'pending'} message={'Processing now 🤔'} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  statCard: {
    backgroundColor: 'rgb(30, 30, 30)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: 90,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: 'rgb(150, 150, 150)',
    fontSize: 12,
    marginTop: 4,
  },
});

export default SpaceDetail;
