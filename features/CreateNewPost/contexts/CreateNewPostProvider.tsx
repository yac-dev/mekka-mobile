import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import backendAPI from '../../../apis/backend';
import * as ImagePicker from 'expo-image-picker';
import { IconType, TagType, LocationType } from '../../../types';
import { useGetTagIcons } from '../hooks';
import FlashMessage from 'react-native-flash-message';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom, authAtom } from '../../../recoil';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const initialFormData: FormDataType = {
  postType: {
    value: 'normal',
    isValidated: true,
  },
  bufferContents: {
    value: [],
    isValidated: false,
  },
  contents: {
    value: [],
    isValidated: false,
  },
  caption: {
    value: '',
    isValidated: true,
  },
  addedTagsTable: {
    value: {},
    isValidated: false, // これに関してはuserに選ばせる。必ず。
  },
  location: {
    value: {
      type: 'Point',
      coordinates: [],
    },
    isValidated: true,
  },
  // addedLocation: {
  //   value: {},
  //   isValidated: true,
  // },
};

type PostTypeType = 'normal' | 'moment';

type ContentTypeType = 'photo' | 'video';

export type ContentType = {
  fileName: string;
  type: ContentTypeType;
  duration: number | undefined;
  userId: string;
};

export type BufferContentTypeType = 'image/jpg' | 'video/mp4';

export type BufferContentType = {
  name: string;
  uri: string;
  type: BufferContentTypeType;
};

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type AddedTagsTableType = {
  [key: string]: AddedTagType;
};

export type CreatedTagType = {
  _id: string;
  icon: IconType;
  name: string;
  color: string;
  created: boolean;
};

type AddedTagType = (TagType & { created?: boolean }) | CreatedTagType;
export type TagOptionType = AddedTagType;

export type FormDataType = {
  postType: FormType<PostTypeType>;
  contents: FormType<ContentType[]>;
  bufferContents: FormType<BufferContentType[]>;
  caption: FormType<string>;
  addedTagsTable: FormType<AddedTagsTableType>;
  location: FormType<LocationType | undefined>;
};

type CreateNewPostContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  tagOptions: TagOptionType[];
  onPostTypeChange: (postType: PostTypeType) => void;
  pickUpContents: () => void;
  onRemoveContentPress: (index: number) => void;
  onCaptionChange: (caption: string) => void;
  addTag: (tagOption: TagOptionType) => void;
  addCreatedTag: (createdTag: CreatedTagType) => void;
  removeAddedTag: (tagOption: TagOptionType) => void;
  addLocation: (coordinates: number[]) => void;
  removeLocation: () => void;
  defaultTagIcon?: IconType;
  createNewPostFlashMessageRef: React.RefObject<FlashMessage>;
};

export const CreateNewPostContext = createContext<CreateNewPostContextType>({
  formData: initialFormData,
  setFormData: () => {},
  tagOptions: [],
  onPostTypeChange: () => {},
  pickUpContents: () => {},
  onRemoveContentPress: () => {},
  onCaptionChange: () => {},
  addTag: () => {},
  addCreatedTag: () => {},
  removeAddedTag: () => {},
  addLocation: (coordinates: number[]) => {},
  removeLocation: () => {},
  defaultTagIcon: void 0,
  createNewPostFlashMessageRef: null,
});

