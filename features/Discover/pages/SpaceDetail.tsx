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
import LoadingSpinner from '../../../components/LoadingSpinner';

// props.route.params.spaceIdでくるよね。
interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
}

type StickerType = {
  _id: string;
  url: string;
  name: string;
};

type ReactionType = {
  _id: string;
  type: 'emoji' | 'sticker';
  emoji: string | null;
  sticker: StickerType | null;
};

type UserType = {
  _id: string;
  name: string;
  avatar: string;
};

type SpaceType = {
  _id: string;
  name: string;
  icon: string;
  contentType: string;
  videoLength: number;
  disappearAfter: number;
  isPublic: boolean;
  isCommentAvailable: boolean;
  isReactionAvailable: boolean;
  reactions: ReactionType[];
  totalPosts: number;
  totalMembers: number;
  rate: number;
  createdBy: UserType;
  createdAt: string;
};

// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC<RouterProps> = (props) => {
  const { spaceAndUserRelationships, setSpaceAndUserRelationships, setLoading, setSnackBar, authData } =
    useContext(GlobalContext);
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
      userId: authData._id,
      space: {
        _id: space._id,
        name: space.name,
        icon: space.icon,
        contentType: space.contentType,
      },
    };
    setLoading(true);
    const result = await backendAPI.post(`/spaces/${props.route.params.spaceId}/public`, payload);
    const { spaceAndUserRelationship } = result.data;
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: `You have joined ${space.name} successfully`,
      duration: 5000,
    });
    props.navigation.goBack();
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onJoinPress()}
          style={{
            backgroundColor: isJoinValidated ? 'white' : 'rgb(150,150,150)',
            borderRadius: 20,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          disabled={isJoinValidated ? false : true}
        >
          <MaterialCommunityIcons name='human-greeting-variant' size={20} color='black' />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
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
    <SpaceDetailContext.Provider value={{ space, navigation: props.navigation }}>
      <View style={{ flex: 1, backgroundColor: 'rgb(40, 40, 40)' }}>
        {isSpaceFetched && space ? (
          <>
            <Header />
            <SpaceDetailTopTabNavigator />
            {/* <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Description />
              <ContentType />
              <Disapper />
              <Reactions />
            </View> */}
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <LoadingSpinner />
    </SpaceDetailContext.Provider>
  );
};

export default SpaceDetail;
