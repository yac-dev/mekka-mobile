import React, { useState, createContext } from 'react';
import { INITIAL_POST_FORM_DATA, PostFormType } from '../../../types';

type PostFormContextType = {
  formData: PostFormType;
  setFormData: React.Dispatch<React.SetStateAction<PostFormType>>;
};

export const PostFormContext = createContext<PostFormContextType>({
  formData: INITIAL_POST_FORM_DATA,
  setFormData: () => {},
});

type PostFromProviderProps = {
  children: React.ReactNode;
};

export const PostFormProvider: React.FC<PostFromProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<PostFormType>(INITIAL_POST_FORM_DATA);
  return <PostFormContext.Provider value={{ formData, setFormData }}>{children}</PostFormContext.Provider>;
};
