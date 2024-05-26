import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import { SpaceDetailContext } from '../contexts/SpaceDetailContext';
import Header from '../components/SpaceDetail/Header';
import Stats from '../components/SpaceDetail/Stats';
import Description from '../components/SpaceDetail/Description';
import ContentType from '../components/SpaceDetail/ContentType';
import Disapper from '../components/SpaceDetail/Disapper';
import Reactions from '../components/SpaceDetail/Reactions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';
import SpaceDetailTopTabNavigator from '../../../navigations/SpaceDetailTopTabNavigator';
import { AuthContext, SnackBarContext } from '../../../providers';
import { SnackBar, LoadingSpinner } from '../../../components';
import { useLoadingSpinner } from '../../../hooks';

// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { isVisibleLoadingSpinner, showLoadingSpinner, hideLoadingSpinner } = useLoadingSpinner();
  const { spaceAndUserRelationships, setSpaceAndUserRelationships } = useContext(GlobalContext);
  const [space, setSpace] = useState(null);
  const [isSpaceFetched, setIsSpaceFetched] = useState(false);
  const [isJoinValidated, setIsJoinValidated] = useState(false);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route.params.spaceId}`);
    const { space } = result.data;
    setSpace(space);
    setIsSpaceFetched(true);
  };

  // join button validation
  const validateJoinButton = () => {
    if (!spaceAndUserRelationships.length) return true;
    for (let i = 0; i < spaceAndUserRelationships.length; i++) {
      if (spaceAndUserRelationships[i].space._id === props.route.params.spaceId) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const result = validateJoinButton();
    setIsJoinValidated(result);
  }, []);

  const onJoinPress = async () => {
    const payload = {
      userId: auth._id,
      space: {
        _id: space._id,
        name: space.name,
        icon: space.icon,
        contentType: space.contentType,
      },
    };
    showLoadingSpinner();
    const result = await backendAPI.post(`/spaces/${props.route.params.spaceId}/public`, payload);
    const { spaceAndUserRelationship } = result.data;
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    hideLoadingSpinner();
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: `You have joined ${space.name} successfully`,
      duration: 5000,
    });
    props.navigation.goBack();
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={1} onPress={() => onJoinPress()} disabled={isJoinValidated ? false : true}>
          <Text
            style={{
              color: isJoinValidated ? 'white' : 'rgb(150,150,150)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Join
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [isJoinValidated, space]);

  useEffect(() => {
    getSpace();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {isSpaceFetched && space ? (
        <>
          <Header />
          <SpaceDetailTopTabNavigator />
        </>
      ) : (
        <ActivityIndicator />
      )}
      <LoadingSpinner isVisible={isVisibleLoadingSpinner} message={'Processing now'} />
    </View>
  );
};

export default SpaceDetail;
