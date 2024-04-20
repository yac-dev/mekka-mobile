import React, { useState, createContext } from 'react';
import * as ImagePicker from 'expo-image-picker';

type StickerType = {};

type ReactionType = {
  type: 'emoji' | 'sticker';
  emoji: string | undefined;
  sticker: StickerType | undefined;
};

type ReactionPickerContextType = {
  selectedReactions: ReactionType[];
  setSelectedReactions: React.Dispatch<React.SetStateAction<ReactionType[]>>;
};

export const ReactionPickerContext = createContext<ReactionPickerContextType>({
  selectedReactions: [],
  setSelectedReactions: () => {},
});

type ReactionPickerProviderProps = {
  children: React.ReactNode;
};

export const ReactionPickerProvider: React.FC<ReactionPickerProviderProps> = ({ children }) => {
  const [selectedReactions, setSelectedReactions] = useState<ReactionType[]>([]);

  return (
    <ReactionPickerContext.Provider value={{ selectedReactions, setSelectedReactions }}>
      {children}
    </ReactionPickerContext.Provider>
  );
};
