import React, { useState, createContext, useContext, useEffect } from 'react';
import backendAPI from '../../../apis/backend';
import * as ImagePicker from 'expo-image-picker';
import { CurrentSpaceContext } from '../../../providers';
import { IconType, TagType, LocationType } from '../../../types';
import { useGetTagIcons } from '../hooks';

const initialFormData: FormDataType = {
  postType: {
    value: 'normal',
    isValidated: true,
  },
  contents: {
    value: [],
    isValidated: false,
  },
  caption: {
    value: '',
    isValidated: false,
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
  uri: string;
  type: ContentTypeType;
  duration: number | undefined;
};

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type AddedTagsTableType = {
  [key: string]: AddedTagType;
};

// _id: string;
//   name: string;
//   icon: IconType;
//   color: string;
//   count: number;
//   space: SpaceType;
//   updatedAt: string;
//   createdBy: UserType;

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
});

export const CreateNewPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [tagOptions, setTagOptions] = useState<TagOptionType[]>(currentSpace.tags);
  const { apiResult, requestApi } = useGetTagIcons();

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

  const pickUpContents = async () => {
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
    if (!result.canceled && result.assets) {
      const adding = [];
      for (const asset of result.assets) {
        if (asset.type === 'video') {
          if (asset.duration / 1000 <= currentSpace.videoLength) {
            adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
          } else {
            // setSnackBar({
            //   isVisible: true,
            //   status: 'warning',
            //   message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
            //   duration: 5000,
            // });
          }
        } else if (asset.type === 'image') {
          adding.push({ uri: asset.uri, type: 'photo', duration: asset.duration ? asset.duration : null });
        }
      }
      setFormData((previous) => {
        return {
          ...previous,
          contents: {
            value: adding,
            isValidated: adding.length ? true : false,
          },
        };
      });
    }
  };

  const onRemoveContentPress = (index: number) => {
    setFormData((previous) => {
      const updatedContents = [...previous.contents.value].filter((_, idx: number) => index !== idx);
      return {
        ...previous,
        contents: {
          value: updatedContents,
          isValidated: updatedContents.length ? true : false,
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
          isValidated: text.length ? true : false,
        },
      };
    });
  };

  const addTag = (tag: TagOptionType) => {
    console.log(tag._id);
    setFormData((previous) => {
      const updatedAddedTag = {
        ...previous.addedTagsTable.value,
        [tag._id]: tag,
      };
      console.log('updated', updatedAddedTag);
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
      return {
        ...previous,
        addedTagsTable: {
          ...previous.addedTagsTable,
          value: {
            ...previous.addedTagsTable.value,
            [createdTag._id]: createdTag,
          },
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
          value: void 0,
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
      }}
    >
      {children}
    </CreateNewPostContext.Provider>
  );
};
