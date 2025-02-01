import { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { AppButton, PostThumbnail } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { showMessage } from 'react-native-flash-message';
import { SpaceStackNavigatorProps } from '../../Space/navigations/SpaceStackNavigator';
import { HomeStackNavigatorProps } from '../../Home/navigations/HomeStackNavigator';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { queryKeys, getMomentsBySpaceId, mutationKeys } from '../../../query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Image as ExpoImage } from 'expo-image';
import { Icons } from '../../../Icons/images';
import { MomentSkelton } from '../../../components/Skelton';

const ItemWidth = Dimensions.get('window').width / 3;

export const Moments = () => {
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { data, status } = useQuery({
    queryKey: [queryKeys.momentsBySpaceId, currentSpace._id],
    queryFn: () => getMomentsBySpaceId({ spaceId: currentSpace._id }),
  });

  const { status: createMomentStatus } = useMutation({
    mutationKey: [mutationKeys.createMoment],
  });

  useEffect(() => {
    if (createMomentStatus === 'pending') {
      showMessage({ type: 'info', message: 'Processing now...' });
    }
    if (createMomentStatus === 'success') {
      showMessage({ type: 'success', message: 'Your moment has been processed successfully.' });
    }
  }, [createMomentStatus]);

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} mins`;
    }
  }

  const onCreateMomentPress = () => {
    spaceStackNavigation.navigate('CreateNewPostStackNavigator', {
      screen: 'MomentPost',
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const onPostThumbnailPress = (moment: PostType, index: number) => {
    homeStackNavigation.navigate({
      name: 'ViewPostStackNavigator',
      params: {
        screen: 'ViewPost',
        params: {
          posts: data?.posts,
          index,
        },
      },
    });
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <MomentThumbnail post={item} index={index} onPressPostThumbnail={onPostThumbnailPress} />;
  };

  if (status === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 12 }}>
      {data?.posts.length ? (
        <FlashList
          horizontal
          data={data?.posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          estimatedItemSize={ItemWidth}
          onEndReachedThreshold={0}
          contentContainerStyle={{}}
          ListHeaderComponent={
            <View
              style={{
                width: 30,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                // backgroundColor: 'red',
                // marginVertical: 5,
              }}
            >
              <ExpoImage
                source={Icons.ghost}
                contentFit='contain'
                style={{ width: 30, height: 30 }}
                tintColor={'white'}
              />
            </View>
          }
          // contentContainerStyle={{ paddingBottom: 30 }}
        />
      ) : (
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              marginTop: 50,
              marginBottom: 20,
              fontWeight: 'bold',
              fontSize: 23,
            }}
          >
            No moments now...
          </Text>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Every moment posts in {currentSpace.name}
            {'\n'}will disappear in{' '}
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
            </Text>
            .
          </Text>
        </View>
      )}
    </View>
  );
};

const momentWidth = 55;

const calculateLeftTime = (disappearAt: string) => {
  const now: Date = new Date();
  const last: Date = new Date(disappearAt);
  const timeLeftMs: number = last.getTime() - now.getTime(); // Get time difference in milliseconds
  const hours: number = Math.floor(timeLeftMs / (1000 * 60 * 60));
  const minutes: number = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes,
  };
};

const millisecondsToTime = (milliseconds: number) => {
  // Convert milliseconds to seconds
  var seconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format the result
  var formattedTime = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

  return formattedTime;
};

type MomentThumbnailProps = {
  post: PostType;
  index: number;
  onPressPostThumbnail: (post: PostType, index: number) => void;
};

const MomentThumbnail: React.FC<MomentThumbnailProps> = ({ post, index, onPressPostThumbnail }) => {
  const [isLoading, setIsLoading] = useState(true); // statelessであるべきだが、これは特別。
  const { hours, minutes } = calculateLeftTime(post.disappearAt);
  const videoRef = useRef(null);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: momentWidth,
        height: momentWidth,
        marginRight: 10,
        borderRadius: 14,
      }}
      onPress={() => onPressPostThumbnail(post, index)}
    >
      {/* skeltonここじゃないと,そもそもhandleLoadingされない。 */}
      {isLoading && <MomentSkelton />}
      {/* {post.contents[0].type === 'photo' && (
        <ExpoImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: post.contents[0].data }}
          contentFit='cover'
          onLoad={handleImageLoad}
        />
      )} */}

      <ExpoImage
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 14,
        }}
        source={{ uri: post.contents[0].type === 'photo' ? post.contents[0].data : post.contents[0].thumbnail }}
        contentFit='cover'
        onLoad={handleImageLoad}
      />
      {post.contents[0].type === 'video' && (
        <>
          <View style={{ position: 'absolute', right: 5, top: 5 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{millisecondsToTime(post.contents[0].duration)}</Text>
          </View>
        </>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
          {hours > 0 && `${hours} h`}&nbsp;
          {minutes > 0 && `${minutes} m`}
        </Text>
      </View>
      {/* {post.contents.length > 1 ? (
        // <View>
        <VectorIcon.FD
          name='page-multiple'
          size={15}
          color='white'
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}
        />
      ) : // </View>
      null} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: 500,
    height: 300,
  },
  modalView: {
    width: 500,
    height: 300,
    backgroundColor: 'rgb(50,50,50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    lineHeight: 25,
  },
});