export const CreateNewPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth] = useRecoilState(authAtom);
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  // Create initial form data with the first tag
  const getInitialFormData = (): FormDataType => {
    const firstTag = currentSpace.tags[0];
    return {
      ...initialFormData,
      addedTagsTable: {
        value: { [firstTag._id]: firstTag },
        isValidated: true,
      },
    };
  };

  const [formData, setFormData] = useState<FormDataType>(getInitialFormData());
  const [tagOptions, setTagOptions] = useState<TagOptionType[]>(currentSpace.tags);
  const { apiResult, requestApi } = useGetTagIcons();
  const createNewPostFlashMessageRef = useRef<FlashMessage>(null);

  useEffect(() => {
    requestApi({ name: 'hash' });
  }, []);

  const onPostTypeChange = (postType: PostTypeType) => {
    setFormData((previous) => {
      return {
        ...previous,
        postType: {
          value: postType,
          isValidated: true,
        },
      };
    });
  };

  // console.log('isImagePickerOpen', isImagePickerOpen);
  //やりようによっては制御できそう。。。

  const pickUpContents = async () => {
    // setIsImagePickerOpen(true);
    const pickerOption = {
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Default value
      allowsMultipleSelection: true,
      quality: 1,
      storageOptions: {
        skipBackup: true,
      },
    };

    if (currentSpace.contentType === 'photo') {
      pickerOption.mediaTypes = ImagePicker.MediaTypeOptions.Images;
    } else if (currentSpace.contentType === 'video') {
      pickerOption.mediaTypes = ImagePicker.MediaTypeOptions.Videos;
    }

    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    // setIsImagePickerOpen(false);
    if (!result.canceled && result.assets) {
      const fileName = `${auth._id}_${new Date().getTime()}`;
      const adding = [...formData.contents.value];
      const bufferContents = [...formData.bufferContents.value];

      for (const asset of result.assets) {
        // 6つ以上の追加はできない
        if (adding.length >= 6) {
          createNewPostFlashMessageRef.current?.showMessage({
            message: 'You can only upload up to 6 files.',
            type: 'warning',
            duration: 5000,
          });
        } else {
          if (asset.type === 'video') {
            // videoは２つまで
            if (adding.filter((content) => content.type === 'video').length >= 1) {
              createNewPostFlashMessageRef.current?.showMessage({
                message: 'OOPS! Video is allowed only one.',
                type: 'warning',
                duration: 5000,
              });
            } else if (asset.duration / 1000 <= currentSpace.videoLength) {
              const uuid = uuidv4();
              adding.push({
                fileName: `${fileName}_${uuid}.mp4`,
                type: 'video',
                duration: asset.duration ? asset.duration : null,
                userId: auth._id,
              });
              bufferContents.push({
                name: `${fileName}_${uuid}.mp4`,
                uri: asset.uri,
                type: 'video/mp4',
              });
            } else {
              createNewPostFlashMessageRef.current?.showMessage({
                message: `Video length is limited to ${currentSpace.videoLength} in this space.`,
                type: 'warning',
                duration: 5000,
              });
            }
          } else if (asset.type === 'image') {
            // mymetypeではwebpを指定できない。基本、jpgかpng。
            // imageは4つまで
            const uuid = uuidv4();
            if (adding.filter((content) => content.type === 'photo').length >= 5) {
              createNewPostFlashMessageRef.current?.showMessage({
                message: 'OOPS! More than 5 photos at once is not allowed.',
                type: 'warning',
                duration: 5000,
              });
            } else {
              adding.push({
                fileName: `${fileName}_${uuid}.webp`,
                type: 'photo',
                duration: asset.duration ? asset.duration : null,
                userId: auth._id,
              });
              bufferContents.push({
                name: `${fileName}_${uuid}.webp`,
                uri: asset.uri,
                type: 'image/jpg',
              });
            }
          }
        }
      }
      setFormData((previous) => {
        return {
          ...previous,
          contents: {
            value: adding,
            isValidated: adding.length ? true : false,
          },
          bufferContents: {
            value: bufferContents,
            isValidated: bufferContents.length ? true : false,
          },
        };
      });
    }
  };

  const onRemoveContentPress = (index: number) => {
    setFormData((previous) => {
      const updatedContents = [...previous.contents.value].filter((_, idx: number) => index !== idx);
      const updatedBufferContents = [...previous.bufferContents.value].filter((_, idx: number) => index !== idx);
      return {
        ...previous,
        contents: {
          value: updatedContents,
          isValidated: updatedContents.length ? true : false,
        },
        bufferContents: {
          value: updatedBufferContents,
          isValidated: updatedBufferContents.length ? true : false,
        },
      };
    });
  };

  const onCaptionChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        caption: {
          value: text,
          isValidated: true,
        },
      };
    });
  };

  const addTag = (tag: TagOptionType) => {
    setFormData((previous) => {
      const updatedAddedTag = {
        ...previous.addedTagsTable.value,
        [tag._id]: tag,
      };
      return {
        ...previous,
        addedTagsTable: {
          value: updatedAddedTag,
          isValidated: Object.values(updatedAddedTag).length ? true : false,
        },
      };
    });
  };

  const addCreatedTag = (createdTag: CreatedTagType) => {
    setFormData((previous) => {
      const updatedAddedTag = {
        ...previous.addedTagsTable.value,
        [createdTag._id]: createdTag,
      };
      return {
        ...previous,
        addedTagsTable: {
          value: updatedAddedTag,
          isValidated: Object.values(updatedAddedTag).length ? true : false,
        },
      };
    });

    setTagOptions((previous) => [...previous, createdTag]);
  };

  const removeAddedTag = (tag: TagOptionType) => {
    setFormData((previous) => {
      const updating = { ...previous.addedTagsTable.value };
      delete updating[tag._id];
      return {
        ...previous,
        addedTagsTable: {
          value: updating,
          isValidated: Object.values(updating).length ? true : false,
        },
      };
    });
  };

  const addLocation = (coordinates: number[]) => {
    setFormData((previous) => {
      return {
        ...previous,
        location: {
          value: { type: 'Point', coordinates },
          isValidated: true,
        },
      };
    });
  };

  const removeLocation = () => {
    setFormData((previous) => {
      return {
        ...previous,
        location: {
          value: {
            type: 'Point',
            coordinates: [],
          },
          isValidated: true,
        },
      };
    });
  };

  return (
    <CreateNewPostContext.Provider
      value={{
        formData,
        setFormData,
        tagOptions,
        onPostTypeChange,
        pickUpContents,
        onRemoveContentPress,
        onCaptionChange,
        addTag,
        addCreatedTag,
        removeAddedTag,
        addLocation,
        removeLocation,
        defaultTagIcon: apiResult.data?.icon,
        createNewPostFlashMessageRef,
      }}
    >
      {children}
      <FlashMessage ref={createNewPostFlashMessageRef} />
    </CreateNewPostContext.Provider>
  );
};
