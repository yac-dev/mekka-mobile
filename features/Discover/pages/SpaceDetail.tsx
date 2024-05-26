import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, BackHandler, StyleSheet } from 'react-native';
import Header from '../components/SpaceDetail/Header';
import { SpaceDetailTopTabNavigator } from './SpaceDetailTopTabNavigator';
import { AuthContext, SnackBarContext } from '../../../providers';
import { LoadingSpinner } from '../../../components';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { MySpacesContext } from '../../../providers';
import { SpaceDetailStackNavigatorProp } from '../../../navigations/SpaceDetailStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';
// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC = () => {
  const spaceDetailStackNavigation = useNavigation<SpaceDetailStackNavigatorProp>();
  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces } = useContext(MySpacesContext);
  const { apiResult } = useGetSpaceByIdState();

  const isJoinSpaceValidated = () => {
    if (mySpaces.some((space) => space._id === apiResult.data?.space._id)) {
      return true;
    }

    return false;
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

  const onJoinPress = async () => {
    // const result = await backendAPI.post(`/spaces/${props.route.params.spaceId}/public`, payload);
    // const { spaceAndUserRelationship } = result.data;
    spaceDetailStackNavigation.goBack();
  };

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
      <SpaceDetailTopTabNavigator />
      {/* <Header />
      <SpaceDetailTopTabNavigator /> */}
      {/* <LoadingSpinner isVisible={apiResult.status === 'loading'} message={'Processing now...'} /> */}
      {/* createのloading spinner　statusな */}
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
