import React, { useState, useContext, useEffect, useCallback } from 'react';
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
import { SnackBar } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { BufferContentType, ContentType, CreateNewPostContext } from '../contexts';
import { CreateNewPostStackParams, CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';
import { VectorIcon } from '../../../Icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentSpaceAtom, currentTagAtom, mySpacesAtom } from '../../../recoil';
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

// create用のやつが反映されてないな。。。

type INormalPost = NativeStackScreenProps<CreateNewPostStackParams, 'NormalPost'>;

// createdTagsは結局、currentSpaceとmySpacesを更新せなあかんよな。
// myspacesの更新とcurrentSpaceの更新だよね。。
// myspacesの方もあれよ絵。tan stackにかえたい、recoilから。
// でもな。。。
export const NormalPost: React.FC<INormalPost> = ({ route }) => {
  const [currentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const queryClient = useQueryClient();
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const [auth] = useRecoilState(authAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [currentTag, setCurrentTag] = useRecoilState(currentTagAtom);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);

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
      if (type === 'image/jpg') {
        const result = await ImageCompressor.compress(uri, {
          compressionMethod: 'manual',
          quality: 0.7,
        });
        return { ...content, uri: result };
      } else if (type === 'video/mp4') {
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
      const list = formData.bufferContents.value.map((content: BufferContentType, index) => {
        return (
          <ContentThumbnail key={index} bufferContent={content} index={index} onBufferContentPress={pickUpContents} />
        );
      });

      return (
        <View style={{ marginBottom: 30, alignItems: 'center' }}>{formData.contents.value.length ? list : null}</View>
      );
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 10 }} automaticallyAdjustKeyboardInsets={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ paddingHorizontal: 30, paddingTop: 20, paddingBottom: 10 }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              {formData.postType.value === 'normal' ? 'New Post' : 'Moment Post'}
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
      <MenuCell
        onCellPress={() => createNewPostStackNavigation.navigate('AddTags')}
        icon={<VectorIcon.OI name='hash' size={20} color='white' style={{ marginRight: 10 }} />}
        title='Tags'
        value={renderTagTexts()}
        requirementText={!formData.addedTagsTable.isValidated ? 'Required' : undefined}
      />
      <MenuCell
        onCellPress={() => createNewPostStackNavigation.navigate('AddLocation')}
        icon={<VectorIcon.II name='location-sharp' size={20} color='white' style={{ marginRight: 10 }} />}
        title='Location (optional)'
        value={''}
      />
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

export const MenuCell: React.FC<MenuCellProp> = ({ onCellPress, icon, title, value, requirementText }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}
      onPress={onCellPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <View>
          <Text style={{ color: 'white', fontSize: 17, marginBottom: requirementText !== undefined ? 0 : 4 }}>
            {title}
          </Text>
          {requirementText !== undefined && (
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>{requirementText}</Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 15, color: 'rgb(170,170,170)', textAlign: 'right', marginRight: 5, width: 150 }}
        >
          {value}
        </Text>
        <VectorIcon.MCI name='chevron-right' size={20} color='rgb(170,170,170)' />
      </View>
    </TouchableOpacity>
  );
};
