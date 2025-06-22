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
// ここに、spaceのthumbnailから始まり、

type SpaceDetailProps = {
  spaceId: string;
};

const StatCard = ({
  iconName,
  value,
  label,
}: {
  iconName: React.ComponentProps<typeof VectorIcon.MCI>['name'];
  value: string | number;
  label: string;
}) => (
  <TouchableOpacity style={styles.statCard} onPress={() => console.log(`${label} card pressed.`)} activeOpacity={0.75}>
    <VectorIcon.MCI name={iconName} color='white' size={24} style={{ marginBottom: 4 }} />
    <Text style={styles.statValue}>{value}</Text>
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isJoinSpaceValidated = () => {
    if (mySpaces.some((space) => space._id === spaceId)) {
      return true;
    }

    return false;
  };

  const onJoinPress = async () => {
    joinPublicSpaceBySpaceIdMutation({ userId: auth._id, spaceId: spaceId });
  };

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
                }}
              >
                {getSpaceByIdData?.space.name}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={isJoinSpaceValidated()}
              onPress={() => onJoinPress()}
              style={{
                backgroundColor: isJoinSpaceValidated() ? 'grey' : '#2A85FF',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
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

          <Text style={{ color: 'white', fontSize: 15, marginBottom: 16 }}>{getSpaceByIdData?.space.description}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
              <VectorIcon.MCI name='rocket-launch' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
              <Text
                style={{
                  color: 'rgb(150, 150, 150)',
                  fontSize: 12,
                }}
              >
                {getSpaceByIdData?.space.createdBy.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.MCI name='cake-variant' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
              <Text
                style={{
                  color: 'rgb(150, 150, 150)',
                  fontSize: 12,
                }}
              >
                since {formatDate(getSpaceByIdData?.space.createdAt)}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <StatCard
              label={'Members'}
              value={getSpaceByIdData?.space.totalMembers ?? 0}
              iconName={'account-group-outline'}
            />
            <StatCard label={'Posts'} value={getSpaceByIdData?.space.totalPosts ?? 0} iconName={'note-text-outline'} />
            <StatCard
              label={'Tags'}
              value={getSpaceByIdData?.space.tags?.length ?? 0}
              iconName={'tag-multiple-outline'}
            />
            <StatCard label={'Rate'} value={'-'} iconName={'star-outline'} />
          </View>
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
    paddingVertical: 12,
    paddingHorizontal: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 2,
  },
  statLabel: {
    color: 'rgb(150, 150, 150)',
    fontSize: 12,
  },
});

export default SpaceDetail;
