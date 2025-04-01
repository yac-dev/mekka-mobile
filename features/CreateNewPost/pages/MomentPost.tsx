import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, StyleSheet, TextInput } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { BufferContentType, CreateNewPostContext } from '../contexts';
import { ContentThumbnail } from '../components/ContentThumbnail';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackParams, CreateNewPostStackProps } from '..';
import { CreateMomentInputType } from '../types';
import { VectorIcon } from '../../../Icons';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMoment, mutationKeys, queryKeys } from '../../../query';
import { showMessage } from 'react-native-flash-message';
import { GetMomentsBySpaceIdOutputType } from '../../../query/types';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { AppButton } from '../../../components/Button';
import { useSharedValue } from 'react-native-reanimated';

type IMomentPost = NativeStackScreenProps<CreateNewPostStackParams, 'MomentPost'>;

const MomentPost: React.FC<IMomentPost> = ({ route }) => {
  const progress = useSharedValue<number>(0);
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [auth] = useRecoilState(authAtom);
  const queryClient = useQueryClient();
  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const { mutate: createMomentMutation } = useMutation({
    mutationKey: [mutationKeys.createMoment],
    mutationFn: (input: CreateMomentInputType) => createMoment(input),
    onMutate: () => showMessage({ type: 'info', message: 'Processing now...' }),
    onSuccess: (data) => {
      showMessage({ type: 'success', message: 'Your post has been processed successfully.' });
      queryClient.setQueryData(
        [queryKeys.momentsBySpaceId, currentSpace._id],
        (previous: GetMomentsBySpaceIdOutputType) => {
          return {
            ...previous,
            posts: [data.post, ...previous.posts],
          };
        }
      );
    },
  });

  const { onPostTypeChange, pickUpContents, formData, onRemoveContentPress, onCaptionChange } =
    useContext(CreateNewPostContext);

  // このpageに来た時点で、postTypeをmomentにする。
  useEffect(() => {
    onPostTypeChange('moment');
  }, []);

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onPostPress()}
          disabled={formData.contents.isValidated && formData.caption.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.contents.isValidated && formData.caption.isValidated ? 'white' : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.contents, formData.caption]);

  const onPostPress = () => {
    const input: CreateMomentInputType = {
      ...formData,
      userId: auth._id,
      spaceId: currentSpace._id,
      reactions: currentSpace.reactions,
      disappearAfter: currentSpace.disappearAfter.toString(),
    };
    createMomentMutation(input);
    createNewPostStackNavigation.goBack();
  };

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  }

  const renderContents = () => {
    if (formData.bufferContents.value.length) {
      if (formData.bufferContents.value.length === 1) {
        return (
          <View style={{ marginBottom: 10, alignItems: 'center' }}>
            <View>
              <ContentThumbnail
                bufferContent={formData.bufferContents.value[0]}
                index={0}
                onRemoveContentPress={() => onRemoveContentPress(0)}
              />
              <View style={{ position: 'absolute', bottom: -10, right: -20 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'black',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AppButton.Icon
                    onButtonPress={() => pickUpContents()}
                    customStyle={{ width: 35, height: 35, backgroundColor: 'rgb(50,50,50)' }}
                    hasShadow={false}
                  >
                    <VectorIcon.II name='add' size={25} color={'white'} />
                  </AppButton.Icon>
                </View>
              </View>
            </View>
          </View>
        );
      } else {
        // もっと中心寄せにしたいが、一旦いいか。
        return (
          <View style={{ alignItems: 'center' }}>
            <View>
              <Carousel
                autoPlayInterval={2000}
                data={formData.bufferContents.value}
                width={210}
                height={210 * (16 / 9)}
                loop={false}
                pagingEnabled={true}
                snapEnabled={true}
                style={{
                  width: 210,
                  // backgroundColor: 'red',
                  borderRadius: 10,
                }}
                mode='parallax'
                modeConfig={{
                  parallaxScrollingScale: 0.88,
                  parallaxScrollingOffset: 30,
                }}
                onProgressChange={progress}
                renderItem={({ item, index }: { item: BufferContentType; index: number }) => (
                  <ContentThumbnail
                    key={index}
                    bufferContent={item}
                    index={index}
                    onRemoveContentPress={() => onRemoveContentPress(index)}
                  />
                )}
              />
              <View style={{ position: 'absolute', bottom: 0, right: -20 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'black',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AppButton.Icon
                    onButtonPress={() => pickUpContents()}
                    customStyle={{ width: 35, height: 35, backgroundColor: 'rgb(50,50,50)' }}
                    hasShadow={false}
                  >
                    <VectorIcon.II name='add' size={25} color={'white'} />
                  </AppButton.Icon>
                </View>
              </View>
            </View>
            <Pagination.Basic
              progress={progress}
              data={formData.bufferContents.value}
              size={10}
              dotStyle={{
                borderRadius: 100,
                backgroundColor: '#262626',
              }}
              activeDotStyle={{
                borderRadius: 100,
                overflow: 'hidden',
                backgroundColor: '#f1f1f1',
              }}
              containerStyle={[
                {
                  gap: 5,
                },
              ]}
              horizontal
              onPress={onPressPagination}
            />
          </View>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 4,
              }}
            >
              New Moments
            </Text>
            <Text style={{ color: 'rgb(170,170,170)', textAlign: 'center', fontSize: 15 }}>
              Pick up to 6 files (photos up to 5, video up to 1)
            </Text>
          </View>
        </View>
        {formData.contents.value.length === 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              alignSelf: 'center',
              backgroundColor: 'rgb(50,50,50)',
              justifyContent: 'center',
              alignItems: 'center',
              width: 110,
              height: 110,
              padding: 2,
              borderRadius: 110 / 2,
              marginBottom: 10,
            }}
            onPress={() => pickUpContents()}
          >
            <ExpoImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ width: 35, height: 35 }}
              tintColor='white'
            />
            <View
              style={{
                backgroundColor: 'black',
                width: 38,
                height: 38,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 20,
                }}
              >
                <VectorIcon.II name='add' size={20} color={'black'} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        {renderContents()}
        <TextInput
          style={{
            // backgroundColor: 'rgb(88, 88, 88)',
            padding: 10,
            // borderRadius: 5,
            marginBottom: 20,
            color: 'white',
            borderBottomColor: 'rgb(88, 88, 88)',
            borderBottomWidth: 1,
          }}
          placeholder='Add caption...'
          placeholderTextColor={'rgb(170,170,170)'}
          autoCapitalize='none'
          value={formData.caption.value}
          onChangeText={(text: string) => onCaptionChange(text)}
        />
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
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                  marginBottom: 30,
                }}
              >
                Similar to IG's Stories
              </Text>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.modalText}>
                  The main difference is the duration.{'\n'}Instead of 24 hours limitation, the disappearing time
                  depends on Space setting. In {currentSpace.name}, it is set to{' '}
                  {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
                </Text>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
  },
});

export default MomentPost;
