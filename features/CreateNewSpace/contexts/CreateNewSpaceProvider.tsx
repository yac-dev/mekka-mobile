import React, { useState, createContext, useContext, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import FlashMessage from 'react-native-flash-message';
import { ReactionType } from './ReactionPickerProvider';
// data構造から見直そう
export const initialFormData: FormDataType = {
  name: {
    value: '',
    isValidated: false,
  },
  icon: {
    value: '',
    isValidated: false,
  },
  contentType: {
    value: 'photoAndVideo',
    isValidated: true,
  },
  isPublic: {
    value: void 0,
    isValidated: false, // これに関してはuserに選ばせる。必ず。
  },
  isCommentAvailable: {
    value: true,
    isValidated: true,
  },
  isFollowAvailable: {
    value: false,
    isValidated: true,
  },
  isReactionAvailable: {
    value: true,
    isValidated: true,
  },
  videoLength: {
    value: 90,
    isValidated: true,
  },
  disappearAfter: {
    value: 1440, // 5 分から 1399 分(23 hours 59 min), 720 minutes(12 hours) defautlで23時間59分
    isValidated: true,
  },
  reactions: {
    value: [
      { caption: 'Nice', emoji: '😃', sticker: undefined, type: 'emoji' },
      { caption: 'Beautiful', emoji: '😎', sticker: undefined, type: 'emoji' },
      { caption: 'OMG', emoji: '😱', sticker: undefined, type: 'emoji' },
      { caption: 'LMAO', emoji: '😂', sticker: undefined, type: 'emoji' },
    ],
    isValidated: true,
  },
  hours: {
    value: {
      from: '12am',
      to: '12am',
    },
    isValidated: true,
  },
  description: {
    value: 'No description...',
    isValidated: true,
  },
};

export const vanillaFormData = {
  ...initialFormData,
  isPublic: {
    value: false,
    isValidated: true,
  },
  contentType: {
    value: 'photoAndVideo',
    isValidated: true,
  },
  isReactionAvailable: {
    value: true,
    isValidated: true,
  },
  isCommentAvailable: {
    value: true,
    isValidated: true,
  },
  isFollowAvailable: {
    value: true,
    isValidated: true,
  },
  videoLength: {
    value: 90,
    isValidated: true,
  },
  reactions: {
    value: [{ caption: 'Like', emoji: '❤️', sticker: undefined, type: 'emoji' }] as ReactionType[], // そっか、これunion typeでemojiかsticker typeどちらかだもんな。。。だからas keywordが必要なのか。
    isValidated: true,
  },
  description: {
    value: 'Delete this and write about your space.',
    isValidated: true,
  },
};

export const photoLoversFormData = {
  ...initialFormData,
  isPublic: {
    value: false,
    isValidated: true,
  },
  contentType: {
    value: 'photo',
    isValidated: true,
  },
  isReactionAvailable: {
    value: true,
    isValidated: true,
  },
  isFollowAvailable: {
    value: true,
    isValidated: true,
  },
  reactions: {
    value: [
      { caption: 'nice', emoji: '😃', sticker: undefined, type: 'emoji' },
      { caption: 'beautiful ', emoji: '😎', sticker: undefined, type: 'emoji' },
      { caption: 'omg', emoji: '😱', sticker: undefined, type: 'emoji' },
      { caption: 'lmao', emoji: '😂', sticker: undefined, type: 'emoji' },
    ] as ReactionType[], // そっか、これunion typeでemojiかsticker typeどちらかだもんな。。。だからas keywordが必要なのか。
    isValidated: true,
  },
  description: {
    value: 'Delete this and write about your space.',
    isValidated: true,
  },
};

export const noCommentNoReactionFormData: FormDataType = {
  ...initialFormData,
  isPublic: {
    value: false,
    isValidated: true,
  },
  isCommentAvailable: {
    value: false,
    isValidated: true,
  },
  isReactionAvailable: {
    value: false,
    isValidated: true,
  },
  isFollowAvailable: {
    value: false,
    isValidated: true,
  },
  reactions: {
    value: [],
    isValidated: true,
  },
  description: {
    value: 'Delete this and write about your space.',
    isValidated: true,
  },
};

// この下二つがおかしいな。。。
export const busySpaceFormData = {
  ...initialFormData,
  isPublic: {
    value: false,
    isValidated: true,
  },
  contentType: {
    value: 'video',
    isValidated: true,
  },
  isCommentAvailable: {
    value: true,
    isValidated: true,
  },
  isReactionAvailable: {
    value: true,
    isValidated: true,
  },
  isFollowAvailable: {
    value: true,
    isValidated: true,
  },
  videoLength: {
    value: 5,
    isValidated: true,
  },
  disappearAfter: {
    value: 30,
    isValidated: true,
  },
  reactions: {
    value: [
      { caption: 'nice', emoji: '😃', sticker: undefined, type: 'emoji' },
      { caption: 'beautiful ', emoji: '😎', sticker: undefined, type: 'emoji' },
      { caption: 'omg', emoji: '😱', sticker: undefined, type: 'emoji' },
      { caption: 'lmao', emoji: '😂', sticker: undefined, type: 'emoji' },
    ] as ReactionType[],
    isValidated: true,
  },
  description: {
    value: 'Delete this and write about your space.',
    isValidated: true,
  },
};

type StickerType = {
  _id: string;
  url: string;
};

// type ReactionType = {
//   type: 'emoji' | 'sticker';
//   emoji: string | undefined;
//   sticker: StickerType | undefined;
//   caption: string;
// };

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

export type FormDataType = {
  name: FormType<string>;
  icon: FormType<string>;
  contentType: FormType<string>;
  isPublic: FormType<boolean | undefined>;
  isCommentAvailable: FormType<boolean>;
  isReactionAvailable: FormType<boolean>;
  isFollowAvailable: FormType<boolean>;
  videoLength: FormType<number>;
  disappearAfter: FormType<number>;
  reactions: FormType<ReactionType[]>; //　ここのrteacttionの部分が大変だね。。。
  description: FormType<string>;
  hours: FormType<{ from: string; to: string }>;
};

type CreateNewSpaceContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onNameChange: (text: string) => void;
  onIconChange: () => void;
  onContentTypeChange: (contentType: string) => void;
  onIsPubcliChange: (bool: boolean) => void;
  onCommentAvailabilityChange: (bool: boolean) => void;
  onReactionAvailabilityChange: (bool: boolean) => void;
  onFollowAvailabilityChange: (bool: boolean) => void;
  onVideoLengthChange: (seconds: number) => void;
  onDisapperAfterChange: (minutes: number) => void;
  onDescriptionChange: (text: string) => void;
  onReactionsChange: (reactions: ReactionType[]) => void;
  onHoursChange: (hours: { from: string; to: string }) => void;
  flashMessageRef: React.RefObject<FlashMessage>;
};

