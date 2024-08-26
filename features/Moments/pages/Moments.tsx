import React, { useContext, useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AppButton, PostThumbnail } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useGetMomentPosts } from '../hooks/useGetMomentPosts';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../../themes';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useGetMomentsBySpaceIdResult, useCreateMomentResult } from '../../../api/hooks';
import { useRecoilValue } from 'recoil';
import { createMomentResultAtomFamily, getMomentsBySpaceIdResultAtomFamily } from '../../../api/atoms';
import { SpaceStackNavigatorProps } from '../../Space/navigations/SpaceStackNavigator';
import { HomeStackNavigatorProps } from '../../Home/navigations/HomeStackNavigator';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

const ItemWidth = Dimensions.get('window').width / 3;

export const Moments = () => {
  const spaceStackNavigation = useNavigation<SpaceStackNavigatorProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const { requestGetMomentsBySpaceId, addCreatedMoment } = useGetMomentsBySpaceIdResult(currentSpace);
  // refreshの実装。
  const { revertCreateMomentResult } = useCreateMomentResult(currentSpace);

  const getMomentsBySpaceIdResult = useRecoilValue(getMomentsBySpaceIdResultAtomFamily(currentSpace._id));
  const createMomentResult = useRecoilValue(createMomentResultAtomFamily(currentSpace._id));

  useEffect(() => {
    requestGetMomentsBySpaceId({ spaceId: currentSpace._id });
  }, []);

  useEffect(() => {
    if (createMomentResult.status === 'loading') {
      showMessage({ type: 'info', message: 'Processing now...' });
    }
    if (createMomentResult.status === 'success') {
      showMessage({ type: 'success', message: 'Your moment has been processed successfully.' });
      addCreatedMoment(createMomentResult.data.post);
      revertCreateMomentResult();
    }
  }, [createMomentResult]);

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

  // うん、やっぱあれだわ、spaceRootの中に無かったからな。。。。ここがめんどいところだな。。。
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
          posts: getMomentsBySpaceIdResult.data?.posts,
          index,
        },
      },
    });
  };

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPostThumbnailPress} />;
  };

  // 今後は, loading時にもdataがある前提となる。
  if (getMomentsBySpaceIdResult.status === 'loading' && !getMomentsBySpaceIdResult.data?.posts.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
      {getMomentsBySpaceIdResult.data?.posts.length ? (
        <FlashList
          numColumns={3}
          data={getMomentsBySpaceIdResult.data?.posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews
          estimatedItemSize={ItemWidth}
          // refreshControl={<RefreshControl colors={['red']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />}
          // onEndReached={loadMoreItem}
          // ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      ) : (
        <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: 50 }}>
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
      <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
        onButtonPress={() => onCreateMomentPress()}
        isPressDisabled={createMomentResult.status === 'loading' ? true : false}
        hasShadow
      >
        {createMomentResult.status === 'loading' ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <VectorIcon.II name='add' size={32} color={'white'} />
        )}
      </AppButton.Icon>
    </View>
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
