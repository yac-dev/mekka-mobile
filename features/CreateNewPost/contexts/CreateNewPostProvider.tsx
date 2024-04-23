import React, { useState, createContext, useContext } from 'react';
import backendAPI from '../../../apis/backend';
import * as ImagePicker from 'expo-image-picker';
import { CurrentSpaceContext } from '../../../providers';

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
  // addedTags: {
  //   value: [],
  //   isValidated: false, // これに関してはuserに選ばせる。必ず。
  // },
  // addedLocation: {
  //   value: {},
  //   isValidated: true,
  // },
};

type PostTypeType = 'normal' | 'moment';

type ContentTypeType = 'photo' | 'video';

type TagType = {};

type ContentType = {
  uri: string;
  type: ContentTypeType;
  duration: number | undefined;
};

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

export type FormDataType = {
  postType: FormType<PostTypeType>;
  contents: FormType<ContentType[]>;
  caption: FormType<string>;
  // addedTags: FormType<string>;
};

type CreateNewPostContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onPostTypeChange: (postType: PostTypeType) => void;
  pickUpContents: () => void;
  onCaptionChange: (caption: string) => void;
};

const CreateNewPostContext = createContext<CreateNewPostContextType>({
  formData: initialFormData,
  setFormData: () => {},
  onPostTypeChange: () => {},
  pickUpContents: () => {},
  onCaptionChange: () => {},
});

export const CreateNewPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

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

  return (
    <CreateNewPostContext.Provider value={{ formData, setFormData, onPostTypeChange, pickUpContents, onCaptionChange }}>
      {children}
    </CreateNewPostContext.Provider>
  );
};
