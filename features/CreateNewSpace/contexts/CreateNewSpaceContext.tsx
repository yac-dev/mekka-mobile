import React, { useState, createContext } from 'react';

// data構造から見直そう
const initialFormData = {
  name: {
    value: '',
    isValidated: false,
  },
  icon: {
    value: '',
    isValidated: false,
  },
  contentType: {
    value: '',
    isValidated: false,
  },
  isPublic: {
    value: void 0,
    isValidated: false, // これに関してはuserに選ばせる。必ず。
  },
  isCommentAvailable: {
    value: true,
    isValidated: true,
  },
  isReactionAvailable: {
    value: true,
    isValidated: true,
  },
  videoLength: {
    value: 60,
    isValidated: true,
  },
  disappearAfter: {
    value: 1439, // 5 分から 1399 分(23 hours 59 min), 720 minutes(12 hours) defautlで23時間59分
    isValidated: false,
  },
  reactions: {
    value: [],
    isValidated: false,
  },
  description: {
    value: '',
    isValidated: false,
  },
};

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type FormDataType = {
  name: FormType<string>;
  icon: FormType<string>;
  contentType: FormType<string>;
  isPublic: FormType<boolean | undefined>;
  isCommentAvailable: FormType<boolean>;
  isReactionAvailable: FormType<boolean>;
  videoLength: FormType<number>;
  disappearAfter: FormType<number>;
  reactions: FormType<string[]>; //　ここのrteacttionの部分が大変だね。。。
  description: FormType<string>;
};

type CreateNewSpaceContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

export const CreateNewSpaceContext = createContext<CreateNewSpaceContextType>({
  formData: initialFormData,
  setFormData: () => {},
});

type CreateNewSpaceProviderProps = {
  children: React.ReactNode;
};

export const CreateNewSpaceProvider: React.FC<CreateNewSpaceProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  return <CreateNewSpaceContext.Provider value={{ formData, setFormData }}>{children}</CreateNewSpaceContext.Provider>;
};
