import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';
import { SnackBarContext } from '../../../providers';
import { emojis } from '../../../utils/Emoji/shortNameToUnicode';

type StickerType = {
  _id: string;
  url: string;
};

export type ReactionType = {
  type: 'emoji' | 'sticker';
  emoji: string | undefined;
  sticker: StickerType | undefined;
};

type SelectedReactionsType = {
  [key: string]: ReactionType;
};

type ReactionPickerContextType = {
  selectedReactions: SelectedReactionsType;
  setSelectedReactions: React.Dispatch<React.SetStateAction<SelectedReactionsType>>;
  onEmojiPress: (emoji: string) => void;
};

export const ReactionPickerContext = createContext<ReactionPickerContextType>({
  selectedReactions: {},
  setSelectedReactions: () => {},
  onEmojiPress: () => {},
});

type ReactionPickerProviderProps = {
  children: React.ReactNode;
};

export const ReactionPickerProvider: React.FC<ReactionPickerProviderProps> = ({ children }) => {
  const { setSnackBar } = useContext(SnackBarContext);
  const [selectedReactions, setSelectedReactions] = useState<SelectedReactionsType>({});

  const onEmojiPress = useCallback(
    (emoji: string) => {
      if (Object.keys(selectedReactions).length >= 7) {
        console.log('emojis number should be at most 6');
        setSnackBar({
          isVisible: true,
          status: 'warning',
          message: 'OOPS. The number of reaction options is limited to 6 at most.',
          duration: 5000,
        });
      } else {
        // このlengthが明らかにおかしい。。。というかあれかな。// このfunctionが新しいのに更新されてないよね。useCallbakc的な。。
        console.log(Object.keys(selectedReactions).length);
        setSelectedReactions((previous) => {
          return {
            ...previous,
            [emojis[`:${emoji}:`]]: {
              type: 'emoji',
              emoji: emojis[`:${emoji}:`],
              sticker: undefined,
            },
          };
        });
      }
    },
    [selectedReactions]
  );

  return (
    <ReactionPickerContext.Provider
      value={{
        selectedReactions,
        setSelectedReactions,
        onEmojiPress,
      }}
    >
      {children}
    </ReactionPickerContext.Provider>
  );
};
