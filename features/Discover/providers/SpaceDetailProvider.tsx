import React, { useState, createContext, useContext, useEffect } from 'react';
import backendAPI from '../../../apis/backend';
import * as ImagePicker from 'expo-image-picker';
import { CurrentSpaceContext } from '../../../providers';
import { IconType, TagType, LocationType } from '../../../types';

type CreateNewPostContextType = {};

export const CreateNewPostContext = createContext<CreateNewPostContextType>({});

export const SpaceDetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CreateNewPostContext.Provider value={{}}>{children}</CreateNewPostContext.Provider>;
};
