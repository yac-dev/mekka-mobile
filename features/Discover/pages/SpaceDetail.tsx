import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, BackHandler, StyleSheet } from 'react-native';
import Header from '../components/SpaceDetail/Header';
import SpaceDetailTopTabNavigator from '../../../navigations/SpaceDetailTopTabNavigator';
import { AuthContext, SnackBarContext } from '../../../providers';
import { LoadingSpinner } from '../../../components';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';
import { MySpacesContext } from '../../../providers';
import { SpaceDetailStackNavigatorProp } from '../../../navigations/SpaceDetailStackNavigator';
import { useNavigation } from '@react-navigation/native';
// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC = () => {
  const spaceDetailStackNavigation = useNavigation<SpaceDetailStackNavigatorProp>();

  const { auth, setAuth } = useContext(AuthContext);
  const { mySpaces } = useContext(MySpacesContext);
  const { apiResult, requestApi } = useGetSpaceByIdState();

  const isJoinSpaceValidated = () => {
    if (!mySpaces.length) return true;
    if (mySpaces.some((space) => space._id === apiResult.data?.space._id)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    spaceDetailStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={isJoinSpaceValidated() ? true : false}>
          <Text
            style={{
              color: isJoinSpaceValidated() ? 'white' : 'rgb(150,150,150)',
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

  // spaceをparamsでもってないとqueryできないな。。。
  useEffect(() => {
    requestApi;
  }, []);

  if (apiResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Header />
      <SpaceDetailTopTabNavigator />
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
  },
});

export default SpaceDetail;
