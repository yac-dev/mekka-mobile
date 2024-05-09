import React, { useContext, useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import MomentThumbnail from '../components/MomentThumbnail';
import { AppButton, PostThumbnail } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useGetMomentPosts } from '../hooks/useGetMomentPosts';
import { CurrentSpaceContext } from '../../../providers';
import { PostType } from '../../../types';
import { FlashList } from '@shopify/flash-list';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { MomentsStackNavigatorProps } from '../../../navigations';
import * as Haptics from 'expo-haptics';
import { useCreatePost } from '../../CreateNewPost/hooks';
import { SpaceRootContext } from '../../Space/providers/SpaceRootProvider';
import { MomentsContext } from '../../Space';
import { Colors } from '../../../themes';

const ItemWidth = Dimensions.get('window').width / 3;

export const Moments = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const momentsStackNavigation = useNavigation<MomentsStackNavigatorProps>();
  const { apiResult, requestApi, addCreatedMoment } = useGetMomentPosts();
  const { createMomentResult, requestCreateMoment } = useContext(MomentsContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    momentsStackNavigation.setOptions({
      headerRight: () => (
        <AppButton.Icon
          onButtonPress={() => setModalVisible(true)}
          customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
          hasShadow={false}
        >
          <VectorIcon.AD name='question' size={18} color={Colors.white} />
        </AppButton.Icon>
      ),
    });
  }, []);

  useEffect(() => {
    requestApi({ spaceId: currentSpace._id });
  }, []);

  useEffect(() => {
    if (createMomentResult.status === 'success') {
      addCreatedMoment(createMomentResult.data?.post);
    }
  }, [createMomentResult.status]);

  // useEffect(() => {
  //   if(createMomentResult.status === 'success'){
  //     // ここで、
  //   }
  // },[createMomentResult.status])

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
    momentsStackNavigation.navigate('CreateNewPostStackNavigator', { screen: 'MomentPost' });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const onPostThumbnailPress = () => {};

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={onPostThumbnailPress} />;
  };

  if (apiResult.status === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
      {/* {!apiResult.data?.posts.length && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, alignSelf: 'center' }}>
          <ExpoImage
            source={require('../../../assets/forApp/ghost-disappointed.png')}
            style={{ width: 25, height: 25, marginRight: 20 }}
            tintColor='white'
          />
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>No Moments now...</Text>
        </View>
      )} でたーこいつ */}
      {apiResult.data?.posts.length ? (
        <FlashList
          numColumns={3}
          data={apiResult.data?.posts}
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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <AppButton.Icon
              customStyle={{
                width: 28,
                height: 28,
                backgroundColor: 'rgb(50,50,50)',
                alignSelf: 'flex-end',
                marginBottom: 10,
              }}
              onButtonPress={() => setModalVisible(!modalVisible)}
              hasShadow
            >
              <VectorIcon.II name='close' size={20} color={'white'} />
            </AppButton.Icon>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              What is Moments by the way?
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modalText}>
                You can think of Moments as IG's Stories.{'\n'}By using Moments post, your photos/videos will disappear
                after a certain time after posting. Instead of 24 hours, the disappearing time depends on Space setting.
                {'\n'}In {currentSpace.name}, it is set to{'\n'}
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}.
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
