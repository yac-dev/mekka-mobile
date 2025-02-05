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
import { mySpacesAtom, currentSpaceAtom, authAtom, logsTableAtom, currentTagAtom } from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { useQuery } from '@tanstack/react-query';
import { getSpaceById } from '../../../query/queries';
import { queryKeys } from '../../../query/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
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
  const [, setCurrentTag] = useRecoilState(currentTagAtom);
  const { apiResult } = useGetSpaceByIdState();
  const { apiResult: joinPublicSpaceByIdResult, requestApi: requestJoinPublicSpaceById } =
    useJoinPublicSpaceByIdState();

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
    if (mySpaces.some((space) => space._id === apiResult.data?.space._id)) {
      return true;
    }

    return false;
  };

  const onJoinPress = async () => {
    requestJoinPublicSpaceById({ userId: auth._id, spaceId: apiResult.data?.space._id });
  };

  useEffect(() => {
    spaceDetailStackNavigation.setOptions({
      headerRight: () =>
        apiResult.status === 'loading' ? null : (
          <TouchableOpacity disabled={isJoinSpaceValidated()} onPress={() => onJoinPress()}>
            <Text
              style={{
                color: isJoinSpaceValidated() ? 'rgb(150,150,150)' : 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Join
            </Text>
          </TouchableOpacity>
        ),
    });
  }, [apiResult]);

  useEffect(() => {
    if (joinPublicSpaceByIdResult.status === 'success') {
      showMessage({ message: 'Joined new space successfully.', type: 'success' });
      setMySpaces((previous) => [...previous, joinPublicSpaceByIdResult.data.space]);
      if (!mySpaces?.length) {
        setCurrentSpace(joinPublicSpaceByIdResult.data?.space);
        setCurrentTag(joinPublicSpaceByIdResult.data?.space.tags[0]);
        setLogsTable((previous) => {
          return {
            ...previous,
            [joinPublicSpaceByIdResult.data?.space._id]: {
              [joinPublicSpaceByIdResult.data?.space.tags[0]._id]: 0,
            },
          };
        });
      }
      spaceDetailStackNavigation.goBack();
    }
  }, [joinPublicSpaceByIdResult.status]);

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
                {/* {formatDate(getSpaceByIdData?.space.createdAt)} */}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* <Tabs tagId={getSpaceByIdData?.space.tags[0]._id} /> */}
      {/* <LoadingSpinner isVisible={joinPublicSpaceByIdResult.status === 'loading'} message={'Processing now...'} /> */}
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
