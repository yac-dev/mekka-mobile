import { Camera } from '@rnmapbox/maps';
import Mapbox from '@rnmapbox/maps';
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from './Header';
import { useNavigation } from '@react-navigation/native';
import { UserStackNavigatorProps } from '../navigations';
import { createFollowingRelationship, getPostsByUserIdAndRegion, mutationKeys } from '../../../query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../query/queryKeys';
import { authAtom, currentSpaceAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { PostType } from '../../../types';
import { AppButton, MapPostThumbnail } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { CreateFollowingRelationshipInputType, GetFollowingUsersByUserIdOutputType } from '../../../query/types';

type IPostsByRegion = {
  userId: string;
};

const avatarWidth = 62;

export const PostsByRegion: React.FC<IPostsByRegion> = ({ userId }) => {
  const mapRef = useRef<Mapbox.MapView>(null);
  const userStackNavigation = useNavigation<UserStackNavigatorProps>();
  const [placeInfo, setPlaceInfo] = useState<string | null>(null);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);

  const { data, status: getPostsByUserIdAndRegionStatus } = useQuery({
    queryKey: [queryKeys.postsByUserIdAndRegion, userId],
    queryFn: () => getPostsByUserIdAndRegion({ userId, spaceId: currentSpace._id }),
  });

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData([queryKeys.userById, userId]);
  const followingUsersData = queryClient.getQueryData([queryKeys.followingUsers, auth._id]);

  const { mutate: createFollowingRelationshipMutate, status: createFollowingRelationshipStatus } = useMutation({
    mutationKey: [mutationKeys.createFollowingRelationship],
    mutationFn: (input: CreateFollowingRelationshipInputType) => createFollowingRelationship(input),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [queryKeys.followingUsers, auth._id],
        (previous: GetFollowingUsersByUserIdOutputType) => {
          const newFollowingUsers = [
            ...previous.followingUsers[currentSpace._id],
            {
              _id: userData?.user._id,
              name: userData?.user.name,
              email: userData?.user.email,
              avatar: userData?.user.avatar,
            },
          ];
          return {
            ...previous,
            followingUsers: {
              ...previous.followingUsers,
              [currentSpace._id]: newFollowingUsers,
            },
          };
        }
      );
    },
  });

  const handleFollowingRelationship = () => {
    if (followingUsersData.followingUsers[currentSpace._id].find((user) => user._id === userId)) {
      console.log('already following');
    } else {
      createFollowingRelationshipMutate({
        followerId: auth._id,
        followeeId: userId,
        spaceId: currentSpace._id,
      });
    }
  };

  const onRegionDidChange = async (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    // Fetch place information using Mapbox Geocoding API
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${neLng},${neLat}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setPlaceInfo(data.features[0].place_name);
      }
    } catch (error) {
      console.error('Error fetching place information:', error);
    }
  };

  const onMapPostThumbnailPress = (post: PostType, index: number) => {
    userStackNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: { posts: data?.posts, index: index },
      },
    });
  };

  const renderMarkers = () => {
    if (!data?.posts.length) {
      return null;
    }
    const list = data.posts.map((post: PostType, index: number) => {
      if (post.location?.coordinates.length) {
        return (
          <MapPostThumbnail
            key={index}
            post={post}
            index={index}
            onMapPostThumbnailPress={onMapPostThumbnailPress}
            isPressDisabled={false}
          />
        );
      } else {
        return null;
      }
    });
    return <>{list}</>;
  };

  const onMapIdle = (feature: Mapbox.MapState) => {
    const { bounds } = feature.properties;
    const [neLng, neLat] = bounds.ne;
    const [swLng, swLat] = bounds.sw;

    const latitudeDelta = neLat - swLat;
    const longitudeDelta = neLng - swLng;
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView
        ref={mapRef}
        style={{ flex: 1 }}
        compassEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionPosition={{ bottom: -50, right: -50 }}
        styleURL='mapbox://styles/yabbee/cl93j1d3a000714ntdoue4ucq'
        // onRegionDidChange={(feature) => onRegionChangeComplete(feature)}
        regionDidChangeDebounceTime={100}
        onMapIdle={onRegionDidChange}
      >
        {/* defaultの位置はnew yorkでいい。fetchが */}
        <View style={{ height: 45, backgroundColor: 'transparent' }} />
        <View
          style={{
            paddingBottom: 10,
            paddingHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: 'rgb(70,70,70)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: avatarWidth,
                  height: avatarWidth,
                  borderRadius: avatarWidth / 2,
                  marginRight: 15,
                }}
              >
                {userData?.user.avatar ? (
                  <ExpoImage source={userData?.user.avatar} style={styles.avatar} />
                ) : (
                  <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                    {userData?.user.name.slice(0, 2).toUpperCase()}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                    // marginBottom: 5,
                  }}
                >
                  {userData?.user.name}
                </Text>
                {/* NOTE: followingRelのstats実装してからやる。 */}
                {/* {currentSpace.isPublic && currentSpace.isFollowAvailable ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'rgb(150,150,150)', fontSize: 12, marginRight: 15 }}>Following</Text>
                    <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>Followers</Text>
                  </View>
                ) : null} */}
              </View>
            </View>
            {currentSpace.isPublic && currentSpace.isFollowAvailable ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {createFollowingRelationshipStatus === 'pending' ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    style={styles.followButton}
                    activeOpacity={0.7}
                    onPress={() => {
                      handleFollowingRelationship();
                    }}
                  >
                    <Text style={styles.followButtonText}>
                      {followingUsersData.followingUsers[currentSpace._id].find((user) => user._id === userId)
                        ? 'Following'
                        : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        </View>
        <Camera
          defaultSettings={{
            centerCoordinate: [-122.4324, 37.78825],
            zoomLevel: 0.5,
            animationMode: 'flyTo',
            animationDuration: 1100,
          }}
        />
        {/* ここ, regionViewの時はfloatingで影つけたいな。。。観づらいから */}

        {/* {placeInfo && (
          <View style={{ position: 'absolute', top: 500, alignSelf: 'center' }}>
            <Text style={{ color: 'red' }}>{placeInfo}</Text>
          </View>
        )} */}

        {renderMarkers()}
        {getPostsByUserIdAndRegionStatus === 'pending' && (
          <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
            <ActivityIndicator size={'small'} color={'white'} />
          </View>
        )}
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 10,
  },
  leftContainer: {
    width: 42,
    height: 42,
    borderRadius: 50,
    marginRight: 15,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {},
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  uniqueName: {
    fontSize: 14,
    color: 'rgb(150,150,150)',
  },
  followButton: {
    backgroundColor: 'rgb(50,50,50)',
    padding: 10,
    borderRadius: 100,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagerView: {
    flex: 1,
    height: 2000,
    width: '100%',
  },
});
