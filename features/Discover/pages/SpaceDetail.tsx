import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
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

  useEffect(() => {
    spaceDetailStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} disabled={isJoinSpaceValidated()} onPress={() => onJoinPress()}>
          <Text
            style={{
              color: isJoinSpaceValidated() ? 'rgb(100,100,100)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Join
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [status]);

  if (getSpaceByIdStatus === 'pending') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ marginBottom: 20 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ExpoImage
              style={{ width: 60, height: 60, borderRadius: 40, marginBottom: 15 }}
              source={{ uri: getSpaceByIdData?.space.icon }}
              contentFit='cover'
            />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 27,
              }}
            >
              {getSpaceByIdData?.space.name}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ lineHeight: 21, color: 'white', fontSize: 15, marginBottom: 5 }}>
            {getSpaceByIdData?.space.description}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
              <VectorIcon.MCI name='rocket-launch' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
              <Text
                style={{
                  color: 'rgb(150, 150, 150)',
                  fontSize: 12,
                  marginRight: 10,
                }}
              >
                {getSpaceByIdData?.space.createdBy.name}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
              <VectorIcon.MCI name='cake-variant' color='rgb(150, 150, 150)' size={12} style={{ marginRight: 5 }} />
              <Text
                style={{
                  color: 'rgb(150, 150, 150)',
                  fontSize: 12,
                  marginRight: 10,
                }}
              >
                since {formatDate(getSpaceByIdData?.space.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Tabs tagId={getSpaceByIdData?.space.tags[1]._id} spaceId={spaceId} />
      {/* <Feature spaceId={spaceId} /> */}
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
});

export default SpaceDetail;