export const CreateNewSpaceContext = createContext<CreateNewSpaceContextType>({
  formData: initialFormData,
  setFormData: () => {},
  onNameChange: () => {},
  onIconChange: () => {},
  onContentTypeChange: () => {},
  onIsPubcliChange: () => {},
  onCommentAvailabilityChange: () => {},
  onReactionAvailabilityChange: () => {},
  onFollowAvailabilityChange: () => {},
  onVideoLengthChange: () => {},
  onDisapperAfterChange: () => {},
  onDescriptionChange: () => {},
  onReactionsChange: () => {},
  onHoursChange: () => {},
  flashMessageRef: null,
});

type CreateNewSpaceProviderProps = {
  children: React.ReactNode;
};

export const CreateNewSpaceProvider: React.FC<CreateNewSpaceProviderProps> = ({ children }) => {
  const flashMessageRef = useRef<FlashMessage>(null);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const onNameChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        name: {
          value: text,
          isValidated: text.length && text.length <= 30 ? true : false,
        },
      };
    });
  };

  const onIconChange = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      setFormData((previous) => {
        return {
          ...previous,
          icon: {
            value: pickedImage.assets[0].uri,
            isValidated: true,
          },
        };
      });
    }
  };
  const onContentTypeChange = (contentType: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        contentType: {
          value: contentType,
          isValidated: true,
        },
      };
    });
  };

  const onIsPubcliChange = (bool: boolean) => {
    setFormData((previous) => {
      return {
        ...previous,
        isPublic: {
          value: bool,
          isValidated: true,
        },
        isFollowAvailable: {
          value: bool ? true : false,
          isValidated: true,
        },
      };
    });
  };
  const onCommentAvailabilityChange = (bool: boolean) => {
    setFormData((previous) => {
      return {
        ...previous,
        isCommentAvailable: {
          value: bool,
          isValidated: true,
        },
      };
    });
  };

  const onReactionAvailabilityChange = (bool: boolean) => {
    setFormData((previous) => {
      return {
        ...previous,
        isReactionAvailable: {
          value: bool,
          isValidated: true,
        },
      };
    });
  };

  const onVideoLengthChange = (minutes: number) => {
    setFormData((previous) => {
      return {
        ...previous,
        videoLength: {
          value: minutes,
          isValidated: true,
        },
      };
    });
  };

  const onDisapperAfterChange = (minutes: number) => {
    setFormData((previous) => {
      return {
        ...previous,
        disappearAfter: {
          value: minutes,
          isValidated: true,
        },
      };
    });
  };
  const onReactionsChange = (reactions: ReactionType[]) => {
    setFormData((previous) => {
      return {
        ...previous,
        reactions: {
          value: reactions,
          isValidated: reactions.length ? true : false,
        },
      };
    });
  };

  const onFollowAvailabilityChange = (bool: boolean) => {
    setFormData((previous) => {
      return {
        ...previous,
        isFollowAvailable: {
          value: bool,
          isValidated: true,
        },
      };
    });
  };

  const onDescriptionChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        description: {
          value: text,
          isValidated: text.length && text.length <= 300 ? true : false,
        },
      };
    });
  };

  const onHoursChange = (hours: { from: string; to: string }) => {
    // Helper function to convert 12-hour format to 24-hour minutes
    const to24Minutes = (timeStr: string): number => {
      const match = timeStr.match(/^(\d+)(am|pm)$/);
      if (!match) return 0;
      let h = parseInt(match[1], 10);
      if (match[2] === 'am') {
        if (h === 12) return 0; // 12am = 0:00
        return h;
      } else {
        if (h === 12) return 12; // 12pm = 12:00
        return h + 12;
      }
    };

    // Convert to minutes for easier comparison
    const fromMinutes = to24Minutes(hours.from) * 60;
    const toMinutes = to24Minutes(hours.to) * 60;

    // Validation logic
    let isValidated = true;

    // Special case: 12am-12am is valid for "All-day"
    if (hours.from === '12am' && hours.to === '12am') {
      isValidated = true;
    } else if (hours.to === '12am') {
      // Special case: 12am (midnight) is always valid as end time
      isValidated = true;
    } else if (fromMinutes < toMinutes) {
      // Normal case: to time is after from time
      isValidated = true;
    } else {
      // Invalid case: to time is before or equal to from time (except when crossing midnight)
      isValidated = false;
    }

    console.log('fromMinutes', fromMinutes);
    console.log('toMinutes', toMinutes);
    // console.log('isValidated', isValidated);

    setFormData((previous) => {
      return {
        ...previous,
        hours: { value: hours, isValidated },
      };
    });
  };

  return (
    <CreateNewSpaceContext.Provider
      value={{
        formData,
        setFormData,
        onNameChange,
        onIconChange,
        onContentTypeChange,
        onIsPubcliChange,
        onCommentAvailabilityChange,
        onReactionAvailabilityChange,
        onFollowAvailabilityChange,
        onVideoLengthChange,
        onDisapperAfterChange,
        onDescriptionChange,
        onReactionsChange,
        onHoursChange,
        flashMessageRef,
      }}
    >
      {children}
      <FlashMessage ref={flashMessageRef} />
    </CreateNewSpaceContext.Provider>
  );
};
