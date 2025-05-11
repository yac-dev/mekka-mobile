import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ContentThumbnail } from '../components/ContentThumbnail';
import { AppButton, SnackBar } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { BufferContentType, ContentType, CreateNewPostContext } from '../contexts';
import { CreateNewPostStackParams, CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';
import { VectorIcon } from '../../../Icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentSpaceAtom, currentTagAtom, logsTableAtom, mySpacesAtom } from '../../../recoil';
import { Image as ExpoImage } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image as ImageCompressor, Video as VideoCompressor } from 'react-native-compressor';
import { CreatePostInputType } from '../types';
import { authAtom } from '../../../recoil';
import { useCreatePostResult } from '../../../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, mutationKeys, queryKeys } from '../../../query';
import { PostType, SpaceType, TagType } from '../../../types';
import { showMessage } from 'react-native-flash-message';
import { GetPostsByTagIdOutputType } from '../../../query/types';
import { currentTagsTableBySpaceIdsAtom } from '../../../recoil';
const oneAssetWidth = Dimensions.get('window').width / 3;
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { Colors } from '../../../themes';

// create用のやつが反映されてないな。。。

type INormalPost = NativeStackScreenProps<CreateNewPostStackParams, 'NormalPost'>;

const defaultDataWith6Colors = ['#B0604D', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

// createdTagsは結局、currentSpaceとmySpacesを更新せなあかんよな。
// myspacesの更新とcurrentSpaceの更新だよね。。
// myspacesの方もあれよ絵。tan stackにかえたい、recoilから。
// でもな。。。
export const NormalPost: React.FC<INormalPost> = ({ route }) => {
  const progress = useSharedValue<number>(0);
  const [currentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const queryClient = useQueryClient();
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const [auth] = useRecoilState(authAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);

  const ref = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const { requestCreatePost } = useCreatePostResult(currentSpace);

  // 動的にpostが入っていないんだよね。。。addedTagsにcurrentTagが含まれて絵いた場合に、postを加えたい、ただそれだけなんだよね。
  //別に難しいことはない。
  // isPendingとかもういらないじゃんこれ。すごいな。。
  const { mutate: createPostMutate } = useMutation({
    mutationKey: [mutationKeys.createPost, currentSpace._id],
    mutationFn: (input: CreatePostInputType) => createPost(input),
    onMutate: () => showMessage({ type: 'info', message: 'Processing now...' }), // mutation実行前に起こすcallack func
    onSuccess: async (data) => {
      showMessage({ type: 'success', message: 'Your post has been processed successfully.' });

      // NOTE: tag付されたものの中でも、appないですでに読み込まれたtag画面のpostsにだけdynamicに新しいpostを追加する。
      // 本当はこっちで、dynamicにpostを追加したいが、わからんので、下のinvalidateQueriesで対応する。
      // console.log('data.addedTags', data.addedTags);
      // data.addedTags.forEach((tag: string) => {
      //   queryClient.setQueriesData(
      //     { queryKey: [queryKeys.postsByTagId, tag] },
      //     (previous: GetPostsByTagIdOutputType) => {
      //       return {
      //         ...previous,
      //         posts: [data.post, ...previous.posts],
      //       };
      //     }
      //   );
      //   // const queryData = queryClient.getQueryData([queryKeys.postsByTagId, tag]);
      //   // console.log('queryData', queryData);
      //   // if (queryData) {
      //   //   queryClient.setQueryData([queryKeys.postsByTagId, tag], (previous: GetPostsByTagIdOutputType) => {
      //   //     return {
      //   //       ...previous,
      //   //       posts: [data.post, ...previous.posts],
      //   //     };
      //   //   });
      //   // }
      // });
      await Promise.all(
        data.addedTags.map(async (tag: string) => {
          await queryClient.invalidateQueries(
            {
              queryKey: [queryKeys.postsByTagId, tag],
              exact: true,
              // refetchType: 'active',
            }
            // { throwOnError: false, cancelRefetch: false },
          );
        })
      );
      setMySpaces((previous: SpaceType[]) => {
        const updatingSpace = previous.find((space) => space._id === currentSpace._id);
        const updatedSpace = {
          ...updatingSpace,
          tags: [...updatingSpace.tags, ...data.createdTags],
        };
        const updatedSpaces = previous.map((space) => (space._id === currentSpace._id ? updatedSpace : space));
        return updatedSpaces;
      });
      setCurrentSpace((previous) => {
        return {
          ...previous,
          tags: [...previous.tags, ...data.createdTags],
        };
      });
      if (data.createdTags.length > 0) {
        setLogsTable((previous) => {
          const updating = { ...previous };
          updating[currentSpace._id] = {
            ...updating[currentSpace._id],
            ...data.createdTags.reduce((acc, tag) => {
              acc[tag._id] = 0;
              return acc;
            }, {}),
          };
          return updating;
        });
      }
    },
  });

  const {
    formData,
    onCaptionChange,
    pickUpContents,
    onRemoveContentPress,
    onPostTypeChange,
    createNewPostFlashMessageRef,
  } = useContext(CreateNewPostContext);

  useEffect(() => {
    onPostTypeChange('normal');
  }, []);

  const onSubmitPress = async () => {
    route.params.handleNavigation();

    const compressContent = async (content: BufferContentType) => {
      const { type, uri } = content;
      if (type === 'video/mp4') {
        const result = await VideoCompressor.compress(uri, {
          progressDivider: 20,
          maxSize: 1920,
          compressionMethod: 'manual',
        });
        return { ...content, uri: result };
      }
      return content;
    };

    const bufferContentsAfterCompressor: BufferContentType[] = await Promise.all(
      formData.bufferContents.value.map(compressContent)
    );

    const input: CreatePostInputType = {
      ...formData,
      userId: auth._id,
      spaceId: currentSpace._id,
      reactions: currentSpace.reactions,
      disappearAfter: currentSpace.disappearAfter.toString(),
      bufferContents: {
        value: bufferContentsAfterCompressor,
        isValidated: true,
      },
    };
    createPostMutate(input);
    // console.log('formData', input);
  };

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={onSubmitPress}
          disabled={formData.contents.isValidated && formData.caption.isValidated ? false : true}
        >
          <Text
            style={{
              color:
                formData.contents.isValidated && formData.caption.isValidated && formData.addedTagsTable.isValidated
                  ? 'white'
                  : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.contents, formData.caption, formData.addedTagsTable]);

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

  const calcurateMinutes = () => {
    if (currentSpace.disappearAfter >= 60) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {currentSpace.disappearAfter / 60} hours.
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
          {currentSpace.disappearAfter} minutes.
        </Text>
      );
    }
  };

  function convertMinutesToHoursAndMinutes(minutes) {
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

  const renderTagTexts = (): string => {
    let tagString: string = '';
    Object.values(formData.addedTagsTable.value).forEach((tag, index) => {
      tagString += tag.name;
      if (index !== Object.values(formData.addedTagsTable.value).length - 1) {
        tagString += ',';
      }
    });
    return tagString;
  };

  // validationを足さなあかんな。

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 10 }} automaticallyAdjustKeyboardInsets={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ paddingHorizontal: 30, paddingBottom: 10 }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 23,
                marginBottom: 4,
              }}
            >
              Had something fun?
            </Text>
            <Text style={{ color: 'rgb(170,170,170)', textAlign: 'center', fontSize: 15, marginBottom: 20 }}>
              Pick up to 6 files (photos up to 5, video up to 1)
            </Text>
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
                style={{ width: 40, aspectRatio: 1, marginBottom: 10 }}
                source={
                  currentSpace.contentType === 'photo'
                    ? require('../../../assets/forApp/photo.png')
                    : currentSpace.contentType === 'video'
                    ? require('../../../assets/forApp/video.png')
                    : require('../../../assets/forApp/photo-video.png')
                }
                tintColor={'white'}
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
            onChangeText={(text) => onCaptionChange(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={{ marginBottom: 20, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
        <MenuCell
          onCellPress={() => createNewPostStackNavigation.navigate('AddTags')}
          icon={
            <View
              style={{
                backgroundColor: Colors.iconColors['red1'],
                width: 32,
                height: 32,
                marginRight: 15,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='pricetags' size={20} color={'white'} />
            </View>
          }
          title='Add Tags'
          value={renderTagTexts()}
          requirementText={!formData.addedTagsTable.isValidated ? 'Please add at least one tag.' : undefined}
        />
        <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
        <MenuCell
          onCellPress={() => createNewPostStackNavigation.navigate('AddLocation')}
          icon={
            <View
              style={{
                backgroundColor: Colors.iconColors['blue1'],
                width: 32,
                height: 32,
                marginRight: 15,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='location-sharp' size={20} color={'white'} />
            </View>
          }
          title='Add Location'
          value={''}
        />
        {/* <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
        <MenuCell
          onCellPress={() => createNewPostStackNavigation.navigate('AddLocation')}
          icon={
            <View
              style={{
                backgroundColor: Colors.iconColors['yellow1'],
                width: 32,
                height: 32,
                marginRight: 15,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VectorIcon.II name='person-circle-outline' size={20} color={'white'} />
            </View>
          }
          title='Add People'
          value={''}
        /> */}
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

type MenuCellProp = {
  onCellPress: () => void;
  icon: React.ReactNode;
  title: string;
  value: string;
  requirementText?: string;
};

// export const MenuCell: React.FC<MenuCellProp> = ({ onCellPress, icon, title, value, requirementText }) => {
//   return (
//     <TouchableOpacity
//       style={{
//         paddingVertical: 15,
//         paddingHorizontal: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 5,
//       }}
//       onPress={onCellPress}
//       activeOpacity={0.8}
//     >
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {icon}
//         <View>
//           <Text style={{ color: 'white', fontSize: 17, marginBottom: requirementText !== undefined ? 0 : 4 }}>
//             {title}
//           </Text>
//           {requirementText !== undefined && (
//             <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>{requirementText}</Text>
//           )}
//         </View>
//       </View>
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <Text
//           numberOfLines={1}
//           style={{ fontSize: 15, color: 'rgb(170,170,170)', textAlign: 'right', marginRight: 5, width: 150 }}
//         >
//           {value}
//         </Text>
//         <VectorIcon.MCI name='chevron-right' size={20} color='rgb(170,170,170)' />
//       </View>
//     </TouchableOpacity>
//   );
// };

const MenuCell: React.FC<MenuCellProp> = ({ onCellPress, icon, title, value, requirementText }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onCellPress}
      activeOpacity={0.8}
    >
      {icon}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'white', fontSize: 17 }}>{title}</Text>
            {requirementText !== undefined ? (
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12, marginTop: 4 }}>{requirementText}</Text>
            ) : null}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 15, color: 'rgb(170,170,170)', marginRight: 5, width: 100, textAlign: 'right' }}
          >
            {value}
          </Text>
          <VectorIcon.MCI name='chevron-right' size={20} color='rgb(170,170,170)' />
        </View>
      </View>
    </TouchableOpacity>
  );
};
