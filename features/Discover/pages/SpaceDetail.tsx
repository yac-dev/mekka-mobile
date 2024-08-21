import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from '../components';
import { AuthContext, SnackBarContext } from '../../../providers';
import { LoadingSpinner } from '../../../components';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { MySpacesContext } from '../../../providers';
import { SpaceDetailStackNavigatorProp } from '../navigations/SpaceDetailStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';
import { useJoinPublicSpaceByIdState } from '../hooks';
import { showMessage } from 'react-native-flash-message';
import { CurrentSpaceContext, CurrentTagContext, LogsTableContext } from '../../../providers';
// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC = () => {
  const spaceDetailStackNavigation = useNavigation<SpaceDetailStackNavigatorProp>();
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces, setMySpaces } = useContext(MySpacesContext);
  const { apiResult } = useGetSpaceByIdState();
  const { apiResult: joinPublicSpaceByIdResult, requestApi: requestJoinPublicSpaceById } =
    useJoinPublicSpaceByIdState();

  const { setCurrentSpace } = useContext(CurrentSpaceContext);
  const { setCurrentTag } = useContext(CurrentTagContext);
  const { setLogsTable } = useContext(LogsTableContext);

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

  if (apiResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <ExpoImage
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
            source={{ uri: apiResult.data?.space.icon }}
            contentFit='cover'
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
            }}
          >
            {apiResult.data?.space.name}
          </Text>
        </View>
      </View>
      <Tabs />
      <LoadingSpinner isVisible={joinPublicSpaceByIdResult.status === 'loading'} message={'Processing now...'} />
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
